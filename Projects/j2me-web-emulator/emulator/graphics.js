export class Graphics {

    constructor(ctx) {

        this.ctx = ctx
        this.color = "#ffffff"

    }

    setColor(color) {

        this.color = color

    }

    fillRect(x, y, w, h) {

        this.ctx.fillStyle = this.color
        this.ctx.fillRect(x, y, w, h)

    }

    drawString(str, x, y) {

        this.ctx.fillStyle = this.color
        this.ctx.font = "16px monospace"

        this.ctx.fillText(str, x, y)

    }

}
