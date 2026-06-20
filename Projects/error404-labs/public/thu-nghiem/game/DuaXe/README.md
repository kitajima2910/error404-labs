# pxhopencode / .opencode — AI Company cho Vibe Coding

Hệ thống AI agents tự động vibe code như một AI Company. Copy vào `.opencode/` của bất kỳ project nào, viết prompt → agents tự động thảo luận → code → test → fix → release. Enterprise AI Runtime 4-layer, structured contracts, retry/recovery/reflection policies.

---

## Năng lực kiến trúc

### 🤖 9 AI Agents chuyên biệt

| Agent | Tầng | Nhiệm vụ |
|-------|------|----------|
| `pxh-pm` | Tầng 2 — Điều phối | CEO: điều phối, routing, thi hành chính sách |
| `pxh-architect` | Tầng 3 — Kiến trúc sư | Thiết kế kiến trúc, tech stack, DB, API |
| `pxh-expert` | Tầng 3 — Lập trình | Vibe code tự động, chọn workflow + skill |
| `pxh-fix-bugs` | Tầng 3 — Sửa lỗi | Săn bug: stack trace → root cause → fix |
| `pxh-qa` | Tầng 3 — Kiểm thử | Chạy test, xác thực chất lượng |
| `pxh-review-code` | Tầng 3 — Rà soát | Bảo mật, hiệu năng, quy ước |
| `pxh-devops` | Tầng 3 — Xây dựng | Lint → typecheck → test → build |
| `pxh-save-history` | Tầng 4 — Hạ tầng | Lưu trạng thái, checkpoint, phục hồi |
| `pxh-help` | Tầng 1 — Giao diện | Hướng dẫn chọn workflow |

### 🏛 Enterprise AI Runtime (4 Tầng)

```
Tầng 1 (Giao diện)     → xác thực đầu vào, tạo Request contract
Tầng 2 (Điều phối)     → route tasks, theo dõi trạng thái, thi hành chính sách
Tầng 3 (Nhân công)     → 6 agent roles thực thi công việc
Tầng 4 (Hạ tầng)       → lưu trạng thái, checkpoint, phục vụ phục hồi
```

**Giao tiếp qua 6 contract cấu trúc:** Request, Task, Result, Response, Event, State.
**Chính sách:** Thử lại (exponential backoff, tối đa 3), Phục hồi (dựa trên checkpoint), Phản ánh (4 mức kích hoạt).
**Mở rộng:** Thêm worker mới → chỉ cần 1 dòng trong routing table. Zero thay đổi ở tầng khác.

### 🌐 7 Workflow tự động

| Lệnh | Làm được |
|------|----------|
| `/vibe` | Full AI Company: 11 bước từ nhận prompt → release |
| `/web` | Web app: React/Next.js + TypeScript + Tailwind + PostgreSQL |
| `/game` | Game H5: 2D (Phaser), 2.5D (Isometric), 3D (Three.js) |
| `/ai` | AI app: LLM, RAG pipeline, AI Agent, streaming |
| `/debug` | Debug: stack trace analysis, Playwright UI debug, root cause |
| `/meeting` | Agents thảo luận: architect, expert, qa, devops |
| `/release` | Build pipeline: lint → typecheck → test → build |

### 🛠 25 Skills (4 lĩnh vực)

| Kỹ năng | Mô tả |
|---------|-------|
| `skills/webs-*` | Frontend, Backend, Database, Auth, Styling, Testing, Deployment |
| `skills/games-*` | 2D, 2.5D, 3D, Core Engine, Physics, Audio, Assets, Optimization |
| `skills/ais-*` | LLM, RAG, AI Agent, Prompt Engineering, Production |
| `skills/tools-*` | CLI, Automation, Codegen, IDE Extensions, Packaging |

### 🔁 Chính sách Production

| Chính sách | Chi tiết |
|-----------|----------|
| Thử lại | Exponential backoff 1s→2s→4s, jitter ±25%, tối đa 3 lần |
| Phục hồi | Checkpoint trước mỗi chuyển tiếp tầng, Điều phối quyết định đường đi |
| Phản ánh | Task → Phase → Workflow → Sự cố, 4 mức độ, lưu tại `.opencode/docs/reflections/` |

### 🎯 Tính năng hỗ trợ

- **.opencode/STATUS.md real-time:** pxh-save-history tự động cập nhật dashboard sau mỗi phase
- **.gitignore tự động:** ensure `.opencode`, `.playwright-mcp`, `.gitignore` trong mọi project
- **Playwright MCP tích hợp:** debug UI browser tự động, snapshot, console, network
- **Favicon SVG tự động:** gradient + chữ cái đầu cho web/game
- **LUẬT NGÔN NGỮ:** UI text 100% tiếng Việt, code giữ tiếng Anh
- **Bảo toàn code:** rules chống CRUD, chỉ tác động trong TARGET, ưu tiên thay đổi tối thiểu

---

## Cài đặt

Copy toàn bộ thư mục này vào `.opencode/` trong project của bạn:

```bash
# Cách 1: Copy từ source
cp -r ../pxhopencode .opencode

# Cách 2: Copy vào .opencode có sẵn
# Tạo folder .opencode/ → copy nội dung pxhopencode vào đó
```

## Cấu trúc

```
.opencode/
├── opencode.json           # Config: agents, commands, skills, runtime
├── README.md
├── agents/                 # 9 agents (Tầng 1-4)
├── runtime/                # Enterprise AI Runtime
│   ├── README.md           # Tổng quan kiến trúc
│   ├── layers/             # Định nghĩa 4 tầng
│   ├── contracts/          # 6 contract giao tiếp
│   └── policies/           # Thử lại, Phục hồi, Phản ánh
├── workflows/              # 7 workflow templates
└── skills/                 # 4 lĩnh vực, 25 skill files
```

## Cách dùng

**Cách 1 — Prompt trực tiếp:** Gõ mô tả dự án. `pxh-pm` tự động phân tích → triệu tập meeting → chọn workflow → code → test → fix → review → release.

**Cách 2 — Lệnh workflow (gõ `/` trong TUI):**
- `/vibe` — Full AI Company
- `/web`, `/game`, `/ai` — Theo lĩnh vực
- `/debug` — Sửa lỗi
- `/release` — Build pipeline
- `/meeting` — Agents thảo luận

**Cách 3 — Gọi agent trực tiếp (dùng `@` trong prompt):**
`@pxh-expert`, `@pxh-architect`, `@pxh-qa`, `@pxh-fix-bugs`, `@pxh-review-code`, `@pxh-devops`, `@pxh-save-history`, `@pxh-help`

---

## Kiến trúc Runtime

```
Tầng 1 (Giao diện)     → pxh-help         — xác thực đầu vào, tạo Request
Tầng 2 (Điều phối)     → pxh-pm           — route tasks, thi hành chính sách
Tầng 3 (Nhân công)     → 6 agents         — thực thi công việc
Tầng 4 (Hạ tầng)       → pxh-save-history — lưu trạng thái, checkpoint
```

Chi tiết: `runtime/README.md`

---

**Tác giả: Phạm Xuân Hoài - Error404-Labs.Info.Vn**
