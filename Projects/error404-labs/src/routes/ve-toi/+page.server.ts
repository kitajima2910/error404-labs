import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const ABOUT: string = (await import('$lib/md/ABOUT.md?raw')).default;

	return {
		dataABOUTRaw: ABOUT
	};
};
