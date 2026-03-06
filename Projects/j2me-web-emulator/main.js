import { loadJar } from "./core/jarLoader.js"
import { parseManifest } from "./core/manifestParser.js"
import { JVM } from "./core/jvm/jvm.js"

const fileInput = document.getElementById("jarFile")
const gameInfo = document.getElementById("gameInfo")

function setStatus(message, isError = false) {
    gameInfo.textContent = message
    gameInfo.dataset.error = isError ? "true" : "false"
}

fileInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
        return
    }

    try {
        setStatus(`Đang nạp ${file.name}...`)

        const jar = await loadJar(file)
        const manifestBytes = jar["META-INF/MANIFEST.MF"]

        if (!manifestBytes) {
            throw new Error("Không tìm thấy MANIFEST.MF")
        }

        const manifest = parseManifest(new TextDecoder().decode(manifestBytes))
        const midlet = manifest["MIDlet-1"]

        if (!midlet) {
            throw new Error("Manifest không có MIDlet-1")
        }

        const className = midlet.split(",")[2]?.trim()?.replace(/\./g, "/")

        if (!className) {
            throw new Error(`MIDlet-1 không hợp lệ: ${midlet}`)
        }

        const jvm = new JVM(jar)
        jvm.runMidlet(className)

        setStatus(`Đang chạy ${className}`)
    } catch (error) {
        console.error(error)
        setStatus(
            `Không thể chạy JAR: ${error instanceof Error ? error.message : String(error)}`,
            true
        )
    }
})
