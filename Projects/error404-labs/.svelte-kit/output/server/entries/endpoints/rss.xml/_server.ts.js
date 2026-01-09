import { _ as __vite_glob_0_0 } from "../../../chunks/bai-dang-1.js";
import { _ as __vite_glob_0_1 } from "../../../chunks/bai-dang-2.js";
async function getPosts() {
  const modules = /* @__PURE__ */ Object.assign({ "/src/bai-dang/bai-dang-1.md": __vite_glob_0_0, "/src/bai-dang/bai-dang-2.md": __vite_glob_0_1 });
  return Object.entries(modules).map(([path, mod]) => ({
    ...mod.metadata,
    slug: path.split("/").pop().replace(".md", "")
  }));
}
const prerender = true;
async function GET() {
  const posts = await getPosts();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
		<rss version="2.0">
		<channel>
			<title>Error404 Labs</title>
			<link>https://error404labs.dev</link>
			<description>RSS Feed</description>
			${posts.map((post) => `
			<item>
				<title>${post.title}</title>
				<link>https://error404labs.dev/${post.slug}</link>
				<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			</item>`).join("")}
		</channel>
		</rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
export {
  GET,
  prerender
};
