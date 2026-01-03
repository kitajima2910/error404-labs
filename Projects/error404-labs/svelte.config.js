import adapter from '@sveltejs/adapter-auto';

import path from 'node:path';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

/** @type {import('mdsvex').Options} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	layout: {
		_: path.resolve('./src/mdsvex.svelte')
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript', 'html', 'css', 'json', 'c', 'c++', 'c#', 'java']
			});

			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'poimandres'
				})
			);

			return `{@html \`${html}\`}`;
		}
	}
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
