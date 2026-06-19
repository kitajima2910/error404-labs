# 🐛 Debug Workflow — Sửa lỗi & Tối ưu

Dùng workflow này khi bạn: fix bug, troubleshoot error, tối ưu hiệu năng, refactor code khẩn cấp, migrate data, gỡ rối deployment.

> **🌏 LUẬT NGÔN NGỮ**: Khi fix UI bug, đảm bảo UI text sau fix vẫn là **tiếng Việt**.

## 🚀 Quy trình debug chuẩn

### Bước 0: Bình tĩnh — đọc lỗi!

Luôn đọc kỹ error message / stack trace / log trước khi làm bất cứ điều gì.

### Bước 1: Phân loại lỗi

| Loại lỗi | Dấu hiệu | Cách tiếp cận |
|----------|---------|---------------|
| 🔴 Runtime | Crash, exception, stack trace | Đọc stack trace từ dưới lên |
| 🟡 Logic | Behavior sai nhưng không crash | Debug step-by-step, print log |
| 🟢 Build | Compile error, type error | Đọc dòng báo lỗi, kiểm tra type |
| 🔵 Network | 4xx/5xx, timeout, CORS, WebSocket | Kiểm tra request/response, network tab |
| 🟣 Performance | Chậm, lag, memory leak | Profiling, benchmark, memory snapshot |
| ⚪ Database | Query lỗi, deadlock, migration fail | EXPLAIN ANALYZE, transaction log |

### Bước 2: Tái hiện lỗi

```bash
# Chạy lại với verbose/debug mode
npm run dev -- --debug
# Hoặc
RUST_LOG=debug cargo run
# Hoặc
python -m debugger app.py
```

Cố gắng tạo minimal reproduction — loại bỏ code không liên quan.

### Bước 3: Khoanh vùng

```
Error message → File & line → Call stack → Input data → Logic
```

Sử dụng:
- `console.log` / `println!` / `print()` tại các điểm nghi ngờ
- Breakpoints (nếu có thể)
- Git blame để xem ai sửa gì gần đây
- `git log --oneline -20` để xem thay đổi gần nhất

### Bước 3.1: Debug UI/Browser với Playwright

> Playwright MCP đã cấu hình trong `opencode.json` → auto-start khi opencode chạy.
> Nếu chưa connected (hiếm khi xảy ra): kiểm tra log opencode hoặc restart.
> Nếu cần chạy Playwright test (`npx playwright test`):
> - `npm ls @playwright/test` nếu lỗi thì `npm install -D @playwright/test && npx playwright install chromium`
> - Verify MCP connected: dùng `browser_tabs`

Khi bug liên quan đến frontend (UI sai, network lỗi, JavaScript runtime), dùng Playwright để khảo sát:

| Bước | Playwright tool | Mục đích |
|------|----------------|----------|
| 1 | `browser_navigate` + `browser_snapshot` | Chụp cấu trúc accessibility của trang để phát hiện element thiếu/sai |
| 2 | `browser_take_screenshot` | Chụp ảnh trực quan để so sánh UI đúng/sai |
| 3 | `browser_console_messages(level: "error")` | Bắt lỗi JavaScript ẩn (uncaught exception, network fail) |
| 4 | `browser_console_messages(level: "warning")` | Tìm warning không hiện trên UI |
| 5 | `browser_network_requests(static: false)` | Liệt kê requests — phát hiện API fail, 4xx, 5xx, timeout |
| 6 | `browser_network_request(index)` | Xem chi tiết headers + body của request/response đáng ngờ |
| 7 | `browser_evaluate(function)` | Inject JavaScript để inspect state, variables, store |
| 8 | `browser_click` / `browser_fill_form` | Tái hiện chính xác thao tác user — kiểm tra behavior |

Khi dùng Playwright để debug, luôn theo trình tự:

```markdown
1. **Snapshot**: `browser_snapshot` → xem cấu trúc DOM có đúng không
2. **Console**: `browser_console_messages(error)` → có lỗi JS gì không
3. **Network**: `browser_network_requests` → request nào fail
4. **Inspect**: `browser_evaluate` → check state/component
5. **Tái hiện**: `browser_click` / `browser_fill_form` → reproduce bug step-by-step
```

> Nếu bug là UI rendering sai → ưu tiên snapshot + screenshot trước.
> Nếu bug là API/network → ưu tiên console messages + network requests.
> Nếu bug là logic tương tác → ưu tiên click + fill form + evaluate.

### Bước 4: Tìm root cause

Kỹ thuật tìm nguyên nhân:
- **Rubber duck debugging**: Giải thích code cho người khác (hoặc con vịt)
- **Binary search**: Comment 1/2 code, xem lỗi còn không
- **Hypothesis testing**: "Nếu lỗi là do X, thì khi sửa X lỗi sẽ hết"

### Bước 5: Fix & Verify

1. Viết fix NGẮN NHẤT có thể
2. Chạy lại reproduction steps — lỗi còn không?
3. Chạy test: `npm test` / `pytest` / `cargo test`
4. Chạy typecheck: `npx tsc --noEmit`

### Bước 6: Prevent

- [ ] Thêm unit test cho edge case này
- [ ] Thêm error boundary / try-catch
- [ ] Thêm validation
- [ ] Log lỗi cho monitoring

## Các công cụ debug theo ngôn ngữ

| Language | Tools |
|----------|-------|
| TypeScript/JavaScript (Browser) | **Playwright** 🎯, Chrome DevTools, React DevTools, Vue DevTools |
| TypeScript/JavaScript (Node) | `node --inspect`, `console.trace()`, `debugger;`, `ndb` |
| Python | `pdb`, `ipdb`, `logging`, `traceback` |
| Rust | `println!`, `dbg!`, `RUST_BACKTRACE=1`, `cargo-insta` |
| Go | `fmt.Println`, `pprof`, `delve` |
| Database | `EXPLAIN ANALYZE`, `pg_stat_activity`, `SLOW_QUERY_LOG` |

## Khi bế tắc

- Kiểm tra: version conflict, dependency update gần đây
- Dùng `@pxh-fix-bugs` cho các bug phức tạp
- Dùng websearch tra error message (Stack Overflow, GitHub Issues)
- Nếu 15 phút không tìm ra → dừng, hỏi user thêm context

## Quality & Release

Sau khi fix xong:
1. `@pxh-qa` — Chạy test, xác nhận bug đã hết
2. `@pxh-fix-bugs` — Sửa lỗi (nếu QA phát hiện thêm)
3. `@pxh-review-code` — Review fix có sạch không
4. `@release` — Deploy hotfix
5. `@pxh-save-history` — Lưu root cause & fix + cập nhật STATUS.md

### Liên kết
- Workflow cha: `@vibe`
- Agents: `@pxh-pm`, `@pxh-qa`, `@pxh-review-code`, `@pxh-devops`
