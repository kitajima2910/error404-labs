import type { Post } from '$lib/type';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/bai-dang');
	const data = await response.json();
	return { posts: data.posts as Post[] };
};
