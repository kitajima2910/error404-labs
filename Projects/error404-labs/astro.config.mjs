// @ts-check
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'

import tailwindcss from '@tailwindcss/postcss'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
    site: 'https://www.error404-labs.info.vn/',
    security: { checkOrigin: false },
    integrations: [
        sitemap(),
    ],
    vite: {
        css: {
            postcss: {
                plugins: [tailwindcss()],
            },
        },
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
            [
                rehypeKatex,
                {
                    strict: false,
                    throwOnError: false,
                },
            ],
        ],
    },
    adapter: vercel({ regions: ['sin1'] }),
})
