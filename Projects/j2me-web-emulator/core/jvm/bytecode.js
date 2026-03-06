export class ByteReader {

    constructor(buffer) {
        this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
        this.pos = 0
    }

    u1() {
        return this.view.getUint8(this.pos++)
    }

    u2() {
        const val = this.view.getUint16(this.pos)
        this.pos += 2
        return val
    }

    u4() {
        const val = this.view.getUint32(this.pos)
        this.pos += 4
        return val
    }

}
