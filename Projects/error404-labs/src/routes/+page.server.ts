import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const HOME: string = (await import('$lib/md/HOME.md?raw')).default;

	return {
		dataHOMERaw: HOME
	};
};
