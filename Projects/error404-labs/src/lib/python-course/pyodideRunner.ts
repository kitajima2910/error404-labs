// Client-side module — chạy Python code trong browser qua Pyodide
// Dùng dynamic import để tránh lỗi SSR (Astro build)

import { compareOutputs } from './grading'

// ─── Interfaces ───────────────────────────────────────────────────────────

export interface TestCase {
    stdin: string
    expected_output: string
    is_hidden: boolean
}

export interface RunResult {
    stdout: string
    stderr: string
    error: string | null
    executionTimeMs: number
}

export interface TestResult {
    stdin: string
    expected: string
    actual: string
    passed: boolean
    is_hidden: boolean
}

export interface RunTestsResult {
    results: TestResult[]
    allPassed: boolean
    passedCount: number
    totalCount: number
}

// ─── PyodideRunner class ──────────────────────────────────────────────────

export class PyodideRunner {
    private pyodide: any = null
    private loading: Promise<void> | null = null
    private defaultTimeoutMs: number

    constructor(timeoutMs: number = 10000) {
        this.defaultTimeoutMs = timeoutMs
    }

    /**
     * Khởi tạo Pyodide — tải từ CDN nếu chưa load
     */
    async init(): Promise<void> {
        if (this.pyodide) return
        if (this.loading) return this.loading

        this.loading = (async () => {
            try {
                // Dynamic import để tránh bundle Pyodide vào server bundle
                const { loadPyodide } = await import('pyodide')
                this.pyodide = await loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
                })
            } catch (err: any) {
                this.loading = null
                throw new Error(`Không thể tải Pyodide: ${err.message}`)
            }
        })()

        await this.loading
    }

    /**
     * Kiểm tra Pyodide đã sẵn sàng chưa
     */
    get isReady(): boolean {
        return this.pyodide !== null
    }

    // ─── runCode ──────────────────────────────────────────────────────────

    /**
     * Chạy Python code, trả về stdout/stderr/error + thời gian thực thi
     *
     * @param code  Python source code
     * @param stdin Dữ liệu đầu vào cho input() (mặc định rỗng)
     */
    async runCode(code: string, stdin?: string): Promise<RunResult> {
        await this.init()
        if (!this.pyodide) {
            return { stdout: '', stderr: '', error: 'Pyodide chưa được khởi tạo', executionTimeMs: 0 }
        }

        const wrappedCode = this._wrapCode(code, stdin || '')
        const startTime = performance.now()

        try {
            // Hủy bỏ nếu chạy quá thời gian cho phép
            const timeoutPromise = new Promise<never>((_, reject) => {
                const id = setTimeout(() => {
                    reject(new Error(`Hết thời gian (${this.defaultTimeoutMs}ms)`))
                }, this.defaultTimeoutMs)
                // Cho phép timeout cleanup nếu promise resolve trước
                ;(timeoutPromise as any)._timeoutId = id
            })

            // Chạy Python code bất đồng bộ (không block main thread)
            const runPromise = this.pyodide.runPythonAsync(wrappedCode)

            await Promise.race([runPromise, timeoutPromise])
            // Clear timeout nếu code chạy xong trước
            clearTimeout((timeoutPromise as any)._timeoutId)

            const stdout = this.pyodide.globals.get('_stdout_value') || ''
            const stderr = this.pyodide.globals.get('_stderr_value') || ''
            const executionTimeMs = performance.now() - startTime

            // Dọn dẹp global
            this._cleanupGlobals()

            return { stdout, stderr, error: null, executionTimeMs }
        } catch (err: any) {
            const executionTimeMs = performance.now() - startTime

            // Phân loại lỗi
            const errorMsg = err.message || String(err)

            // Python runtime error đã được bắt trong _wrapCode và ghi vào _stderr_value
            const stderr = this.pyodide.globals.get('_stderr_value') || ''
            const stdout = this.pyodide.globals.get('_stdout_value') || ''
            this._cleanupGlobals()

            // Nếu stderr đã có traceback thì dùng nó, không thì dùng error message
            const finalError = stderr
                ? `Lỗi thực thi Python:\n${stderr}`
                : (errorMsg.includes('Hết thời gian') ? errorMsg : `Lỗi: ${errorMsg}`)

            return {
                stdout,
                stderr: stderr || errorMsg,
                error: finalError,
                executionTimeMs,
            }
        }
    }

    // ─── runTests ─────────────────────────────────────────────────────────

    /**
     * Chạy code với từng test case, so sánh output với expected_output
     *
     * Mỗi test case:
     *   1. Prepend stdin vào code wrapper
     *   2. Chạy code
     *   3. Normalize & compare output
     */
    async runTests(code: string, testCases: TestCase[]): Promise<RunTestsResult> {
        if (testCases.length === 0) {
            return { results: [], allPassed: true, passedCount: 0, totalCount: 0 }
        }

        const results: TestResult[] = []

        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i]
            const result = await this.runCode(code, tc.stdin)

            // So sánh output sử dụng grading.compareOutputs (exact mode)
            const passed = !result.error && compareOutputs(result.stdout, tc.expected_output, 'exact')

            results.push({
                stdin: tc.stdin,
                expected: tc.expected_output,
                actual: result.stdout,
                passed,
                is_hidden: tc.is_hidden,
            })
        }

        const passedCount = results.filter((r) => r.passed).length
        const totalCount = results.length

        return {
            results,
            allPassed: passedCount === totalCount,
            passedCount,
            totalCount,
        }
    }

    // ─── Private helpers ──────────────────────────────────────────────────

    /**
     * Bọc code Python với stdin wrapper + stdout/stderr capture
     */
    private _wrapCode(code: string, stdin: string): string {
        // Escape stdin để tránh lỗi syntax Python
        const escapedStdin = stdin
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')

        const hasStdin = stdin.length > 0

        return `
import sys, io, builtins

# Capture stdout/stderr
_stdout_buf = io.StringIO()
_stderr_buf = io.StringIO()
sys.stdout = _stdout_buf
sys.stderr = _stderr_buf

# Override input() cho stdin
${hasStdin ? `
_input_data = '${escapedStdin}'
_input_lines = _input_data.split('\\n')
_input_iter = iter(_input_lines)

def _custom_input(prompt=""):
    try:
        return next(_input_iter)
    except StopIteration:
        raise EOFError("Hết dữ liệu đầu vào")

builtins.input = _custom_input
` : ''}

try:
${this._indentCode(code)}
except BaseException as _exc:
    import traceback
    traceback.print_exc(file=_stderr_buf)

# Lưu kết quả vào global để JS đọc
_stdout_value = _stdout_buf.getvalue()
_stderr_value = _stderr_buf.getvalue()

# Khôi phục stdout/stderr gốc
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`
    }

    /**
     * Thụt lề code để đặt trong khối try
     */
    private _indentCode(code: string): string {
        return code
            .split('\n')
            .map((line) => (line.trim() ? `    ${line}` : ''))
            .join('\n')
    }

    /**
     * Xoá các biến global Python sau mỗi lần chạy
     */
    private _cleanupGlobals(): void {
        if (!this.pyodide) return
        try {
            this.pyodide.globals.delete('_stdout_value')
            this.pyodide.globals.delete('_stderr_value')
        } catch {
            // Bỏ qua lỗi cleanup
        }
    }
}
