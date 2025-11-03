import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const username = params.username;

	// Tạo URL GitHub thật
	const githubProfileUrl = `https://github.com/${username}`;

	// Redirect 301 (chuyển hướng vĩnh viễn)
	return new Response(null, {
		status: 301,
		headers: {
			Location: githubProfileUrl,
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
