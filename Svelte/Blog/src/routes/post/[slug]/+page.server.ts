import { query } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.slug;

	const post = await query(`select * from data.posts where id = $1`, [id]);

	if (!post[0]) {
		throw error(404, 'Post not found');
	}

	return { post: post[0] };
};
