# 🏢 pxhopencode — Enterprise Deployment Guide

## Quick Start

```bash
# 1. Copy vào project của bạn
cp -r pxhopencode .opencode

# 2. Mở opencode, bắt đầu với prompt tiếng Việt
#    "Làm web bán hàng React + Node.js"
```

## Flow Architecture

```
User (Vietnamese)
  │
  ▼ [Tầng 1+ — Prompt Optimization]
  pxh-prompt-optimizer
  • Phát hiện tiếng Việt → dịch sang Anh
  • Hiển thị 🇬🇧 English translation cho user kiểm tra
  • Rewrite thành Prompt Engineering chuẩn
  • Gap Analysis → Bổ sung requirement
  │
  ▼ [Tầng 2 — Planning]
  pxh-planner: break thành tasks, tạo Task contracts
  │
  ▼ [Tầng 3 — Execute]
  pxh-architect → pxh-expert → pxh-review-code → pxh-qa
  → pxh-fix-bugs (if needed) → pxh-devops
  │
  ▼ [Tầng 1 — Output]
  Giải thích kết quả bằng tiếng Việt
```

## 11 Agents Overview

| Agent | Layer | Role | Gọi bằng |
|-------|-------|------|----------|
| `pxh-prompt-optimizer` | Tầng 1+ | Translate + Rewrite Prompt Engineering + Gap Analysis | tự động |
| `pxh-help` | Tầng 1 | Hướng dẫn, chọn workflow | `@pxh-help` |
| `pxh-pm` | Tầng 2 | CEO, điều phối toàn bộ | `default_agent` |
| `pxh-planner` | Tầng 2 | Break tasks, tạo Task contracts | tự động |
| `pxh-architect` | Tầng 3 | Thiết kế kiến trúc | `@pxh-architect` |
| `pxh-expert` | Tầng 3 | Vibe code tự động | `@pxh-expert` |
| `pxh-qa` | Tầng 3 | Kiểm thử | `@pxh-qa` |
| `pxh-fix-bugs` | Tầng 3 | Sửa lỗi | `@pxh-fix-bugs` |
| `pxh-review-code` | Tầng 3 | Review code | `@pxh-review-code` |
| `pxh-devops` | Tầng 3 | Build & Release | `@pxh-devops` |
| `pxh-save-history` | Tầng 4 | Lưu lịch sử, checkpoint | tự động |

## Commands

| Command | Mô tả |
|---------|-------|
| `/optimize <prompt>` | Full pipeline: prompt optimization → execute → giải thích VN |
| `/vibe <mô tả>` | Full AI Company workflow |
| `/web <mô tả>` | Phát triển web app |
| `/game <mô tả>` | Phát triển game H5 |
| `/ai <mô tả>` | Phát triển AI app |
| `/debug <mô tả>` | Debug & fix bug |
| `/meeting <chủ đề>` | Agents thảo luận |
| `/release` | Build pipeline |

## Prompt Optimization (Tính năng chính)

### Input: Tiếng Việt → Output: Prompt Engineering chuẩn

```markdown
User: "Làm web bán hàng có giỏ hàng thanh toán Stripe"

→ pxh-prompt-optimizer phát hiện tiếng Việt → dịch:

🇬🇧 English translation:
Build an e-commerce website with shopping cart and Stripe payment

(Nếu user OK hoặc không phản hồi → tiếp tục)

→ Rewrite thành Prompt Engineering:

## Role
You are a senior full-stack developer specializing in e-commerce.

## Context
Building an e-commerce web app with React frontend and Node.js backend.

## Task
Build a complete e-commerce platform with product listing, shopping cart,
and Stripe payment integration.

## Requirements
- Product CRUD with images and categories
- Shopping cart with add/remove/update quantity
- Stripe Checkout payment integration
- Order management for admin
- Responsive design for mobile
- User authentication (login/signup)

## Constraints
- Tech stack: React + Node.js + PostgreSQL
- Payment: Stripe only
- SEO-friendly product pages

## Output Format
- React functional components with TypeScript
- API routes in Express.js
- PostgreSQL schema with migrations
- Stripe webhook handler
```

## Quality Gates

Mọi code phải qua 3 gates trước khi build:
1. **Review Gate** — Code review bởi `@pxh-review-code` (security, perf, convention)
2. **QA Gate** — Kiểm thử bởi `@pxh-qa` (pass/fail, bugs)
3. **Build Gate** — Build bởi `@pxh-devops` (lint, typecheck, build)

## Error Handling

| Scenario | Fallback |
|----------|----------|
| Translate fail | Dùng prompt gốc, báo user |
| Prompt Optimizer timeout > 30s | Bỏ qua optimize, dùng prompt thô |
| Planner timeout > 30s | Dùng plan mặc định: Architect → Code → Test → Build |
| Agent timeout > 60s | Retry 1 lần, skip nếu vẫn timeout |
| Fix loop > 3 lần | Escalate user |
| Workflow treo > 10 phút | Kill + báo user chạy lại |

## Policies

- **Retry**: Exponential backoff 1s→2s→4s, max 3, jitter ±25%
- **Recovery**: Checkpoint trước mỗi phase transition
- **Reflection**: 4 levels (Task, Phase, Workflow, Incident)
- **Runtime Guards**: Fallback timeout mỗi phase (30s-120s), deadlock prevention

## File Structure

```
.opencode/
├── opencode.json         # Config trung tâm
├── ENTERPRISE.md         # File này
├── README.md             # Tổng quan
├── STATUS.md             # Dashboard real-time
├── agents/               # 11 agents
│   ├── pxh-prompt-optimizer.md  [Tầng 1+ — Prompt Optimization]
│   ├── pxh-pm.md              [Tầng 2 — Điều phối]
│   ├── pxh-help.md            [Tầng 1 — Giao diện]
│   ├── pxh-planner.md         [Tầng 2 — Planning]
│   ├── pxh-architect.md       [Tầng 3 — Kiến trúc sư]
│   ├── pxh-expert.md          [Tầng 3 — Lập trình]
│   ├── pxh-fix-bugs.md        [Tầng 3 — Sửa lỗi]
│   ├── pxh-qa.md              [Tầng 3 — Kiểm thử]
│   ├── pxh-review-code.md     [Tầng 3 — Rà soát]
│   ├── pxh-devops.md          [Tầng 3 — Xây dựng]
│   └── pxh-save-history.md    [Tầng 4 — Hạ tầng]
├── workflows/            # 8 workflows
│   ├── optimized.workflow.md   [Prompt Optimization pipeline]
│   ├── company.workflow.md     [AI Company master]
│   ├── meeting.workflow.md
│   ├── web.workflow.md
│   ├── game.workflow.md
│   ├── ai.workflow.md
│   ├── debug.workflow.md
│   └── release.workflow.md
├── runtime/              # 4+ tầng runtime
│   ├── README.md
│   ├── layers/
│   ├── contracts/
│   └── policies/
└── skills/               # 4 lĩnh vực, 25 skills
```

## Support

- GitHub Issues: https://github.com/anomalyco/opencode/issues
- Author: Phạm Xuân Hoài - Error404-Labs.Info.Vn
