# 🏢 Company Workflow — AI Company Master Orchestration (Điều phối tổng thể)

Workflow master điều phối toàn bộ AI Company (Công ty AI). Khi user viết prompt, workflow này tự động chạy để biến ý tưởng thành sản phẩm phát hành.

> **🌏 LUẬT NGÔN NGỮ**: Toàn bộ UI text trong code phải là **tiếng Việt** (nút bấm, tiêu đề, thông báo, menu, mô tả, label, placeholder, error message). Chỉ giữ tiếng Anh cho tên biến, hàm, class, API endpoint, package name. Code comments ưu tiên tiếng Việt.

## 🔄 QUY TRÌNH 11 BƯỚC (Runtime 4-Tầng Model)

Mỗi bước chạy qua Runtime layers theo thứ tự: **1 → 2 → 3 → 4 → 2 → 1**

```
Tầng 1 (Interface): Tiếp nhận & validate prompt → build Request contract
       │
       ▼
Tầng 2 (Orchestration): Analyze → Plan → Route
       │
       ▼
Tầng 3 (Worker): Execute domain tasks (architect → code → test → fix → review → build)
       │
       ▼
Tầng 4 (Infrastructure): Persist state, log, checkpoint
       │
       ▼
Tầng 2 (Orchestration): Evaluate → next step or Response
       │
       ▼
Tầng 1 (Interface): Format output → present to user
```

### 11 bước chi tiết

```
1. NHẬN     ← Tiếp nhận prompt từ user [Tầng 1 → 2]
2. PHÂN TÍCH ← PM phân tích yêu cầu [Tầng 2]
3. HỌP       ← Agents thảo luận, chọn giải pháp [Tầng 2]
4. KẾ HOẠCH  ← Lập kế hoạch chi tiết [Tầng 2]
5. THIẾT KẾ  ← Thiết kế kiến trúc [Tầng 3 — Nhân công / Kiến trúc sư]
6. CODE      ← Vibe code với workflow + skill phù hợp [Tầng 3 — Nhân công / Lập trình]
7. KIỂM TRA  ← QA chạy test, phát hiện bug [Tầng 3 — Nhân công / Kiểm thử]
8. SỬA       ← Sửa lỗi (nếu có) [Tầng 3 — Nhân công / Sửa lỗi]
9. RÀ SOÁT   ← Rà soát chất lượng [Tầng 3 — Nhân công / Rà soát]
10. PHÁT HÀNH ← Build + deploy [Tầng 3 — Nhân công / Xây dựng]
11. LƯU       ← Lưu quyết định [Tầng 4 — Hạ tầng]
```

Nếu bất kỳ bước nào fail → tự động quay lại bước phù hợp để fix.
Vòng lặp tiếp diễn tới khi release thành công hoặc user cancel.

---

## Bước 1: NHẬN — Tiếp nhận

Nhận prompt từ user. Đây có thể là:
- Mô tả dự án mới: "Làm web bán hàng"
- Yêu cầu tính năng: "Thêm giỏ hàng"
- Bug report: "Login bị lỗi 500"
- Câu hỏi kỹ thuật: "Nên dùng DB gì?"

→ Tầng 4: Gửi `Event{type: status, phase: "receive"}` đến `@pxh-save-history` để khởi tạo .opencode/STATUS.md với giai đoạn NHẬN.
→ Tầng 2: Evaluate → Chuyển sang Bước 2.

## Bước 2: PHÂN TÍCH — Phân tích (do PM thực hiện)

```markdown
### 📊 Phân tích
| Field | Value |
|-------|-------|
| Loại | [Web / Game / AI / Tool / Debug] |
| Quy mô | [Small / Medium / Large] |
| Công nghệ gợi ý | [...] |
| Mục tiêu | [MVP / Production / Fix bug] |
| Ràng buộc | [...] |
```

→ Tầng 4: Gửi `Event{type: status, phase: "analyze", data: {tech, goal}}` đến `@pxh-save-history`.
→ Nếu rõ ràng → Bước 3. Nếu thiếu thông tin → hỏi user.

## Bước 3: HỌP — Agents thảo luận

Gọi `@meeting` với kết quả phân tích.
Agents tham gia:
- `@pxh-architect` — Phản biện kiến trúc
- `@pxh-expert` — Đánh giá khả thi
- `@pxh-qa` — Chiến lược test
- `@pxh-devops` — Yêu cầu infrastructure

