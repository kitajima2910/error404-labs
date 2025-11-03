import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const userid = params.userid; // lấy từ [userid]
	const githubUrl = `https://avatars.githubusercontent.com/u/${userid}?v=4&s=100`;

	const res = await fetch(githubUrl);

	if (!res.ok) {
		return new Response('Not Found', { status: 404 });
	}

	const buffer = await res.arrayBuffer();

	return new Response(buffer, {
		headers: {
			'Content-Type': res.headers.get('content-type') ?? 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
