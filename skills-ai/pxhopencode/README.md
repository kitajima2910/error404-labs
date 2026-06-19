# pxhopencode — AI Company cho Vibe Coding

Hệ thống agents tự động vibe code như một AI Company. Viết prompt → agents thảo luận → code → test → fix → release.

## 🏢 Cấu trúc AI Company

```
BẠN (User)
  │
  ▼ Viết prompt
┌─────────────────────────────────────────────────┐
│  pxh-pm (CEO / Project Manager) ← default_agent │
│  • Tiếp nhận yêu cầu                             │
│  • Triệu tập meeting agents                      │
│  • Chọn workflow phù hợp                         │
│  • Phối hợp toàn bộ quy trình                    │
└──────────┬──────────────────────────────────────┘
           │
    ┌──────┼──────────┬─────────────┬──────────────┐
    ▼      ▼          ▼             ▼              ▼
┌────────┐ ┌────────┐ ┌─────────┐ ┌───────────┐ ┌──────────┐
│pxh-    │ │pxh-    │ │pxh-     │ │pxh-       │ │pxh-      │
│architect│ │expert  │ │fix-bugs │ │review-code│ │devops    │
│Architect│ │Coder   │ │Bug      │ │Reviewer   │ │DevOps    │
└────────┘ └────────┘ └─────────┘ └───────────┘ └──────────┘
     │          │          │              │            │
     ▼          ▼          ▼              ▼            ▼
┌──────────────────────────────────────────────────────────┐
│  pxh-help (Hướng dẫn)  │  pxh-qa (QA Test)               │
│  pxh-save-history (Lưu)│  Skills + Workflows              │
└──────────────────────────────────────────────────────────┘
```

## 🚀 Cách dùng

### Cách 1: Viết prompt trực tiếp (khuyên dùng)
Chỉ cần gõ mô tả dự án. `pxh-pm` (default_agent) sẽ tự động:
1. Phân tích yêu cầu
2. Triệu tập meeting các agents thảo luận
3. Chọn workflow + skill
4. Code → Test → Fix → Review → Release

### Cách 2: Dùng lệnh
- `@vibe` — Chạy company workflow vibe code
- `@meeting` — Triệu tập meeting agents thảo luận
- `@release` — Build pipeline (lint → test → build)
- `@debug` — Debug + fix bug tự động
- `@web` — Phát triển web app
- `@game` — Phát triển game HTML5
- `@ai` — Phát triển ứng dụng AI

### Cách 3: Gọi agent trực tiếp
- `@pxh-help` — Hướng dẫn chọn workflow
- `@pxh-expert` — Vibe code luôn
- `@pxh-architect` — Thiết kế kiến trúc
- `@pxh-qa` — Chạy test + validate
- `@pxh-fix-bugs` — Sửa bug
- `@pxh-review-code` — Review code
- `@pxh-devops` — Build pipeline
- `@pxh-save-history` — Lưu lịch sử

### Cách 4: Gọi workflow
- `@company.workflow <mô tả>` — Full quy trình AI Company
- `@meeting.workflow <chủ đề>` — Agents thảo luận
- `@release.workflow` — Build pipeline (lint → test → build)
- `@web.workflow <mô tả>` — Phát triển web
- `@game.workflow <mô tả>` — Phát triển game
- `@ai.workflow <mô tả>` — Phát triển AI
- `@debug.workflow <lỗi>` — Debug

## 🔄 Quy trình tự động (Company Workflow)

```
1. RECEIVE    ← User viết prompt
2. ANALYZE   ← PM phân tích yêu cầu
3. MEETING   ← Agents thảo luận, chọn giải pháp
4. PLAN      ← Lập kế hoạch chi tiết
5. ARCHITECT ← Thiết kế kiến trúc
6. CODE      ← Vibe code (pxh-expert + workflow + skill)
7. TEST      ← QA chạy test, báo cáo bug
8. FIX       ← Fix-bugs sửa lỗi
9. REVIEW    ← Review-code kiểm tra chất lượng
10. BUILD    ← Build pipeline (bạn tự deploy)
11. SAVE     ← Save-history lưu quyết định
```

Nếu lỗi ở step N → tự động quay lại step phù hợp để fix.
Vòng lặp tiếp diễn tới khi release thành công.

## 🧠 Skills
- `ais/` — AI/ML: LLM, RAG, Agent, Prompt, Production
- `games/` — Game: Core, 2D, 2.5D, 3D, Physics, Audio, Optimization
- `tools/` — Tools: CLI, Automation, Codegen, Extensions, Packaging
- `webs/` — Web: Frontend, Backend, Database, Auth, Styling, Testing, Deployment

---

**Tác giả: Phạm Xuân Hoài - Error404-Labs.Info.Vn**