Kết quả meeting:
```
✅ Đã thống nhất:
- Tech stack: [quyết định]
- Workflow: [@workflow]
- Skills: [skill path]
- Timeline: [ước lượng]
```

→ Tầng 4: Gửi `Event{type: decision, phase: "meeting", data: {consensus, tech_stack}}` đến `@pxh-save-history`.
→ Bước 4.

## Bước 4: KẾ HOẠCH — Lập kế hoạch

Viết kế hoạch chi tiết:
```markdown
## 📋 Kế hoạch

### Giai đoạn 1: Khởi tạo
- Setup project structure
- Setup `.gitignore` (phù hợp tech stack, luôn có `.opencode`, `.playwright-mcp`, `.gitignore`)
- Cài dependencies

### Giai đoạn 2: Tính năng chính
- [Feature 1] → [thời gian]
- [Feature 2] → [thời gian]

### Giai đoạn 3: Kiểm thử
- Unit test cho logic
- Integration test cho API

### Giai đoạn 4: Phát hành
- Build + Deploy
```

→ Tầng 4: Gửi `Event{type: status, phase: "plan", data: {plan}}` đến `@pxh-save-history`.
→ Bước 5.

## Bước 5: THIẾT KẾ — Thiết kế [Tầng 2 → Tầng 3]

Tầng 2 (Orchestration) tạo `Task{phase: "architect", target: plan, type: design}` → route đến `@pxh-architect`:
- Database schema
- API design
- Component tree
- Data flow

Tầng 3 trả về `Result{status: done, artifacts: [schema, api_docs, ...]}`.
Lưu ADR (Architecture Decision Record) vào `.opencode/docs/decisions/`.

→ Tầng 4: Gửi `Event{type: status, phase: "architect", data: {decisions}}` đến `@pxh-save-history`.
→ Bước 6.

## Bước 6: CODE — Vibe code [Tầng 2 → Tầng 3]

Dựa vào kết quả meeting, Tầng 2 (Orchestration) chọn workflow phù hợp và tạo Task contracts:

| Dự án | Task contract | Route đến |
|-------|--------------|-----------|
| Web | `Task{phase: "code", workflow: "web", target: mô tả}` | `@web` |
| Game 2D | `Task{phase: "code", workflow: "game", skill: "2d", target: mô tả}` | `@game` |
| Game 3D | `Task{phase: "code", workflow: "game", skill: "3d", target: mô tả}` | `@game` |
| AI | `Task{phase: "code", workflow: "ai", skills: "ais/*", target: mô tả}` | `@ai` |
| CLI Tool | `Task{phase: "code", target: mô tả, skill: "tools/cli"}` | `@pxh-expert` |
| Fix bug | `Task{phase: "fix", target: bug description}` | `@pxh-fix-bugs` |

Nếu dự án phức tạp → route `Task{phase: "code", type: "auto"}` đến `@pxh-expert` để tự chọn workflow và code.

Tầng 3 (Worker / Executor) code theo workflow + skill → trả về `Result{status: done, features: [], output: files}`.

Sau khi code xong, chạy setup `.gitignore` ở folder root project:
- Nếu chưa có → tạo `.gitignore` với nội dung phù hợp tech stack + luôn thêm `.opencode`, `.playwright-mcp`, `.gitignore`
- Nếu đã có → ensure 3 dòng `.opencode`, `.playwright-mcp`, `.gitignore` tồn tại trong file

Sau đó, setup Playwright cho debug UI:
- Playwright MCP đã cấu hình trong `opencode.json` → tự động connected khi opencode khởi động
- Nếu dự án là web/game (có `package.json`) → kiểm tra `@playwright/test` trong devDependencies
- Nếu chưa có → chạy `npm install -D @playwright/test && npx playwright install chromium`
- Verify Playwright connected: dùng `browser_tabs` để kiểm tra browser

Nếu dự án chạy browser (web/game): tạo favicon SVG theo hướng dẫn trong `web.workflow.md` (Bước 2.2) hoặc `game.workflow.md` (Bước 2.2).

Sau đó:
- `git add . && git commit -m "feat: <mô tả>"`
- `git push` (nếu có remote)

→ Tầng 4: Gửi `Event{type: status, phase: "code", data: {features}}` đến `@pxh-save-history`.
→ Bước 7.

## Bước 7: KIỂM TRA — QA kiểm tra [Tầng 2 → Tầng 3]

Tầng 2 (Orchestration) tạo `Task{phase: "test", target: code, context: test suite}` → route đến `@pxh-qa`:
1. Kiểm tra test suite
2. Chạy test
3. Trả về `Result{status: pass/fail, pass_count: N, fail_count: N, bugs: []}`

