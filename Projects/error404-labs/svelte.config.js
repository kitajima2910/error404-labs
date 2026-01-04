import adapter from '@sveltejs/adapter-vercel';

import path from 'node:path';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

/** @type {import('mdsvex').Options} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	layout: {
		_: path.resolve('./src/mdsvex.svelte')
	},
	highlight: {
		highlighter: async (code, lang = 'text', meta) => {
			const highlighter = await createHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript', 'html', 'css', 'json', 'c', 'c++', 'c#', 'java']
			});

			// Xử lý trường hợp meta null/undefined
			const metaString = meta || '';
			const titleMatch = metaString.match(/title="([^"]+)"/);
			const title = titleMatch ? titleMatch[1] : '';

			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'poimandres'
				})
			);

			// Wrap với title nếu có
			if (title) {
				return `{@html \`<div class="code-wrapper"><div class="code-title">${escapeSvelte(title)}</div>${html}</div>\`}`;
			}

			return `{@html \`${html}\`}`;
		}
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
