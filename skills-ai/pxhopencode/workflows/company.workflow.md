# 🏢 Company Workflow — AI Company Master Orchestration

Workflow master điều phối toàn bộ AI Company. Khi user viết prompt, workflow này tự động chạy để biến ý tưởng thành sản phẩm release.

> **🌏 LUẬT NGÔN NGỮ**: Toàn bộ UI text trong code phải là **tiếng Việt** (nút bấm, tiêu đề, thông báo, menu, mô tả, label, placeholder, error message). Chỉ giữ tiếng Anh cho tên biến, hàm, class, API endpoint, package name. Code comments ưu tiên tiếng Việt.

## 🔄 QUY TRÌNH 11 BƯỚC

```
1. RECEIVE  ← Tiếp nhận prompt từ user
2. ANALYZE  ← PM phân tích yêu cầu
3. MEETING  ← Agents thảo luận, chọn giải pháp
4. PLAN     ← Lập kế hoạch chi tiết
5. ARCHITECT ← Thiết kế kiến trúc
6. CODE     ← Vibe code với workflow + skill phù hợp
7. TEST     ← QA chạy test, phát hiện bug
8. FIX      ← Fix-bugs sửa lỗi (nếu có)
9. REVIEW   ← Review-code kiểm tra chất lượng
10. RELEASE ← DevOps build + deploy
11. SAVE    ← Save-history lưu quyết định
```

Nếu bất kỳ bước nào fail → tự động quay lại bước phù hợp để fix.
Vòng lặp tiếp diễn tới khi release thành công hoặc user cancel.

---

## Bước 1: RECEIVE — Tiếp nhận

Nhận prompt từ user. Đây có thể là:
- Mô tả dự án mới: "Làm web bán hàng"
- Yêu cầu tính năng: "Thêm giỏ hàng"
- Bug report: "Login bị lỗi 500"
- Câu hỏi kỹ thuật: "Nên dùng DB gì?"

→ Gọi `@pxh-save-history update-status` để khởi tạo STATUS.md với giai đoạn NHẬN.
→ Chuyển sang Bước 2.

## Bước 2: ANALYZE — Phân tích (do PM thực hiện)

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

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn PHÂN TÍCH, công nghệ, mục tiêu.
→ Nếu rõ ràng → Bước 3. Nếu thiếu thông tin → hỏi user.

## Bước 3: MEETING — Agents thảo luận

Gọi `@meeting.workflow` với kết quả phân tích.
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

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn HỌP, kết quả thảo luận, công nghệ quyết định.
→ Bước 4.

## Bước 4: PLAN — Lập kế hoạch

Viết kế hoạch chi tiết:
```markdown
## 📋 Kế hoạch

### Phase 1: Khởi tạo
- Setup project structure
- Setup `.gitignore` (phù hợp tech stack, luôn có `.opencode`, `.playwright-mcp`, `.gitignore`)
- Cài dependencies

### Phase 2: Core features
- [Feature 1] → [thời gian]
- [Feature 2] → [thời gian]

### Phase 3: Testing
- Unit test cho logic
- Integration test cho API

### Phase 4: Release
- Build + Deploy
```

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn KẾ HOẠCH, kế hoạch chi tiết.
→ Bước 5.

## Bước 5: ARCHITECT — Thiết kế

Gọi `@pxh-architect <kế hoạch>` để thiết kế:
- Database schema
- API design
- Component tree
- Data flow

Lưu ADR (Architecture Decision Record) vào `docs/decisions/`.

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn THIẾT KẾ, quyết định kiến trúc.
→ Bước 6.

## Bước 6: CODE — Vibe code

Dựa vào kết quả meeting, chọn workflow phù hợp:

| Dự án | Gọi |
|-------|-----|
| Web | `@web.workflow <mô tả>` |
| Game 2D | `@game.workflow <mô tả>` + skill `skills/games/2d/game-h5-2d.md` |
| Game 3D | `@game.workflow <mô tả>` + skill `skills/games/3d/game-h5-3d.md` |
| AI | `@ai.workflow <mô tả>` + skill `skills/ais/*` |
| CLI Tool | `@pxh-expert` + skill `skills/tools/cli/SKILL.md` |
| Fix bug | `@pxh-fix-bugs <bug description>` |

Nếu dự án phức tạp → gọi `@pxh-expert` để nó chọn workflow và code tự động.

Sau khi code xong, chạy setup `.gitignore` ở folder root project:
- Nếu chưa có → tạo `.gitignore` với nội dung phù hợp tech stack + luôn thêm `.opencode`, `.playwright-mcp`, `.gitignore`
- Nếu đã có → ensure 3 dòng `.opencode`, `.playwright-mcp`, `.gitignore` tồn tại trong file

Sau đó, setup Playwright cho debug UI:
- Playwright MCP đã cấu hình trong `opencode.json` → tự động connected khi opencode khởi động
- Nếu dự án là web/game (có `package.json`) → kiểm tra `@playwright/test` trong devDependencies
- Nếu chưa có → chạy `npm install -D @playwright/test && npx playwright install chromium`
- Verify Playwright connected: dùng `browser_tabs` để kiểm tra browser

Nếu dự án chạy browser (web/game): tạo favicon SVG theo hướng dẫn trong `@web.workflow` (Bước 2.2) hoặc `@game.workflow` (Bước 2.2).

Sau đó:
- `git add . && git commit -m "feat: <mô tả>"`
- `git push` (nếu có remote)

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn VIẾT CODE, tính năng đã hoàn thành.
→ Bước 7.

## Bước 7: TEST — QA kiểm tra

Gọi `@pxh-qa` để:
1. Kiểm tra test suite
2. Chạy test
3. Báo cáo kết quả

```markdown
### Kết quả QA
- Pass: [N] / Fail: [N]
- Bug critical: [N]
- Quyết định: [PASS / CẦN FIX]
```

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn KIỂM TRA, kết quả QA.
- Nếu PASS → Bước 9
- Nếu CÓ BUG → Bước 8

## Bước 8: FIX — Sửa lỗi

Gọi `@pxh-fix-bugs` với danh sách bug từ QA.
Sau khi fix → quay lại Bước 7 (test lại).

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn SỬA LỖI, bug đã sửa.

Vòng lặp: **Test → Fix → Test → Fix** tới khi pass hoặc quá 3 lần.
Nếu quá 3 lần → báo PM.

## Bước 9: RÀ SOÁT — Code review

Gọi `@pxh-review-code` để review toàn bộ code thay đổi:
- Security scan
- Performance check
- Convention check
- Code quality

Nếu có issue → fix → quay lại Bước 7.
→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn RÀ SOÁT, kết quả review.
Nếu OK → Bước 10.

## Bước 10: PHÁT HÀNH — Build & báo user

Gọi `@release.workflow`:
1. Lint + Typecheck
2. Build
3. Báo user build xong → user tự deploy

→ Gọi `@pxh-save-history update-status` cập nhật giai đoạn PHÁT HÀNH, build version.

## Bước 11: SAVE — Lưu lịch sử

Gọi `@pxh-save-history` để:
1. Lưu session log vào `docs/changelog/YYYY-MM-DD.md`
2. Lưu ADR vào `docs/decisions/`
3. Lưu bug report vào `docs/bugs/`
4. Cập nhật STATUS.md: giai đoạn LƯU ✅ — dự án hoàn tất

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
| User cung cấp thông tin không đủ | Hỏi user, không đoán |
| Bug không fix được sau 3 lần | Báo user, đề xuất giải pháp thay thế |
| Build fail | Log lỗi, báo user |
| User muốn thay đổi giữa chừng | Dừng workflow hiện tại, bắt đầu analysis lại |
| Conflict giữa các agents | PM quyết định, user là sếp cuối cùng |
