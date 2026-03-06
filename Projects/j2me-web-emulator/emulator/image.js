export class Image{

    static createImage(src){

        const img = new window.Image()

        img.src = src

        return img

    }

}

import { ResourceLoader } from "./resource.js"

export class J2MEImage{

    static loader = null

    static async createImage(path){

        return await J2MEImage.loader.loadImage(path)

    }

}