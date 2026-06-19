# 🌐 Web Workflow — Phát triển web app

Dùng workflow này khi bạn làm: web app, landing page, dashboard, API, full-stack, frontend/backend, e-commerce, blog, CMS, SaaS.

## 🚀 Quy trình vibe code web

### Bước 1: Chọn tech stack

#### Frontend
| Stack | Khi nào dùng |
|-------|-------------|
| React + Vite + TypeScript | Mặc định cho web app |
| Next.js 14+ (App Router) | Cần SEO, SSR, full-stack trong 1 project |
| Vue + Vite | Dự án Vue thuần |
| Astro | Landing page, content site, blog |

#### Styling
| Tool | Khi nào dùng |
|------|-------------|
| Tailwind CSS | **Mặc định** — nhanh, linh hoạt |
| SCSS | Dự án có design system phức tạp |
| CSS Modules | Cần isolation, không muốn runtime |

#### Backend
| Stack | Khi nào dùng |
|-------|-------------|
| Next.js API Routes + Prisma + PostgreSQL | Mặc định full-stack |
| FastAPI + SQLAlchemy + PostgreSQL | Python project |
| Node.js + Express + Prisma | Node.js API thuần |
| tRPC | Type-safe end-to-end |

#### Database
| DB | Khi nào dùng |
|----|-------------|
| PostgreSQL | **Mặc định** — mạnh, miễn phí |
| SQLite | Prototype, dev local |
| MongoDB | Document data, flexible schema |

### Bước 2: Setup dự án

```bash
# React + Vite + TypeScript (mặc định)
npm create vite@latest ./ -- --template react-ts
npm install

# Tailwind
npm install -D tailwindcss @tailwindcss/vite
```

### Bước 3: Cấu trúc thư mục chuẩn

```
src/
├── components/       # UI components (Button, Card, Modal, v.v.)
│   ├── ui/           # Base UI components
│   └── shared/       # Shared business components
├── pages/            # Pages (Next.js App Router: app/)
├── features/         # Feature modules (auth, billing, v.v.)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   └── billing/
├── lib/              # Utilities, helpers, API clients
├── hooks/            # Global custom hooks
├── types/            # TypeScript types/interfaces
├── styles/           # Global styles
└── server/           # Backend code (if separate)
    ├── routes/
    ├── models/
    └── middleware/
```

### Bước 4: Flow code

```
Setup → Components UI → Pages → API Routes → Database → Auth → Deploy
```

### Bước 5: Quality & Release

Sau khi code xong, workflow này báo PM để chạy:
1. `@pxh-qa` — Kiểm tra chất lượng, chạy test
2. `@pxh-fix-bugs` — Sửa lỗi (nếu QA phát hiện)
3. `@pxh-review-code` — Code review
4. `@release.workflow` — Build
5. `@pxh-save-history` — Lưu quyết định

> Sau build xong, bạn tự deploy (hoặc chạy live server cho game HTML5).

### Liên kết
- Workflow cha: `@company.workflow` — Toàn bộ quy trình AI Company
- Skills: `webs/*` — Web development skills
- Agents: `@pxh-pm` (CEO), `@pxh-expert` (Coder), `@pxh-architect` (Architect)
