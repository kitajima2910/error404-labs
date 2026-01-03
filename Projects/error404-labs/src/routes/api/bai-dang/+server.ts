import type { Post } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';

const getPosts = async () => {
	const posts: Post[] = [];

	const paths = import.meta.glob('/src/bai-dang/*.md', {
		eager: true
	});

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)!.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug };
			posts.push(post);
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
};

export const GET: RequestHandler = async () => {
	const posts = await getPosts();
	return json({ posts });
};
