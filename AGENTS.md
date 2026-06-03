# AGENTS — Error404-Labs Monorepo

## Repo nature
- Monorepo chứa ~50 dự án **hoàn toàn độc lập**, không workspace root, không dependency chung.
- Root không có `package.json`, không lint/typecheck/build script. Mỗi project tự quản.
- Root `.gitignore`: chỉ `.vs`, `*.class`. Mỗi project có `.gitignore` riêng.
- **Không có CI/CD, test suite, test runner.**

## Dự án production duy nhất — `Projects/error404-labs`
- **Astro 5 SSR**, deploy Vercel (`@astrojs/vercel`), site `error404-labs.info.vn`, region `sin1`.
- **Tailwind CSS v4**: chỉ `@tailwindcss/postcss` Vite plugin, **không có** `tailwind.config.*`.
- **Neon PostgreSQL**: schema `error404labs`, query = `sql\`...\`` (`@neondatabase/serverless`). Migrations: `migrations/` (001–012, SQL thuần).
- **pnpm** (Node 22, xem `.nvmrc`). Chạy lệnh từ `Projects/error404-labs/`.
  ```
  pnpm dev          # astro dev
  pnpm build        # astro build && pagefind --site dist && copyfiles -u 1 dist/pagefind/** public
  pnpm preview      # astro preview
  ```
- **Auth**: JWT (`jsonwebtoken`) + bcrypt, rate limit 5 lần/phút/IP. Endpoints: `src/pages/api/login.ts`, `verify.ts`, `logout.ts`.
- **ImageKit**: upload ảnh qua `/api/admin/upload-image`.
- **Pagefind** search index + **KaTeX** math (`remark-math` + `rehype-katex`).
- **Prettier**: semi=false, singleQuote, tabWidth=4, printWidth=120, `` multilineArraysWrapThreshold: 1 ``.
- Mọi API route cần `export const prerender = false`. Mutation endpoints validate origin (CSRF).
- UI text, comments, error messages = **tiếng Việt**. Code identifiers = tiếng Anh. Props = `interface Props` trong frontmatter.
- File noise: `FINAL_*`, `QUICK_*`, `IMPLEMENTATION_*` — bỏ qua.
- `.agents/skills/` (13 skill) + `.agents/workflows/` (5 workflow). Dùng tool `skill` để load.
- `CLAUDE.md` chỉ ghi `Follow AGENTS.md.` — không đọc riêng.

## Các project khác trong `Projects/`
| Project | Stack |
|---|---|
| `error404-labs-launcher` | Chrome extension MV2 (manifest v2) |
| `slicesprite-...-v5` | React 19 + Vite 6 + Tailwind v4 + Gemini AI |

## Cấu trúc root
| Thư mục | Nội dung |
|---|---|
| `Projects/` | Production site + launcher + slicesprite SPA |
| `game/` | HTML5 games (Phaser, Godot, GDevelop, vanilla) |
| `htmlcssjs/` | Static HTML/CSS/JS experiments, vibe projects |
| `react/` | React Native + web React experiments |
| `Svelte/` | SvelteKit learning projects |
| `python/`, `c/` (C++/C#), `Laravel/`, `nestjs/` | Learning projects |
| `skills-ai/` | AI skill packs / agents |
| `Scratch/`, `java/` | Scratch exports, Java learning |
| `test/` | Workspace tạm cho agent (có `AGENTS.md` riêng, không phải test suite) |

## Khi làm việc
- Task ảnh hưởng dự án chính: đọc `STATUS.md` + `PROJECT.md` từ `Projects/error404-labs/`.
- `test/` có `.aiignore` và `STATUS.md` — đọc trước khi động vào.
- Patch tối thiểu: không đổi tên, không refactor, không đụng code ngoài task.
- Giao tiếp = tiếng Việt. Báo xong task ngắn gọn: đã làm gì, file nào, vì sao, ảnh hưởng, commit message.
