import { _ as __variableDynamicImportRuntimeHelper } from "../../../chunks/dynamic-import-helper.js";
import { error } from "@sveltejs/kit";
async function load({ params }) {
  try {
    const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../bai-dang/bai-dang-1.md": () => import("../../../chunks/bai-dang-1.js").then((n) => n._), "../../bai-dang/bai-dang-2.md": () => import("../../../chunks/bai-dang-2.js").then((n) => n._) }), `../../bai-dang/${params.slug}.md`, 4);
    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    throw error(404, `Không thể tìm thấy đường dẫn ${params.slug}`);
  }
}
export {
  load
};
