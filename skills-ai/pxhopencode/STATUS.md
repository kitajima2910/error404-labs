# 📊 pxhopencode — AI Company cho Vibe Coding

## 🎯 Tổng quan

| Trường | Giá trị |
|--------|---------|
| Giai đoạn | PHÁT HÀNH ✅ SẴN SÀNG COPY VÀO .opencode/ |
| Mô hình | AI Company — 4-Tầng Enterprise AI Runtime |
| Agents | 9 chuyên biệt (Tầng 1-4) |
| Workflows | 7 theo lĩnh vực |
| Skills | 4 lĩnh vực (web, game, AI, công cụ) |
| Contracts | 6 cấu trúc (Yêu cầu, Việc, Kết quả, Phản hồi, Sự kiện, Trạng thái) |
| Policies | 3 (Thử lại, Phục hồi, Phản ánh) |

## 🏛 Kiến trúc 4 Tầng Runtime

```
Tầng 1 (Giao diện)    pxh-help           ←/→ Tầng 2 (Điều phối)
Tầng 2 (Điều phối)    pxh-pm             ←/→ Tầng 3 (Nhân công)
Tầng 3 (Nhân công)    6 agents           → Tầng 4 (Hạ tầng)
Tầng 4 (Hạ tầng)      pxh-save-history   → Tầng 2 (trạng thái/phục hồi)
```

## 🔗 Ma trận liên kết toàn bộ hệ thống

| Thành phần | Agents | Runtime | Workflows | Skills | Contracts | Policies | Cấu hình |
|-----------|--------|---------|-----------|--------|-----------|----------|---------|
| **agents/** (9 files) | — | ✅ Thẻ layer + tham chiếu | ✅ Liên kết giai đoạn | ✅ Tham chiếu skill | ✅ Tham chiếu contract | ✅ Tham chiếu policy | ✅ opencode.json |
| **runtime/** (9 files) | ✅ Agents chủ quản | — | ✅ Luồng thực thi | — | ✅ Sơ đồ đầy đủ | ✅ Tham chiếu thi hành | ✅ instructions |
| **workflows/** (7 files) | ✅ Tham chiếu agent | ✅ Luồng layer | — | ✅ Tham chiếu skill | ✅ Tham chiếu contract | ✅ Tham chiếu policy | ✅ Lệnh |
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
├── .gitignore             # Luật bỏ qua
│
├── agents/                # 9 agents, mỗi agent có thẻ runtime layer
│   ├── pxh-pm.md          [Tầng 2 — Điều phối]
│   ├── pxh-help.md        [Tầng 1 — Giao diện]
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
├── workflows/             # 7 workflow templates
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

## 📋 Luồng thực thi đầy đủ

```
Người dùng nhập prompt
  │
  ▼ [Tầng 1 — Giao diện]
  pxh-help / user: xác thực đầu vào → tạo Request contract
  │ Yêu cầu
  ▼ [Tầng 2 — Điều phối]
  pxh-pm: phân tích → họp (nếu cần) → lên kế hoạch → điều phối
  │ Việc {giai_đoạn: "thiết_kế|code|sửa_lỗi|kiểm_thử|rà_soát|xây_dựng"}
  ▼ [Tầng 3 — Nhân công]
  6 nhân công thực thi công việc → trả về Result contract
  │ Kết quả + Sự kiện{phản_ánh}
  ▼ [Tầng 4 — Hạ tầng]
  pxh-save-history: lưu trạng thái, ghi log, checkpoint
  │ Trạng thái (khi phục hồi) / Xác nhận
  ▼ [Tầng 2 — Điều phối]
  pxh-pm: đánh giá → giai đoạn tiếp theo hay hoàn tất?
  │ Phản hồi
  ▼ [Tầng 1 — Giao diện]
  Định dạng đầu ra → người dùng
```

## ✅ Điều kiện hoàn thành

- [x] 9 agents được định nghĩa với thẻ layer + tham chiếu chéo
- [x] Runtime 4 layer được thiết kế (Giao diện, Điều phối, Nhân công, Hạ tầng)
- [x] 6 contracts giao tiếp được định nghĩa (Yêu cầu, Việc, Kết quả, Phản hồi, Sự kiện, Trạng thái)
- [x] 3 policies được định nghĩa (Thử lại, Phục hồi, Phản ánh)
- [x] 7 workflows được chú thích luồng layer
- [x] 4 lĩnh vực skill được liên kết với runtime layers
- [x] opencode.json tham chiếu tất cả thành phần
- [x] Mọi file đều có tham chiếu chéo đến file liên quan
- [x] Đường dẫn tương đối — không còn `pxhopencode/` cứng
- [x] Đường dẫn skills dự phòng: `["skills", ".opencode/skills"]`
- [x] MCP Playwright: `@playwright/mcp@latest`
- [x] README hướng dẫn copy vào `.opencode/`
