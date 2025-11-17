import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lesson = params.lesson;

	const lessonRaw = (await import(`$lib/md/HocWeb/CoBan/slideshare/Bai${lesson}/README.md?raw`))
		.default;

	return {
		dataLESSONRaw: lessonRaw
	};
};
