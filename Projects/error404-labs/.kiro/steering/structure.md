# Project Structure

## Root
```
src/                  # All application source code
public/               # Static assets (images, fonts, favicons, GSAP)
migrations/           # SQL migration files for Neon DB
dist/                 # Build output (generated, not committed)
```

## src/ Layout
```
src/
├── common/           # Shared constants (TextConst.ts)
├── components/       # Reusable Astro components
│   └── roadmap/      # Components specific to the game roadmap feature
├── data/             # Static data files (JS) and content text files
│   ├── game-roadmap/ # .txt files — one per game roadmap entry
│   └── prompts/      # .txt files — prompt content for premium feature
├── icons/            # SVG icon components as .astro files
├── js/               # Client-side utilities (utils.js, nav.js)
├── layouts/          # Page layout wrappers (MainLayout, BlogPostLayout, etc.)
├── pages/            # File-based routing (Astro convention)
│   ├── bai-viet/     # Blog posts as .md files + pagination route
│   ├── danh-muc/     # Category archive pages
│   ├── tac-gia/      # Author archive pages
│   ├── [username]/   # Dynamic user profile pages
│   └── api/          # API endpoints (.ts files, SSR only)
│       ├── admin/    # Admin-only endpoints (members, lessons, prompt-access)
│       └── user/     # User-facing endpoints
├── styles/           # Global CSS (global.css, markdown.css)
└── utils/            # Server-side utilities (rateLimit.ts)
```

## Key Conventions

### Pages & Routing
- Blog posts live in `src/pages/bai-viet/*.md` — Astro treats them as routes automatically
- Dynamic routes use bracket syntax: `[...page].astro`, `[...category].astro`, `[username]/`
- All API routes must set `export const prerender = false` at the top

### Blog Post Frontmatter
Every `.md` post in `src/pages/bai-viet/` must include:
```yaml
---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Post title'
date: YYYY-MM-DD
author: Author Name
image:
    { src: '/images/<category>/<slug>.avif', alt: 'description' }
description: 'SEO description'
draft: false
category: CategoryName
---
```

### Components
- All UI components are `.astro` files
- Icons are individual `.astro` files in `src/icons/`
- Props are typed with a local `interface Props` block inside the component frontmatter

### API Routes
- Use TypeScript (`.ts`)
- Export named HTTP method handlers: `export const GET`, `export const POST`
- Always validate origin for mutation endpoints (CSRF protection)
- Apply rate limiting via `src/utils/rateLimit.ts` for auth endpoints
- Return `new Response(JSON.stringify(...), { status, headers })` — no framework helpers
- Never expose error details in production (`import.meta.env.DEV` guard)

### Authentication Flow
- Login → JWT stored in `localStorage` as `auth_token`
- Single-session: `session_token` + `session_fingerprint` stored in DB and verified on each request
- Protected pages check auth client-side and redirect to login if unauthenticated
- Admin routes should verify `roles` from the JWT payload

### Data Files
- Static navigation: `src/data/navData.js`
- Tool listings: `src/data/toolsData.js`
- Game/prompt data: `.txt` files in `src/data/game-roadmap/` and `src/data/prompts/`

### Styling
- Tailwind CSS v4 utility classes used directly in `.astro` templates
- Global styles in `src/styles/global.css`
- Markdown-specific styles in `src/styles/markdown.css`
- No separate Tailwind config file — configuration is CSS-native

### Database
- All tables live in the `error404labs` schema on Neon
- Use tagged template literals: `` sql`SELECT ...` `` from `@neondatabase/serverless`
- Always parameterize queries — never interpolate user input directly into SQL strings
