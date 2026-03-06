import { SoundPlayer } from "./sound.js"
import { ResourceLoader } from "./resource.js"

export class Manager{

    static loader = null

    static async createPlayer(path){

        const url = await Manager.loader.loadSound(path)

        return new SoundPlayer(url)

    }

}