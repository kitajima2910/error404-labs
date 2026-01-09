import { a5 as store_get, a0 as ensure_array_like, a8 as attr_class, aa as attr, a7 as escape_html, a6 as unsubscribe_stores } from "./index2.js";
import { p as page } from "./stores.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
function Breadcrumb($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { nameMap = {} } = $$props;
    let pathParts = store_get($$store_subs ??= {}, "$page", page).url.pathname.split("/").filter(Boolean);
    const defaultNames = {
      "huong-dan-hoc": "Hướng dẫn",
      "lap-trinh-web": "Lập trình web",
      "khoa-hoc-slideshare": "Khóa học Slide Share",
      "lap-trinh-c-cpp": "Lập Trình C/C++",
      "lap-trinh-co-ban-bai-tap-thuc-hanh": "Lập Trình Cơ Bản - Bài Tập Thực Hành",
      "tu-co-ban-den-nang-cao": "Từ Cơ Bản Đến Nâng Cao",
      "tao-trang-web-tap-chi-dien-tu": "Tạo Trang Web Tạp Chí Điện Tử"
    };
    const displayNames = { ...defaultNames, ...nameMap };
    $$renderer2.push(`<nav class="text-[16px] flex flex-wrap items-center gap-0.5! mb-2.5!"><!--[-->`);
    const each_array = ensure_array_like(pathParts);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let part = each_array[i];
      $$renderer2.push(`<button type="button"${attr_class("crumb bg-none border-none p-0 text-blue-700 cursor-pointer capitalize font-[inherit] svelte-1ti8y5z", void 0, { "active": i === pathParts.length - 1 })}${attr("disabled", i === pathParts.length - 1, true)}>${escape_html(displayNames[part] ?? part)}</button> `);
      if (i < pathParts.length - 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-[#888]">/</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  Breadcrumb as B
};
