import { a9 as head, a0 as ensure_array_like, aa as attr, a7 as escape_html } from "../../chunks/index2.js";
import { t as title } from "../../chunks/config.js";
import { f as formatDate } from "../../chunks/utils2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title)}</title>`);
      });
    });
    $$renderer2.push(`<section><ul class="posts svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(data.posts);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$renderer2.push(`<li class="post svelte-1uha8ag"><a${attr("href", post.slug)} class="title svelte-1uha8ag">${escape_html(post.title)}</a> <p class="date svelte-1uha8ag">${escape_html(formatDate(post.date))}</p> <p class="description svelte-1uha8ag">${escape_html(post.description)}</p></li>`);
    }
    $$renderer2.push(`<!--]--></ul></section>`);
  });
}
export {
  _page as default
};
