import { _ as __vite_glob_0_0 } from "../../../../chunks/bai-dang-1.js";
import { _ as __vite_glob_0_1 } from "../../../../chunks/bai-dang-2.js";
import { json } from "@sveltejs/kit";
const getPosts = async () => {
  const posts = [];
  const paths = /* @__PURE__ */ Object.assign({
    "/src/bai-dang/bai-dang-1.md": __vite_glob_0_0,
    "/src/bai-dang/bai-dang-2.md": __vite_glob_0_1
  });
  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1).replace(".md", "");
    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata;
      const post = { ...metadata, slug };
      posts.push(post);
    }
  }
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
};
const GET = async () => {
  const posts = await getPosts();
  return json({ posts });
};
export {
  GET
};
