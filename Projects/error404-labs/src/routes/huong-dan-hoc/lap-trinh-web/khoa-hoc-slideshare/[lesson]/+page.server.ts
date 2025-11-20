/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const lesson = params.lesson;

		const lessonRaw = (await import(`$lib/md/HocWeb/CoBan/slideshare/Bai${lesson}/README.md?raw`))
			.default;

		return {
			dataLESSONRaw: lessonRaw
		};
	} catch (error) {
		throw redirect(307, '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/');
	}
};
