import { a0 as ensure_array_like, aa as attr, a7 as escape_html } from "../../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../../chunks/Breadcrumb.js";
import { a as DATA_SLIDESHARE_LESSONS } from "../../../../../chunks/WEBS.js";
function _page($$renderer) {
  const LESSONS = DATA_SLIDESHARE_LESSONS;
  Breadcrumb($$renderer, {});
  $$renderer.push(`<!----> <div class="slideshare svelte-13f2zbq"><h3 class="svelte-13f2zbq">✧･ﾟ: *✧･ﾟ:* 💎 BÀI HỌC 💎 *:･ﾟ✧*:･ﾟ✧</h3> <!--[-->`);
  const each_array = ensure_array_like(LESSONS);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { icon, name_lesson, name, link } = each_array[$$index];
    $$renderer.push(`<p class="svelte-13f2zbq"><a data-sveltekit-preload-data="" data-sveltekit-preload=""${attr("href", link)} class="svelte-13f2zbq"><span class="icon">${escape_html(icon)}</span> <strong>${escape_html(name_lesson)}:</strong> ${escape_html(name)}</a></p>`);
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  _page as default
};
