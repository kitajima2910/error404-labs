import { ClassLoader } from "./classLoader.js";
import { parseClass } from "./classParser.js";
import { executeMethod } from "./interpreter.js";
import { Display } from "../../emulator/display.js";
import { Graphics as EmulatorGraphics } from "../../emulator/graphics.js";

function fieldKey(owner, name, descriptor) {
  return `${owner}#${name}#${descriptor}`;
}

function methodKey(name, descriptor) {
  return `${name}#${descriptor}`;
}

function defaultValue(descriptor) {
  return ["B", "C", "I", "S", "Z"].includes(descriptor?.[0]) ? 0 : null;
}

export class JVM {
  constructor(jar) {
    this.jar = jar;
    this.loader = new ClassLoader(jar);
    this.classCache = new Map();
    this.classObjects = new Map();
    this.nativeClasses = new Map();
    this.nativeMethods = new Map();
    this.staticFields = new Map();
    this.display = Display.getDisplay(null);

    this.installNatives();
  }

  getMethodArgumentTypes(descriptor) {
    const args = [];
    let index = descriptor.indexOf("(") + 1;

    while (descriptor[index] !== ")") {
      let start = index;

      while (descriptor[index] === "[") {
        index++;
      }

      if (descriptor[index] === "L") {
        index = descriptor.indexOf(";", index) + 1;
      } else {
        index++;
      }

      args.push(descriptor.slice(start, index));
    }

    return args;
  }

  getMethodReturnType(descriptor) {
    return descriptor.slice(descriptor.indexOf(")") + 1);
  }

  defineNativeClass(definition) {
    const cls = {
      className: definition.className,
      superName: definition.superName ?? null,
      fields: definition.fields ?? [],
      methods: new Map(),
    };

    for (const method of definition.methods ?? []) {
      const runtimeMethod = {
        owner: cls,
        className: cls.className,
        name: method.name,
        descriptor: method.descriptor,
        isStatic: !!method.isStatic,
        isNative: true,
        code: null,
        maxLocals: 0,
      };

      cls.methods.set(methodKey(method.name, method.descriptor), runtimeMethod);
      this.nativeMethods.set(
        `${cls.className}#${method.name}#${method.descriptor}`,
        method.impl,
      );
    }

    for (const field of cls.fields) {
      if (field.isStatic && field.value !== undefined) {
        this.staticFields.set(
          fieldKey(cls.className, field.name, field.descriptor),
          field.value,
        );
      }
    }

    this.nativeClasses.set(cls.className, cls);
  }

