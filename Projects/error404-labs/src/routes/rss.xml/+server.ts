import { getPosts } from '$lib/server/posts';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
		<rss version="2.0">
		<channel>
			<title>Error404 Labs</title>
			<link>https://error404labs.dev</link>
			<description>RSS Feed</description>
			${posts.map(post => `
			<item>
				<title>${post.title}</title>
				<link>https://error404labs.dev/${post.slug}</link>
				<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			</item>`).join('')}
		</channel>
		</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
