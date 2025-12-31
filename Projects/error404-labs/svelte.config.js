import adapter from '@sveltejs/adapter-auto';

import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').Options} */
const mdsvexOptions = {
	extensions: ['.md']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
