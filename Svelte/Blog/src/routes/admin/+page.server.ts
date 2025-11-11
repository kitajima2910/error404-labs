import { query } from '$lib/database';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { unlinkSync, writeFileSync } from 'node:fs';
import { dev } from '$app/environment';

export const load: PageServerLoad = async () => {
	const categories = await query(`select * from data.categories order by text`);
	const posts = await query(`select * from data.posts order by created desc`);

	for (const post of posts) {
		const rows = await query(
			`select category_id from data.posts_categories where post_id = $1`,
			[post.id]
		);
		const categories = rows.map((row) => row.category_id);
		post.categories = categories;
	}

	return {
		posts,
		categories
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		let id = data.get('id');
		const title = data.get('title');
		const text = data.get('text');

		if (!text || text === '') {
			return fail(400, { message: 'Please provide a text' });
		}

		const category_ids = data.getAll('category_ids');
		if (category_ids.length === 0) {
			return fail(400, { message: 'Please select at least one category' });
		}

		let banner_path = '';
		const file = data.get('image') as File;

		let path = '/var/www/html/files/';
		if (dev) {
			path = 'D:/temp/';
		}

		if (file.name) {
			banner_path = crypto.randomUUID();
			writeFileSync(path + banner_path, Buffer.from(await file.arrayBuffer()));
		}

		if (Number(id) > 0) {
			const existing_posts = await query(
				`select branner_path from data.posts where id = $1`,
				[id]
			);
			if (banner_path !== '') {
				if (existing_posts[0].branner_path) {
					unlinkSync(path + existing_posts[0].branner_path);
				}
			} else {
				banner_path = existing_posts[0].branner_path;
			}
			const sql = `update data.posts set title = $1, text = $2, branner_path = $3 where id = $4`;
			await query(sql, [title, text, banner_path, id]);
		} else {
			const sql = `insert into data.posts (title, text, branner_path) values ($1, $2, $3) returning id`;
			const result = await query(sql, [title, text, banner_path]);
			id = result[0].id;
		}

		await query(`delete from data.posts_categories where post_id = $1`, [id]);
		for (const category_id of category_ids) {
			await query(
				`insert into data.posts_categories (post_id, category_id) values ($1, $2)`,
				[id, category_id]
			);
		}

		return { success: true };
	}
} satisfies Actions;
