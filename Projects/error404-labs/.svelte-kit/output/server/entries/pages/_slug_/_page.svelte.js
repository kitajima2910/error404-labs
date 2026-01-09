import { a9 as head, a7 as escape_html, a0 as ensure_array_like, a3 as bind_props, aa as attr } from "../../../chunks/index2.js";
import { f as formatDate } from "../../../chunks/utils2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    head("jot9ci", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.meta.title)}</title>`);
      });
      $$renderer3.push(`<meta property="og:type" content="article"/> <meta property="og:title"${attr("content", data.meta.title)}/>`);
    });
    $$renderer2.push(`<article class="svelte-jot9ci"><hgroup><h1 class="svelte-jot9ci">${escape_html(data.meta.title)}</h1> <p class="svelte-jot9ci">Published at ${escape_html(formatDate(data.meta.date))}</p></hgroup> <div class="tags svelte-jot9ci"><!--[-->`);
    const each_array = ensure_array_like(data.meta.categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      $$renderer2.push(`<span class="surface-4 svelte-jot9ci">#${escape_html(category)}</span>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="prose"><!---->`);
    data.content?.($$renderer2, {});
    $$renderer2.push(`<!----></div></article>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
