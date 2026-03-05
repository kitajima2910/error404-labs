let glue = null;

function readCString(heapOrArray, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;

    // node endIdx will be NaN if the argument is not supplied
    while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;

    var str = '';

    while (idx < endPtr) {
        str += String.fromCharCode(heapOrArray[idx++]);
    }

    return str;
}

function writeCString(str, heap, outIdx) {
    var startIdx = outIdx;

    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        heap[outIdx++] = u & 0xff;
    }
    heap[outIdx] = 0;

    return outIdx - startIdx;
}



class Glue {
    constructor() {
        this.instance = null;
        this.memoryBuffer = null;
        this.heapu8 = null;
        this.importObject = {
            env: {
                emscripten_notify_memory_growth: () => {
                    console.log('growing memory');
                    this.loadHeap();
                },
                log_msg: (ptr, len) => {
                    console.log('msg', this.readStringAt(ptr, len))
                }
            }
        };
    }

    async init(module) {
        const result = await WebAssembly.instantiate(module, this.importObject);
        this.instance = result;
        this.instance.exports._initialize();
        this.exports = this.instance.exports;

        this.loadHeap();
    }

    loadHeap() {
        this.memoryBuffer = this.exports.memory.buffer;
        this.heapu8 = new Uint8Array(this.memoryBuffer);
    }

    malloc(size) {
        return this.instance.exports.malloc(size);
    }

    free(ptr) {
        return this.instance.exports.free(ptr);
    }

    writeInto(ptr, src) {
        // don't copy it twice if it's already an array
        this.heapu8.set(new Uint8Array(src.buffer || src), ptr);
    }

    copyFrom(ptr, length) {
        const arr = new Uint8Array(length);
        arr.set(this.heapu8.subarray(ptr, ptr+length), 0);
        return arr;
    }

    readStringAt(ptr, maxLen) {
        if (!ptr) return '';
        return readCString(this.heapu8, ptr, maxLen);
    }

    allocString(str) {
        // only ascii strings!
        const ptr = this.malloc(str.length+1);
        writeCString(str, this.heapu8, ptr);
        return ptr;
    }

    // for utf8 strings, encode before writing, decode after reading
}

function createMsgHandler(port, cmdHandler, otherHandler) {
    port.onmessage = async (event) => {
        const data = event.data;
        if (data && data.cmd && data.msgId) {
            const { cmd, msgId } = data;

            if (cmdHandler) {
                try {
                    const transfer = [];
                    const result = await cmdHandler(cmd, data, transfer);
                    port.postMessage({ replyFor: msgId, value: result }, transfer);
                } catch (error) {
                    port.postMessage({ replyFor: msgId, error: error.toString() });
                }
            }
        } else if (otherHandler) {
            otherHandler(event);
        }
    }
}

createMsgHandler(self, async (cmd, data, transfer) => {
    if (cmd == 'init') {
        glue = new Glue();
        await glue.init(data.module);
    } else if (cmd == 'transcode') {
        if (!glue) {
            console.error('no glue?');
        }

        data = data.data; // data data data

        const srcPtr = glue.malloc(data.byteLength);
        glue.writeInto(srcPtr, data);

        const resultPtr = glue.exports.transcode(srcPtr, data.byteLength);

        glue.free(srcPtr);

        if (!resultPtr) {
            return null;
        } else {
            const result = glue.copyFrom(
                glue.exports.ob_get_data(resultPtr),
                glue.exports.ob_get_size(resultPtr)
            ).buffer;
            glue.exports.ob_free(resultPtr);

            transfer.push(result);
            return result;
        }
    }
})
