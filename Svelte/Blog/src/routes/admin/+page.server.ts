import { query } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await query(`select * from data.categories order by text`);
	return { categories };
};
