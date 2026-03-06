export class Screen{

    constructor(){

        this.canvas = document.getElementById("screen")
        this.ctx = this.canvas.getContext("2d")

        this.width = this.canvas.width
        this.height = this.canvas.height

    }

    clear(){

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.width,this.height)

    }

}