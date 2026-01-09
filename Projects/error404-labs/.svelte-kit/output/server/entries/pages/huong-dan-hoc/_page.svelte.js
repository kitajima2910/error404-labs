import { a9 as head, a0 as ensure_array_like, a7 as escape_html } from "../../../chunks/index2.js";
import { P as PreloadLinkWithData } from "../../../chunks/PreloadLinkWithData.js";
function _page($$renderer) {
  const DATA_COURSE = [
    { title: "Lập trình Web", link: "/huong-dan-hoc/lap-trinh-web" },
    {
      title: "Lập trình C/C++",
      link: "/huong-dan-hoc/lap-trinh-c-cpp"
    }
  ];
  head("1mqzas9", $$renderer, ($$renderer2) => {
    $$renderer2.push(`<link rel="canonical" href="https://error404-labs.info.vn/huong-dan-hoc"/>`);
  });
  $$renderer.push(`<article class="mb-5! flex flex-col gap-2"><h1 class="text-2xl">Học lập trình cùng Error404-Labs</h1> <p>Các khóa học lập trình tại Error404-Labs giúp bạn training tốt hơn.</p></article> <div class="guides"><ul class="wrapper-box-card"><!--[-->`);
  const each_array = ensure_array_like(DATA_COURSE);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let course = each_array[$$index];
    $$renderer.push(`<li data-sveltekit-preload-data="" data-sveltekit-preload="" class="box-card">`);
    PreloadLinkWithData($$renderer, {
      href: course.link,
      style: "display: flex; align-items: center; justify-content: center; color: var(--primary);",
      children: ($$renderer2) => {
        $$renderer2.push(`<!---->${escape_html(course.title)}`);
      }
    });
    $$renderer.push(`<!----></li>`);
  }
  $$renderer.push(`<!--]--></ul></div>`);
}
export {
  _page as default
};
