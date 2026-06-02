# AGENTS

## Môi trường
- **Monorepo đa dự án**: root `D:\error404-labs` chứa nhiều side project (game/, htmlcssjs/, react/, Svelte/, python/...)
- **Project chính**: `Projects/error404-labs` — site Astro 5 tại error404-labs.info.vn

## Trình tự bắt buộc
1. Đọc .aiignore
2. Đọc STATUS.md
3. Đọc PROJECT.md (nếu task thay đổi architecture)
4. Chỉ đọc file source liên quan trực tiếp tới task
5. Làm đúng phạm vi task
6. Cập nhật STATUS.md sau khi xong
7. Trả lời bằng tiếng Việt

## Stack (project chính)
- **Astro 5** SSR, deploy Vercel (`@astrojs/vercel`), region `sin1`
- **Tailwind CSS v4** — CSS-native, không có tailwind.config.* (dùng `@tailwindcss/postcss`)
- **Neon PostgreSQL** — schema `error404labs`, query bằng `` sql`...` `` từ `@neondatabase/serverless`
- **pnpm** — package manager. Node 22 (`.nvmrc`)
- **Pagefind** — search index, chạy trong `pnpm build`
- **KaTeX** — math rendering qua `remark-math` + `rehype-katex`
- **Prettier** — semi=false, singleQuote, tabWidth=4, printWidth=120, multilineArraysWrapThreshold=1

## Lệnh
```bash
pnpm dev          # astro dev
pnpm build        # astro build && pagefind --site dist && copyfiles -u 1 dist/pagefind/** public
pnpm preview      # astro preview
```

## Kiến trúc chính
- `src/pages/` — file-based routing (Astro). Blog posts = `.md` files trong `bai-viet/`
- `src/pages/api/` — API routes (`.ts`). **Mọi API route phải có** `export const prerender = false`
- `src/components/` — UI components (`.astro`)
- `src/layouts/` — layout wrappers
- `src/data/` — static data JS files + `.txt` content
- `src/utils/rateLimit.ts` — rate limiter cho auth endpoints
- `migrations/` — SQL migration files

## API conventions
- Export named handlers: `export const GET`, `export const POST`
- Validate origin cho mutation endpoints (CSRF)
- Rate limit auth endpoints: 5 attempts/minute/IP
- Return `new Response(JSON.stringify(...), { status, headers })` — không dùng framework helpers
- Không expose error details production (`import.meta.env.DEV` guard)

## Auth
- JWT trong `localStorage` key `auth_token`, expiresIn `7d`
- bcryptjs hash password, single-session enforcement (`session_token` + `session_fingerprint`)
- Daily login points (10 points/ngày GMT+7)

## Database
- Schema `error404labs`, dùng `@neondatabase/serverless` tagged template literals
- Luôn parameterize queries
- Migrations thủ công trong `migrations/` — chạy trên Neon console hoặc qua Neon tools

## Biến môi trường (.env)
- `DATABASE_URL` — Neon connection string
- `JWT_SECRET` — secret cho JWT
- `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` — CDN avatar upload

## Code style quan trọng
- UI text, comments, error messages = **tiếng Việt**. Code identifiers = tiếng Anh
- Props typed với `interface Props` trong frontmatter component
- Icons là `.astro` files riêng trong `src/icons/`

## Agent skills system
- `.agents/skills/` có 13 skill (web-app, h5-game, database, ai-app...)
- `.agents/workflows/` có 5 workflow mẫu (bug-fix, new-feature, database-change...)
- Dùng tool `skill` để load skill phù hợp với task

## Lưu ý
- Build có 3 giai đoạn: astro build → pagefind index → copy pagefind vào public/
- Blog post frontmatter required: layout, title, date, author, image.src, description, draft, category
- Không có test suite, CI/CD, test runner
- Các file `.md` report cũ (FINAL_*, QUICK_*, IMPLEMENTATION_*) là noise — bỏ qua
