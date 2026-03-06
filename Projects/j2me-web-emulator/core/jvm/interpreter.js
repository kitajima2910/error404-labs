function signedByte(value) {
    return value > 127 ? value - 256 : value
}

function signedShort(high, low) {
    const value = (high << 8) | low
    return value > 0x7fff ? value - 0x10000 : value
}

function branch(code, pc) {
    return signedShort(code[pc], code[pc + 1])
}

function createJvmArray(length, componentType, initialValue) {
    return {
        __isArray: true,
        componentType,
        elements: new Array(Math.max(0, length | 0)).fill(initialValue)
    }
}

function ensureJvmArray(value) {
    if (!value || !value.__isArray || !Array.isArray(value.elements)) {
        throw new Error("Expected JVM array reference")
    }

    return value
}

export function executeMethod(jvm, method, thisValue, args) {
    if (!method.code) {
        return undefined
    }

    const locals = new Array(Math.max(method.maxLocals, args.length + (method.isStatic ? 0 : 1), 8)).fill(null)
    const stack = []
    let pc = 0

    if (!method.isStatic) {
        locals[0] = thisValue
    }

    for (let i = 0; i < args.length; i++) {
        locals[method.isStatic ? i : i + 1] = args[i]
    }

    while (pc < method.code.length) {
        const op = method.code[pc++]

        switch (op) {
            case 0x00:
                break

            case 0x01:
                stack.push(null)
                break

            case 0x02:
                stack.push(-1)
                break

            case 0x09:
            case 0x0a:
                // lconst_0 / lconst_1
                // Runtime currently stores numeric stack values as JS numbers.
                stack.push(op === 0x09 ? 0 : 1)
                break

            case 0x03:
            case 0x04:
            case 0x05:
            case 0x06:
            case 0x07:
            case 0x08:
                stack.push(op - 0x03)
                break

            case 0x10:
                stack.push(signedByte(method.code[pc++]))
                break

            case 0x11: {
                const value = signedShort(method.code[pc++], method.code[pc++])
                stack.push(value)
                break
            }

            case 0x12:
                stack.push(method.owner.resolveConstant(method.code[pc++]))
                break

            case 0x13: {
                const index = (method.code[pc++] << 8) | method.code[pc++]
                stack.push(method.owner.resolveConstant(index))
                break
            }

            case 0x14: {
                const index = (method.code[pc++] << 8) | method.code[pc++]
                stack.push(method.owner.resolveConstant(index))
                break
            }

            case 0x15:
            case 0x19:
                stack.push(locals[method.code[pc++]])
                break

            case 0x1a:
            case 0x1b:
            case 0x1c:
            case 0x1d:
                stack.push(locals[op - 0x1a])
                break

            case 0x2a:
            case 0x2b:
            case 0x2c:
            case 0x2d:
                stack.push(locals[op - 0x2a])
                break

            case 0x2e:
            case 0x32:
            case 0x33:
            case 0x34:
            case 0x35: {
                const index = stack.pop() | 0
                const arrayRef = ensureJvmArray(stack.pop())
                stack.push(arrayRef.elements[index] ?? 0)
                break
            }

            case 0x36:
            case 0x3a:
                locals[method.code[pc++]] = stack.pop()
                break

            case 0x3b:
            case 0x3c:
            case 0x3d:
            case 0x3e:
                locals[op - 0x3b] = stack.pop()
                break

            case 0x4b:
            case 0x4c:
            case 0x4d:
            case 0x4e:
                locals[op - 0x4b] = stack.pop()
                break

            case 0x4f:
            case 0x53:
            case 0x54:
            case 0x55:
            case 0x56: {
                const value = stack.pop()
                const index = stack.pop() | 0
                const arrayRef = ensureJvmArray(stack.pop())
                arrayRef.elements[index] = value
                break
            }

            case 0x59:
                stack.push(stack[stack.length - 1])
                break

            case 0x57:
                stack.pop()
                break

            case 0x58:
                // pop2
                stack.pop()
                if (stack.length) {
                    stack.pop()
                }
                break

            case 0x60:
                stack.push((stack.pop() | 0) + (stack.pop() | 0))
                break

            case 0x64: {
                const right = stack.pop() | 0
                const left = stack.pop() | 0
                stack.push(left - right)
                break
            }

            case 0x68:
                stack.push((stack.pop() | 0) * (stack.pop() | 0))
                break

            case 0x6c: {
                const divisor = stack.pop() | 0
                const dividend = stack.pop() | 0
                stack.push((dividend / divisor) | 0)
                break
            }

            case 0x78: {
                const shift = (stack.pop() | 0) & 0x1f
                const value = stack.pop() | 0
                stack.push(value << shift)
                break
            }

            case 0x7a: {
                const shift = (stack.pop() | 0) & 0x1f
                const value = stack.pop() | 0
                stack.push(value >> shift)
                break
            }

            case 0x7c: {
                const shift = (stack.pop() | 0) & 0x1f
                const value = stack.pop() | 0
                stack.push(value >>> shift)
                break
            }

            case 0x7e: {
                const right = stack.pop() | 0
                const left = stack.pop() | 0
                stack.push(left & right)
                break
            }

            case 0x80: {
                const right = stack.pop() | 0
                const left = stack.pop() | 0
                stack.push(left | right)
                break
            }

            case 0x82: {
                const right = stack.pop() | 0
                const left = stack.pop() | 0
                stack.push(left ^ right)
                break
            }

            case 0x84: {
                const index = method.code[pc++]
                const increment = signedByte(method.code[pc++])
                locals[index] = ((locals[index] ?? 0) | 0) + increment
                break
            }

            case 0x91: {
                const value = stack.pop() | 0
                const byteValue = (value << 24) >> 24
                stack.push(byteValue)
                break
            }

            case 0x92: {
                const value = stack.pop() | 0
                stack.push(value & 0xffff)
                break
            }

            case 0x93: {
                const value = stack.pop() | 0
                const shortValue = (value << 16) >> 16
                stack.push(shortValue)
                break
            }

            case 0x99: {
                const offset = branch(method.code, pc)
                pc += 2
                if ((stack.pop() | 0) === 0) {
                    pc += offset - 3
                }
                break
            }

            case 0x9a: {
                const offset = branch(method.code, pc)
                pc += 2
                if ((stack.pop() | 0) !== 0) {
                    pc += offset - 3
                }
                break
            }

            case 0x9b:
            case 0x9c:
            case 0x9d:
            case 0x9e: {
                const offset = branch(method.code, pc)
                pc += 2
                const value = stack.pop() | 0
                const matched =
                    (op === 0x9b && value < 0) ||
                    (op === 0x9c && value >= 0) ||
                    (op === 0x9d && value > 0) ||
                    (op === 0x9e && value <= 0)

                if (matched) {
                    pc += offset - 3
                }
                break
            }

            case 0x9f:
            case 0xa0:
            case 0xa1:
            case 0xa2:
            case 0xa3:
            case 0xa4:
            case 0xa5:
            case 0xa6: {
                const offset = branch(method.code, pc)
                pc += 2
                const rightRaw = stack.pop()
                const leftRaw = stack.pop()
                const right = rightRaw | 0
                const left = leftRaw | 0
                const matched =
                    (op === 0x9f && left === right) ||
                    (op === 0xa0 && left !== right) ||
                    (op === 0xa1 && left < right) ||
                    (op === 0xa2 && left >= right) ||
                    (op === 0xa3 && left > right) ||
                    (op === 0xa4 && left <= right) ||
                    (op === 0xa5 && leftRaw === rightRaw) ||
                    (op === 0xa6 && leftRaw !== rightRaw)

                if (matched) {
                    pc += offset - 3
                }
                break
            }

            case 0xa7: {
                const offset = branch(method.code, pc)
                pc += offset - 1
                break
            }

            case 0xc6:
            case 0xc7: {
                const offset = branch(method.code, pc)
                pc += 2
                const value = stack.pop()
                const matched = (op === 0xc6 && value == null) || (op === 0xc7 && value != null)

                if (matched) {
                    pc += offset - 3
                }
                break
            }

            case 0xc2:
            case 0xc3: {
                // monitorenter/monitorexit: single-thread runtime, so treat as no-op.
                // We still consume the objectref from the stack.
                stack.pop()
                break
            }

            case 0xac:
            case 0xb0:
                return stack.pop()

            case 0xb1:
                return undefined

            case 0xb2: {
                const ref = method.owner.resolveMemberRef((method.code[pc++] << 8) | method.code[pc++])
                stack.push(jvm.getStaticField(ref.owner, ref.name, ref.descriptor))
                break
            }

            case 0xb3: {
                const ref = method.owner.resolveMemberRef((method.code[pc++] << 8) | method.code[pc++])
                jvm.setStaticField(ref.owner, ref.name, ref.descriptor, stack.pop())
                break
            }

            case 0xb4: {
                const ref = method.owner.resolveMemberRef((method.code[pc++] << 8) | method.code[pc++])
                const target = stack.pop()
                stack.push(jvm.getField(target, ref.owner, ref.name, ref.descriptor))
                break
            }

            case 0xb5: {
                const ref = method.owner.resolveMemberRef((method.code[pc++] << 8) | method.code[pc++])
                const value = stack.pop()
                const target = stack.pop()
                jvm.setField(target, ref.owner, ref.name, ref.descriptor, value)
                break
            }

            case 0xb6:
            case 0xb7:
            case 0xb8: {
                const ref = method.owner.resolveMemberRef((method.code[pc++] << 8) | method.code[pc++])
                const argTypes = jvm.getMethodArgumentTypes(ref.descriptor)
                const invokeArgs = new Array(argTypes.length)

                for (let i = argTypes.length - 1; i >= 0; i--) {
                    invokeArgs[i] = stack.pop()
                }

                const result =
                    op === 0xb8
                        ? jvm.invokeStatic(ref.owner, ref.name, ref.descriptor, invokeArgs)
                        : (() => {
                              const target = stack.pop()
                              return op === 0xb7
                                  ? jvm.invokeSpecial(target, ref.owner, ref.name, ref.descriptor, invokeArgs)
                                  : jvm.invokeVirtual(target, ref.name, ref.descriptor, invokeArgs)
                          })()

                if (jvm.getMethodReturnType(ref.descriptor) !== "V") {
                    stack.push(result)
                }
                break
            }

            case 0xbb: {
                const classIndex = (method.code[pc++] << 8) | method.code[pc++]
                stack.push(jvm.newInstance(method.owner.getClassName(classIndex)))
                break
            }

            case 0xbc: {
                const count = stack.pop() | 0
                const atype = method.code[pc++]
                const componentType =
                    atype === 4
                        ? "Z"
                        : atype === 5
                          ? "C"
                          : atype === 6
                            ? "F"
                            : atype === 7
                              ? "D"
                              : atype === 8
                                ? "B"
                                : atype === 9
                                  ? "S"
                                  : atype === 10
                                    ? "I"
                                    : atype === 11
                                      ? "J"
                                      : null

                if (!componentType) {
                    throw new Error(`Unsupported newarray atype ${atype}`)
                }

                stack.push(createJvmArray(count, componentType, 0))
                break
            }

            case 0xbd: {
                const count = stack.pop() | 0
                const classIndex = (method.code[pc++] << 8) | method.code[pc++]
                const componentType = `L${method.owner.getClassName(classIndex)};`
                stack.push(createJvmArray(count, componentType, null))
                break
            }

            case 0xbe: {
                const arrayRef = ensureJvmArray(stack.pop())
                stack.push(arrayRef.elements.length | 0)
                break
            }

            default:
                throw new Error(
                    `Unsupported opcode 0x${op.toString(16)} in ${method.className}.${method.name}${method.descriptor}`
                )
        }
    }

    return undefined
}
