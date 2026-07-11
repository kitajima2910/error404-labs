// Server-side grading logic — normalize, compare, grade
// Các hàm này là pure function, không phụ thuộc Pyodide

// ─── Interfaces ───────────────────────────────────────────────────────────

export interface TestCase {
    stdin: string
    expected_output: string
    is_hidden: boolean
}

export interface TestResult {
    stdin: string
    expected: string
    actual: string
    passed: boolean
    is_hidden: boolean
}

export interface GradingResult {
    results: TestResult[]
    allPassed: boolean
    passedCount: number
    totalCount: number
}

// ─── normalizeOutput ─────────────────────────────────────────────────────

/**
 * Chuẩn hoá output để so sánh:
 *   - CRLF → LF
 *   - Trim trailing whitespace mỗi dòng
 *   - Xoá dòng trống ở cuối
 */
export function normalizeOutput(output: string): string {
    // CRLF → LF
    let normalized = output.replace(/\r\n/g, '\n')

    // Trim trailing whitespace mỗi dòng
    normalized = normalized
        .split('\n')
        .map((line) => line.replace(/\s+$/, ''))
        .join('\n')

    // Xoá dòng trống ở cuối
    normalized = normalized.replace(/\n+$/, '')

    return normalized
}

// ─── compareOutputs ──────────────────────────────────────────────────────

/**
 * So sánh actual output với expected output
 *
 * @param actual   Output thực tế từ code
 * @param expected Output mong đợi từ test case
 * @param mode     'exact' — so sánh chính xác sau normalize
 *                 'float' — parse số float và so sánh với epsilon
 * @param epsilon  Sai số cho phép (mặc định 0.001)
 */
export function compareOutputs(
    actual: string,
    expected: string,
    mode: 'exact' | 'float' = 'exact',
    epsilon?: number
): boolean {
    const eps = epsilon ?? 0.001

    if (mode === 'exact') {
        return normalizeOutput(actual) === normalizeOutput(expected)
    }

    // mode === 'float': so sánh từng số trong output
    const normActual = normalizeOutput(actual)
    const normExpected = normalizeOutput(expected)

    // Parse số từ output (integer, float, scientific notation)
    const numRegex = /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g

    const actualNums = normActual.match(numRegex)?.map(Number) ?? []
    const expectedNums = normExpected.match(numRegex)?.map(Number) ?? []

    if (actualNums.length !== expectedNums.length) {
        return false
    }

    for (let i = 0; i < actualNums.length; i++) {
        if (actualNums[i] === expectedNums[i]) continue // Số nguyên khớp chính xác
        if (Math.abs(actualNums[i] - expectedNums[i]) > eps) {
            return false
        }
    }

    // Nếu output không chứa số nào, fallback về exact match
    if (actualNums.length === 0 && expectedNums.length === 0) {
        return normActual === normExpected
    }

    return true
}

// ─── gradeSubmission ──────────────────────────────────────────────────────

/**
 * Chấm điểm submission dựa trên test cases.
 *
 * Hàm này không tự thực thi Python code.
 * Để chạy + chấm, dùng PyodideRunner.runTests() ở client
 * hoặc truyền actual outputs từ server-side execution.
 *
 * @param code           Code Python của user (dùng để reference)
 * @param testCases      Danh sách test cases (chứa expected_output)
 * @param comparisonMode 'exact' hoặc 'float'
 * @param epsilon        Sai số cho float mode
 * @param actualOutputs  Mảng output thực tế tương ứng mỗi test case
 *                       (nếu không có, tất cả passed = false)
 */
export function gradeSubmission(
    code: string,
    testCases: TestCase[],
    comparisonMode: 'exact' | 'float' = 'exact',
    epsilon?: number,
    actualOutputs?: string[]
): GradingResult {
    const results: TestResult[] = testCases.map((tc, i) => {
        const actual = actualOutputs?.[i] ?? ''
        const passed = actualOutputs
            ? compareOutputs(actual, tc.expected_output, comparisonMode, epsilon)
            : false

        return {
            stdin: tc.stdin,
            expected: tc.expected_output,
            actual,
            passed,
            is_hidden: tc.is_hidden,
        }
    })

    const passedCount = results.filter((r) => r.passed).length
    const totalCount = results.length

    return {
        results,
        allPassed: passedCount === totalCount,
        passedCount,
        totalCount,
    }
}
