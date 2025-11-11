import { dev } from '$app/environment';
import { error } from 'node:console';
import { readFileSync } from 'node:fs';

export const GET = async ({ params }) => {
	const guid = params.slug;

	let path = '/var/www/html/files/';
	if (dev) {
		path = 'D:/temp/';
	}

	try {
		const file = readFileSync(path + guid);
		console.log('file: ', file);
		return new Response(file);
	} catch {
		throw error(404);
	}
};
