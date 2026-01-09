import { ab as getContext, a9 as head, a7 as escape_html, aa as attr, ac as stringify } from "../../../../../../chunks/index2.js";
/* empty css                                             */
import "marked";
import "../../../../../../chunks/client.js";
import { B as Breadcrumb } from "../../../../../../chunks/Breadcrumb.js";
import { a as DATA_SLIDESHARE_LESSONS } from "../../../../../../chunks/WEBS.js";
import { h as html } from "../../../../../../chunks/html.js";
function context() {
  return getContext("__request__");
}
const page$1 = {
  get params() {
    return context().page.params;
  }
};
const page = page$1;
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let lesson = page.params.lesson || "";
    let content = "⏳ Đang tải bài học";
    const nameMap = { [lesson]: `Bài ${lesson}` };
    let { data } = $$props;
    const { dataLESSONRaw } = data;
    const CLONE_DATA_SLIDESHARE_LESSONS = DATA_SLIDESHARE_LESSONS;
    const SEOLesson = CLONE_DATA_SLIDESHARE_LESSONS.filter((item) => item.link.includes(lesson))[0];
    head("fwx1ov", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Error404-Labs | ${escape_html(`${SEOLesson.name_lesson} ${SEOLesson.name}`)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", `${SEOLesson.name_lesson} ${SEOLesson.name}`)}/> <meta name="keywords"${attr("content", `${SEOLesson.name_lesson} ${SEOLesson.name}`)}/> <link rel="canonical"${attr("href", `https://error404-labs.info.vn/${stringify(SEOLesson.link)}`)}/>`);
    });
    Breadcrumb($$renderer2, { nameMap });
    $$renderer2.push(`<!----> <div class="markdown-body">${html(content)}</div>`);
  });
}
export {
  _page as default
};
