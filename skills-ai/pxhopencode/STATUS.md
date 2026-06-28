# 📊 pxhopencode — AI Company cho Vibe Coding

## 🎯 Tổng quan

| Trường | Giá trị |
|--------|---------|
| Giai đoạn | PHÁT HÀNH ✅ SẴN SÀNG COPY VÀO .opencode/ |
| Mô hình | AI Company — 4-Tầng Enterprise AI Runtime |
| Agents | 11 chuyên biệt (Tầng 1-4, gồm Prompt Optimizer & Planner) |
| Workflows | 8 theo lĩnh vực |
| Skills | 4 lĩnh vực (web, game, AI, công cụ) |
| Contracts | 6 cấu trúc (Yêu cầu, Việc, Kết quả, Phản hồi, Sự kiện, Trạng thái) |
| Policies | 3 (Thử lại, Phục hồi, Phản ánh) |

## 🏛 Kiến trúc 4 Tầng Runtime

```
Tầng 1+ (Prompt Opt.) pxh-prompt-optimizer → Tầng 1 (Giao diện)
Tầng 1 (Giao diện)    pxh-help           ←/→ Tầng 2 (Điều phối)
Tầng 2 (Điều phối)    pxh-pm + pxh-planner ←/→ Tầng 3 (Nhân công)
Tầng 3 (Nhân công)    8 agents           → Tầng 4 (Hạ tầng)
Tầng 4 (Hạ tầng)      pxh-save-history   → Tầng 2 (trạng thái/phục hồi)
```

## 🔗 Ma trận liên kết toàn bộ hệ thống

| Thành phần | Agents | Runtime | Workflows | Skills | Contracts | Policies | Cấu hình |
|-----------|--------|---------|-----------|--------|-----------|----------|---------|
| **agents/** (11 files) | — | ✅ Thẻ layer + tham chiếu | ✅ Liên kết giai đoạn | ✅ Tham chiếu skill | ✅ Tham chiếu contract | ✅ Tham chiếu policy | ✅ opencode.json |
| **runtime/** (9 files) | ✅ Agents chủ quản | — | ✅ Luồng thực thi | — | ✅ Sơ đồ đầy đủ | ✅ Tham chiếu thi hành | ✅ instructions |
| **workflows/** (8 files) | ✅ Tham chiếu agent | ✅ Luồng layer | — | ✅ Tham chiếu skill | ✅ Tham chiếu contract | ✅ Tham chiếu policy | ✅ Lệnh |
| **skills/** (4 lĩnh vực) | ✅ Agent sử dụng | ✅ Ngữ cảnh layer | ✅ Được gọi bởi | — | ✅ Tham chiếu contract | — | ✅ skills.paths |
| **contracts/** (1 file) | ✅ Người gửi/nhận | ✅ Hướng layer | ✅ Luồng theo giai đoạn | — | — | ✅ Tương tác policy | — |
| **policies/** (3 files) | ✅ Agent bị ảnh hưởng | ✅ Tầng thi hành | — | — | ✅ Tham chiếu contract | — | — |
| **opencode.json** | ✅ Mô tả | ✅ instructions | ✅ Lệnh | ✅ đường dẫn | — | — | — |
| **STATUS.md** | ✅ Liệt kê | ✅ Theo dõi | ✅ Theo dõi | ✅ Theo dõi | ✅ Liệt kê | ✅ Liệt kê | ✅ Tham chiếu |

## 📁 Cấu trúc project

```
.opencode/
├── opencode.json          # TRUNG TÂM — agents, lệnh, đường dẫn skills, instructions
├── STATUS.md              # BẢNG ĐIỀU KHIỂN — trạng thái dự án theo thời gian thực
├── README.md              # Tổng quan
├── ENTERPRISE.md          # Hướng dẫn doanh nghiệp
├── .gitignore             # Luật bỏ qua
│
├── agents/                # 11 agents, mỗi agent có thẻ runtime layer
│   ├── pxh-prompt-optimizer.md [Tầng 1+ — Prompt Optimization]
│   ├── pxh-pm.md          [Tầng 2 — Điều phối]
│   ├── pxh-help.md        [Tầng 1 — Giao diện]
│   ├── pxh-planner.md     [Tầng 2 — Điều phối / Planning]
│   ├── pxh-architect.md   [Tầng 3 — Nhân công / Kiến trúc sư]
│   ├── pxh-expert.md      [Tầng 3 — Nhân công / Lập trình]
│   ├── pxh-fix-bugs.md    [Tầng 3 — Nhân công / Sửa lỗi]
│   ├── pxh-qa.md          [Tầng 3 — Nhân công / Kiểm thử]
│   ├── pxh-review-code.md [Tầng 3 — Nhân công / Rà soát]
│   ├── pxh-devops.md      [Tầng 3 — Nhân công / Xây dựng]
│   └── pxh-save-history.md [Tầng 4 — Hạ tầng]
│
├── runtime/               # Enterprise AI Runtime Architecture
│   ├── README.md          # Tổng quan + trách nhiệm layer + thứ tự thực thi
│   ├── layers/            # Định nghĩa 4 layer
│   │   ├── 01-interface.md
│   │   ├── 02-orchestration.md
│   │   ├── 03-worker.md
│   │   └── 04-infrastructure.md
│   ├── contracts/
│   │   └── README.md      # 6 contracts (Yêu cầu, Việc, Kết quả, Phản hồi, Sự kiện, Trạng thái)
│   └── policies/
│       ├── retry.md       # Thử lại: exponential backoff, tối đa 3
│       ├── recovery.md    # Phục hồi: checkpoint-based, theo layer
│       └── reflection.md  # Phản ánh: 4 mức độ kích hoạt
│
├── workflows/             # 8 workflow templates
│   ├── optimized.workflow.md # Prompt Optimization → Planning → Execute → Giải thích VN
│   ├── company.workflow.md # Master — 11 bước với chú thích layer
│   ├── meeting.workflow.md # Agents thảo luận và quyết định
│   ├── web.workflow.md    # Phát triển web app
│   ├── game.workflow.md   # Phát triển game H5
│   ├── ai.workflow.md     # Phát triển ứng dụng AI/ML
│   ├── debug.workflow.md  # Sửa lỗi và tối ưu
│   └── release.workflow.md # Build pipeline
│
└── skills/                # 4 lĩnh vực, 25 skills
    ├── webs-*/            # Frontend, Backend, Database, Auth, Styling, Testing, Deployment
    ├── games-*/           # 2D, 2.5D, 3D, Core, Physics, Audio, Assets, Optimization
    ├── ais-*/             # LLM, RAG, Agent, Prompt, Production
    └── tools-*/           # CLI, Automation, Codegen, Extensions, Packaging
