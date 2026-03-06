export class ResourceLoader {

    constructor(jar) {

        this.jar = jar

    }

    async loadImage(path) {

        if (path.startsWith("/")) {
            path = path.substring(1)
        }

        const data = this.jar[path]

        if (!data) {
            console.warn("Image not found:", path)
            return null
        }

        const blob = new Blob([data], { type: "image/png" })

        const url = URL.createObjectURL(blob)

        const img = new Image()

        img.src = url

        await img.decode()

        return img
    }

    async loadSound(path) {

        path = path.replace(/^\//, "")

        const data = this.jar[path]

        if (!data) return null

        const blob = new Blob([data], { type: "audio/mpeg" })

        const url = URL.createObjectURL(blob)

        return url

    }

}