  installNatives() {
    this.defineNativeClass({
      className: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "getClass",
          descriptor: "()Ljava/lang/Class;",
          impl: (jvm, self) => jvm.getClassObject(self?.__class?.className),
        },
        { name: "wait", descriptor: "()V", impl: () => undefined },
        { name: "wait", descriptor: "(J)V", impl: () => undefined },
        { name: "wait", descriptor: "(JI)V", impl: () => undefined },
        { name: "notify", descriptor: "()V", impl: () => undefined },
        { name: "notifyAll", descriptor: "()V", impl: () => undefined },
      ],
    });

    this.defineNativeClass({
      className: "java/lang/Class",
      superName: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "getName",
          descriptor: "()Ljava/lang/String;",
          impl: (_jvm, self) =>
            String(self?.__nativeData?.targetClassName ?? "").replace(
              /\//g,
              ".",
            ),
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_jvm, self) =>
            `class ${String(self?.__nativeData?.targetClassName ?? "").replace(/\//g, ".")}`,
        },
        {
          name: "getResourceAsStream",
          descriptor: "(Ljava/lang/String;)Ljava/io/InputStream;",
          impl: (jvm, self, [resource]) =>
            jvm.getResourceAsStream(self, resource),
        },
      ],
    });

    this.defineNativeClass({
      className: "java/lang/Number",
      superName: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "intValue",
          descriptor: "()I",
          impl: (_jvm, self) => self?.__nativeData?.numberValue | 0,
        },
      ],
    });

    this.defineNativeClass({
      className: "java/lang/Integer",
      superName: "java/lang/Number",
      methods: [
        {
          name: "<init>",
          descriptor: "(I)V",
          impl: (_jvm, self, [value]) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.numberValue = value | 0;
          },
        },
        {
          name: "intValue",
          descriptor: "()I",
          impl: (_jvm, self) => self?.__nativeData?.numberValue | 0,
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_jvm, self) => String(self?.__nativeData?.numberValue | 0),
        },
        {
          name: "toString",
          descriptor: "(I)Ljava/lang/String;",
          isStatic: true,
          impl: (_jvm, _self, [value]) => String(value | 0),
        },
        {
          name: "valueOf",
          descriptor: "(I)Ljava/lang/Integer;",
          isStatic: true,
          impl: (jvm, _self, [value]) => {
            const boxed = jvm.newInstance("java/lang/Integer");
            boxed.__nativeData = boxed.__nativeData ?? {};
            boxed.__nativeData.numberValue = value | 0;
            return boxed;
          },
        },
        {
          name: "parseInt",
          descriptor: "(Ljava/lang/String;)I",
          isStatic: true,
          impl: (_jvm, _self, [value]) => {
            const parsed = Number.parseInt(String(value ?? ""), 10);
            return Number.isNaN(parsed) ? 0 : parsed | 0;
          },
        },
        {
          name: "parseInt",
          descriptor: "(Ljava/lang/String;I)I",
          isStatic: true,
          impl: (_jvm, _self, [value, radix]) => {
            const base = radix | 0;
            const parsed = Number.parseInt(String(value ?? ""), base);
            return Number.isNaN(parsed) ? 0 : parsed | 0;
          },
        },
      ],
    });

    this.defineNativeClass({
      className: "java/io/PrintStream",
      superName: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "print",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_jvm, self, [value]) => {
            const writer = self?.__nativeData?.writer ?? console.log;
            writer(String(value ?? ""));
          },
        },
        {
          name: "print",
          descriptor: "(I)V",
          impl: (_jvm, self, [value]) => {
            const writer = self?.__nativeData?.writer ?? console.log;
            writer(String(value | 0));
          },
        },
        {
          name: "println",
          descriptor: "()V",
          impl: (_jvm, self) => {
            const writer = self?.__nativeData?.writer ?? console.log;
            writer("");
          },
        },
        {
          name: "println",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_jvm, self, [value]) => {
            const writer = self?.__nativeData?.writer ?? console.log;
            writer(String(value ?? ""));
          },
        },
        {
          name: "println",
          descriptor: "(Ljava/lang/Object;)V",
          impl: (_jvm, self, [value]) => {
            const writer = self?.__nativeData?.writer ?? console.log;
            writer(String(value ?? "null"));
          },
        },
        {
          name: "println",
          descriptor: "(I)V",
          impl: (_jvm, self, [value]) => {
            const writer = self?.__nativeData?.writer ?? console.log;
            writer(String(value | 0));
          },
        },
      ],
    });

    const normalizeByte = (value) => {
      const v = value | 0;
      return v > 127 ? v - 256 : v;
    };

    const toByteArray = (arrayRef) => {
      if (!arrayRef?.__isArray || !Array.isArray(arrayRef.elements)) {
        return [];
      }
      return arrayRef.elements.map((v) => normalizeByte(v));
    };

    const streamReadByte = (streamObj) => {
      const data = streamObj?.__nativeData;
      const bytes = data?.streamBytes;
      const pos = data?.streamPos ?? 0;

      if (!bytes || pos >= bytes.length) {
        return -1;
      }

      data.streamPos = pos + 1;
      return bytes[pos];
    };

    this.defineNativeClass({
      className: "java/io/InputStream",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_jvm, self) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.streamBytes = self.__nativeData.streamBytes ?? [];
            self.__nativeData.streamPos = self.__nativeData.streamPos ?? 0;
          },
        },
        {
          name: "read",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const byte = streamReadByte(self);
            return byte < 0 ? -1 : byte & 0xff;
          },
        },
        {
          name: "read",
          descriptor: "([B)I",
          impl: (_jvm, self, [buffer]) => {
            if (!buffer?.__isArray) {
              return -1;
            }

            let read = 0;
            for (let i = 0; i < buffer.elements.length; i++) {
              const byte = streamReadByte(self);
              if (byte < 0) {
                break;
              }
              buffer.elements[i] = byte;
              read++;
            }
            return read === 0 ? -1 : read;
          },
        },
        {
          name: "read",
          descriptor: "([BII)I",
          impl: (_jvm, self, [buffer, offset, length]) => {
            if (!buffer?.__isArray) {
              return -1;
            }

            const start = offset | 0;
            const count = Math.max(0, length | 0);
            let read = 0;
            for (let i = 0; i < count; i++) {
              const byte = streamReadByte(self);
              if (byte < 0) {
                break;
              }
              const idx = start + i;
              if (idx >= 0 && idx < buffer.elements.length) {
                buffer.elements[idx] = byte;
                read++;
              }
            }
            return read === 0 ? -1 : read;
          },
        },
        {
          name: "available",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const bytes = self?.__nativeData?.streamBytes ?? [];
            const pos = self?.__nativeData?.streamPos ?? 0;
            return Math.max(0, bytes.length - pos) | 0;
          },
        },
        {
          name: "skip",
          descriptor: "(J)J",
          impl: (_jvm, self, [amount]) => {
            const bytes = self?.__nativeData?.streamBytes ?? [];
            const pos = self?.__nativeData?.streamPos ?? 0;
            const req = Number(amount ?? 0);
            const skip = Math.max(
              0,
              Math.min(bytes.length - pos, Number.isFinite(req) ? req : 0),
            );
            self.__nativeData.streamPos = pos + skip;
            return skip;
          },
        },
        {
          name: "close",
          descriptor: "()V",
          impl: () => undefined,
        },
      ],
    });

    this.defineNativeClass({
      className: "java/io/ByteArrayInputStream",
      superName: "java/io/InputStream",
      methods: [
        {
          name: "<init>",
          descriptor: "([B)V",
          impl: (_jvm, self, [buffer]) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.streamBytes = toByteArray(buffer);
            self.__nativeData.streamPos = 0;
          },
        },
        {
          name: "<init>",
          descriptor: "([BII)V",
          impl: (_jvm, self, [buffer, offset, length]) => {
            const bytes = toByteArray(buffer);
            const start = Math.max(0, offset | 0);
            const end = Math.max(start, start + Math.max(0, length | 0));
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.streamBytes = bytes.slice(start, end);
            self.__nativeData.streamPos = 0;
          },
        },
      ],
    });

    this.defineNativeClass({
      className: "java/io/DataInputStream",
      superName: "java/io/InputStream",
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljava/io/InputStream;)V",
          impl: (_jvm, self, [input]) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.input = input ?? null;
          },
        },
        {
          name: "readInt",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const src = self.__nativeData.input;
            const b1 = streamReadByte(src);
            const b2 = streamReadByte(src);
            const b3 = streamReadByte(src);
            const b4 = streamReadByte(src);
            if ([b1, b2, b3, b4].some((b) => b < 0)) {
              return 0;
            }
            return (
              ((b1 & 0xff) << 24) |
              ((b2 & 0xff) << 16) |
              ((b3 & 0xff) << 8) |
              (b4 & 0xff)
            );
          },
        },
        {
          name: "readShort",
          descriptor: "()S",
          impl: (_jvm, self) => {
            const src = self.__nativeData.input;
            const b1 = streamReadByte(src);
            const b2 = streamReadByte(src);
            if (b1 < 0 || b2 < 0) {
              return 0;
            }
            const value = ((b1 & 0xff) << 8) | (b2 & 0xff);
            return value > 0x7fff ? value - 0x10000 : value;
          },
        },
        {
          name: "readUnsignedShort",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const src = self.__nativeData.input;
            const b1 = streamReadByte(src);
            const b2 = streamReadByte(src);
            if (b1 < 0 || b2 < 0) {
              return 0;
            }
            return ((b1 & 0xff) << 8) | (b2 & 0xff);
          },
        },
        {
          name: "readByte",
          descriptor: "()B",
          impl: (_jvm, self) => {
            const b = streamReadByte(self.__nativeData.input);
            return b < 0 ? -1 : normalizeByte(b);
          },
        },
        {
          name: "readUnsignedByte",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const b = streamReadByte(self.__nativeData.input);
            return b < 0 ? -1 : b & 0xff;
          },
        },
        {
          name: "readBoolean",
          descriptor: "()Z",
          impl: (_jvm, self) => {
            const b = streamReadByte(self.__nativeData.input);
            return b > 0 ? 1 : 0;
          },
        },
        {
          name: "readFully",
          descriptor: "([B)V",
          impl: (_jvm, self, [buffer]) => {
            const src = self.__nativeData.input;
            if (!buffer?.__isArray) {
              return;
            }
            for (let i = 0; i < buffer.elements.length; i++) {
              const b = streamReadByte(src);
              if (b < 0) {
                break;
              }
              buffer.elements[i] = b;
            }
          },
        },
        {
          name: "readFully",
          descriptor: "([BII)V",
          impl: (_jvm, self, [buffer, offset, length]) => {
            const src = self.__nativeData.input;
            if (!buffer?.__isArray) {
              return;
            }
            const start = offset | 0;
            const count = Math.max(0, length | 0);
            for (let i = 0; i < count; i++) {
              const b = streamReadByte(src);
              if (b < 0) {
                break;
              }
              const idx = start + i;
              if (idx >= 0 && idx < buffer.elements.length) {
                buffer.elements[idx] = b;
              }
            }
          },
        },
        {
          name: "skipBytes",
          descriptor: "(I)I",
          impl: (_jvm, self, [amount]) => {
            const src = self.__nativeData.input;
            const bytes = src?.__nativeData?.streamBytes ?? [];
            const pos = src?.__nativeData?.streamPos ?? 0;
            const req = Math.max(0, amount | 0);
            const skip = Math.min(req, Math.max(0, bytes.length - pos));
            if (src?.__nativeData) {
              src.__nativeData.streamPos = pos + skip;
            }
            return skip | 0;
          },
        },
        {
          name: "available",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const src = self.__nativeData.input;
            const bytes = src?.__nativeData?.streamBytes ?? [];
            const pos = src?.__nativeData?.streamPos ?? 0;
            return Math.max(0, bytes.length - pos) | 0;
          },
        },
        {
          name: "readUTF",
          descriptor: "()Ljava/lang/String;",
          impl: () => "",
        },
        {
          name: "close",
          descriptor: "()V",
          impl: () => undefined,
        },
      ],
    });

    const systemOut = {
      __class: this.loadClass("java/io/PrintStream"),
      __fields: new Map(),
      __nativeState: {},
      __nativeData: {
        writer: (value) => console.log(value),
      },
    };

    const systemErr = {
      __class: this.loadClass("java/io/PrintStream"),
      __fields: new Map(),
      __nativeState: {},
      __nativeData: {
        writer: (value) => console.error(value),
      },
    };

    this.defineNativeClass({
      className: "java/lang/System",
      superName: "java/lang/Object",
      fields: [
        {
          name: "out",
          descriptor: "Ljava/io/PrintStream;",
          isStatic: true,
          value: systemOut,
        },
        {
          name: "err",
          descriptor: "Ljava/io/PrintStream;",
          isStatic: true,
          value: systemErr,
        },
      ],
      methods: [
        {
          name: "currentTimeMillis",
          descriptor: "()J",
          isStatic: true,
          impl: () => Date.now(),
        },
        {
          name: "nanoTime",
          descriptor: "()J",
          isStatic: true,
          impl: () => Date.now() * 1000000,
        },
        {
          name: "gc",
          descriptor: "()V",
          isStatic: true,
          impl: () => undefined,
        },
        {
          name: "arraycopy",
          descriptor: "(Ljava/lang/Object;ILjava/lang/Object;II)V",
          isStatic: true,
          impl: (_jvm, _self, [src, srcPos, dest, destPos, length]) => {
            if (!src?.__isArray || !dest?.__isArray) {
              return;
            }

            const from = srcPos | 0;
            const to = destPos | 0;
            const count = Math.max(0, length | 0);

            if (src === dest && to > from) {
              for (let i = count - 1; i >= 0; i--) {
                dest.elements[to + i] = src.elements[from + i];
              }
              return;
            }

            for (let i = 0; i < count; i++) {
              dest.elements[to + i] = src.elements[from + i];
            }
          },
        },
      ],
    });

    this.defineNativeClass({
      className: "java/lang/Runnable",
      methods: [{ name: "run", descriptor: "()V", impl: () => undefined }],
    });

    this.defineNativeClass({
      className: "java/lang/Thread",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_jvm, self) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.threadRunnable = null;
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/Runnable;)V",
          impl: (_jvm, self, [runnable]) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.threadRunnable = runnable ?? null;
          },
        },
        {
          name: "start",
          descriptor: "()V",
          impl: (jvm, self) => {
            const target = self.__nativeData?.threadRunnable ?? self;

            // Single-thread runtime: schedule cooperatively on event loop.
            setTimeout(() => {
              try {
                jvm.invokeVirtual(target, "run", "()V");
              } catch (error) {
                console.error("Thread.start() failed:");
                console.error(error && error.stack ? error.stack : error);
              }
            }, 0);
          },
        },
        { name: "run", descriptor: "()V", impl: () => undefined },
        {
          name: "sleep",
          descriptor: "(J)V",
          isStatic: true,
          impl: () => undefined,
        },
        {
          name: "yield",
          descriptor: "()V",
          isStatic: true,
          impl: () => undefined,
        },
      ],
    });

    this.defineNativeClass({
      className: "java/util/Vector",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_jvm, self) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.vector = [];
          },
        },
        {
          name: "<init>",
          descriptor: "(I)V",
          impl: (_jvm, self) => {
            self.__nativeData = self.__nativeData ?? {};
            self.__nativeData.vector = [];
          },
        },
        {
          name: "addElement",
          descriptor: "(Ljava/lang/Object;)V",
          impl: (_jvm, self, [value]) => {
            self.__nativeData.vector.push(value);
          },
        },
        {
          name: "insertElementAt",
          descriptor: "(Ljava/lang/Object;I)V",
          impl: (_jvm, self, [value, index]) => {
            const data = self.__nativeData.vector;
            const safeIndex = Math.max(0, Math.min(data.length, index | 0));
            data.splice(safeIndex, 0, value);
          },
        },
        {
          name: "setElementAt",
          descriptor: "(Ljava/lang/Object;I)V",
          impl: (_jvm, self, [value, index]) => {
            const data = self.__nativeData.vector;
            const i = index | 0;
            if (i >= 0 && i < data.length) {
              data[i] = value;
            }
          },
        },
        {
          name: "elementAt",
          descriptor: "(I)Ljava/lang/Object;",
          impl: (_jvm, self, [index]) => {
            const data = self.__nativeData.vector;
            const i = index | 0;
            return i >= 0 && i < data.length ? data[i] : null;
          },
        },
        {
          name: "firstElement",
          descriptor: "()Ljava/lang/Object;",
          impl: (_jvm, self) => self.__nativeData.vector[0] ?? null,
        },
        {
          name: "lastElement",
          descriptor: "()Ljava/lang/Object;",
          impl: (_jvm, self) => {
            const data = self.__nativeData.vector;
            return data.length ? data[data.length - 1] : null;
          },
        },
        {
          name: "size",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.vector.length | 0,
        },
        {
          name: "isEmpty",
          descriptor: "()Z",
          impl: (_jvm, self) => (self.__nativeData.vector.length === 0 ? 1 : 0),
        },
        {
          name: "contains",
          descriptor: "(Ljava/lang/Object;)Z",
          impl: (_jvm, self, [value]) =>
            self.__nativeData.vector.indexOf(value) !== -1 ? 1 : 0,
        },
        {
          name: "removeElementAt",
          descriptor: "(I)V",
          impl: (_jvm, self, [index]) => {
            const data = self.__nativeData.vector;
            const i = index | 0;
            if (i >= 0 && i < data.length) {
              data.splice(i, 1);
            }
          },
        },
        {
          name: "removeElement",
          descriptor: "(Ljava/lang/Object;)Z",
          impl: (_jvm, self, [value]) => {
            const data = self.__nativeData.vector;
            const index = data.indexOf(value);

            if (index === -1) {
              return 0;
            }

            data.splice(index, 1);
            return 1;
          },
        },
        {
          name: "removeAllElements",
          descriptor: "()V",
          impl: (_jvm, self) => {
            self.__nativeData.vector.length = 0;
          },
        },
      ],
    });

    // --- java/lang/String ---
    this.defineNativeClass({
      className: "java/lang/String",
      superName: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: () => undefined,
        },
        {
          name: "<init>",
          descriptor: "([B)V",
          impl: (_j, self, [arr]) => {
            if (arr?.__isArray) {
              self.__stringValue = arr.elements
                .map((b) => String.fromCharCode(b & 0xff))
                .join("");
            }
          },
        },
        {
          name: "<init>",
          descriptor: "([BII)V",
          impl: (_j, self, [arr, off, len]) => {
            if (arr?.__isArray) {
              self.__stringValue = arr.elements
                .slice(off | 0, (off | 0) + (len | 0))
                .map((b) => String.fromCharCode(b & 0xff))
                .join("");
            }
          },
        },
        {
          name: "<init>",
          descriptor: "([BIII)V",
          impl: (_j, self, [arr, hibyte, off, len]) => {
            if (arr?.__isArray) {
              self.__stringValue = arr.elements
                .slice(off | 0, (off | 0) + (len | 0))
                .map((b) => String.fromCharCode(b & 0xff))
                .join("");
            }
          },
        },
        {
          name: "<init>",
          descriptor: "([C)V",
          impl: (_j, self, [arr]) => {
            if (arr?.__isArray) {
              self.__stringValue = arr.elements
                .map((c) => String.fromCharCode(c))
                .join("");
            }
          },
        },
        {
          name: "<init>",
          descriptor: "([CII)V",
          impl: (_j, self, [arr, off, len]) => {
            if (arr?.__isArray) {
              self.__stringValue = arr.elements
                .slice(off | 0, (off | 0) + (len | 0))
                .map((c) => String.fromCharCode(c))
                .join("");
            }
          },
        },
        {
          name: "length",
          descriptor: "()I",
          impl: (_j, self) => String(self ?? "").length,
        },
        {
          name: "charAt",
          descriptor: "(I)C",
          impl: (_j, self, [i]) => String(self ?? "").charCodeAt(i | 0) || 0,
        },
        {
          name: "indexOf",
          descriptor: "(I)I",
          impl: (_j, self, [ch]) =>
            String(self ?? "").indexOf(String.fromCharCode(ch | 0)),
        },
        {
          name: "indexOf",
          descriptor: "(Ljava/lang/String;)I",
          impl: (_j, self, [s]) => String(self ?? "").indexOf(String(s ?? "")),
        },
        {
          name: "indexOf",
          descriptor: "(II)I",
          impl: (_j, self, [ch, from]) =>
            String(self ?? "").indexOf(String.fromCharCode(ch | 0), from | 0),
        },
        {
          name: "indexOf",
          descriptor: "(Ljava/lang/String;I)I",
          impl: (_j, self, [s, from]) =>
            String(self ?? "").indexOf(String(s ?? ""), from | 0),
        },
        {
          name: "lastIndexOf",
          descriptor: "(I)I",
          impl: (_j, self, [ch]) =>
            String(self ?? "").lastIndexOf(String.fromCharCode(ch | 0)),
        },
        {
          name: "lastIndexOf",
          descriptor: "(Ljava/lang/String;)I",
          impl: (_j, self, [s]) =>
            String(self ?? "").lastIndexOf(String(s ?? "")),
        },
        {
          name: "substring",
          descriptor: "(I)Ljava/lang/String;",
          impl: (_j, self, [b]) => String(self ?? "").substring(b | 0),
        },
        {
          name: "substring",
          descriptor: "(II)Ljava/lang/String;",
          impl: (_j, self, [b, e]) =>
            String(self ?? "").substring(b | 0, e | 0),
        },
        {
          name: "equals",
          descriptor: "(Ljava/lang/Object;)Z",
          impl: (_j, self, [o]) =>
            String(self ?? "") === String(o ?? "") ? 1 : 0,
        },
        {
          name: "equalsIgnoreCase",
          descriptor: "(Ljava/lang/String;)Z",
          impl: (_j, self, [o]) =>
            String(self ?? "").toLowerCase() === String(o ?? "").toLowerCase()
              ? 1
              : 0,
        },
        {
          name: "compareTo",
          descriptor: "(Ljava/lang/String;)I",
          impl: (_j, self, [o]) => {
            const a = String(self ?? ""),
              b = String(o ?? "");
            return a < b ? -1 : a > b ? 1 : 0;
          },
        },
        {
          name: "startsWith",
          descriptor: "(Ljava/lang/String;)Z",
          impl: (_j, self, [p]) =>
            String(self ?? "").startsWith(String(p ?? "")) ? 1 : 0,
        },
        {
          name: "endsWith",
          descriptor: "(Ljava/lang/String;)Z",
          impl: (_j, self, [s]) =>
            String(self ?? "").endsWith(String(s ?? "")) ? 1 : 0,
        },
        {
          name: "toLowerCase",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => String(self ?? "").toLowerCase(),
        },
        {
          name: "toUpperCase",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => String(self ?? "").toUpperCase(),
        },
        {
          name: "trim",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => String(self ?? "").trim(),
        },
        {
          name: "concat",
          descriptor: "(Ljava/lang/String;)Ljava/lang/String;",
          impl: (_j, self, [s]) => String(self ?? "") + String(s ?? ""),
        },
        {
          name: "replace",
          descriptor: "(CC)Ljava/lang/String;",
          impl: (_j, self, [o, n]) =>
            String(self ?? "")
              .split(String.fromCharCode(o | 0))
              .join(String.fromCharCode(n | 0)),
        },
        {
          name: "toCharArray",
          descriptor: "()[C",
          impl: (_j, self) => {
            const s = String(self ?? "");
            return {
              __isArray: true,
              componentType: "C",
              elements: Array.from(s, (c) => c.charCodeAt(0)),
            };
          },
        },
        {
          name: "getBytes",
          descriptor: "()[B",
          impl: (_j, self) => {
            const s = String(self ?? "");
            return {
              __isArray: true,
              componentType: "B",
              elements: Array.from(s, (c) => c.charCodeAt(0) & 0xff),
            };
          },
        },
        {
          name: "getChars",
          descriptor: "(II[CI)V",
          impl: (_j, self, [srcB, srcE, dst, dstB]) => {
            const s = String(self ?? "");
            if (dst?.__isArray) {
              for (let i = srcB | 0; i < (srcE | 0); i++)
                dst.elements[(dstB | 0) + i - (srcB | 0)] = s.charCodeAt(i);
            }
          },
        },
        {
          name: "hashCode",
          descriptor: "()I",
          impl: (_j, self) => {
            const s = String(self ?? "");
            let h = 0;
            for (let i = 0; i < s.length; i++)
              h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
            return h;
          },
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => String(self ?? ""),
        },
        {
          name: "intern",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => String(self ?? ""),
        },
        {
          name: "valueOf",
          descriptor: "(I)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => String(v | 0),
        },
        {
          name: "valueOf",
          descriptor: "(J)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => String(v ?? 0),
        },
        {
          name: "valueOf",
          descriptor: "(C)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => String.fromCharCode(v | 0),
        },
        {
          name: "valueOf",
          descriptor: "(Z)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => (v ? "true" : "false"),
        },
        {
          name: "valueOf",
          descriptor: "(Ljava/lang/Object;)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => String(v ?? "null"),
        },
        {
          name: "valueOf",
          descriptor: "(F)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => String(v ?? 0),
        },
        {
          name: "valueOf",
          descriptor: "(D)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => String(v ?? 0),
        },
      ],
    });

    // --- java/lang/StringBuffer ---
    this.defineNativeClass({
      className: "java/lang/StringBuffer",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { buffer: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(I)V",
          impl: (_j, self) => {
            self.__nativeData = { buffer: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [s]) => {
            self.__nativeData = { buffer: String(s ?? "") };
          },
        },
        {
          name: "append",
          descriptor: "(Ljava/lang/String;)Ljava/lang/StringBuffer;",
          impl: (_j, self, [s]) => {
            self.__nativeData.buffer += String(s ?? "null");
            return self;
          },
        },
        {
          name: "append",
          descriptor: "(I)Ljava/lang/StringBuffer;",
          impl: (_j, self, [v]) => {
            self.__nativeData.buffer += String(v | 0);
            return self;
          },
        },
        {
          name: "append",
          descriptor: "(J)Ljava/lang/StringBuffer;",
          impl: (_j, self, [v]) => {
            self.__nativeData.buffer += String(v ?? 0);
            return self;
          },
        },
        {
          name: "append",
          descriptor: "(C)Ljava/lang/StringBuffer;",
          impl: (_j, self, [c]) => {
            self.__nativeData.buffer += String.fromCharCode(c | 0);
            return self;
          },
        },
        {
          name: "append",
          descriptor: "(Z)Ljava/lang/StringBuffer;",
          impl: (_j, self, [v]) => {
            self.__nativeData.buffer += v ? "true" : "false";
            return self;
          },
        },
        {
          name: "append",
          descriptor: "(Ljava/lang/Object;)Ljava/lang/StringBuffer;",
          impl: (_j, self, [v]) => {
            self.__nativeData.buffer += String(v ?? "null");
            return self;
          },
        },
        {
          name: "append",
          descriptor: "(F)Ljava/lang/StringBuffer;",
          impl: (_j, self, [v]) => {
            self.__nativeData.buffer += String(v ?? 0);
            return self;
          },
        },
        {
          name: "append",
          descriptor: "(D)Ljava/lang/StringBuffer;",
          impl: (_j, self, [v]) => {
            self.__nativeData.buffer += String(v ?? 0);
            return self;
          },
        },
        {
          name: "append",
          descriptor: "([CII)Ljava/lang/StringBuffer;",
          impl: (_j, self, [arr, off, len]) => {
            if (arr?.__isArray) {
              for (let i = off | 0; i < (off | 0) + (len | 0); i++)
                self.__nativeData.buffer += String.fromCharCode(
                  arr.elements[i] | 0,
                );
            }
            return self;
          },
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => self.__nativeData?.buffer ?? "",
        },
        {
          name: "length",
          descriptor: "()I",
          impl: (_j, self) => (self.__nativeData?.buffer ?? "").length,
        },
        {
          name: "charAt",
          descriptor: "(I)C",
          impl: (_j, self, [i]) =>
            (self.__nativeData?.buffer ?? "").charCodeAt(i | 0) || 0,
        },
        {
          name: "delete",
          descriptor: "(II)Ljava/lang/StringBuffer;",
          impl: (_j, self, [s, e]) => {
            const b = self.__nativeData.buffer;
            self.__nativeData.buffer =
              b.substring(0, s | 0) + b.substring(e | 0);
            return self;
          },
        },
        {
          name: "deleteCharAt",
          descriptor: "(I)Ljava/lang/StringBuffer;",
          impl: (_j, self, [i]) => {
            const b = self.__nativeData.buffer;
            self.__nativeData.buffer =
              b.substring(0, i | 0) + b.substring((i | 0) + 1);
            return self;
          },
        },
        {
          name: "insert",
          descriptor: "(ILjava/lang/String;)Ljava/lang/StringBuffer;",
          impl: (_j, self, [i, s]) => {
            const b = self.__nativeData.buffer;
            self.__nativeData.buffer =
              b.substring(0, i | 0) + String(s ?? "") + b.substring(i | 0);
            return self;
          },
        },
        {
          name: "insert",
          descriptor: "(IC)Ljava/lang/StringBuffer;",
          impl: (_j, self, [i, c]) => {
            const b = self.__nativeData.buffer;
            self.__nativeData.buffer =
              b.substring(0, i | 0) +
              String.fromCharCode(c | 0) +
              b.substring(i | 0);
            return self;
          },
        },
        {
          name: "setLength",
          descriptor: "(I)V",
          impl: (_j, self, [len]) => {
            self.__nativeData.buffer = self.__nativeData.buffer
              .substring(0, Math.max(0, len | 0))
              .padEnd(len | 0, "\0");
          },
        },
        {
          name: "reverse",
          descriptor: "()Ljava/lang/StringBuffer;",
          impl: (_j, self) => {
            self.__nativeData.buffer = self.__nativeData.buffer
              .split("")
              .reverse()
              .join("");
            return self;
          },
        },
        {
          name: "setCharAt",
          descriptor: "(IC)V",
          impl: (_j, self, [i, c]) => {
            const b = self.__nativeData.buffer;
            self.__nativeData.buffer =
              b.substring(0, i | 0) +
              String.fromCharCode(c | 0) +
              b.substring((i | 0) + 1);
          },
        },
        {
          name: "getChars",
          descriptor: "(II[CI)V",
          impl: (_j, self, [srcB, srcE, dst, dstB]) => {
            const b = self.__nativeData.buffer;
            if (dst?.__isArray)
              for (let i = srcB | 0; i < (srcE | 0); i++)
                dst.elements[(dstB | 0) + i - (srcB | 0)] = b.charCodeAt(i);
          },
        },
      ],
    });

    // --- java/lang/Math ---
    this.defineNativeClass({
      className: "java/lang/Math",
      superName: "java/lang/Object",
      fields: [
        { name: "PI", descriptor: "D", isStatic: true, value: Math.PI },
        { name: "E", descriptor: "D", isStatic: true, value: Math.E },
      ],
      methods: [
        {
          name: "abs",
          descriptor: "(I)I",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.abs(v | 0),
        },
        {
          name: "abs",
          descriptor: "(J)J",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.abs(Number(v ?? 0)),
        },
        {
          name: "abs",
          descriptor: "(F)F",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.abs(Number(v ?? 0)),
        },
        {
          name: "abs",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.abs(Number(v ?? 0)),
        },
        {
          name: "min",
          descriptor: "(II)I",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.min(a | 0, b | 0),
        },
        {
          name: "max",
          descriptor: "(II)I",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.max(a | 0, b | 0),
        },
        {
          name: "min",
          descriptor: "(JJ)J",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.min(Number(a ?? 0), Number(b ?? 0)),
        },
        {
          name: "max",
          descriptor: "(JJ)J",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.max(Number(a ?? 0), Number(b ?? 0)),
        },
        {
          name: "min",
          descriptor: "(FF)F",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.min(Number(a ?? 0), Number(b ?? 0)),
        },
        {
          name: "max",
          descriptor: "(FF)F",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.max(Number(a ?? 0), Number(b ?? 0)),
        },
        {
          name: "min",
          descriptor: "(DD)D",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.min(Number(a ?? 0), Number(b ?? 0)),
        },
        {
          name: "max",
          descriptor: "(DD)D",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.max(Number(a ?? 0), Number(b ?? 0)),
        },
        {
          name: "sin",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.sin(Number(v ?? 0)),
        },
        {
          name: "cos",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.cos(Number(v ?? 0)),
        },
        {
          name: "tan",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.tan(Number(v ?? 0)),
        },
        {
          name: "sqrt",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.sqrt(Number(v ?? 0)),
        },
        {
          name: "floor",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.floor(Number(v ?? 0)),
        },
        {
          name: "ceil",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.ceil(Number(v ?? 0)),
        },
        {
          name: "round",
          descriptor: "(F)I",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.round(Number(v ?? 0)) | 0,
        },
        {
          name: "round",
          descriptor: "(D)J",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.round(Number(v ?? 0)),
        },
        {
          name: "random",
          descriptor: "()D",
          isStatic: true,
          impl: () => Math.random(),
        },
        {
          name: "pow",
          descriptor: "(DD)D",
          isStatic: true,
          impl: (_j, _s, [a, b]) => Math.pow(Number(a ?? 0), Number(b ?? 0)),
        },
        {
          name: "atan2",
          descriptor: "(DD)D",
          isStatic: true,
          impl: (_j, _s, [y, x]) => Math.atan2(Number(y ?? 0), Number(x ?? 0)),
        },
        {
          name: "atan",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.atan(Number(v ?? 0)),
        },
        {
          name: "asin",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.asin(Number(v ?? 0)),
        },
        {
          name: "acos",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.acos(Number(v ?? 0)),
        },
        {
          name: "log",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.log(Number(v ?? 0)),
        },
        {
          name: "exp",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => Math.exp(Number(v ?? 0)),
        },
        {
          name: "toDegrees",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => (Number(v ?? 0) * 180) / Math.PI,
        },
        {
          name: "toRadians",
          descriptor: "(D)D",
          isStatic: true,
          impl: (_j, _s, [v]) => (Number(v ?? 0) * Math.PI) / 180,
        },
      ],
    });

    // --- java/util/Random ---
    this.defineNativeClass({
      className: "java/util/Random",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { seed: Date.now() };
          },
        },
        {
          name: "<init>",
          descriptor: "(J)V",
          impl: (_j, self, [s]) => {
            self.__nativeData = { seed: Number(s ?? 0) };
          },
        },
        {
          name: "nextInt",
          descriptor: "()I",
          impl: () => (Math.random() * 0xffffffff - 0x80000000) | 0,
        },
        {
          name: "nextInt",
          descriptor: "(I)I",
          impl: (_j, _s, [bound]) =>
            (Math.random() * Math.max(1, bound | 0)) | 0,
        },
        {
          name: "nextLong",
          descriptor: "()J",
          impl: () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        },
        {
          name: "nextFloat",
          descriptor: "()F",
          impl: () => Math.fround(Math.random()),
        },
        { name: "nextDouble", descriptor: "()D", impl: () => Math.random() },
        {
          name: "nextBoolean",
          descriptor: "()Z",
          impl: () => (Math.random() < 0.5 ? 1 : 0),
        },
        {
          name: "setSeed",
          descriptor: "(J)V",
          impl: (_j, self, [s]) => {
            self.__nativeData.seed = Number(s ?? 0);
          },
        },
      ],
    });

    // --- java/util/Hashtable ---
    this.defineNativeClass({
      className: "java/util/Hashtable",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { map: new Map() };
          },
        },
        {
          name: "<init>",
          descriptor: "(I)V",
          impl: (_j, self) => {
            self.__nativeData = { map: new Map() };
          },
        },
        {
          name: "put",
          descriptor:
            "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;",
          impl: (_j, self, [k, v]) => {
            const old = self.__nativeData.map.get(String(k ?? ""));
            self.__nativeData.map.set(String(k ?? ""), v);
            return old ?? null;
          },
        },
        {
          name: "get",
          descriptor: "(Ljava/lang/Object;)Ljava/lang/Object;",
          impl: (_j, self, [k]) =>
            self.__nativeData.map.get(String(k ?? "")) ?? null,
        },
        {
          name: "remove",
          descriptor: "(Ljava/lang/Object;)Ljava/lang/Object;",
          impl: (_j, self, [k]) => {
            const key = String(k ?? "");
            const old = self.__nativeData.map.get(key);
            self.__nativeData.map.delete(key);
            return old ?? null;
          },
        },
        {
          name: "containsKey",
          descriptor: "(Ljava/lang/Object;)Z",
          impl: (_j, self, [k]) =>
            self.__nativeData.map.has(String(k ?? "")) ? 1 : 0,
        },
        {
          name: "size",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData.map.size,
        },
        {
          name: "isEmpty",
          descriptor: "()Z",
          impl: (_j, self) => (self.__nativeData.map.size === 0 ? 1 : 0),
        },
        {
          name: "clear",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData.map.clear();
          },
        },
        {
          name: "keys",
          descriptor: "()Ljava/util/Enumeration;",
          impl: (jvm, self) => {
            const e = jvm.newInstance("java/util/Enumeration");
            e.__nativeData = {
              items: [...self.__nativeData.map.keys()],
              pos: 0,
            };
            return e;
          },
        },
        {
          name: "elements",
          descriptor: "()Ljava/util/Enumeration;",
          impl: (jvm, self) => {
            const e = jvm.newInstance("java/util/Enumeration");
            e.__nativeData = {
              items: [...self.__nativeData.map.values()],
              pos: 0,
            };
            return e;
          },
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) =>
            `{${[...self.__nativeData.map.entries()].map(([k, v]) => `${k}=${v}`).join(", ")}}`,
        },
      ],
    });

    // --- java/util/Enumeration ---
    this.defineNativeClass({
      className: "java/util/Enumeration",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = self.__nativeData ?? { items: [], pos: 0 };
          },
        },
        {
          name: "hasMoreElements",
          descriptor: "()Z",
          impl: (_j, self) =>
            self.__nativeData.pos < self.__nativeData.items.length ? 1 : 0,
        },
        {
          name: "nextElement",
          descriptor: "()Ljava/lang/Object;",
          impl: (_j, self) =>
            self.__nativeData.items[self.__nativeData.pos++] ?? null,
        },
      ],
    });

    // --- java/lang/Long ---
    this.defineNativeClass({
      className: "java/lang/Long",
      superName: "java/lang/Number",
      fields: [
        {
          name: "MIN_VALUE",
          descriptor: "J",
          isStatic: true,
          value: -9223372036854775808,
        },
        {
          name: "MAX_VALUE",
          descriptor: "J",
          isStatic: true,
          value: 9223372036854775807,
        },
      ],
      methods: [
        {
          name: "<init>",
          descriptor: "(J)V",
          impl: (_j, self, [v]) => {
            self.__nativeData = { numberValue: Number(v ?? 0) };
          },
        },
        {
          name: "longValue",
          descriptor: "()J",
          impl: (_j, self) => self.__nativeData?.numberValue ?? 0,
        },
        {
          name: "intValue",
          descriptor: "()I",
          impl: (_j, self) => (self.__nativeData?.numberValue ?? 0) | 0,
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => String(self.__nativeData?.numberValue ?? 0),
        },
        {
          name: "parseLong",
          descriptor: "(Ljava/lang/String;)J",
          isStatic: true,
          impl: (_j, _s, [v]) => {
            const p = parseInt(String(v ?? ""));
            return isNaN(p) ? 0 : p;
          },
        },
        {
          name: "parseLong",
          descriptor: "(Ljava/lang/String;I)J",
          isStatic: true,
          impl: (_j, _s, [v, r]) => {
            const p = parseInt(String(v ?? ""), r | 0);
            return isNaN(p) ? 0 : p;
          },
        },
        {
          name: "toString",
          descriptor: "(J)Ljava/lang/String;",
          isStatic: true,
          impl: (_j, _s, [v]) => String(v ?? 0),
        },
      ],
    });

    // --- java/lang/Boolean ---
    this.defineNativeClass({
      className: "java/lang/Boolean",
      superName: "java/lang/Object",
      fields: [
        {
          name: "TRUE",
          descriptor: "Ljava/lang/Boolean;",
          isStatic: true,
          value: null,
        },
        {
          name: "FALSE",
          descriptor: "Ljava/lang/Boolean;",
          isStatic: true,
          value: null,
        },
      ],
      methods: [
        {
          name: "<init>",
          descriptor: "(Z)V",
          impl: (_j, self, [v]) => {
            self.__nativeData = { value: v ? 1 : 0 };
          },
        },
        {
          name: "booleanValue",
          descriptor: "()Z",
          impl: (_j, self) => self.__nativeData?.value ?? 0,
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => (self.__nativeData?.value ? "true" : "false"),
        },
      ],
    });

    // --- Exception hierarchy ---
    this.defineNativeClass({
      className: "java/lang/Throwable",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { message: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [m]) => {
            self.__nativeData = { message: String(m ?? "") };
          },
        },
        {
          name: "getMessage",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => self.__nativeData?.message ?? "",
        },
        {
          name: "toString",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) =>
            `${self.__class?.className ?? "Throwable"}: ${self.__nativeData?.message ?? ""}`,
        },
        {
          name: "printStackTrace",
          descriptor: "()V",
          impl: (_j, self) =>
            console.error(
              "J2ME:",
              self.__class?.className,
              self.__nativeData?.message,
            ),
        },
      ],
    });
    this.defineNativeClass({
      className: "java/lang/Exception",
      superName: "java/lang/Throwable",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { message: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [m]) => {
            self.__nativeData = { message: String(m ?? "") };
          },
        },
      ],
    });
    this.defineNativeClass({
      className: "java/lang/RuntimeException",
      superName: "java/lang/Exception",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { message: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [m]) => {
            self.__nativeData = { message: String(m ?? "") };
          },
        },
      ],
    });
    this.defineNativeClass({
      className: "java/lang/IllegalArgumentException",
      superName: "java/lang/RuntimeException",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { message: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [m]) => {
            self.__nativeData = { message: String(m ?? "") };
          },
        },
      ],
    });
    this.defineNativeClass({
      className: "java/lang/NullPointerException",
      superName: "java/lang/RuntimeException",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { message: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [m]) => {
            self.__nativeData = { message: String(m ?? "") };
          },
        },
      ],
    });
    this.defineNativeClass({
      className: "java/lang/ArrayIndexOutOfBoundsException",
      superName: "java/lang/RuntimeException",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { message: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [m]) => {
            self.__nativeData = { message: String(m ?? "") };
          },
        },
        {
          name: "<init>",
          descriptor: "(I)V",
          impl: (_j, self, [i]) => {
            self.__nativeData = { message: String(i | 0) };
          },
        },
      ],
    });
    this.defineNativeClass({
      className: "java/io/IOException",
      superName: "java/lang/Exception",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { message: "" };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [m]) => {
            self.__nativeData = { message: String(m ?? "") };
          },
        },
      ],
    });

    // --- java/util/Timer & TimerTask ---
    this.defineNativeClass({
      className: "java/util/TimerTask",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { cancelled: false, timerId: null };
          },
        },
        { name: "run", descriptor: "()V", impl: () => undefined },
        {
          name: "cancel",
          descriptor: "()Z",
          impl: (_j, self) => {
            if (self.__nativeData?.timerId)
              clearInterval(self.__nativeData.timerId);
            self.__nativeData.cancelled = true;
            return 1;
          },
        },
      ],
    });
    this.defineNativeClass({
      className: "java/util/Timer",
      superName: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "schedule",
          descriptor: "(Ljava/util/TimerTask;J)V",
          impl: (jvm, _self, [task, delay]) => {
            setTimeout(
              () => {
                try {
                  jvm.invokeVirtual(task, "run", "()V");
                } catch (e) {
                  console.error("TimerTask error:", e);
                }
              },
              Number(delay ?? 0),
            );
          },
        },
        {
          name: "schedule",
          descriptor: "(Ljava/util/TimerTask;JJ)V",
          impl: (jvm, _self, [task, delay, period]) => {
            const id = setInterval(
              () => {
                if (!task.__nativeData?.cancelled) {
                  try {
                    jvm.invokeVirtual(task, "run", "()V");
                  } catch (e) {
                    console.error("TimerTask error:", e);
                  }
                } else {
                  clearInterval(id);
                }
              },
              Number(period ?? 100),
            );
            task.__nativeData = task.__nativeData ?? {};
            task.__nativeData.timerId = id;
            if (Number(delay ?? 0) > 0) {
              setTimeout(() => {}, Number(delay));
            }
          },
        },
        { name: "cancel", descriptor: "()V", impl: () => undefined },
      ],
    });

    // --- java/lang/Short ---
    this.defineNativeClass({
      className: "java/lang/Short",
      superName: "java/lang/Number",
      methods: [
        {
          name: "<init>",
          descriptor: "(S)V",
          impl: (_j, self, [v]) => {
            self.__nativeData = { numberValue: (v << 16) >> 16 };
          },
        },
        {
          name: "shortValue",
          descriptor: "()S",
          impl: (_j, self) => self.__nativeData?.numberValue ?? 0,
        },
        {
          name: "parseShort",
          descriptor: "(Ljava/lang/String;)S",
          isStatic: true,
          impl: (_j, _s, [v]) => {
            const p = parseInt(String(v ?? ""));
            return isNaN(p) ? 0 : (p << 16) >> 16;
          },
        },
      ],
    });

    // --- java/lang/Byte ---
    this.defineNativeClass({
      className: "java/lang/Byte",
      superName: "java/lang/Number",
      methods: [
        {
          name: "<init>",
          descriptor: "(B)V",
          impl: (_j, self, [v]) => {
            self.__nativeData = { numberValue: (v << 24) >> 24 };
          },
        },
        {
          name: "byteValue",
          descriptor: "()B",
          impl: (_j, self) => self.__nativeData?.numberValue ?? 0,
        },
      ],
    });

    // --- java/lang/Character ---
    this.defineNativeClass({
      className: "java/lang/Character",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "(C)V",
          impl: (_j, self, [c]) => {
            self.__nativeData = { charValue: c | 0 };
          },
        },
        {
          name: "charValue",
          descriptor: "()C",
          impl: (_j, self) => self.__nativeData?.charValue ?? 0,
        },
        {
          name: "isDigit",
          descriptor: "(C)Z",
          isStatic: true,
          impl: (_j, _s, [c]) => (c >= 48 && c <= 57 ? 1 : 0),
        },
        {
          name: "isLetter",
          descriptor: "(C)Z",
          isStatic: true,
          impl: (_j, _s, [c]) =>
            (c >= 65 && c <= 90) || (c >= 97 && c <= 122) ? 1 : 0,
        },
        {
          name: "isLowerCase",
          descriptor: "(C)Z",
          isStatic: true,
          impl: (_j, _s, [c]) => (c >= 97 && c <= 122 ? 1 : 0),
        },
        {
          name: "isUpperCase",
          descriptor: "(C)Z",
          isStatic: true,
          impl: (_j, _s, [c]) => (c >= 65 && c <= 90 ? 1 : 0),
        },
        {
          name: "toLowerCase",
          descriptor: "(C)C",
          isStatic: true,
          impl: (_j, _s, [c]) =>
            String.fromCharCode(c | 0)
              .toLowerCase()
              .charCodeAt(0),
        },
        {
          name: "toUpperCase",
          descriptor: "(C)C",
          isStatic: true,
          impl: (_j, _s, [c]) =>
            String.fromCharCode(c | 0)
              .toUpperCase()
              .charCodeAt(0),
        },
      ],
    });

    // --- javax/microedition/rms/RecordStore ---
    this.defineNativeClass({
      className: "javax/microedition/rms/RecordStore",
      superName: "java/lang/Object",
      methods: [
        {
          name: "openRecordStore",
          descriptor:
            "(Ljava/lang/String;Z)Ljavax/microedition/rms/RecordStore;",
          isStatic: true,
          impl: (jvm) => {
            const rs = jvm.newInstance("javax/microedition/rms/RecordStore");
            rs.__nativeData = { records: [], name: "" };
            return rs;
          },
        },
        { name: "closeRecordStore", descriptor: "()V", impl: () => undefined },
        {
          name: "addRecord",
          descriptor: "([BII)I",
          impl: (_j, self, [data, off, len]) => {
            const rec = data?.__isArray
              ? data.elements.slice(off | 0, (off | 0) + (len | 0))
              : [];
            self.__nativeData.records.push(rec);
            return self.__nativeData.records.length;
          },
        },
        {
          name: "getRecord",
          descriptor: "(I)[B",
          impl: (_j, self, [id]) => {
            const rec = self.__nativeData.records[(id | 0) - 1];
            return rec
              ? { __isArray: true, componentType: "B", elements: [...rec] }
              : null;
          },
        },
        {
          name: "setRecord",
          descriptor: "(I[BII)V",
          impl: (_j, self, [id, data, off, len]) => {
            if (data?.__isArray)
              self.__nativeData.records[(id | 0) - 1] = data.elements.slice(
                off | 0,
                (off | 0) + (len | 0),
              );
          },
        },
        {
          name: "deleteRecord",
          descriptor: "(I)V",
          impl: (_j, self, [id]) => {
            self.__nativeData.records[(id | 0) - 1] = null;
          },
        },
        {
          name: "getNumRecords",
          descriptor: "()I",
          impl: (_j, self) =>
            self.__nativeData.records.filter((r) => r !== null).length,
        },
        {
          name: "getRecordSize",
          descriptor: "(I)I",
          impl: (_j, self, [id]) =>
            (self.__nativeData.records[(id | 0) - 1] ?? []).length,
        },
        {
          name: "deleteRecordStore",
          descriptor: "(Ljava/lang/String;)V",
          isStatic: true,
          impl: () => undefined,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/midlet/MIDlet",
      superName: "java/lang/Object",
      methods: [{ name: "<init>", descriptor: "()V", impl: () => undefined }],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/Displayable",
      superName: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "addCommand",
          descriptor: "(Ljavax/microedition/lcdui/Command;)V",
          impl: () => undefined,
        },
        {
          name: "removeCommand",
          descriptor: "(Ljavax/microedition/lcdui/Command;)V",
          impl: () => undefined,
        },
        {
          name: "setCommandListener",
          descriptor: "(Ljavax/microedition/lcdui/CommandListener;)V",
          impl: () => undefined,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/Canvas",
      superName: "javax/microedition/lcdui/Displayable",
      fields: [
        { name: "UP", descriptor: "I", isStatic: true, value: -1 },
        { name: "DOWN", descriptor: "I", isStatic: true, value: -2 },
        { name: "LEFT", descriptor: "I", isStatic: true, value: -3 },
        { name: "RIGHT", descriptor: "I", isStatic: true, value: -4 },
        { name: "FIRE", descriptor: "I", isStatic: true, value: -5 },
      ],
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        { name: "repaint", descriptor: "()V", impl: () => undefined },
        { name: "serviceRepaints", descriptor: "()V", impl: () => undefined },
        {
          name: "getWidth",
          descriptor: "()I",
          impl: () => this.display.screen.width,
        },
        {
          name: "getHeight",
          descriptor: "()I",
          impl: () => this.display.screen.height,
        },
        {
          name: "getGameAction",
          descriptor: "(I)I",
          impl: (_jvm, _self, [keyCode]) => keyCode,
        },
        {
          name: "setFullScreenMode",
          descriptor: "(Z)V",
          impl: () => undefined,
        },
        { name: "keyPressed", descriptor: "(I)V", impl: () => undefined },
        { name: "keyReleased", descriptor: "(I)V", impl: () => undefined },
        {
          name: "paint",
          descriptor: "(Ljavax/microedition/lcdui/Graphics;)V",
          impl: () => undefined,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/game/GameCanvas",
      superName: "javax/microedition/lcdui/Canvas",
      methods: [
        { name: "<init>", descriptor: "(Z)V", impl: () => undefined },
        {
          name: "getGraphics",
          descriptor: "()Ljavax/microedition/lcdui/Graphics;",
          impl: (jvm, _self) => {
            const g = new EmulatorGraphics(jvm.display.ctx);
            return jvm.createGraphicsObject(g);
          },
        },
        {
          name: "getKeyStates",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeState?.keyState ?? 0,
        },
        { name: "flushGraphics", descriptor: "()V", impl: () => undefined },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/Display",
      superName: "java/lang/Object",
      methods: [
        {
          name: "getDisplay",
          descriptor:
            "(Ljavax/microedition/midlet/MIDlet;)Ljavax/microedition/lcdui/Display;",
          isStatic: true,
          impl: () => this.getDisplayObject(),
        },
        {
          name: "setCurrent",
          descriptor: "(Ljavax/microedition/lcdui/Displayable;)V",
          impl: (_jvm, _self, [canvas]) => {
            this.display.setCurrent(this.createCanvasAdapter(canvas));
          },
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/Font",
      superName: "java/lang/Object",
      fields: [
        { name: "STYLE_PLAIN", descriptor: "I", isStatic: true, value: 0 },
        { name: "STYLE_BOLD", descriptor: "I", isStatic: true, value: 1 },
        { name: "STYLE_ITALIC", descriptor: "I", isStatic: true, value: 2 },
        { name: "STYLE_UNDERLINED", descriptor: "I", isStatic: true, value: 4 },
        { name: "SIZE_SMALL", descriptor: "I", isStatic: true, value: 8 },
        { name: "SIZE_MEDIUM", descriptor: "I", isStatic: true, value: 0 },
        { name: "SIZE_LARGE", descriptor: "I", isStatic: true, value: 16 },
        { name: "FACE_SYSTEM", descriptor: "I", isStatic: true, value: 0 },
        { name: "FACE_MONOSPACE", descriptor: "I", isStatic: true, value: 32 },
        {
          name: "FACE_PROPORTIONAL",
          descriptor: "I",
          isStatic: true,
          value: 64,
        },
      ],
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = { size: 12, style: 0, face: "monospace" };
          },
        },
        {
          name: "getFont",
          descriptor: "(III)Ljavax/microedition/lcdui/Font;",
          isStatic: true,
          impl: (jvm, _s, [face, style, size]) => {
            const f = jvm.newInstance("javax/microedition/lcdui/Font");
            const sz = size & 16 ? 16 : size & 8 ? 10 : 12;
            f.__nativeData = {
              size: sz,
              style: style | 0,
              face: face & 32 ? "monospace" : "sans-serif",
            };
            return f;
          },
        },
        {
          name: "getDefaultFont",
          descriptor: "()Ljavax/microedition/lcdui/Font;",
          isStatic: true,
          impl: (jvm) => {
            const f = jvm.newInstance("javax/microedition/lcdui/Font");
            f.__nativeData = { size: 12, style: 0, face: "monospace" };
            return f;
          },
        },
        {
          name: "getHeight",
          descriptor: "()I",
          impl: (_j, self) => (self.__nativeData?.size ?? 12) + 4,
        },
        {
          name: "getSize",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.size ?? 12,
        },
        {
          name: "getStyle",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.style ?? 0,
        },
        { name: "getFace", descriptor: "()I", impl: () => 0 },
        {
          name: "isBold",
          descriptor: "()Z",
          impl: (_j, self) => (self.__nativeData?.style & 1 ? 1 : 0),
        },
        {
          name: "isItalic",
          descriptor: "()Z",
          impl: (_j, self) => (self.__nativeData?.style & 2 ? 1 : 0),
        },
        {
          name: "isPlain",
          descriptor: "()Z",
          impl: (_j, self) => (self.__nativeData?.style === 0 ? 1 : 0),
        },
        {
          name: "stringWidth",
          descriptor: "(Ljava/lang/String;)I",
          impl: (_j, self) => {
            const s = String(arguments[2]?.[0] ?? "");
            return (s.length * (self.__nativeData?.size ?? 12) * 0.6) | 0;
          },
        },
        {
          name: "charWidth",
          descriptor: "(C)I",
          impl: (_j, self) => ((self.__nativeData?.size ?? 12) * 0.6) | 0,
        },
        {
          name: "charsWidth",
          descriptor: "([CII)I",
          impl: (_j, self, [_arr, _off, len]) =>
            ((len | 0) * (self.__nativeData?.size ?? 12) * 0.6) | 0,
        },
        {
          name: "substringWidth",
          descriptor: "(Ljava/lang/String;II)I",
          impl: (_j, self, [_s, _off, len]) =>
            ((len | 0) * (self.__nativeData?.size ?? 12) * 0.6) | 0,
        },
        {
          name: "getBaselinePosition",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.size ?? 12,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/Image",
      superName: "java/lang/Object",
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "createImage",
          descriptor: "(Ljava/lang/String;)Ljavax/microedition/lcdui/Image;",
          isStatic: true,
          impl: (jvm, _s, [path]) => {
            return jvm.loadImageFromJar(String(path ?? ""));
          },
        },
        {
          name: "createImage",
          descriptor: "(II)Ljavax/microedition/lcdui/Image;",
          isStatic: true,
          impl: (jvm, _s, [w, h]) => {
            const img = jvm.newInstance("javax/microedition/lcdui/Image");
            const canvas = new OffscreenCanvas(w | 0, h | 0);
            img.__nativeData = {
              canvas,
              ctx: canvas.getContext("2d"),
              width: w | 0,
              height: h | 0,
              mutable: true,
            };
            return img;
          },
        },
        {
          name: "createImage",
          descriptor: "([BII)Ljavax/microedition/lcdui/Image;",
          isStatic: true,
          impl: (jvm, _s, [data, off, len]) => {
            return jvm.loadImageFromBytes(data, off | 0, len | 0);
          },
        },
        {
          name: "createImage",
          descriptor:
            "(Ljavax/microedition/lcdui/Image;IIIIZ)Ljavax/microedition/lcdui/Image;",
          isStatic: true,
          impl: (jvm, _s, [srcImg, x, y, w, h, transform]) => {
            const img = jvm.newInstance("javax/microedition/lcdui/Image");
            const canvas = new OffscreenCanvas(w | 0, h | 0);
            const ctx = canvas.getContext("2d");
            const src = srcImg?.__nativeData?.canvas;
            if (src) {
              try {
                ctx.drawImage(
                  src,
                  x | 0,
                  y | 0,
                  w | 0,
                  h | 0,
                  0,
                  0,
                  w | 0,
                  h | 0,
                );
              } catch (e) {}
            }
            img.__nativeData = {
              canvas,
              ctx,
              width: w | 0,
              height: h | 0,
              mutable: false,
            };
            return img;
          },
        },
        {
          name: "createImage",
          descriptor: "(Ljava/io/InputStream;)Ljavax/microedition/lcdui/Image;",
          isStatic: true,
          impl: (jvm, _s, [stream]) => {
            // Read all bytes from stream and create image
            const bytes = stream?.__nativeData?.streamBytes ?? [];
            const pos = stream?.__nativeData?.streamPos ?? 0;
            const remaining = bytes.slice(pos);
            const arr = {
              __isArray: true,
              componentType: "B",
              elements: remaining,
            };
            return jvm.loadImageFromBytes(arr, 0, remaining.length);
          },
        },
        {
          name: "getWidth",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.width ?? 0,
        },
        {
          name: "getHeight",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.height ?? 0,
        },
        {
          name: "getGraphics",
          descriptor: "()Ljavax/microedition/lcdui/Graphics;",
          impl: (jvm, self) => {
            if (!self.__nativeData?.mutable) return null;
            const g = new EmulatorGraphics(self.__nativeData.ctx);
            return jvm.createGraphicsObject(g);
          },
        },
        {
          name: "isMutable",
          descriptor: "()Z",
          impl: (_j, self) => (self.__nativeData?.mutable ? 1 : 0),
        },
        {
          name: "getRGB",
          descriptor: "([IIIIIII)V",
          impl: (
            _j,
            self,
            [rgbData, offset, scanlength, x, y, width, height],
          ) => {
            if (!rgbData?.__isArray || !self.__nativeData?.ctx) return;
            try {
              const imageData = self.__nativeData.ctx.getImageData(
                x | 0,
                y | 0,
                width | 0,
                height | 0,
              );
              const data = imageData.data;
              for (let row = 0; row < (height | 0); row++) {
                for (let col = 0; col < (width | 0); col++) {
                  const srcIdx = (row * (width | 0) + col) * 4;
                  const a = data[srcIdx + 3],
                    r = data[srcIdx],
                    g = data[srcIdx + 1],
                    b = data[srcIdx + 2];
                  rgbData.elements[
                    (offset | 0) + row * (scanlength | 0) + col
                  ] = (a << 24) | (r << 16) | (g << 8) | b | 0;
                }
              }
            } catch (e) {}
          },
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/Graphics",
      superName: "java/lang/Object",
      fields: [
        { name: "TOP", descriptor: "I", isStatic: true, value: 0 },
        { name: "BOTTOM", descriptor: "I", isStatic: true, value: 32 },
        { name: "LEFT", descriptor: "I", isStatic: true, value: 0 },
        { name: "RIGHT", descriptor: "I", isStatic: true, value: 8 },
        { name: "HCENTER", descriptor: "I", isStatic: true, value: 1 },
        { name: "VCENTER", descriptor: "I", isStatic: true, value: 2 },
        { name: "BASELINE", descriptor: "I", isStatic: true, value: 64 },
        { name: "SOLID", descriptor: "I", isStatic: true, value: 0 },
        { name: "DOTTED", descriptor: "I", isStatic: true, value: 1 },
      ],
      methods: [
        { name: "<init>", descriptor: "()V", impl: () => undefined },
        {
          name: "setColor",
          descriptor: "(I)V",
          impl: (_jvm, self, [rgb]) => {
            self.__nativeData.color = `#${(rgb >>> 0).toString(16).padStart(6, "0").slice(-6)}`;
            self.__nativeData.graphics.setColor(self.__nativeData.color);
          },
        },
        {
          name: "setColor",
          descriptor: "(III)V",
          impl: (_jvm, self, [r, g, b]) => {
            self.__nativeData.color = `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
            self.__nativeData.graphics.setColor(self.__nativeData.color);
          },
        },
        {
          name: "getColor",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const c = self.__nativeData.color || "#000000";
            if (c.startsWith("#")) return parseInt(c.slice(1), 16) | 0;
            return 0;
          },
        },
        {
          name: "getRedComponent",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const c = self.__nativeData.color || "#000000";
            if (c.startsWith("#"))
              return (parseInt(c.slice(1), 16) >> 16) & 0xff;
            return 0;
          },
        },
        {
          name: "getGreenComponent",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const c = self.__nativeData.color || "#000000";
            if (c.startsWith("#"))
              return (parseInt(c.slice(1), 16) >> 8) & 0xff;
            return 0;
          },
        },
        {
          name: "getBlueComponent",
          descriptor: "()I",
          impl: (_jvm, self) => {
            const c = self.__nativeData.color || "#000000";
            if (c.startsWith("#")) return parseInt(c.slice(1), 16) & 0xff;
            return 0;
          },
        },
        {
          name: "fillRect",
          descriptor: "(IIII)V",
          impl: (_jvm, self, [x, y, w, h]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.fillRect(x | 0, y | 0, w | 0, h | 0);
          },
        },
        {
          name: "drawRect",
          descriptor: "(IIII)V",
          impl: (_jvm, self, [x, y, w, h]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.drawRect(x | 0, y | 0, w | 0, h | 0);
          },
        },
        {
          name: "drawLine",
          descriptor: "(IIII)V",
          impl: (_jvm, self, [x1, y1, x2, y2]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.drawLine(x1 | 0, y1 | 0, x2 | 0, y2 | 0);
          },
        },
        {
          name: "drawString",
          descriptor: "(Ljava/lang/String;III)V",
          impl: (_jvm, self, [text, x, y, anchor]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.drawString(
              String(text ?? ""),
              x | 0,
              y | 0,
              anchor | 0,
            );
          },
        },
        {
          name: "drawSubstring",
          descriptor: "(Ljava/lang/String;IIIII)V",
          impl: (_jvm, self, [text, off, len, x, y, anchor]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.drawSubstring(
              String(text ?? ""),
              off | 0,
              len | 0,
              x | 0,
              y | 0,
              anchor | 0,
            );
          },
        },
        {
          name: "drawChar",
          descriptor: "(CIII)V",
          impl: (_jvm, self, [ch, x, y, anchor]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.drawChar(
              ch | 0,
              x | 0,
              y | 0,
              anchor | 0,
            );
          },
        },
        {
          name: "drawImage",
          descriptor: "(Ljavax/microedition/lcdui/Image;III)V",
          impl: (_jvm, self, [img, x, y, anchor]) => {
            if (img?.__nativeData?.canvas) {
              self.__nativeData.graphics.drawImage(
                img.__nativeData,
                x | 0,
                y | 0,
                anchor | 0,
              );
            }
          },
        },
        {
          name: "drawRegion",
          descriptor: "(Ljavax/microedition/lcdui/Image;IIIIIII)V",
          impl: (
            _jvm,
            self,
            [img, srcX, srcY, srcW, srcH, transform, destX, destY, anchor],
          ) => {
            if (img?.__nativeData?.canvas) {
              self.__nativeData.graphics.drawRegion(
                img.__nativeData,
                srcX | 0,
                srcY | 0,
                srcW | 0,
                srcH | 0,
                transform | 0,
                destX | 0,
                destY | 0,
                anchor | 0,
              );
            }
          },
        },
        {
          name: "drawArc",
          descriptor: "(IIIIII)V",
          impl: (_jvm, self, [x, y, w, h, sa, aa]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.drawArc(
              x | 0,
              y | 0,
              w | 0,
              h | 0,
              sa | 0,
              aa | 0,
            );
          },
        },
        {
          name: "fillArc",
          descriptor: "(IIIIII)V",
          impl: (_jvm, self, [x, y, w, h, sa, aa]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.fillArc(
              x | 0,
              y | 0,
              w | 0,
              h | 0,
              sa | 0,
              aa | 0,
            );
          },
        },
        {
          name: "fillTriangle",
          descriptor: "(IIIIII)V",
          impl: (_jvm, self, [x1, y1, x2, y2, x3, y3]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.fillTriangle(
              x1 | 0,
              y1 | 0,
              x2 | 0,
              y2 | 0,
              x3 | 0,
              y3 | 0,
            );
          },
        },
        {
          name: "drawRoundRect",
          descriptor: "(IIIIII)V",
          impl: (_jvm, self, [x, y, w, h, aw, ah]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.drawRoundRect(
              x | 0,
              y | 0,
              w | 0,
              h | 0,
              aw | 0,
              ah | 0,
            );
          },
        },
        {
          name: "fillRoundRect",
          descriptor: "(IIIIII)V",
          impl: (_jvm, self, [x, y, w, h, aw, ah]) => {
            self.__nativeData.graphics.setColor(self.__nativeData.color);
            self.__nativeData.graphics.fillRoundRect(
              x | 0,
              y | 0,
              w | 0,
              h | 0,
              aw | 0,
              ah | 0,
            );
          },
        },
        {
          name: "setClip",
          descriptor: "(IIII)V",
          impl: (_jvm, self, [x, y, w, h]) => {
            self.__nativeData.graphics.setClip(x | 0, y | 0, w | 0, h | 0);
          },
        },
        {
          name: "clipRect",
          descriptor: "(IIII)V",
          impl: (_jvm, self, [x, y, w, h]) => {
            self.__nativeData.graphics.clipRect(x | 0, y | 0, w | 0, h | 0);
          },
        },
        {
          name: "getClipX",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.graphics.getClipX(),
        },
        {
          name: "getClipY",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.graphics.getClipY(),
        },
        {
          name: "getClipWidth",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.graphics.getClipWidth(),
        },
        {
          name: "getClipHeight",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.graphics.getClipHeight(),
        },
        {
          name: "translate",
          descriptor: "(II)V",
          impl: (_jvm, self, [x, y]) => {
            self.__nativeData.graphics.translate(x | 0, y | 0);
          },
        },
        {
          name: "getTranslateX",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.graphics.getTranslateX(),
        },
        {
          name: "getTranslateY",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.graphics.getTranslateY(),
        },
        {
          name: "setFont",
          descriptor: "(Ljavax/microedition/lcdui/Font;)V",
          impl: (_jvm, self, [font]) => {
            if (font?.__nativeData) {
              self.__nativeData.graphics.setFont(font.__nativeData);
            }
          },
        },
        {
          name: "getFont",
          descriptor: "()Ljavax/microedition/lcdui/Font;",
          impl: (jvm, self) => {
            const f = jvm.newInstance("javax/microedition/lcdui/Font");
            const gf = self.__nativeData.graphics.getFont();
            f.__nativeData = { size: gf.size, style: 0, face: gf.face };
            return f;
          },
        },
        {
          name: "setStrokeStyle",
          descriptor: "(I)V",
          impl: (_jvm, self, [s]) => {
            self.__nativeData.graphics.setStrokeStyle(s | 0);
          },
        },
        {
          name: "getStrokeStyle",
          descriptor: "()I",
          impl: (_jvm, self) => self.__nativeData.graphics.getStrokeStyle(),
        },
        {
          name: "drawRGB",
          descriptor: "([IIIIIIIZ)V",
          impl: (
            _jvm,
            self,
            [rgbData, offset, scanlength, x, y, width, height, processAlpha],
          ) => {
            if (!rgbData?.__isArray) return;
            const g = self.__nativeData.graphics;
            const ctx = g.ctx;
            const imgData = ctx.createImageData(width | 0, height | 0);
            for (let row = 0; row < (height | 0); row++) {
              for (let col = 0; col < (width | 0); col++) {
                const pixel =
                  rgbData.elements[
                    (offset | 0) + row * (scanlength | 0) + col
                  ] | 0;
                const di = (row * (width | 0) + col) * 4;
                imgData.data[di] = (pixel >> 16) & 0xff;
                imgData.data[di + 1] = (pixel >> 8) & 0xff;
                imgData.data[di + 2] = pixel & 0xff;
                imgData.data[di + 3] = processAlpha
                  ? (pixel >> 24) & 0xff
                  : 255;
              }
            }
            ctx.putImageData(
              imgData,
              (x | 0) + g.translateX,
              (y | 0) + g.translateY,
            );
          },
        },
      ],
    });

    // Command, Alert, Form stubs
    this.defineNativeClass({
      className: "javax/microedition/lcdui/Command",
      superName: "java/lang/Object",
      fields: [
        { name: "OK", descriptor: "I", isStatic: true, value: 4 },
        { name: "CANCEL", descriptor: "I", isStatic: true, value: 3 },
        { name: "BACK", descriptor: "I", isStatic: true, value: 2 },
        { name: "EXIT", descriptor: "I", isStatic: true, value: 7 },
        { name: "HELP", descriptor: "I", isStatic: true, value: 5 },
        { name: "ITEM", descriptor: "I", isStatic: true, value: 8 },
        { name: "SCREEN", descriptor: "I", isStatic: true, value: 1 },
        { name: "STOP", descriptor: "I", isStatic: true, value: 6 },
      ],
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;II)V",
          impl: (_j, self, [label, type, priority]) => {
            self.__nativeData = {
              label: String(label ?? ""),
              type: type | 0,
              priority: priority | 0,
            };
          },
        },
        {
          name: "getLabel",
          descriptor: "()Ljava/lang/String;",
          impl: (_j, self) => self.__nativeData?.label ?? "",
        },
        {
          name: "getCommandType",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.type ?? 0,
        },
        {
          name: "getPriority",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.priority ?? 0,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/Alert",
      superName: "javax/microedition/lcdui/Displayable",
      fields: [{ name: "FOREVER", descriptor: "I", isStatic: true, value: -2 }],
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: (_j, self, [title]) => {
            self.__nativeData = { title: String(title ?? "") };
          },
        },
        {
          name: "<init>",
          descriptor:
            "(Ljava/lang/String;Ljava/lang/String;Ljavax/microedition/lcdui/Image;Ljavax/microedition/lcdui/AlertType;)V",
          impl: (_j, self, [title]) => {
            self.__nativeData = { title: String(title ?? "") };
          },
        },
        { name: "setTimeout", descriptor: "(I)V", impl: () => undefined },
        {
          name: "setString",
          descriptor: "(Ljava/lang/String;)V",
          impl: () => undefined,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/AlertType",
      superName: "java/lang/Object",
      fields: [
        {
          name: "ALARM",
          descriptor: "Ljavax/microedition/lcdui/AlertType;",
          isStatic: true,
          value: null,
        },
        {
          name: "CONFIRMATION",
          descriptor: "Ljavax/microedition/lcdui/AlertType;",
          isStatic: true,
          value: null,
        },
        {
          name: "ERROR",
          descriptor: "Ljavax/microedition/lcdui/AlertType;",
          isStatic: true,
          value: null,
        },
        {
          name: "INFO",
          descriptor: "Ljavax/microedition/lcdui/AlertType;",
          isStatic: true,
          value: null,
        },
        {
          name: "WARNING",
          descriptor: "Ljavax/microedition/lcdui/AlertType;",
          isStatic: true,
          value: null,
        },
      ],
      methods: [{ name: "<init>", descriptor: "()V", impl: () => undefined }],
    });

    // Form/Item stubs
    this.defineNativeClass({
      className: "javax/microedition/lcdui/Item",
      superName: "java/lang/Object",
      methods: [{ name: "<init>", descriptor: "()V", impl: () => undefined }],
    });
    this.defineNativeClass({
      className: "javax/microedition/lcdui/Form",
      superName: "javax/microedition/lcdui/Displayable",
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;)V",
          impl: () => undefined,
        },
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;[Ljavax/microedition/lcdui/Item;)V",
          impl: () => undefined,
        },
        { name: "append", descriptor: "(Ljava/lang/String;)I", impl: () => 0 },
        {
          name: "append",
          descriptor: "(Ljavax/microedition/lcdui/Item;)I",
          impl: () => 0,
        },
        {
          name: "append",
          descriptor: "(Ljavax/microedition/lcdui/Image;)I",
          impl: () => 0,
        },
        {
          name: "setCommandListener",
          descriptor: "(Ljavax/microedition/lcdui/CommandListener;)V",
          impl: () => undefined,
        },
        {
          name: "addCommand",
          descriptor: "(Ljavax/microedition/lcdui/Command;)V",
          impl: () => undefined,
        },
      ],
    });
    this.defineNativeClass({
      className: "javax/microedition/lcdui/StringItem",
      superName: "javax/microedition/lcdui/Item",
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;Ljava/lang/String;)V",
          impl: () => undefined,
        },
      ],
    });
    this.defineNativeClass({
      className: "javax/microedition/lcdui/TextField",
      superName: "javax/microedition/lcdui/Item",
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;Ljava/lang/String;II)V",
          impl: () => undefined,
        },
        {
          name: "getString",
          descriptor: "()Ljava/lang/String;",
          impl: () => "",
        },
        {
          name: "setString",
          descriptor: "(Ljava/lang/String;)V",
          impl: () => undefined,
        },
      ],
    });
    this.defineNativeClass({
      className: "javax/microedition/lcdui/ChoiceGroup",
      superName: "javax/microedition/lcdui/Item",
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljava/lang/String;I)V",
          impl: () => undefined,
        },
        {
          name: "append",
          descriptor: "(Ljava/lang/String;Ljavax/microedition/lcdui/Image;)I",
          impl: () => 0,
        },
        { name: "getSelectedIndex", descriptor: "()I", impl: () => 0 },
        {
          name: "setSelectedIndex",
          descriptor: "(IZ)V",
          impl: () => undefined,
        },
      ],
    });

    // Game API stubs
    this.defineNativeClass({
      className: "javax/microedition/lcdui/game/Sprite",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "(Ljavax/microedition/lcdui/Image;)V",
          impl: (_j, self, [img]) => {
            self.__nativeData = {
              image: img,
              x: 0,
              y: 0,
              frameW: img?.__nativeData?.width ?? 0,
              frameH: img?.__nativeData?.height ?? 0,
              frame: 0,
              visible: true,
              transform: 0,
            };
          },
        },
        {
          name: "<init>",
          descriptor: "(Ljavax/microedition/lcdui/Image;II)V",
          impl: (_j, self, [img, fw, fh]) => {
            self.__nativeData = {
              image: img,
              x: 0,
              y: 0,
              frameW: fw | 0,
              frameH: fh | 0,
              frame: 0,
              visible: true,
              transform: 0,
            };
          },
        },
        {
          name: "setPosition",
          descriptor: "(II)V",
          impl: (_j, self, [x, y]) => {
            self.__nativeData.x = x | 0;
            self.__nativeData.y = y | 0;
          },
        },
        {
          name: "move",
          descriptor: "(II)V",
          impl: (_j, self, [dx, dy]) => {
            self.__nativeData.x += dx | 0;
            self.__nativeData.y += dy | 0;
          },
        },
        {
          name: "getX",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.x ?? 0,
        },
        {
          name: "getY",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.y ?? 0,
        },
        {
          name: "getWidth",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.frameW ?? 0,
        },
        {
          name: "getHeight",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.frameH ?? 0,
        },
        {
          name: "setFrame",
          descriptor: "(I)V",
          impl: (_j, self, [f]) => {
            self.__nativeData.frame = f | 0;
          },
        },
        {
          name: "getFrame",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.frame ?? 0,
        },
        {
          name: "setVisible",
          descriptor: "(Z)V",
          impl: (_j, self, [v]) => {
            self.__nativeData.visible = !!v;
          },
        },
        {
          name: "isVisible",
          descriptor: "()Z",
          impl: (_j, self) => (self.__nativeData?.visible ? 1 : 0),
        },
        {
          name: "setImage",
          descriptor: "(Ljavax/microedition/lcdui/Image;II)V",
          impl: (_j, self, [img, fw, fh]) => {
            self.__nativeData.image = img;
            self.__nativeData.frameW = fw | 0;
            self.__nativeData.frameH = fh | 0;
          },
        },
        {
          name: "setTransform",
          descriptor: "(I)V",
          impl: (_j, self, [t]) => {
            self.__nativeData.transform = t | 0;
          },
        },
        {
          name: "defineReferencePixel",
          descriptor: "(II)V",
          impl: () => undefined,
        },
        {
          name: "setRefPixelPosition",
          descriptor: "(II)V",
          impl: (_j, self, [x, y]) => {
            self.__nativeData.x = x | 0;
            self.__nativeData.y = y | 0;
          },
        },
        {
          name: "getRefPixelX",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.x ?? 0,
        },
        {
          name: "getRefPixelY",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.y ?? 0,
        },
        {
          name: "collidesWith",
          descriptor: "(Ljavax/microedition/lcdui/game/Sprite;Z)Z",
          impl: () => 0,
        },
        {
          name: "defineCollisionRectangle",
          descriptor: "(IIII)V",
          impl: () => undefined,
        },
        {
          name: "paint",
          descriptor: "(Ljavax/microedition/lcdui/Graphics;)V",
          impl: (_j, self, [g]) => {
            if (!self.__nativeData?.visible || !self.__nativeData?.image)
              return;
            // Basic sprite painting - draw the current frame
            const img = self.__nativeData.image;
            if (img?.__nativeData?.canvas && g?.__nativeData?.graphics) {
              const fw = self.__nativeData.frameW;
              const fh = self.__nativeData.frameH;
              const frame = self.__nativeData.frame;
              const framesPerRow = Math.max(
                1,
                Math.floor((img.__nativeData.width || fw) / fw),
              );
              const srcX = (frame % framesPerRow) * fw;
              const srcY = Math.floor(frame / framesPerRow) * fh;
              try {
                g.__nativeData.graphics.ctx.drawImage(
                  img.__nativeData.canvas,
                  srcX,
                  srcY,
                  fw,
                  fh,
                  self.__nativeData.x,
                  self.__nativeData.y,
                  fw,
                  fh,
                );
              } catch (e) {}
            }
          },
        },
        {
          name: "nextFrame",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData.frame++;
          },
        },
        {
          name: "prevFrame",
          descriptor: "()V",
          impl: (_j, self) => {
            if (self.__nativeData.frame > 0) self.__nativeData.frame--;
          },
        },
        {
          name: "getRawFrameCount",
          descriptor: "()I",
          impl: (_j, self) => {
            const img = self.__nativeData?.image;
            if (!img?.__nativeData) return 1;
            const fw = self.__nativeData.frameW || 1;
            const fh = self.__nativeData.frameH || 1;
            return Math.max(
              1,
              Math.floor(img.__nativeData.width / fw) *
                Math.floor(img.__nativeData.height / fh),
            );
          },
        },
        {
          name: "setFrameSequence",
          descriptor: "([I)V",
          impl: () => undefined,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/game/TiledLayer",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "(IILjavax/microedition/lcdui/Image;II)V",
          impl: (_j, self, [cols, rows, img, tw, th]) => {
            self.__nativeData = {
              cols: cols | 0,
              rows: rows | 0,
              image: img,
              tileW: tw | 0,
              tileH: th | 0,
              cells: new Array((cols | 0) * (rows | 0)).fill(0),
              x: 0,
              y: 0,
              visible: true,
            };
          },
        },
        {
          name: "setCell",
          descriptor: "(III)V",
          impl: (_j, self, [col, row, tileIdx]) => {
            if (self.__nativeData)
              self.__nativeData.cells[
                (row | 0) * self.__nativeData.cols + (col | 0)
              ] = tileIdx | 0;
          },
        },
        {
          name: "getCell",
          descriptor: "(II)I",
          impl: (_j, self, [col, row]) =>
            self.__nativeData?.cells[
              (row | 0) * (self.__nativeData?.cols ?? 0) + (col | 0)
            ] ?? 0,
        },
        {
          name: "setPosition",
          descriptor: "(II)V",
          impl: (_j, self, [x, y]) => {
            self.__nativeData.x = x | 0;
            self.__nativeData.y = y | 0;
          },
        },
        {
          name: "move",
          descriptor: "(II)V",
          impl: (_j, self, [dx, dy]) => {
            self.__nativeData.x += dx | 0;
            self.__nativeData.y += dy | 0;
          },
        },
        {
          name: "getX",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.x ?? 0,
        },
        {
          name: "getY",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.y ?? 0,
        },
        {
          name: "getWidth",
          descriptor: "()I",
          impl: (_j, self) =>
            (self.__nativeData?.cols ?? 0) * (self.__nativeData?.tileW ?? 0),
        },
        {
          name: "getHeight",
          descriptor: "()I",
          impl: (_j, self) =>
            (self.__nativeData?.rows ?? 0) * (self.__nativeData?.tileH ?? 0),
        },
        {
          name: "setVisible",
          descriptor: "(Z)V",
          impl: (_j, self, [v]) => {
            self.__nativeData.visible = !!v;
          },
        },
        {
          name: "isVisible",
          descriptor: "()Z",
          impl: (_j, self) => (self.__nativeData?.visible ? 1 : 0),
        },
        {
          name: "fillCells",
          descriptor: "(IIIII)V",
          impl: (_j, self, [col, row, numCols, numRows, tileIdx]) => {
            if (!self.__nativeData) return;
            for (let r = row | 0; r < (row | 0) + (numRows | 0); r++)
              for (let c = col | 0; c < (col | 0) + (numCols | 0); c++)
                self.__nativeData.cells[r * self.__nativeData.cols + c] =
                  tileIdx | 0;
          },
        },
        {
          name: "paint",
          descriptor: "(Ljavax/microedition/lcdui/Graphics;)V",
          impl: (_j, self, [g]) => {
            if (!self.__nativeData?.visible || !self.__nativeData?.image)
              return;
            const img = self.__nativeData.image;
            if (!img?.__nativeData?.canvas || !g?.__nativeData?.graphics)
              return;
            const tw = self.__nativeData.tileW;
            const th = self.__nativeData.tileH;
            const cols = self.__nativeData.cols;
            const tilesPerRow = Math.max(
              1,
              Math.floor((img.__nativeData.width || tw) / tw),
            );
            for (let r = 0; r < self.__nativeData.rows; r++) {
              for (let c = 0; c < cols; c++) {
                const tileIdx = self.__nativeData.cells[r * cols + c];
                if (tileIdx <= 0) continue;
                const t = tileIdx - 1;
                const srcX = (t % tilesPerRow) * tw;
                const srcY = Math.floor(t / tilesPerRow) * th;
                try {
                  g.__nativeData.graphics.ctx.drawImage(
                    img.__nativeData.canvas,
                    srcX,
                    srcY,
                    tw,
                    th,
                    self.__nativeData.x + c * tw,
                    self.__nativeData.y + r * th,
                    tw,
                    th,
                  );
                } catch (e) {}
              }
            }
          },
        },
        { name: "createAnimatedTile", descriptor: "(I)I", impl: () => -1 },
        { name: "setAnimatedTile", descriptor: "(II)V", impl: () => undefined },
        {
          name: "getCellWidth",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.tileW ?? 0,
        },
        {
          name: "getCellHeight",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.tileH ?? 0,
        },
        {
          name: "getColumns",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.cols ?? 0,
        },
        {
          name: "getRows",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData?.rows ?? 0,
        },
      ],
    });

    this.defineNativeClass({
      className: "javax/microedition/lcdui/game/LayerManager",
      superName: "java/lang/Object",
      methods: [
        {
          name: "<init>",
          descriptor: "()V",
          impl: (_j, self) => {
            self.__nativeData = {
              layers: [],
              viewX: 0,
              viewY: 0,
              viewW: 240,
              viewH: 320,
            };
          },
        },
        {
          name: "append",
          descriptor: "(Ljavax/microedition/lcdui/game/Layer;)V",
          impl: (_j, self, [layer]) => {
            self.__nativeData.layers.push(layer);
          },
        },
        {
          name: "insert",
          descriptor: "(Ljavax/microedition/lcdui/game/Layer;I)V",
          impl: (_j, self, [layer, idx]) => {
            self.__nativeData.layers.splice(idx | 0, 0, layer);
          },
        },
        {
          name: "remove",
          descriptor: "(Ljavax/microedition/lcdui/game/Layer;)V",
          impl: (_j, self, [layer]) => {
            const i = self.__nativeData.layers.indexOf(layer);
            if (i >= 0) self.__nativeData.layers.splice(i, 1);
          },
        },
        {
          name: "getSize",
          descriptor: "()I",
          impl: (_j, self) => self.__nativeData.layers.length,
        },
        {
          name: "setViewWindow",
          descriptor: "(IIII)V",
          impl: (_j, self, [x, y, w, h]) => {
            self.__nativeData.viewX = x | 0;
            self.__nativeData.viewY = y | 0;
            self.__nativeData.viewW = w | 0;
            self.__nativeData.viewH = h | 0;
          },
        },
        {
          name: "paint",
          descriptor: "(Ljavax/microedition/lcdui/Graphics;II)V",
          impl: (jvm, self, [g, x, y]) => {
            if (!self.__nativeData) return;
            // Paint layers in reverse order (bottom to top)
            for (let i = self.__nativeData.layers.length - 1; i >= 0; i--) {
              const layer = self.__nativeData.layers[i];
              if (layer) {
                try {
                  jvm.invokeVirtual(
                    layer,
                    "paint",
                    "(Ljavax/microedition/lcdui/Graphics;)V",
                    [g],
                  );
                } catch (e) {}
              }
            }
          },
        },
      ],
    });

    // Displayable methods
    this.defineNativeClass({
      className: "javax/microedition/lcdui/CommandListener",
      superName: "java/lang/Object",
      methods: [
        {
          name: "commandAction",
          descriptor:
            "(Ljavax/microedition/lcdui/Command;Ljavax/microedition/lcdui/Displayable;)V",
          impl: () => undefined,
        },
      ],
    });
  }

  getDisplayObject() {
    if (!this.displayObject) {
      this.displayObject = {
        __class: this.loadClass("javax/microedition/lcdui/Display"),
        __fields: new Map(),
        __nativeData: {},
      };
    }

    return this.displayObject;
  }

  loadClass(name) {
    if (this.classCache.has(name)) {
      return this.classCache.get(name);
    }

    if (this.nativeClasses.has(name)) {
      const nativeClass = this.nativeClasses.get(name);
      this.classCache.set(name, nativeClass);
      if (nativeClass.superName) {
        this.loadClass(nativeClass.superName);
      }
      return nativeClass;
    }

    const data = this.loader.loadClass(name);
    const parsed = parseClass(data);
    const runtimeClass = {
      ...parsed,
      methods: new Map(
        parsed.methods.map((method) => [
          methodKey(method.name, method.descriptor),
          { ...method, owner: null },
        ]),
      ),
    };

    for (const method of runtimeClass.methods.values()) {
      method.owner = runtimeClass;
    }

    this.classCache.set(name, runtimeClass);

    if (runtimeClass.superName) {
      this.loadClass(runtimeClass.superName);
    }

    for (const field of runtimeClass.fields) {
      if (
        field.isStatic &&
        !this.staticFields.has(fieldKey(name, field.name, field.descriptor))
      ) {
        this.staticFields.set(
          fieldKey(name, field.name, field.descriptor),
          defaultValue(field.descriptor),
        );
      }
    }

    return runtimeClass;
  }

  getClassObject(className) {
    if (!className) {
      return null;
    }

    if (this.classObjects.has(className)) {
      return this.classObjects.get(className);
    }

    const classObject = {
      __class: this.loadClass("java/lang/Class"),
      __fields: new Map(),
      __nativeState: {},
      __nativeData: {
        targetClassName: className,
      },
    };

    this.classObjects.set(className, classObject);
    return classObject;
  }

  getResourceAsStream(classObject, resourceName) {
    const className = classObject?.__nativeData?.targetClassName ?? "";
    let resource = String(resourceName ?? "");

    if (!resource) {
      return null;
    }

    if (resource.startsWith("/")) {
      resource = resource.slice(1);
    } else {
      const slash = className.lastIndexOf("/");
      const prefix = slash === -1 ? "" : `${className.slice(0, slash + 1)}`;
      resource = `${prefix}${resource}`;
    }

    const data = this.jar[resource];
    if (!data) {
      return null;
    }

    const byteArray = {
      __isArray: true,
      componentType: "B",
      elements: Array.from(data, (v) => (v > 127 ? v - 256 : v)),
    };

    const stream = this.newInstance("java/io/ByteArrayInputStream");
    this.invokeSpecial(
      stream,
      "java/io/ByteArrayInputStream",
      "<init>",
      "([B)V",
      [byteArray],
    );
    return stream;
  }

  newInstance(className) {
    const cls = this.loadClass(className);
    const object = {
      __class: cls,
      __fields: new Map(),
      __nativeState: { keyState: 0 },
      __nativeData: null,
    };

    this.initializeInstanceFields(object, cls);
    return object;
  }

  initializeInstanceFields(object, cls) {
    if (cls.superName) {
      this.initializeInstanceFields(object, this.loadClass(cls.superName));
    }

    for (const field of cls.fields ?? []) {
      if (!field.isStatic) {
        object.__fields.set(
          fieldKey(cls.className, field.name, field.descriptor),
          defaultValue(field.descriptor),
        );
      }
    }
  }

  findField(ownerName, name, descriptor) {
    let cls = this.loadClass(ownerName);

    while (cls) {
      const field = (cls.fields ?? []).find(
        (candidate) =>
          candidate.name === name && candidate.descriptor === descriptor,
      );

      if (field) {
        return { field, owner: cls.className };
      }

      cls = cls.superName ? this.loadClass(cls.superName) : null;
    }

    throw new Error(`Field not found: ${ownerName}.${name}${descriptor}`);
  }

  findMethod(ownerName, name, descriptor, exactOwner = false) {
    let cls = this.loadClass(ownerName);

    while (cls) {
      const found = cls.methods.get(methodKey(name, descriptor));

      if (found) {
        return found;
      }

      if (exactOwner) {
        // Some MIDlets emit invokespecial with an owner that doesn't
        // declare the method directly (it is inherited from a parent).
        // Allow superclass fallback for compatibility.
        exactOwner = false;
      }

      cls = cls.superName ? this.loadClass(cls.superName) : null;
    }

    throw new Error(`Method not found: ${ownerName}.${name}${descriptor}`);
  }

  getField(target, ownerName, name, descriptor) {
    const resolved = this.findField(ownerName, name, descriptor);
    return target.__fields.get(fieldKey(resolved.owner, name, descriptor));
  }

  setField(target, ownerName, name, descriptor, value) {
    const resolved = this.findField(ownerName, name, descriptor);
    target.__fields.set(fieldKey(resolved.owner, name, descriptor), value);
  }

  getStaticField(ownerName, name, descriptor) {
    const resolved = this.findField(ownerName, name, descriptor);
    return this.staticFields.get(fieldKey(resolved.owner, name, descriptor));
  }

  setStaticField(ownerName, name, descriptor, value) {
    const resolved = this.findField(ownerName, name, descriptor);
    this.staticFields.set(fieldKey(resolved.owner, name, descriptor), value);
  }

  invokeMethod(target, method, args) {
    if (method.isNative) {
      const nativeImpl = this.nativeMethods.get(
        `${method.className}#${method.name}#${method.descriptor}`,
      );
      return nativeImpl(this, target, args);
    }

    return executeMethod(this, method, target, args);
  }

  invokeVirtual(target, name, descriptor, args = []) {
    if (target == null) {
      if (name === "wait" || name === "notify" || name === "notifyAll") {
        return undefined;
      }
      throw new Error(`Null reference in invokevirtual ${name}${descriptor}`);
    }

    if (target.__isArray) {
      const method = this.findMethod("java/lang/Object", name, descriptor);
      return this.invokeMethod(target, method, args);
    }

    if (typeof target === "string") {
      const method = this.findMethod("java/lang/String", name, descriptor);
      return this.invokeMethod(target, method, args);
    }

    if (!target.__class) {
      throw new Error(
        `Target is missing __class property in invokevirtual ${name}${descriptor}. Target: ${JSON.stringify(target)}`,
      );
    }

    const method = this.findMethod(target.__class.className, name, descriptor);
    return this.invokeMethod(target, method, args);
  }

  invokeSpecial(target, ownerName, name, descriptor, args = []) {
    const method = this.findMethod(ownerName, name, descriptor, true);
    return this.invokeMethod(target, method, args);
  }

  invokeStatic(ownerName, name, descriptor, args = []) {
    const method = this.findMethod(ownerName, name, descriptor, true);
    return this.invokeMethod(null, method, args);
  }
  _getGraphicsImport() {
    const { Graphics } = require("../../emulator/graphics.js");
    return { Graphics };
  }

  loadImageFromJar(path) {
    let normalizedPath = String(path || "");
    if (normalizedPath.startsWith("/"))
      normalizedPath = normalizedPath.substring(1);
    const data = this.jar[normalizedPath];
    if (!data) {
      console.warn("J2ME: Image not found in JAR:", normalizedPath);
      // Return a 1x1 placeholder image
      const img = this.newInstance("javax/microedition/lcdui/Image");
      const canvas = new OffscreenCanvas(1, 1);
      img.__nativeData = {
        canvas,
        ctx: canvas.getContext("2d"),
        width: 1,
        height: 1,
        mutable: false,
      };
      return img;
    }
    return this.loadImageFromBytes(
      { __isArray: true, componentType: "B", elements: Array.from(data) },
      0,
      data.length,
    );
  }

  loadImageFromBytes(data, off, len) {
    const img = this.newInstance("javax/microedition/lcdui/Image");
    // Create a placeholder immediately, then load asynchronously
    const canvas = new OffscreenCanvas(1, 1);
    img.__nativeData = {
      canvas,
      ctx: canvas.getContext("2d"),
      width: 1,
      height: 1,
      mutable: false,
      loading: true,
    };

    let bytes;
    if (data?.__isArray) {
      bytes = new Uint8Array(data.elements.slice(off, off + len));
    } else {
      bytes = new Uint8Array(0);
    }

    // Try to detect PNG or JPEG and load asynchronously
    const blob = new Blob([bytes]);
    createImageBitmap(blob)
      .then((bitmap) => {
        const w = bitmap.width;
        const h = bitmap.height;
        const cnv = new OffscreenCanvas(w, h);
        const ctx = cnv.getContext("2d");
        ctx.drawImage(bitmap, 0, 0);
        img.__nativeData = {
          canvas: cnv,
          ctx,
          width: w,
          height: h,
          mutable: false,
          loading: false,
        };
      })
      .catch((err) => {
        console.warn("J2ME: Failed to load image:", err);
        img.__nativeData.loading = false;
      });

    return img;
  }

  createGraphicsObject(graphics) {
    const object = {
      __class: this.loadClass("javax/microedition/lcdui/Graphics"),
      __fields: new Map(),
      __nativeState: {},
      __nativeData: {
        graphics,
        color: "#ffffff",
      },
    };

    return object;
  }

  mapKeyCode(key) {
    switch (key) {
      case "F1":
        return -6;
      case "F2":
        return -7;
      case "ArrowUp":
        return -1;
      case "ArrowDown":
        return -2;
      case "ArrowLeft":
        return -3;
      case "ArrowRight":
        return -4;
      case " ":
      case "Enter":
        return -5;
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
        return key.charCodeAt(0);
      default:
        return 0;
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
                : 0;

    if (!bit) {
      return;
    }

    const current = canvasObject.__nativeState?.keyState ?? 0;
    canvasObject.__nativeState.keyState = isDown
      ? current | bit
      : current & ~bit;
  }

  createCanvasAdapter(canvasObject) {
    if (canvasObject.__canvasAdapter) {
      return canvasObject.__canvasAdapter;
    }

    canvasObject.__canvasAdapter = {
      paint: (graphics) => {
        const graphicsObject = this.createGraphicsObject(graphics);
        this.invokeVirtual(
          canvasObject,
          "paint",
          "(Ljavax/microedition/lcdui/Graphics;)V",
          [graphicsObject],
        );
      },
      keyPressed: (key) => {
        const code = this.mapKeyCode(key);
        this.updateKeyState(canvasObject, key, true);
        this.invokeVirtual(canvasObject, "keyPressed", "(I)V", [code]);
      },
      keyReleased: (key) => {
        const code = this.mapKeyCode(key);
        this.updateKeyState(canvasObject, key, false);
        this.invokeVirtual(canvasObject, "keyReleased", "(I)V", [code]);
      },
    };

    return canvasObject.__canvasAdapter;
  }

  runMidlet(className) {
    const midlet = this.newInstance(className);
    this.invokeSpecial(midlet, className, "<init>", "()V");
    this.invokeVirtual(midlet, "startApp", "()V");
    return midlet;
  }
}
