import { query } from '$lib/database';
import type { PageServerLoad } from './$types';

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
	return { posts, categories };
};
