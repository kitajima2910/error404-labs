import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { lesson, subLesson } = params;

	const module = await import(
		`$lib/md/LTCB_BTTH/Buoi${lesson?.split('-')[1]}/Bai${subLesson}.md?raw`
	);
	const lessonRaw = module.default;

	return new Response(lessonRaw);
};
