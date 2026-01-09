import { a0 as ensure_array_like, aa as attr, a8 as attr_class, a7 as escape_html } from "../../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../../chunks/Breadcrumb.js";
/* empty css                                          */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeContent = "";
    const LESSONS = [{ fileName: "bai01", title: "MC12 - Số đối xứng" }];
    Breadcrumb($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-iixt19"><div class="left markdown-body svelte-iixt19">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="right svelte-iixt19"><p class="title svelte-iixt19">Nội dung khóa học</p> <ul class="svelte-iixt19"><!--[-->`);
    const each_array = ensure_array_like(LESSONS);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { fileName, title } = each_array[$$index];
      $$renderer2.push(`<li${attr("title", title)}${attr_class("svelte-iixt19", void 0, { "active": activeContent === fileName })}><button class="svelte-iixt19">${escape_html(title)}</button></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div>`);
  });
}
export {
  _page as default
};
