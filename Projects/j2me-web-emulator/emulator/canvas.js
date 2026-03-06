export class J2MECanvas{

    constructor(screen){

        this.screen = screen

        this.graphics = null

    }

    paint(graphics){

        // game sẽ override
    }

    repaint(){

        this.paint(this.graphics)

    }

}

export class Canvas{

    paint(g){}

    keyPressed(key){}

    keyReleased(key){}

}