// @ts-nocheck
import type { Post } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = async ({ fetch }: Parameters<PageServerLoad>[0]) => {
	const response = await fetch('/api/bai-dang');
	const data = await response.json();
	return { posts: data.posts as Post[] };
};
