export class Sprite{

    constructor(image,frameW,frameH){

        this.image = image

        this.frameW = frameW
        this.frameH = frameH

        this.frame = 0

    }

    draw(g,x,y){

        const cols = this.image.width / this.frameW

        const sx = (this.frame % cols) * this.frameW
        const sy = Math.floor(this.frame / cols) * this.frameH

        g.ctx.drawImage(
            this.image,
            sx,sy,
            this.frameW,this.frameH,
            x,y,
            this.frameW,this.frameH
        )

    }

}