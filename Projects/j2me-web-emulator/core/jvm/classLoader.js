export class ClassLoader {

    constructor(jarFiles) {
        this.jarFiles = jarFiles
        this.classes = {}
    }

    loadClass(className) {

        const path = className.replace(/\./g, "/") + ".class"

        const data = this.jarFiles[path]

        if (!data) {
            throw "Class not found: " + className
        }

        return data
    }

}