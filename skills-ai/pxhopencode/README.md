# pxhopencode — AI Company cho Vibe Coding

Hệ thống agents tự động vibe code như một AI Company. Viết prompt → agents thảo luận → code → test → fix → release.

## Tính năng nổi bật

- **STATUS.md tự động** — pxh-save-history cập nhật real-time qua từng giai đoạn
- **.gitignore tự động** — tạo nếu chưa có, luôn ensure `.opencode`, `.playwright-mcp`, `.gitignore` được ignore
- **Playwright MCP tích hợp** — debug UI tự động, auto-install nếu chưa có
- **LUẬT NGÔN NGỮ** — UI text 100% tiếng Việt, giữ tiếng Anh cho code
- **Favicon SVG** — tự tạo favicon gradient + chữ cái đầu cho web/game

## Cấu trúc project

```
pxhopencode/
├── opencode.json          # Config chính: default_agent, commands, skills paths
├── README.md
├── .gitignore             # Ignore node_modules, .env, .opencode, ...
├── agents/                # Định nghĩa 9 agents
│   ├── pxh-pm.md          # default_agent — CEO / Project Manager
│   ├── pxh-architect.md   # Thiết kế kiến trúc, chọn tech stack
│   ├── pxh-devops.md      # Lint, typecheck, test, build
│   ├── pxh-expert.md      # Cỗ máy vibe code tự động
│   ├── pxh-fix-bugs.md    # Săn và sửa bug
│   ├── pxh-help.md        # Hướng dẫn chọn workflow
│   ├── pxh-qa.md          # QA Engineer — test, validate
│   ├── pxh-review-code.md # Code reviewer
│   └── pxh-save-history.md# Lưu quyết định kỹ thuật
├── skills/                # Skill instructions cho từng lĩnh vực
│   ├── ais/               # AI/ML: LLM, RAG, Agent, Prompt
│   ├── games/             # Game: 2D, 2.5D, 3D, Physics, Audio
│   ├── tools/             # CLI, Automation, Codegen, Extensions
│   └── webs/              # Web: Frontend, Backend, Database, Auth...
└── workflows/             # Workflow templates
    ├── company.workflow.md# Full quy trình AI Company
    ├── meeting.workflow.md# Agents thảo luận giải pháp
    ├── web.workflow.md    # Phát triển web app
    ├── game.workflow.md   # Phát triển game HTML5
    ├── ai.workflow.md     # Phát triển ứng dụng AI
    ├── debug.workflow.md  # Debug + fix bug
    └── release.workflow.md# Build pipeline
```

## Cách dùng

### Cách 1: Viết prompt trực tiếp

Chỉ cần gõ mô tả dự án. `pxh-pm` (default_agent) sẽ tự động:

1. Phân tích yêu cầu
2. Triệu tập meeting các agents thảo luận
3. Chọn workflow + skill
4. Code → Test → Fix → Review → Release

### Cách 2: Dùng lệnh

- `@vibe` — Chạy full quy trình AI Company
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

---

**Tác giả: Phạm Xuân Hoài - Error404-Labs.Info.Vn**
