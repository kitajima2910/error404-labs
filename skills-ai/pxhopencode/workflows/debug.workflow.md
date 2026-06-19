# 🐛 Debug Workflow — Sửa lỗi & Tối ưu

Dùng workflow này khi bạn: fix bug, troubleshoot error, tối ưu hiệu năng, refactor code khẩn cấp, migrate data, gỡ rối deployment.

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
| TypeScript/JavaScript | Chrome DevTools, `node --inspect`, `console.trace()`, `debugger;` |
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
2. `@pxh-review-code` — Review fix có sạch không
3. `@release.workflow` — Deploy hotfix
4. `@pxh-save-history` — Lưu root cause & fix

### Liên kết
- Workflow cha: `@company.workflow`
- Agents: `@pxh-pm`, `@pxh-qa`, `@pxh-review-code`, `@pxh-devops`
