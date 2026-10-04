// @ts-check
import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'

import tailwindcss from '@tailwindcss/postcss'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
    site: 'https://www.error404-labs.info.vn/',
    output: 'server',
    security: { checkOrigin: false },
    // Phân trang /bai-viet đổi từ 3 lên 9 bài/trang: chuyển các URL cũ về trang tương ứng
    redirects: {
        '/bai-viet/9': '/bai-viet/3',
        '/bai-viet/10': '/bai-viet/4',
        '/bai-viet/11': '/bai-viet/4',
        '/bai-viet/12': '/bai-viet/4',
        '/bai-viet/13': '/bai-viet/5',
        '/bai-viet/14': '/bai-viet/5',
        '/bai-viet/15': '/bai-viet/5',
        '/bai-viet/16': '/bai-viet/6',
        '/bai-viet/17': '/bai-viet/6',
        '/bai-viet/18': '/bai-viet/6',
        '/bai-viet/19': '/bai-viet/7',
        '/bai-viet/20': '/bai-viet/7',
        '/bai-viet/21': '/bai-viet/7',
        '/bai-viet/22': '/bai-viet/8',
    },
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
    adapter: vercel(),
})
