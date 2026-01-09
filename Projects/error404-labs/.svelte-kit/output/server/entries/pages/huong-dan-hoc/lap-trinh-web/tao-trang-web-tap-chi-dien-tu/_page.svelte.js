import { a0 as ensure_array_like, aa as attr, a8 as attr_class, a7 as escape_html } from "../../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../../chunks/Breadcrumb.js";
/* empty css                                          */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeContent = "";
    const LESSONS = [
      { fileName: "bai01", title: "Bài 01: Sử dụng các tag cơ bản" },
      {
        fileName: "bai02",
        title: "Bài 02: Sử dụng các tag cơ bản (tt)"
      },
      { fileName: "bai03", title: "Bài 03: Định dạng trang web" },
      { fileName: "bai04", title: "Bài 04: Định dạng trang web (tt)" },
      { fileName: "bai05", title: "Bài 05: Định dạng văn bản" },
      { fileName: "bai06", title: "Bài 06: Định dạng văn bản (tt)" },
      {
        fileName: "bai07",
        title: "Bài 07: Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết"
      },
      { fileName: "bai08", title: "Bài 08: Tạo bảng" },
      {
        fileName: "bai09",
        title: "Bài 09: Tạo bảng, Trộn dòng và Trộn cột trong HTML"
      },
      {
        fileName: "bai10",
        title: "Bài 10: Tạo bảng HTML – Trộn dòng và cột (rowspan & colspan)"
      }
    ];
    Breadcrumb($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-sbmlc3"><div class="left markdown-body svelte-sbmlc3">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="right svelte-sbmlc3"><p class="title svelte-sbmlc3">Nội dung khóa học</p> <ul class="svelte-sbmlc3"><!--[-->`);
    const each_array = ensure_array_like(LESSONS);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { fileName, title } = each_array[$$index];
      $$renderer2.push(`<li${attr("title", title)}${attr_class("svelte-sbmlc3", void 0, { "active": activeContent === fileName })}><button class="svelte-sbmlc3">${escape_html(title)}</button></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div>`);
  });
}
export {
  _page as default
};
