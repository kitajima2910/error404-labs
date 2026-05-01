# Tech Stack

## Framework & Runtime
- **Astro 5** — primary framework, SSR via Vercel adapter
- **TypeScript** — used for API routes and utilities
- **JavaScript** — used for data files, client-side scripts, and some utilities
- **Tailwind CSS v4** — via `@tailwindcss/postcss` (no config file, uses CSS-native approach)

## Backend & Database
- **Neon (PostgreSQL serverless)** — `@neondatabase/serverless`, schema: `error404labs`
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT auth tokens (7-day expiry, single-session enforcement)
- **Astro middleware** — security headers and CSP

## Content & Search
- **Markdown** — blog posts in `src/pages/bai-viet/*.md` with frontmatter
- **Pagefind** — static full-text search, built into `dist/pagefind/` after build
- **KaTeX** — math rendering via `remark-math` + `rehype-katex`
- **@astrojs/rss** — RSS feed generation
- **@astrojs/sitemap** — sitemap generation

## Deployment
- **Vercel** — via `@astrojs/vercel` adapter
- **pnpm** — package manager (`pnpm-workspace.yaml` present)
- Node version pinned in `.nvmrc`

## Code Style
- **Prettier** with `prettier-plugin-astro` and `prettier-plugin-multiline-arrays`
- No semicolons (`"semi": false`)
- Single quotes (`"singleQuote": true`)
- 4-space indentation, print width 120
- Arrays with multiple items wrap to one item per line (`multilineArraysWrapThreshold: 1`)

## Common Commands

```bash
# Development server
pnpm dev          # astro dev

# Production build (includes Pagefind indexing + copy to public)
pnpm build        # astro build && pagefind --site dist && copyfiles -u 1 dist/pagefind/** public

# Preview production build
pnpm preview      # astro preview
```

## Environment Variables
Required in `.env`:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `JWT_SECRET` — secret for signing JWT tokens
