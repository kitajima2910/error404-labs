import { ByteReader } from "./bytecode.js"

const utf8Decoder = new TextDecoder("utf-8")

function intBitsToFloat(bits) {
    const buffer = new ArrayBuffer(4)
    const view = new DataView(buffer)
    view.setUint32(0, bits >>> 0, false)
    return view.getFloat32(0, false)
}

function longBitsToSignedBigInt(high, low) {
    let value = (BigInt(high >>> 0) << 32n) | BigInt(low >>> 0)
    if (high & 0x80000000) {
        value -= 1n << 64n
    }
    return Number(value)
}

function longBitsToDouble(high, low) {
    const buffer = new ArrayBuffer(8)
    const view = new DataView(buffer)
    view.setUint32(0, high >>> 0, false)
    view.setUint32(4, low >>> 0, false)
    return view.getFloat64(0, false)
}

function skipMemberAttributes(reader, attributeCount) {
    for (let i = 0; i < attributeCount; i++) {
        reader.u2()
        const length = reader.u4()
        reader.pos += length
    }
}

export function parseClass(buffer) {
    const reader = new ByteReader(buffer)
    const magic = reader.u4()

    if (magic !== 0xcafebabe) {
        throw new Error("Invalid class file")
    }

    reader.u2()
    reader.u2()

    const constantPoolCount = reader.u2()
    const constantPool = [null]

    for (let i = 1; i < constantPoolCount; i++) {
        const tag = reader.u1()

        switch (tag) {
            case 1: {
                const length = reader.u2()
                const bytes = []

                for (let j = 0; j < length; j++) {
                    bytes.push(reader.u1())
                }

                constantPool.push({
                    tag,
                    value: utf8Decoder.decode(new Uint8Array(bytes))
                })
                break
            }

            case 3:
                constantPool.push({ tag, value: reader.u4() | 0 })
                break

            case 4:
                constantPool.push({ tag, value: intBitsToFloat(reader.u4()) })
                break

            case 5: {
                const high = reader.u4()
                const low = reader.u4()
                constantPool.push({ tag, value: longBitsToSignedBigInt(high, low) })
                constantPool.push(null)
                i++
                break
            }

            case 6: {
                const high = reader.u4()
                const low = reader.u4()
                constantPool.push({ tag, value: longBitsToDouble(high, low) })
                constantPool.push(null)
                i++
                break
            }

            case 7:
                constantPool.push({ tag, nameIndex: reader.u2() })
                break

            case 8:
                constantPool.push({ tag, stringIndex: reader.u2() })
                break

            case 9:
            case 10:
            case 11:
                constantPool.push({
                    tag,
                    classIndex: reader.u2(),
                    nameAndTypeIndex: reader.u2()
                })
                break

            case 12:
                constantPool.push({
                    tag,
                    nameIndex: reader.u2(),
                    descriptorIndex: reader.u2()
                })
                break

            case 15:
                reader.u1()
                reader.u2()
                constantPool.push({ tag, value: null })
                break

            case 16:
                constantPool.push({ tag, descriptorIndex: reader.u2() })
                break

            case 18:
                reader.u2()
                reader.u2()
                constantPool.push({ tag, value: null })
                break

            default:
                throw new Error(`Unsupported constant pool tag ${tag}`)
        }
    }

    const accessFlags = reader.u2()
    const thisClassIndex = reader.u2()
    const superClassIndex = reader.u2()
    const interfaceCount = reader.u2()

    for (let i = 0; i < interfaceCount; i++) {
        reader.u2()
    }

    const fieldCount = reader.u2()
    const fields = []

    for (let i = 0; i < fieldCount; i++) {
        const fieldAccessFlags = reader.u2()
        const nameIndex = reader.u2()
        const descriptorIndex = reader.u2()
        const attributeCount = reader.u2()

        fields.push({
            accessFlags: fieldAccessFlags,
            nameIndex,
            descriptorIndex
        })

        skipMemberAttributes(reader, attributeCount)
    }

    const methodCount = reader.u2()
    const methods = []

    for (let i = 0; i < methodCount; i++) {
        const methodAccessFlags = reader.u2()
        const nameIndex = reader.u2()
        const descriptorIndex = reader.u2()
        const attributeCount = reader.u2()
        let code = null
        let maxLocals = 0
        let maxStack = 0

        for (let j = 0; j < attributeCount; j++) {
            const attributeNameIndex = reader.u2()
            const attributeLength = reader.u4()
            const attributeName = constantPool[attributeNameIndex]?.value

            if (attributeName === "Code") {
                maxStack = reader.u2()
                maxLocals = reader.u2()
                const codeLength = reader.u4()
                const bytes = new Uint8Array(codeLength)

                for (let k = 0; k < codeLength; k++) {
                    bytes[k] = reader.u1()
                }

                code = bytes

                const exceptionTableLength = reader.u2()
                reader.pos += exceptionTableLength * 8

                const codeAttributeCount = reader.u2()
                skipMemberAttributes(reader, codeAttributeCount)
            } else {
                reader.pos += attributeLength
            }
        }

        methods.push({
            accessFlags: methodAccessFlags,
            nameIndex,
            descriptorIndex,
            code,
            maxLocals,
            maxStack
        })
    }

    const classAttributeCount = reader.u2()
    skipMemberAttributes(reader, classAttributeCount)

    const getUtf8 = (index) => constantPool[index]?.value ?? null
    const getClassName = (index) => {
        if (!index) {
            return null
        }

        const entry = constantPool[index]
        return entry?.tag === 7 ? getUtf8(entry.nameIndex) : null
    }

    const resolveNameAndType = (index) => {
        const entry = constantPool[index]

        if (!entry || entry.tag !== 12) {
            throw new Error(`Invalid NameAndType index ${index}`)
        }

        return {
            name: getUtf8(entry.nameIndex),
            descriptor: getUtf8(entry.descriptorIndex)
        }
    }

    const resolveMemberRef = (index) => {
        const entry = constantPool[index]

        if (!entry || ![9, 10, 11].includes(entry.tag)) {
            throw new Error(`Invalid member ref index ${index}`)
        }

        const nameAndType = resolveNameAndType(entry.nameAndTypeIndex)

        return {
            owner: getClassName(entry.classIndex),
            name: nameAndType.name,
            descriptor: nameAndType.descriptor,
            tag: entry.tag
        }
    }

    const resolveConstant = (index) => {
        const entry = constantPool[index]

        if (!entry) {
            return null
        }

        if (entry.tag === 3) {
            return entry.value
        }

        if (entry.tag === 4 || entry.tag === 5 || entry.tag === 6) {
            return entry.value
        }

        if (entry.tag === 8) {
            return getUtf8(entry.stringIndex)
        }

        if (entry.tag === 1) {
            return entry.value
        }

        throw new Error(`Unsupported ldc constant tag ${entry.tag}`)
    }

    const className = getClassName(thisClassIndex)
    const superName = getClassName(superClassIndex)

    return {
        accessFlags,
        className,
        superName,
        constantPool,
        fields: fields.map((field) => ({
            ...field,
            name: getUtf8(field.nameIndex),
            descriptor: getUtf8(field.descriptorIndex),
            isStatic: (field.accessFlags & 0x0008) !== 0
        })),
        methods: methods.map((method) => ({
            ...method,
            className,
            name: getUtf8(method.nameIndex),
            descriptor: getUtf8(method.descriptorIndex),
            isStatic: (method.accessFlags & 0x0008) !== 0
        })),
        getUtf8,
        getClassName,
        resolveNameAndType,
        resolveMemberRef,
        resolveConstant
    }
}
