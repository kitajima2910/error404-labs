import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/server/posts';

export const prerender = false;

export async function GET() {
	const posts = await getPosts();
	return json({ posts });
}
