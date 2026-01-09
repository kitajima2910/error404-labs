// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async () => {
	const ABOUT: string = (await import('$lib/md/ABOUT.md?raw')).default;

	return {
		dataABOUTRaw: ABOUT
	};
};
;null as any as PageServerLoad;