```markdown
### Kết quả QA
- Pass: [N] / Fail: [N]
- Bug critical: [N]
- Quyết định: [ĐẠT / CẦN SỬA]
```

→ Tầng 4: Gửi `Event{type: status, phase: "test", data: {qa_result}}` đến `@pxh-save-history`.
- Nếu PASS → Bước 9
- Nếu CÓ BUG → Bước 8

## Bước 8: SỬA — Sửa lỗi [Tầng 2 → Tầng 3]

Tầng 2 (Orchestration) đọc `Result.bugs[]` từ QA → tạo `Task{phase: "fix", target: bugs, context: stack_trace}` → route đến `@pxh-fix-bugs`.
Sau khi fix → `Result{status: fixed, changes: []}` → Tầng 2 evaluate → quay lại Bước 7 (test lại).

→ Tầng 4: Gửi `Event{type: status, phase: "fix", data: {fixed_bugs}}` đến `@pxh-save-history`.

Vòng lặp: **Test → Fix → Test → Fix** tới khi `Result{status: pass}` hoặc quá 3 lần.
Nếu quá 3 lần → Tầng 2 escalates → báo user.

## Bước 9: RÀ SOÁT — Rà soát code [Tầng 2 → Tầng 3]

Tầng 2 (Orchestration) tạo `Task{phase: "review", target: code_diff, focus: [security, perf, convention, quality]}` → route đến `@pxh-review-code`:
- Security scan
- Performance check
- Convention check
- Code quality
- Trả về `Result{approved: true/false, issues: [], score}`

Nếu có issue → Tầng 2 route `Task{phase: "fix", target: issues}` → fix → quay lại Bước 7.
→ Tầng 4: Gửi `Event{type: status, phase: "review", data: {review_result}}` đến `@pxh-save-history`.
Nếu OK → Bước 10.

## Bước 10: PHÁT HÀNH — Build & báo user [Tầng 2 → Tầng 3]

Tầng 2 (Orchestration) tạo `Task{phase: "build", gate_check: {qa: pass, review: pass}}` → route đến `@pxh-devops`:
1. Lint + Typecheck → `Result{lint: pass/fail}`
2. Build → `Result{build: pass/fail, size, path}`
3. Tầng 1 (Interface): Báo user build xong → user tự deploy

→ Tầng 4: Gửi `Event{type: status, phase: "release", data: {build_version, size}}` đến `@pxh-save-history`.

## Bước 11: LƯU — Lưu lịch sử [Tầng 2 → Tầng 4]

Tầng 2 (Orchestration) gửi `Event{type: session_end, data: {logs, decisions, bugs, phase: complete}}` đến `@pxh-save-history`:
1. Lưu session log vào `.opencode/docs/changelog/YYYY-MM-DD.md`
2. Lưu ADR vào `.opencode/docs/decisions/`
3. Lưu bug report vào `.opencode/docs/bugs/`
4. Cập nhật .opencode/STATUS.md: giai đoạn LƯU ✅ — dự án hoàn tất

Tầng 4 trả về `Confirmed{status: saved}` → Tầng 2 báo thành công qua Tầng 1 đến user.

---

## 🔄 VÒNG LẶP PHẢN HỒI

```
Bước 6 (Code) → Bước 7 (Test)
                     ↓ (có bug)
                 Bước 8 (Fix) ─→ quay lại Bước 7

Bước 9 (Có issue) → fix → quay lại Bước 7 (Test lại)

Bước 10 (Build fail) → Fix → Bước 7 (Test lại)
```

Tối đa 3 lần lặp cho mỗi vòng. Nếu vẫn lỗi → báo user.

## 🚨 XỬ LÝ NGOẠI LỆ

| Tình huống | Xử lý |
|-----------|-------|
| User cung cấp thông tin không đủ | Tầng 1 hỏi user, không đoán |
| Bug không fix được sau 3 lần | Tầng 2 escalate → báo user, đề xuất giải pháp thay thế |
| Build fail | Tầng 2 log lỗi → Tầng 4 persist → báo user |
| User muốn thay đổi giữa chừng / cancel | Tầng 2 dừng workflow ngay, gửi `Event{type: cancel, state: current}` đến Tầng 4 để lưu state. Nếu user muốn quay lại → tạo Request mới |
| Conflict giữa các agents | Tầng 2 (Orchestration) phân xử, user là sếp cuối cùng |
