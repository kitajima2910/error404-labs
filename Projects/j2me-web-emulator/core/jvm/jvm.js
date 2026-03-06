import { ClassLoader } from "./classLoader.js"
import { parseClass } from "./classParser.js"
import { executeMethod } from "./interpreter.js"
import { Display } from "../../emulator/display.js"

function fieldKey(owner, name, descriptor) {
    return `${owner}#${name}#${descriptor}`
}

function methodKey(name, descriptor) {
    return `${name}#${descriptor}`
}

function defaultValue(descriptor) {
    return ["B", "C", "I", "S", "Z"].includes(descriptor?.[0]) ? 0 : null
}

export class JVM {
    constructor(jar) {
        this.jar = jar
        this.loader = new ClassLoader(jar)
        this.classCache = new Map()
        this.classObjects = new Map()
        this.nativeClasses = new Map()
        this.nativeMethods = new Map()
        this.staticFields = new Map()
        this.display = Display.getDisplay(null)

        this.installNatives()
    }

    getMethodArgumentTypes(descriptor) {
        const args = []
        let index = descriptor.indexOf("(") + 1

        while (descriptor[index] !== ")") {
            let start = index

            while (descriptor[index] === "[") {
                index++
            }

            if (descriptor[index] === "L") {
                index = descriptor.indexOf(";", index) + 1
            } else {
                index++
            }

            args.push(descriptor.slice(start, index))
        }

        return args
    }

    getMethodReturnType(descriptor) {
        return descriptor.slice(descriptor.indexOf(")") + 1)
    }

    defineNativeClass(definition) {
        const cls = {
            className: definition.className,
            superName: definition.superName ?? null,
            fields: definition.fields ?? [],
            methods: new Map()
        }

        for (const method of definition.methods ?? []) {
            const runtimeMethod = {
                owner: cls,
                className: cls.className,
                name: method.name,
                descriptor: method.descriptor,
                isStatic: !!method.isStatic,
                isNative: true,
                code: null,
                maxLocals: 0
            }

            cls.methods.set(methodKey(method.name, method.descriptor), runtimeMethod)
            this.nativeMethods.set(
                `${cls.className}#${method.name}#${method.descriptor}`,
                method.impl
            )
        }

        for (const field of cls.fields) {
            if (field.isStatic && field.value !== undefined) {
                this.staticFields.set(
                    fieldKey(cls.className, field.name, field.descriptor),
                    field.value
                )
            }
        }

        this.nativeClasses.set(cls.className, cls)
    }

