import { query } from '$lib/database';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password || email === '' || password === '') {
			return fail(400, { message: 'Please provide an email and password' });
		}

		const sql = `
            select * from data.users 
            where lower(email) = lower($1)
        `;

		const rows = await query(sql, [email]);
		console.log('rows: ', rows);
		if (!rows[0]) {
			return fail(400, { message: 'Your email incorrect' });
		}

		const user = rows[0];
		const passwordMatch = await bcrypt.compare(password.toString(), user.hash_password);

		if (!passwordMatch) {
			return fail(400, { message: 'Your password incorrect' });
		}

		const sql2 = `insert into data.sessions (email) values ($1) returning guid_id`;
		const results = await query(sql2, [email]);
		const guid_id = results[0].guid_id;

		cookies.set('blog', guid_id, {
			path: '/',
			maxAge: 60 * 60 * 8
		});

		redirect(303, '/admin');
	}
} satisfies Actions;
