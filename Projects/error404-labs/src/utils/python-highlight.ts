// Tô màu cú pháp Python đơn giản (chạy trên server) cho các khối code trong bài giảng.
// Trả về HTML đã escape, mỗi token được bọc trong <span class="tok-*">.

const KEYWORDS = new Set([
    'False',
    'None',
    'True',
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'case',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'match',
    'nonlocal',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield',
])

const BUILTINS = new Set([
    'abs',
    'all',
    'any',
    'bool',
    'chr',
    'dict',
    'divmod',
    'enumerate',
    'filter',
    'float',
    'format',
    'input',
    'int',
    'isinstance',
    'iter',
    'len',
    'list',
    'map',
    'max',
    'min',
    'next',
    'open',
    'ord',
    'pow',
    'print',
    'range',
    'reversed',
    'round',
    'set',
    'sorted',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'zip',
    'Exception',
    'ValueError',
    'TypeError',
    'ZeroDivisionError',
    'IndexError',
    'KeyError',
    'NameError',
])

// Thứ tự nhóm: comment | string | decorator | number | identifier | operator
const TOKEN_RE =
    /(#[^\n]*)|((?:[rRbBuUfF]{1,2})?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))|(@[\p{L}_][\p{L}\p{N}_.]*)|(\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?j?\b)|([\p{L}_][\p{L}\p{N}_]*)|([+\-*/%=<>!&|^~]+)/gu

export function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

const wrap = (cls: string, text: string) => `<span class="tok-${cls}">${escapeHtml(text)}</span>`

export function highlightPython(code: string): string {
    let html = ''
    let last = 0
    let prevWord = ''
    TOKEN_RE.lastIndex = 0

    for (let m = TOKEN_RE.exec(code); m !== null; m = TOKEN_RE.exec(code)) {
        html += escapeHtml(code.slice(last, m.index))
        last = m.index + m[0].length
        const [
            token,
            comment,
            string,
            decorator,
            number,
            ident,
            op,
        ] = m

        if (comment) html += wrap('com', comment)
        else if (string) html += wrap('str', string)
        else if (decorator) html += wrap('dec', decorator)
        else if (number) html += wrap('num', number)
        else if (op) html += wrap('op', op)
        else if (ident) {
            const nextChar = code.slice(last).match(/^\s*(\S)/)?.[1]
            if (KEYWORDS.has(ident))
                html += wrap(ident === 'True' || ident === 'False' || ident === 'None' ? 'const' : 'kw', ident)
            else if (prevWord === 'def' || prevWord === 'class') html += wrap('def', ident)
            else if (ident === 'self' || ident === 'cls') html += wrap('self', ident)
            else if (BUILTINS.has(ident)) html += wrap('bi', ident)
            else if (nextChar === '(') html += wrap('fn', ident)
            else html += escapeHtml(ident)
        } else html += escapeHtml(token)

        if (ident) prevWord = ident
        else if (!/^\s*$/.test(token)) prevWord = ''
    }

    return html + escapeHtml(code.slice(last))
}
