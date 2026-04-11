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
        plugins: [{
            name: 'tools-auth-guard',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url?.startsWith('/tools/')) {
                        const cookies = req.headers.cookie || '';
                        const hasAuth = cookies.split(';').some(c => c.trim().startsWith('auth_token='));
                        if (!hasAuth) {
                            res.writeHead(302, { Location: '/?auth=required' });
                            res.end();
                            return;
                        }
                    }
                    next();
                });
            }
        }],
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
