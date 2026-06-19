# 🌐 Web Workflow — Phát triển web app

Dùng workflow này khi bạn làm: web app, landing page, dashboard, API, full-stack, frontend/backend, e-commerce, blog, CMS, SaaS.

> **🌏 LUẬT NGÔN NGỮ**: Toàn bộ UI text trong web (nút, tiêu đề, label, placeholder, thông báo, menu, error message) phải là **tiếng Việt**.

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

### Bước 2.1: Setup `.gitignore`

Sau khi cài dependencies, đảm bảo `.gitignore` đúng chuẩn web:
- Luôn có `.opencode`, `.playwright-mcp`, `node_modules/`, `.env`, `dist/`, `*.log`
- Nếu Next.js: thêm `.next/`, `out/`
- Nếu Vite: thêm `dist/`
- Nếu đã có `.gitignore` → chỉ cần ensure `.opencode` và `.playwright-mcp` được thêm vào

### Bước 2.2: Tạo favicon SVG

Favicon là biểu tượng hiển thị trên tab trình duyệt. Tạo `public/favicon.svg`:

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <text x="16" y="22" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-size="18" font-weight="700">[CHỮ CÁI ĐẦU]</text>
</svg>
````

Thêm vào `<head>` trong `index.html` hoặc layout:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Có thể đổi màu gradient và chữ cái theo dự án. Nếu dùng Vite, kiểm tra file `index.html` đã có link favicon chưa, nếu chưa thì thêm vào.

> Nếu dùng Next.js: đặt file vào `app/` thư mục public và dùng `<link>` trong `layout.tsx`.

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
5. `@pxh-save-history` — Lưu quyết định + cập nhật STATUS.md

> Sau build xong, bạn tự deploy (hoặc chạy live server cho game HTML5).

### Liên kết
- Workflow cha: `@company.workflow` — Toàn bộ quy trình AI Company
- Skills: `webs/*` — Web development skills
- Agents: `@pxh-pm` (CEO), `@pxh-expert` (Coder), `@pxh-architect` (Architect)