    installNatives() {
        this.defineNativeClass({
            className: "java/lang/Object",
            methods: [
                { name: "<init>", descriptor: "()V", impl: () => undefined },
                {
                    name: "getClass",
                    descriptor: "()Ljava/lang/Class;",
                    impl: (jvm, self) => jvm.getClassObject(self?.__class?.className)
                },
                { name: "wait", descriptor: "()V", impl: () => undefined },
                { name: "wait", descriptor: "(J)V", impl: () => undefined },
                { name: "wait", descriptor: "(JI)V", impl: () => undefined },
                { name: "notify", descriptor: "()V", impl: () => undefined },
                { name: "notifyAll", descriptor: "()V", impl: () => undefined }
            ]
        })

        this.defineNativeClass({
            className: "java/lang/Class",
            superName: "java/lang/Object",
            methods: [
                { name: "<init>", descriptor: "()V", impl: () => undefined },
                {
                    name: "getName",
                    descriptor: "()Ljava/lang/String;",
                    impl: (_jvm, self) =>
                        String(self?.__nativeData?.targetClassName ?? "").replace(/\//g, ".")
                },
                {
                    name: "toString",
                    descriptor: "()Ljava/lang/String;",
                    impl: (_jvm, self) =>
                        `class ${String(self?.__nativeData?.targetClassName ?? "").replace(/\//g, ".")}`
                },
                {
                    name: "getResourceAsStream",
                    descriptor: "(Ljava/lang/String;)Ljava/io/InputStream;",
                    impl: (jvm, self, [resource]) => jvm.getResourceAsStream(self, resource)
                }
            ]
        })

        this.defineNativeClass({
            className: "java/lang/Number",
            superName: "java/lang/Object",
            methods: [
                { name: "<init>", descriptor: "()V", impl: () => undefined },
                {
                    name: "intValue",
                    descriptor: "()I",
                    impl: (_jvm, self) => self?.__nativeData?.numberValue | 0
                }
            ]
        })

        this.defineNativeClass({
            className: "java/lang/Integer",
            superName: "java/lang/Number",
            methods: [
                {
                    name: "<init>",
                    descriptor: "(I)V",
                    impl: (_jvm, self, [value]) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.numberValue = value | 0
                    }
                },
                {
                    name: "intValue",
                    descriptor: "()I",
                    impl: (_jvm, self) => self?.__nativeData?.numberValue | 0
                },
                {
                    name: "toString",
                    descriptor: "()Ljava/lang/String;",
                    impl: (_jvm, self) => String(self?.__nativeData?.numberValue | 0)
                },
                {
                    name: "toString",
                    descriptor: "(I)Ljava/lang/String;",
                    isStatic: true,
                    impl: (_jvm, _self, [value]) => String(value | 0)
                },
                {
                    name: "valueOf",
                    descriptor: "(I)Ljava/lang/Integer;",
                    isStatic: true,
                    impl: (jvm, _self, [value]) => {
                        const boxed = jvm.newInstance("java/lang/Integer")
                        boxed.__nativeData = boxed.__nativeData ?? {}
                        boxed.__nativeData.numberValue = value | 0
                        return boxed
                    }
                },
                {
                    name: "parseInt",
                    descriptor: "(Ljava/lang/String;)I",
                    isStatic: true,
                    impl: (_jvm, _self, [value]) => {
                        const parsed = Number.parseInt(String(value ?? ""), 10)
                        return Number.isNaN(parsed) ? 0 : parsed | 0
                    }
                },
                {
                    name: "parseInt",
                    descriptor: "(Ljava/lang/String;I)I",
                    isStatic: true,
                    impl: (_jvm, _self, [value, radix]) => {
                        const base = radix | 0
                        const parsed = Number.parseInt(String(value ?? ""), base)
                        return Number.isNaN(parsed) ? 0 : parsed | 0
                    }
                }
            ]
        })

        this.defineNativeClass({
            className: "java/io/PrintStream",
            superName: "java/lang/Object",
            methods: [
                { name: "<init>", descriptor: "()V", impl: () => undefined },
                {
                    name: "print",
                    descriptor: "(Ljava/lang/String;)V",
                    impl: (_jvm, self, [value]) => {
                        const writer = self?.__nativeData?.writer ?? console.log
                        writer(String(value ?? ""))
                    }
                },
                {
                    name: "print",
                    descriptor: "(I)V",
                    impl: (_jvm, self, [value]) => {
                        const writer = self?.__nativeData?.writer ?? console.log
                        writer(String(value | 0))
                    }
                },
                {
                    name: "println",
                    descriptor: "()V",
                    impl: (_jvm, self) => {
                        const writer = self?.__nativeData?.writer ?? console.log
                        writer("")
                    }
                },
                {
                    name: "println",
                    descriptor: "(Ljava/lang/String;)V",
                    impl: (_jvm, self, [value]) => {
                        const writer = self?.__nativeData?.writer ?? console.log
                        writer(String(value ?? ""))
                    }
                },
                {
                    name: "println",
                    descriptor: "(Ljava/lang/Object;)V",
                    impl: (_jvm, self, [value]) => {
                        const writer = self?.__nativeData?.writer ?? console.log
                        writer(String(value ?? "null"))
                    }
                },
                {
                    name: "println",
                    descriptor: "(I)V",
                    impl: (_jvm, self, [value]) => {
                        const writer = self?.__nativeData?.writer ?? console.log
                        writer(String(value | 0))
                    }
                }
            ]
        })

        const normalizeByte = (value) => {
            const v = value | 0
            return v > 127 ? v - 256 : v
        }

        const toByteArray = (arrayRef) => {
            if (!arrayRef?.__isArray || !Array.isArray(arrayRef.elements)) {
                return []
            }
            return arrayRef.elements.map((v) => normalizeByte(v))
        }

        const streamReadByte = (streamObj) => {
            const data = streamObj?.__nativeData
            const bytes = data?.streamBytes
            const pos = data?.streamPos ?? 0

            if (!bytes || pos >= bytes.length) {
                return -1
            }

            data.streamPos = pos + 1
            return bytes[pos]
        }

        this.defineNativeClass({
            className: "java/io/InputStream",
            superName: "java/lang/Object",
            methods: [
                {
                    name: "<init>",
                    descriptor: "()V",
                    impl: (_jvm, self) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.streamBytes = self.__nativeData.streamBytes ?? []
                        self.__nativeData.streamPos = self.__nativeData.streamPos ?? 0
                    }
                },
                {
                    name: "read",
                    descriptor: "()I",
                    impl: (_jvm, self) => {
                        const byte = streamReadByte(self)
                        return byte < 0 ? -1 : byte & 0xff
                    }
                },
                {
                    name: "read",
                    descriptor: "([B)I",
                    impl: (_jvm, self, [buffer]) => {
                        if (!buffer?.__isArray) {
                            return -1
                        }

                        let read = 0
                        for (let i = 0; i < buffer.elements.length; i++) {
                            const byte = streamReadByte(self)
                            if (byte < 0) {
                                break
                            }
                            buffer.elements[i] = byte
                            read++
                        }
                        return read === 0 ? -1 : read
                    }
                },
                {
                    name: "read",
                    descriptor: "([BII)I",
                    impl: (_jvm, self, [buffer, offset, length]) => {
                        if (!buffer?.__isArray) {
                            return -1
                        }

                        const start = offset | 0
                        const count = Math.max(0, length | 0)
                        let read = 0
                        for (let i = 0; i < count; i++) {
                            const byte = streamReadByte(self)
                            if (byte < 0) {
                                break
                            }
                            const idx = start + i
                            if (idx >= 0 && idx < buffer.elements.length) {
                                buffer.elements[idx] = byte
                                read++
                            }
                        }
                        return read === 0 ? -1 : read
                    }
                },
                {
                    name: "available",
                    descriptor: "()I",
                    impl: (_jvm, self) => {
                        const bytes = self?.__nativeData?.streamBytes ?? []
                        const pos = self?.__nativeData?.streamPos ?? 0
                        return Math.max(0, bytes.length - pos) | 0
                    }
                },
                {
                    name: "skip",
                    descriptor: "(J)J",
                    impl: (_jvm, self, [amount]) => {
                        const bytes = self?.__nativeData?.streamBytes ?? []
                        const pos = self?.__nativeData?.streamPos ?? 0
                        const req = Number(amount ?? 0)
                        const skip = Math.max(0, Math.min(bytes.length - pos, Number.isFinite(req) ? req : 0))
                        self.__nativeData.streamPos = pos + skip
                        return skip
                    }
                },
                {
                    name: "close",
                    descriptor: "()V",
                    impl: () => undefined
                }
            ]
        })

