import { query } from '$lib/database';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const session = cookies.get('blog');
	if (session) {
		await query('delete from data.sessions where guid_id = $1', [session]);
	}

	cookies.delete('blog', { path: '/', maxAge: 60 * 60 * 8 });

	throw redirect(303, '/');
};
