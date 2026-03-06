export class SoundPlayer{

    constructor(src){

        this.audio = new Audio(src)

    }

    start(){

        this.audio.currentTime = 0
        this.audio.play()

    }

    stop(){

        this.audio.pause()

    }

}