export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
	slug: string;
};
