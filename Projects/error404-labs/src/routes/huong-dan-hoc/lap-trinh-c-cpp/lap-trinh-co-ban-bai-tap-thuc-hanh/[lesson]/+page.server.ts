import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { lesson } = params;
	throw redirect(
		301,
		`/huong-dan-hoc/lap-trinh-c-cpp/lap-trinh-co-ban-bai-tap-thuc-hanh/${lesson}/01`
	);
};
