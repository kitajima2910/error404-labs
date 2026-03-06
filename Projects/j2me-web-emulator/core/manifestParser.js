export function parseManifest(text) {
    const data = {}
    let currentKey = null

    for (const rawLine of text.replace(/\r/g, "").split("\n")) {
        if (!rawLine) {
            currentKey = null
            continue
        }

        if (rawLine.startsWith(" ") && currentKey) {
            data[currentKey] += rawLine.slice(1)
            continue
        }

        const separator = rawLine.indexOf(":")

        if (separator === -1) {
            continue
        }

        const key = rawLine.slice(0, separator).trim()
        const value = rawLine.slice(separator + 1).trim()

        data[key] = value
        currentKey = key
    }

    return data
}
