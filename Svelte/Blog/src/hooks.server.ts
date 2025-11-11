import { query } from '$lib/database';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const guid_id = event.cookies.get('blog');
	if (guid_id) {
		const sql = `select email from data.sessions where guid_id = $1`;
		const rows = await query(sql, [guid_id]);
		if (rows.length > 0) {
			event.locals.email = rows[0].email;
		}
	}

	// login checks
	if (event.url.pathname === '/login' && event.locals.email) {
		throw redirect(303, '/');
	}

	if (event.url.pathname === '/admin' && !event.locals.email) {
		throw redirect(303, '/login');
	}

	return await resolve(event);
}
