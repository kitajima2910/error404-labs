import { a9 as head, a0 as ensure_array_like, aa as attr, a7 as escape_html } from "../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../chunks/Breadcrumb.js";
import { P as PreloadLinkWithData } from "../../../../chunks/PreloadLinkWithData.js";
import { D as DATA_WEBS } from "../../../../chunks/WEBS.js";
function _page($$renderer) {
  const WEBS = DATA_WEBS;
  head("q90sxi", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Error404-Labs | Học lập trình Web hiện đại</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Các khóa học lập trình Web với HTML, CSS, JavaScript. Học qua thực hành cùng Error404-Labs."/> <meta name="keywords" content="học lập trình web, error404 labs, error404-labs, erro 404 labs, html, css, javascript, lập trình frontend"/> <link rel="canonical" href="https://error404-labs.info.vn/huong-dan-hoc/lap-trinh-web"/>`);
  });
  Breadcrumb($$renderer, {});
  $$renderer.push(`<!----> <article class="mb-5! flex flex-col gap-2"><h1 class="text-2xl">Học lập trình Web cùng Error404-Labs</h1> <p>Các khóa học lập trình Web tại Error404-Labs giúp bạn xây dựng website thực tế.</p> <ul><li>Hiểu rõ cách hoạt động của Web.</li> <li>Làm chủ HTML, CSS, và JavaScript hiện đại.</li></ul></article> <div class="wrapper-box-card"><!--[-->`);
  const each_array = ensure_array_like(WEBS);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { name, link, title } = each_array[$$index];
    $$renderer.push(`<div${attr("title", title)} class="box-card">`);
    PreloadLinkWithData($$renderer, {
      href: link,
      style: "color: var(--primary); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; text-align: center;",
      children: ($$renderer2) => {
        $$renderer2.push(`<p class="title">${escape_html(name)}</p>`);
      }
    });
    $$renderer.push(`<!----></div>`);
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  _page as default
};
