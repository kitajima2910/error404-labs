# AGENTS — Error404-Labs Monorepo

## Tổng quan
- Monorepo playground chứa nhiều dự án độc lập, **không có workspace root**.
- **Dự án chính (production)**: `Projects/error404-labs` — Astro 5 SSR site.
- Mọi dự án khác là thử nghiệm cá nhân, **không deploy**, không dependency chung.

## Dự án chính — `Projects/error404-labs`
- **Astro 5** SSR, deploy Vercel (`@astrojs/vercel`), region `sin1`
- **Tailwind CSS v4** — chỉ dùng `@tailwindcss/postcss`, không có `tailwind.config.*`
- **Neon PostgreSQL** — schema `error404labs`, query bằng `sql\`...\`` (`@neondatabase/serverless`)
- **pnpm** — package manager. Node 22 (`.nvmrc`)
- **Pagefind** — search index chạy trong `pnpm build`
- **KaTeX** — math rendering qua `remark-math` + `rehype-katex`
- **Prettier** — semi=false, singleQuote, tabWidth=4, printWidth=120, multilineArraysWrapThreshold=1
- **Không có test suite, CI/CD, test runner**

## Lệnh (dự án chính)
```bash
pnpm dev          # astro dev
pnpm build        # astro build && pagefind --site dist && copyfiles -u 1 dist/pagefind/** public
pnpm preview      # astro preview
```

## Conventions bắt buộc
- **Giao tiếp = tiếng Việt**. Code identifiers = tiếng Anh.
- **Patch tối thiểu**: không đổi tên biến/function/file, không refactor nếu không được yêu cầu. (`rules.md`)
- Nếu task ảnh hưởng dự án chính: đọc `STATUS.md` + `PROJECT.md` từ `Projects/error404-labs/`.
- **Mọi API route** phải có `export const prerender = false`.
- Mutation endpoints: validate origin (CSRF). Auth endpoints: rate limit 5 attempts/minute/IP.
- UI text, comments, error messages = tiếng Việt. Props typed `interface Props` trong frontmatter.

## Agent skills system (dự án chính)
- `Projects/error404-labs/.agents/skills/` có 13 skill (web-app, h5-game, database, ai-app...)
- `Projects/error404-labs/.agents/workflows/` có 5 workflow mẫu
- Dùng tool `skill` để load skill phù hợp

## Cấu trúc thư mục root
| Thư mục | Nội dung |
|---|---|
| `Projects/` | Dự án chính (Astro) + launcher + slicesprite |
| `game/` | HTML5 games (Phaser, Godot, GDevelop, vanilla) |
| `htmlcssjs/` | Static HTML/CSS/JS experiments, vibe projects |
| `react/` | React Native + web React experiments |
| `Svelte/` | Svelte learning projects |
| `python/` | Python (AI, OpenCV) |
| `c/` | C/C++/C# learning |
| `Laravel/` | PHP Laravel experiments |
| `nestjs/` | NestJS experiments |
| `vibe-coding/` | AI-vibe-coded projects |
| `skills-ai/` | AI skill packs / agents |
| `Scratch/` | Scratch exports |

## Lưu ý
- Root `package.json` không tồn tại — mỗi project tự quản lý dependencies riêng.
- Root `.gitignore` chỉ có `.vs` và `*.class`. Mỗi project có `.gitignore` riêng.
- Các file `.md` báo cáo cũ (FINAL_*, QUICK_*, IMPLEMENTATION_*, DELIVERY_SUMMARY*) trong `Projects/error404-labs/` là noise lịch sử — bỏ qua.
- `CLAUDE.md` trong dự án chính chỉ ghi `Follow AGENTS.md.` — không đọc riêng.
