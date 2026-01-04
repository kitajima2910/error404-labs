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

			const metaString = meta || '';
			const titleMatch = metaString.match(/title="([^"]+)"/);
			const title = titleMatch ? titleMatch[1] : '';

			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'poimandres'
				})
			);

			// ✅ Thêm custom wrapper với inline styles
			return `{@html \`
		<div class="code-wrapper">
			${title ? `<div class="code-title">${escapeSvelte(title)}</div>` : ''}
			<div style="overflow-x: auto; overflow-y: hidden; border-radius: 0 0 8px 8px;">
				${html}
			</div>
		</div>
		\`}`;
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
