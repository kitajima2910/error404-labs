import { Canvas } from "./canvas.js"

export class GameCanvas extends Canvas {

    constructor() {

        super()

        this.keys = {}

    }

    keyPressed(k) {

        this.keys[k] = true

    }

    keyReleased(k) {

        this.keys[k] = false

    }

    isKeyDown(k) {

        return this.keys[k]

    }

    getKeyStates() {

        let state = 0

        if (this.keys["ArrowUp"]) state |= 1
        if (this.keys["ArrowDown"]) state |= 2
        if (this.keys["ArrowLeft"]) state |= 4
        if (this.keys["ArrowRight"]) state |= 8
        if (this.keys[" "]) state |= 16

        return state

    }

}