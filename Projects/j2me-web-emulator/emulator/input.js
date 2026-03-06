export class Input {

    constructor(canvas) {

        this.canvas = canvas

        window.addEventListener("keydown", (e) => {

            canvas.keyPressed(e.key)

        })

        window.addEventListener("keyup", (e) => {

            canvas.keyReleased(e.key)

        })

    }

    isPressed(key) {

        return this.keys[key]

    }

    update(input) {

        if (input.isPressed("ArrowUp")) {
            this.playerY -= 2
        }

    }

}