```

## 📋 Luồng thực thi đầy đủ (tự động hoàn toàn)

```
Người dùng nhập prompt (có thể tiếng Việt)
  │
  ▼ [Tầng 1+ — Prompt Optimization]
  pxh-prompt-optimizer: translate → rewrite → gap analysis → bổ sung requirement
  │ Hiển thị 🇬🇧 English translation cho user kiểm tra
  ▼ [Tầng 2 — Auto Planning]
  pxh-planner: auto-detect domain + workflow + effort
  │ Scale pipeline: Small (Expert→Build) / Medium (Arch→Code→Review→Test→Build) / Large (+Meeting)
  ▼ [Tầng 2 — Điều phối]
  pxh-pm: đọc tasks[] từ plan → route tuần tự → enforce policy
  │ Việc {theo plan}
  ▼ [Tầng 3 — Nhân công]
  8 nhân công thực thi → trả về Result
  │ Kết quả
  ▼ [Tầng 4 — Hạ tầng]
  pxh-save-history: lưu trạng thái, checkpoint
  ▼ [Tầng 1 — Giao diện]
  Giải thích kết quả bằng tiếng Việt → người dùng
```

## ✅ Điều kiện hoàn thành

- [x] 11 agents được định nghĩa với thẻ layer + tham chiếu chéo (gồm Prompt Optimizer & Planner)
- [x] Runtime 4 layer được thiết kế (Giao diện + Prompt Optimization, Điều phối, Nhân công, Hạ tầng)
- [x] 6 contracts giao tiếp được định nghĩa (Yêu cầu, Việc, Kết quả, Phản hồi, Sự kiện, Trạng thái)
- [x] 3 policies được định nghĩa (Thử lại, Phục hồi, Phản ánh)
- [x] 8 workflows được chú thích luồng layer (thêm optimized.workflow)
- [x] 4 lĩnh vực skill được liên kết với runtime layers
- [x] opencode.json tham chiếu tất cả thành phần
- [x] Mọi file đều có tham chiếu chéo đến file liên quan
- [x] Đường dẫn tương đối — không còn `pxhopencode/` cứng
- [x] Đường dẫn skills dự phòng: `["skills", ".opencode/skills"]`
- [x] MCP Playwright: `@playwright/mcp@latest`
- [x] ENTERPRISE.md hướng dẫn triển khai doanh nghiệp
- [x] Runtime guards cho mọi fallback scenario (Prompt Optimizer, Planner, Workers, Deadlock)
- [x] README hướng dẫn copy vào `.opencode/`
