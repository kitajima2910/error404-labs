import * as config from '$lib/config';
import type { Post } from '$lib/types';

export async function GET({ fetch }) {
	const response = await fetch('/api/bai-dang');
	const { posts }: { posts: Post[] } = await response.json();

	const headers = {
		'Content-Type': 'application/xml; charset=utf-8'
	};

	const xml = `
		<?xml version="1.0" encoding="UTF-8"?>
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title><![CDATA[${config.title}]]></title>
				<description><![CDATA[${config.description}]]></description>
				<link><![CDATA[${config.url}]]></link>

				<atom:link
					href="${config.url}/rss.xml"
					rel="self"
					type="application/rss+xml"
				/>

				${posts
					.map(
						(post) => `
				<item>
					<title><![CDATA[${post.title}]]></title>
					<description><![CDATA[${post.description}]]></description>
					<link><![CDATA[${config.url}/${post.slug}]]></link>
					<guid isPermaLink="true"><![CDATA[${config.url}/${post.slug}]]></guid>
					<pubDate>${new Date(post.date).toUTCString()}</pubDate>
				</item>
			`
					)
					.join('')}
			</channel>
		</rss>
		`.trim();

	return new Response(xml, { headers });
}
