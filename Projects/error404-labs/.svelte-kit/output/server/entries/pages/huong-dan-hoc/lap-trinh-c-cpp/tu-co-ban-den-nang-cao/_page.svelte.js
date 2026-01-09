import { a0 as ensure_array_like, aa as attr, a8 as attr_class, a7 as escape_html } from "../../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../../chunks/Breadcrumb.js";
/* empty css                                          */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeContent = "";
    const LESSONS = [
      { fileName: "bai01", title: "Bài 01: Tải C-Free 5.0 Pro" },
      {
        fileName: "bai02",
        title: "Bài 02: Lập Trình Hướng Đối Tượng Trong C++"
      },
      { fileName: "bai03", title: "Bài 03: Data Types trong C++" },
      { fileName: "bai04", title: "Bài 04: Arrays trong C++" },
      {
        fileName: "bai05",
        title: "Bài 05: Single & Multidimensional Arrays trong C++"
      },
      {
        fileName: "bai06",
        title: "Bài 06: Strings in C++ with Examples"
      }
    ];
    Breadcrumb($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-qhuzgp"><div class="left markdown-body svelte-qhuzgp">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="right svelte-qhuzgp"><p class="title svelte-qhuzgp">Nội dung khóa học</p> <ul class="svelte-qhuzgp"><!--[-->`);
    const each_array = ensure_array_like(LESSONS);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { fileName, title } = each_array[$$index];
      $$renderer2.push(`<li${attr("title", title)}${attr_class("svelte-qhuzgp", void 0, { "active": activeContent === fileName })}><button class="svelte-qhuzgp">${escape_html(title)}</button></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div>`);
  });
}
export {
  _page as default
};
