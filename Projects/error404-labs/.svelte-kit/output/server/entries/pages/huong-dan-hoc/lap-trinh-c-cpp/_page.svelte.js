import { a9 as head, a0 as ensure_array_like, aa as attr, a7 as escape_html } from "../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../chunks/Breadcrumb.js";
import { P as PreloadLinkWithData } from "../../../../chunks/PreloadLinkWithData.js";
function _page($$renderer) {
  const DATA_COURSE = [
    // {
    // 	title: 'Lập Trình Cơ Bản - Bài Tập Thực Hành',
    // 	tooltip: 'Khóa học: lập trình cơ bản - bài tập thực hành',
    // 	link: '/huong-dan-hoc/lap-trinh-c-cpp/lap-trinh-co-ban-bai-tap-thuc-hanh'
    // },
    {
      title: "Lập Trình C++ - Từ Cơ Bản Đến Nâng Cao",
      tooltip: "Khóa học: Lập Trình C++ - Từ Cơ Bản Đến Nâng Cao",
      link: "/huong-dan-hoc/lap-trinh-c-cpp/tu-co-ban-den-nang-cao"
    }
    // {
    // 	title: 'oj.isp88.win',
    // 	tooltip: 'Training Gen 7 tại ISP CLUB - CLB ATTT PTIT',
    // 	link: '/huong-dan-hoc/lap-trinh-c-cpp/oj.isp88.win'
    // }
  ];
  head("13chc95", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Error404-Labs | Học lập trình C/C++ từ cơ bản đến nâng cao</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Các khóa học lập trình C/C++ tại Error404-Labs. Học từ cơ bản đến nâng cao, hướng dẫn qua thực hành, dễ hiểu, dễ ứng dụng."/> <meta name="keywords" content="học lập trình C, C++, error404 labs, error404-labs, erro 404 labs, học C, học C++, lập trình căn bản, hướng dẫn C++, dự án lập trình C++"/> <link rel="canonical" href="https://error404-labs.info.vn/huong-dan-hoc/lap-trinh-c-cpp"/>`);
  });
  Breadcrumb($$renderer, {});
  $$renderer.push(`<!----> <article class="mb-5! flex flex-col gap-2"><h1 class="text-2xl">Học lập trình C/C++ cùng Error404-Labs</h1> <ul><li>Tổng quan C/C++</li> <li>Kiến thức cơ bản và nâng cao</li></ul></article> <div class="wrapper-box-card"><!--[-->`);
  const each_array = ensure_array_like(DATA_COURSE);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { title, tooltip, link } = each_array[$$index];
    $$renderer.push(`<div${attr("title", tooltip)} class="box-card">`);
    PreloadLinkWithData($$renderer, {
      href: link,
      style: "color: var(--primary); text-align: center; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;",
      children: ($$renderer2) => {
        $$renderer2.push(`<span>${escape_html(title)}</span>`);
      }
    });
    $$renderer.push(`<!----></div>`);
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  _page as default
};
