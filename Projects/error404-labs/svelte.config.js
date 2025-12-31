import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-auto';

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	}
};
