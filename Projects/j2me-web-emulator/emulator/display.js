import { Graphics } from "./graphics.js"

export class Display {

    static instance = null

    static getDisplay(midlet) {

        if (!Display.instance) {

            Display.instance = new Display()

        }

        return Display.instance

    }

    constructor() {

        this.screen = document.getElementById("screen")
        this.ctx = this.screen.getContext("2d")
        this.graphics = new Graphics(this.ctx)

        this.current = null
        this.isLoopRunning = false

        window.addEventListener("keydown", (e) => {
            if (this.current?.keyPressed) {
                this.current.keyPressed(e.key)
            }
        })

        window.addEventListener("keyup", (e) => {
            if (this.current?.keyReleased) {
                this.current.keyReleased(e.key)
            }
        })

    }

    setCurrent(canvas) {

        this.current = canvas

        if (!this.isLoopRunning) {
            this.loop()
        }

    }

    loop() {
        this.isLoopRunning = true

        const draw = () => {
            this.ctx.clearRect(0, 0, this.screen.width, this.screen.height)

            if (this.current) {

                this.current.paint(this.graphics)

            }

            requestAnimationFrame(draw)

        }

        draw()

    }

}