        this.defineNativeClass({
            className: "java/io/ByteArrayInputStream",
            superName: "java/io/InputStream",
            methods: [
                {
                    name: "<init>",
                    descriptor: "([B)V",
                    impl: (_jvm, self, [buffer]) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.streamBytes = toByteArray(buffer)
                        self.__nativeData.streamPos = 0
                    }
                },
                {
                    name: "<init>",
                    descriptor: "([BII)V",
                    impl: (_jvm, self, [buffer, offset, length]) => {
                        const bytes = toByteArray(buffer)
                        const start = Math.max(0, offset | 0)
                        const end = Math.max(start, start + Math.max(0, length | 0))
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.streamBytes = bytes.slice(start, end)
                        self.__nativeData.streamPos = 0
                    }
                }
            ]
        })

        this.defineNativeClass({
            className: "java/io/DataInputStream",
            superName: "java/io/InputStream",
            methods: [
                {
                    name: "<init>",
                    descriptor: "(Ljava/io/InputStream;)V",
                    impl: (_jvm, self, [input]) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.input = input ?? null
                    }
                },
                {
                    name: "readInt",
                    descriptor: "()I",
                    impl: (_jvm, self) => {
                        const src = self.__nativeData.input
                        const b1 = streamReadByte(src)
                        const b2 = streamReadByte(src)
                        const b3 = streamReadByte(src)
                        const b4 = streamReadByte(src)
                        if ([b1, b2, b3, b4].some((b) => b < 0)) {
                            return 0
                        }
                        return ((b1 & 0xff) << 24) | ((b2 & 0xff) << 16) | ((b3 & 0xff) << 8) | (b4 & 0xff)
                    }
                },
                {
                    name: "readShort",
                    descriptor: "()S",
                    impl: (_jvm, self) => {
                        const src = self.__nativeData.input
                        const b1 = streamReadByte(src)
                        const b2 = streamReadByte(src)
                        if (b1 < 0 || b2 < 0) {
                            return 0
                        }
                        const value = ((b1 & 0xff) << 8) | (b2 & 0xff)
                        return value > 0x7fff ? value - 0x10000 : value
                    }
                },
                {
                    name: "readUnsignedShort",
                    descriptor: "()I",
                    impl: (_jvm, self) => {
                        const src = self.__nativeData.input
                        const b1 = streamReadByte(src)
                        const b2 = streamReadByte(src)
                        if (b1 < 0 || b2 < 0) {
                            return 0
                        }
                        return ((b1 & 0xff) << 8) | (b2 & 0xff)
                    }
                },
                {
                    name: "readByte",
                    descriptor: "()B",
                    impl: (_jvm, self) => {
                        const b = streamReadByte(self.__nativeData.input)
                        return b < 0 ? -1 : normalizeByte(b)
                    }
                },
                {
                    name: "readUnsignedByte",
                    descriptor: "()I",
                    impl: (_jvm, self) => {
                        const b = streamReadByte(self.__nativeData.input)
                        return b < 0 ? -1 : b & 0xff
                    }
                },
                {
                    name: "readBoolean",
                    descriptor: "()Z",
                    impl: (_jvm, self) => {
                        const b = streamReadByte(self.__nativeData.input)
                        return b > 0 ? 1 : 0
                    }
                },
                {
                    name: "readFully",
                    descriptor: "([B)V",
                    impl: (_jvm, self, [buffer]) => {
                        const src = self.__nativeData.input
                        if (!buffer?.__isArray) {
                            return
                        }
                        for (let i = 0; i < buffer.elements.length; i++) {
                            const b = streamReadByte(src)
                            if (b < 0) {
                                break
                            }
                            buffer.elements[i] = b
                        }
                    }
                },
                {
                    name: "readFully",
                    descriptor: "([BII)V",
                    impl: (_jvm, self, [buffer, offset, length]) => {
                        const src = self.__nativeData.input
                        if (!buffer?.__isArray) {
                            return
                        }
                        const start = offset | 0
                        const count = Math.max(0, length | 0)
                        for (let i = 0; i < count; i++) {
                            const b = streamReadByte(src)
                            if (b < 0) {
                                break
                            }
                            const idx = start + i
                            if (idx >= 0 && idx < buffer.elements.length) {
                                buffer.elements[idx] = b
                            }
                        }
                    }
                },
                {
                    name: "skipBytes",
                    descriptor: "(I)I",
                    impl: (_jvm, self, [amount]) => {
                        const src = self.__nativeData.input
                        const bytes = src?.__nativeData?.streamBytes ?? []
                        const pos = src?.__nativeData?.streamPos ?? 0
                        const req = Math.max(0, amount | 0)
                        const skip = Math.min(req, Math.max(0, bytes.length - pos))
                        if (src?.__nativeData) {
                            src.__nativeData.streamPos = pos + skip
                        }
                        return skip | 0
                    }
                },
                {
                    name: "available",
                    descriptor: "()I",
                    impl: (_jvm, self) => {
                        const src = self.__nativeData.input
                        const bytes = src?.__nativeData?.streamBytes ?? []
                        const pos = src?.__nativeData?.streamPos ?? 0
                        return Math.max(0, bytes.length - pos) | 0
                    }
                },
                {
                    name: "readUTF",
                    descriptor: "()Ljava/lang/String;",
                    impl: () => ""
                },
                {
                    name: "close",
                    descriptor: "()V",
                    impl: () => undefined
                }
            ]
        })

        const systemOut = {
            __class: this.loadClass("java/io/PrintStream"),
            __fields: new Map(),
            __nativeState: {},
            __nativeData: {
                writer: (value) => console.log(value)
            }
        }

        const systemErr = {
            __class: this.loadClass("java/io/PrintStream"),
            __fields: new Map(),
            __nativeState: {},
            __nativeData: {
                writer: (value) => console.error(value)
            }
        }

        this.defineNativeClass({
            className: "java/lang/System",
            superName: "java/lang/Object",
            fields: [
                { name: "out", descriptor: "Ljava/io/PrintStream;", isStatic: true, value: systemOut },
                { name: "err", descriptor: "Ljava/io/PrintStream;", isStatic: true, value: systemErr }
            ],
            methods: [
                {
                    name: "currentTimeMillis",
                    descriptor: "()J",
                    isStatic: true,
                    impl: () => Date.now()
                },
                {
                    name: "nanoTime",
                    descriptor: "()J",
                    isStatic: true,
                    impl: () => Date.now() * 1000000
                },
                {
                    name: "gc",
                    descriptor: "()V",
                    isStatic: true,
                    impl: () => undefined
                },
                {
                    name: "arraycopy",
                    descriptor: "(Ljava/lang/Object;ILjava/lang/Object;II)V",
                    isStatic: true,
                    impl: (_jvm, _self, [src, srcPos, dest, destPos, length]) => {
                        if (!src?.__isArray || !dest?.__isArray) {
                            return
                        }

                        const from = srcPos | 0
                        const to = destPos | 0
                        const count = Math.max(0, length | 0)

                        if (src === dest && to > from) {
                            for (let i = count - 1; i >= 0; i--) {
                                dest.elements[to + i] = src.elements[from + i]
                            }
                            return
                        }

                        for (let i = 0; i < count; i++) {
                            dest.elements[to + i] = src.elements[from + i]
                        }
                    }
                }
            ]
        })

        this.defineNativeClass({
            className: "java/lang/Runnable",
            methods: [{ name: "run", descriptor: "()V", impl: () => undefined }]
        })

        this.defineNativeClass({
            className: "java/lang/Thread",
            superName: "java/lang/Object",
            methods: [
                {
                    name: "<init>",
                    descriptor: "()V",
                    impl: (_jvm, self) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.threadRunnable = null
                    }
                },
                {
                    name: "<init>",
                    descriptor: "(Ljava/lang/Runnable;)V",
                    impl: (_jvm, self, [runnable]) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.threadRunnable = runnable ?? null
                    }
                },
                {
                    name: "start",
                    descriptor: "()V",
                    impl: (jvm, self) => {
                        const target = self.__nativeData?.threadRunnable ?? self

                        // Single-thread runtime: schedule cooperatively on event loop.
                        setTimeout(() => {
                            try {
                                jvm.invokeVirtual(target, "run", "()V")
                            } catch (error) {
                                console.error("Thread.start() failed:", error)
                            }
                        }, 0)
                    }
                },
                { name: "run", descriptor: "()V", impl: () => undefined },
                {
                    name: "sleep",
                    descriptor: "(J)V",
                    isStatic: true,
                    impl: () => undefined
                },
                {
                    name: "yield",
                    descriptor: "()V",
                    isStatic: true,
                    impl: () => undefined
                }
            ]
        })

        this.defineNativeClass({
            className: "java/util/Vector",
            superName: "java/lang/Object",
            methods: [
                {
                    name: "<init>",
                    descriptor: "()V",
                    impl: (_jvm, self) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.vector = []
                    }
                },
                {
                    name: "<init>",
                    descriptor: "(I)V",
                    impl: (_jvm, self) => {
                        self.__nativeData = self.__nativeData ?? {}
                        self.__nativeData.vector = []
                    }
                },
                {
                    name: "addElement",
                    descriptor: "(Ljava/lang/Object;)V",
                    impl: (_jvm, self, [value]) => {
                        self.__nativeData.vector.push(value)
                    }
                },
                {
                    name: "insertElementAt",
                    descriptor: "(Ljava/lang/Object;I)V",
                    impl: (_jvm, self, [value, index]) => {
                        const data = self.__nativeData.vector
                        const safeIndex = Math.max(0, Math.min(data.length, index | 0))
                        data.splice(safeIndex, 0, value)
                    }
                },
                {
                    name: "setElementAt",
                    descriptor: "(Ljava/lang/Object;I)V",
                    impl: (_jvm, self, [value, index]) => {
                        const data = self.__nativeData.vector
                        const i = index | 0
                        if (i >= 0 && i < data.length) {
                            data[i] = value
                        }
                    }
                },
                {
                    name: "elementAt",
                    descriptor: "(I)Ljava/lang/Object;",
                    impl: (_jvm, self, [index]) => {
                        const data = self.__nativeData.vector
                        const i = index | 0
                        return i >= 0 && i < data.length ? data[i] : null
                    }
                },
                {
                    name: "firstElement",
                    descriptor: "()Ljava/lang/Object;",
                    impl: (_jvm, self) => self.__nativeData.vector[0] ?? null
                },
                {
                    name: "lastElement",
                    descriptor: "()Ljava/lang/Object;",
                    impl: (_jvm, self) => {
                        const data = self.__nativeData.vector
                        return data.length ? data[data.length - 1] : null
                    }
                },
                {
                    name: "size",
                    descriptor: "()I",
                    impl: (_jvm, self) => self.__nativeData.vector.length | 0
                },
                {
                    name: "isEmpty",
                    descriptor: "()Z",
                    impl: (_jvm, self) => (self.__nativeData.vector.length === 0 ? 1 : 0)
                },
                {
                    name: "contains",
                    descriptor: "(Ljava/lang/Object;)Z",
                    impl: (_jvm, self, [value]) =>
                        (self.__nativeData.vector.indexOf(value) !== -1 ? 1 : 0)
                },
                {
                    name: "removeElementAt",
                    descriptor: "(I)V",
                    impl: (_jvm, self, [index]) => {
                        const data = self.__nativeData.vector
                        const i = index | 0
                        if (i >= 0 && i < data.length) {
                            data.splice(i, 1)
                        }
                    }
                },
                {
                    name: "removeElement",
                    descriptor: "(Ljava/lang/Object;)Z",
                    impl: (_jvm, self, [value]) => {
                        const data = self.__nativeData.vector
                        const index = data.indexOf(value)

                        if (index === -1) {
                            return 0
                        }

                        data.splice(index, 1)
                        return 1
                    }
                },
                {
                    name: "removeAllElements",
                    descriptor: "()V",
                    impl: (_jvm, self) => {
                        self.__nativeData.vector.length = 0
                    }
                }
            ]
        })

        this.defineNativeClass({
            className: "javax/microedition/midlet/MIDlet",
            superName: "java/lang/Object",
            methods: [{ name: "<init>", descriptor: "()V", impl: () => undefined }]
        })

        this.defineNativeClass({
            className: "javax/microedition/lcdui/Displayable",
            superName: "java/lang/Object",
            methods: [{ name: "<init>", descriptor: "()V", impl: () => undefined }]
        })

        this.defineNativeClass({
            className: "javax/microedition/lcdui/Canvas",
            superName: "javax/microedition/lcdui/Displayable",
            fields: [
                { name: "UP", descriptor: "I", isStatic: true, value: -1 },
                { name: "DOWN", descriptor: "I", isStatic: true, value: -2 },
                { name: "LEFT", descriptor: "I", isStatic: true, value: -3 },
                { name: "RIGHT", descriptor: "I", isStatic: true, value: -4 },
                { name: "FIRE", descriptor: "I", isStatic: true, value: -5 }
            ],
            methods: [
                { name: "<init>", descriptor: "()V", impl: () => undefined },
                { name: "repaint", descriptor: "()V", impl: () => undefined },
                { name: "serviceRepaints", descriptor: "()V", impl: () => undefined },
                {
                    name: "getWidth",
                    descriptor: "()I",
                    impl: () => this.display.screen.width
                },
                {
                    name: "getHeight",
                    descriptor: "()I",
                    impl: () => this.display.screen.height
                },
                {
                    name: "getGameAction",
                    descriptor: "(I)I",
                    impl: (_jvm, _self, [keyCode]) => keyCode
                },
                {
                    name: "setFullScreenMode",
                    descriptor: "(Z)V",
                    impl: () => undefined
                },
                { name: "keyPressed", descriptor: "(I)V", impl: () => undefined },
                { name: "keyReleased", descriptor: "(I)V", impl: () => undefined },
                { name: "paint", descriptor: "(Ljavax/microedition/lcdui/Graphics;)V", impl: () => undefined }
            ]
        })

        this.defineNativeClass({
            className: "javax/microedition/lcdui/game/GameCanvas",
            superName: "javax/microedition/lcdui/Canvas",
            methods: [
                { name: "<init>", descriptor: "(Z)V", impl: () => undefined },
                {
                    name: "getKeyStates",
                    descriptor: "()I",
                    impl: (_jvm, self) => self.__nativeState?.keyState ?? 0
                },
                { name: "flushGraphics", descriptor: "()V", impl: () => undefined }
            ]
        })

        this.defineNativeClass({
            className: "javax/microedition/lcdui/Display",
            superName: "java/lang/Object",
            methods: [
                {
                    name: "getDisplay",
                    descriptor: "(Ljavax/microedition/midlet/MIDlet;)Ljavax/microedition/lcdui/Display;",
                    isStatic: true,
                    impl: () => this.getDisplayObject()
                },
                {
                    name: "setCurrent",
                    descriptor: "(Ljavax/microedition/lcdui/Displayable;)V",
                    impl: (_jvm, _self, [canvas]) => {
                        this.display.setCurrent(this.createCanvasAdapter(canvas))
                    }
                }
            ]
        })

        this.defineNativeClass({
            className: "javax/microedition/lcdui/Graphics",
            superName: "java/lang/Object",
            methods: [
                { name: "<init>", descriptor: "()V", impl: () => undefined },
                {
                    name: "setColor",
                    descriptor: "(I)V",
                    impl: (_jvm, self, [rgb]) => {
                        self.__nativeData.color = `#${(rgb >>> 0).toString(16).padStart(6, "0").slice(-6)}`
                    }
                },
                {
                    name: "setColor",
                    descriptor: "(III)V",
                    impl: (_jvm, self, [r, g, b]) => {
                        self.__nativeData.color = `rgb(${r | 0}, ${g | 0}, ${b | 0})`
                    }
                },
                {
                    name: "fillRect",
                    descriptor: "(IIII)V",
                    impl: (_jvm, self, [x, y, w, h]) => {
                        self.__nativeData.graphics.setColor(self.__nativeData.color)
                        self.__nativeData.graphics.fillRect(x | 0, y | 0, w | 0, h | 0)
                    }
                },
                {
                    name: "drawString",
                    descriptor: "(Ljava/lang/String;III)V",
                    impl: (_jvm, self, [text, x, y]) => {
                        self.__nativeData.graphics.setColor(self.__nativeData.color)
                        self.__nativeData.graphics.drawString(String(text), x | 0, y | 0)
                    }
                }
            ]
        })
    }

    getDisplayObject() {
        if (!this.displayObject) {
            this.displayObject = {
                __class: this.loadClass("javax/microedition/lcdui/Display"),
                __fields: new Map(),
                __nativeData: {}
            }
        }

        return this.displayObject
    }

    loadClass(name) {
        if (this.classCache.has(name)) {
            return this.classCache.get(name)
        }

        if (this.nativeClasses.has(name)) {
            const nativeClass = this.nativeClasses.get(name)
            this.classCache.set(name, nativeClass)
            if (nativeClass.superName) {
                this.loadClass(nativeClass.superName)
            }
            return nativeClass
        }

        const data = this.loader.loadClass(name)
        const parsed = parseClass(data)
        const runtimeClass = {
            ...parsed,
            methods: new Map(
                parsed.methods.map((method) => [
                    methodKey(method.name, method.descriptor),
                    { ...method, owner: null }
                ])
            )
        }

        for (const method of runtimeClass.methods.values()) {
            method.owner = runtimeClass
        }

        this.classCache.set(name, runtimeClass)

        if (runtimeClass.superName) {
            this.loadClass(runtimeClass.superName)
        }

        for (const field of runtimeClass.fields) {
            if (field.isStatic && !this.staticFields.has(fieldKey(name, field.name, field.descriptor))) {
                this.staticFields.set(
                    fieldKey(name, field.name, field.descriptor),
                    defaultValue(field.descriptor)
                )
            }
        }

        return runtimeClass
    }

    getClassObject(className) {
        if (!className) {
            return null
        }

        if (this.classObjects.has(className)) {
            return this.classObjects.get(className)
        }

        const classObject = {
            __class: this.loadClass("java/lang/Class"),
            __fields: new Map(),
            __nativeState: {},
            __nativeData: {
                targetClassName: className
            }
        }

        this.classObjects.set(className, classObject)
        return classObject
    }

    getResourceAsStream(classObject, resourceName) {
        const className = classObject?.__nativeData?.targetClassName ?? ""
        let resource = String(resourceName ?? "")

        if (!resource) {
            return null
        }

        if (resource.startsWith("/")) {
            resource = resource.slice(1)
        } else {
            const slash = className.lastIndexOf("/")
            const prefix = slash === -1 ? "" : `${className.slice(0, slash + 1)}`
            resource = `${prefix}${resource}`
        }

        const data = this.jar[resource]
        if (!data) {
            return null
        }

        const byteArray = {
            __isArray: true,
            componentType: "B",
            elements: Array.from(data, (v) => (v > 127 ? v - 256 : v))
        }

        const stream = this.newInstance("java/io/ByteArrayInputStream")
        this.invokeSpecial(stream, "java/io/ByteArrayInputStream", "<init>", "([B)V", [byteArray])
        return stream
    }

    newInstance(className) {
        const cls = this.loadClass(className)
        const object = {
            __class: cls,
            __fields: new Map(),
            __nativeState: { keyState: 0 },
            __nativeData: null
        }

        this.initializeInstanceFields(object, cls)
        return object
    }

    initializeInstanceFields(object, cls) {
        if (cls.superName) {
            this.initializeInstanceFields(object, this.loadClass(cls.superName))
        }

        for (const field of cls.fields ?? []) {
            if (!field.isStatic) {
                object.__fields.set(
                    fieldKey(cls.className, field.name, field.descriptor),
                    defaultValue(field.descriptor)
                )
            }
        }
    }

    findField(ownerName, name, descriptor) {
        let cls = this.loadClass(ownerName)

        while (cls) {
            const field = (cls.fields ?? []).find(
                (candidate) => candidate.name === name && candidate.descriptor === descriptor
            )

            if (field) {
                return { field, owner: cls.className }
            }

            cls = cls.superName ? this.loadClass(cls.superName) : null
        }

        throw new Error(`Field not found: ${ownerName}.${name}${descriptor}`)
    }

    findMethod(ownerName, name, descriptor, exactOwner = false) {
        let cls = this.loadClass(ownerName)

        while (cls) {
            const found = cls.methods.get(methodKey(name, descriptor))

            if (found) {
                return found
            }

            if (exactOwner) {
                // Some MIDlets emit invokespecial with an owner that doesn't
                // declare the method directly (it is inherited from a parent).
                // Allow superclass fallback for compatibility.
                exactOwner = false
            }

            cls = cls.superName ? this.loadClass(cls.superName) : null
        }

        throw new Error(`Method not found: ${ownerName}.${name}${descriptor}`)
    }

    getField(target, ownerName, name, descriptor) {
        const resolved = this.findField(ownerName, name, descriptor)
        return target.__fields.get(fieldKey(resolved.owner, name, descriptor))
    }

    setField(target, ownerName, name, descriptor, value) {
        const resolved = this.findField(ownerName, name, descriptor)
        target.__fields.set(fieldKey(resolved.owner, name, descriptor), value)
    }

    getStaticField(ownerName, name, descriptor) {
        const resolved = this.findField(ownerName, name, descriptor)
        return this.staticFields.get(fieldKey(resolved.owner, name, descriptor))
    }

    setStaticField(ownerName, name, descriptor, value) {
        const resolved = this.findField(ownerName, name, descriptor)
        this.staticFields.set(fieldKey(resolved.owner, name, descriptor), value)
    }

    invokeMethod(target, method, args) {
        if (method.isNative) {
            const nativeImpl = this.nativeMethods.get(
                `${method.className}#${method.name}#${method.descriptor}`
            )
            return nativeImpl(this, target, args)
        }

        return executeMethod(this, method, target, args)
    }

    invokeVirtual(target, name, descriptor, args = []) {
        if (target == null) {
            if (name === "wait" || name === "notify" || name === "notifyAll") {
                return undefined
            }
            throw new Error(`Null reference in invokevirtual ${name}${descriptor}`)
        }

        const method = this.findMethod(target.__class.className, name, descriptor)
        return this.invokeMethod(target, method, args)
    }

    invokeSpecial(target, ownerName, name, descriptor, args = []) {
        const method = this.findMethod(ownerName, name, descriptor, true)
        return this.invokeMethod(target, method, args)
    }

    invokeStatic(ownerName, name, descriptor, args = []) {
        const method = this.findMethod(ownerName, name, descriptor, true)
        return this.invokeMethod(null, method, args)
    }

    createGraphicsObject(graphics) {
        const object = {
            __class: this.loadClass("javax/microedition/lcdui/Graphics"),
            __fields: new Map(),
            __nativeState: {},
            __nativeData: {
                graphics,
                color: "#ffffff"
            }
        }

        return object
    }

    mapKeyCode(key) {
        switch (key) {
            case "F1":
                return -6
            case "F2":
                return -7
            case "ArrowUp":
                return -1
            case "ArrowDown":
                return -2
            case "ArrowLeft":
                return -3
            case "ArrowRight":
                return -4
            case " ":
            case "Enter":
                return -5
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "*":
            case "#":
                return key.charCodeAt(0)
            default:
                return 0
        }
    }

    updateKeyState(canvasObject, key, isDown) {
        const bit =
            key === "ArrowUp"
                ? 1
                : key === "ArrowDown"
                  ? 2
                  : key === "ArrowLeft"
                    ? 4
                    : key === "ArrowRight"
                      ? 8
                      : key === " " || key === "Enter"
                        ? 16
                        : 0

        if (!bit) {
            return
        }

        const current = canvasObject.__nativeState?.keyState ?? 0
        canvasObject.__nativeState.keyState = isDown ? current | bit : current & ~bit
    }

    createCanvasAdapter(canvasObject) {
        if (canvasObject.__canvasAdapter) {
            return canvasObject.__canvasAdapter
        }

        canvasObject.__canvasAdapter = {
            paint: (graphics) => {
                const graphicsObject = this.createGraphicsObject(graphics)
                this.invokeVirtual(
                    canvasObject,
                    "paint",
                    "(Ljavax/microedition/lcdui/Graphics;)V",
                    [graphicsObject]
                )
            },
            keyPressed: (key) => {
                const code = this.mapKeyCode(key)
                this.updateKeyState(canvasObject, key, true)
                this.invokeVirtual(canvasObject, "keyPressed", "(I)V", [code])
            },
            keyReleased: (key) => {
                const code = this.mapKeyCode(key)
                this.updateKeyState(canvasObject, key, false)
                this.invokeVirtual(canvasObject, "keyReleased", "(I)V", [code])
            }
        }

        return canvasObject.__canvasAdapter
    }

    runMidlet(className) {
        const midlet = this.newInstance(className)
        this.invokeSpecial(midlet, className, "<init>", "()V")
        this.invokeVirtual(midlet, "startApp", "()V")
        return midlet
    }
}
