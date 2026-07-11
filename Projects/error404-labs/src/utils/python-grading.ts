// Tiện ích chấm điểm cho Python Learning Platform
// Hỗ trợ normalize output và so sánh kết quả

/**
 * Chuẩn hóa output: trim, normalize newlines, remove trailing spaces
 */
export function normalizeOutput(output: string): string {
    return output
        .trim()
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/[ \t]+$/gm, '') // Xoá khoảng trắng thừa cuối mỗi dòng
        .replace(/\n{3,}/g, '\n\n') // Nén nhiều dòng trống
        .trim()
}

/**
 * So sánh output thực tế với expected
 * @param actual Output từ code học viên
 * @param expected Output mong đợi
 * @param mode 'exact' | 'float' | 'contains'
 * @param epsilon Sai số cho float mode
 */
export function compareOutputs(
    actual: string,
    expected: string,
    mode: 'exact' | 'float' | 'contains' = 'exact',
    epsilon: number = 0.001
): boolean {
    const normActual = normalizeOutput(actual)
    const normExpected = normalizeOutput(expected)

    if (mode === 'contains') {
        // Kiểm tra expected có xuất hiện trong actual không
        return normActual.includes(normExpected)
    }

    if (mode === 'float') {
        // So sánh số thực với sai số
        const actualNum = parseFloat(normActual)
        const expectedNum = parseFloat(normExpected)
        if (!isNaN(actualNum) && !isNaN(expectedNum)) {
            return Math.abs(actualNum - expectedNum) < epsilon
        }
        // Fallback về exact nếu không parse được số
        return normActual === normExpected
    }

    // 'exact' — so sánh chính xác
    return normActual === normExpected
}
