export async function loadJar(file) {

    const buffer = await file.arrayBuffer()

    const zip = await JSZip.loadAsync(buffer)

    let files = {}

    for (const filename in zip.files) {

        const file = zip.files[filename]

        if (!file.dir) {

            files[filename] = await file.async("uint8array")

        }

    }

    return files
}