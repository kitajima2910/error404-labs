import { aa as attr, a7 as escape_html, X as sanitize_props, a4 as spread_props } from "./index2.js";
import { M as Mdsvex } from "./mdsvex.js";
import "clsx";
function Img($$renderer, $$props) {
  let { src, alt } = $$props;
  $$renderer.push(`<img${attr("src", src)}${attr("alt", alt)} loading="lazy"/>`);
}
function Counter($$renderer) {
  let count = 0;
  $$renderer.push(`<button>${escape_html(count)}</button>`);
}
const metadata = {
  "title": "Second post",
  "description": "Second post.",
  "date": "2026-01-01",
  "categories": ["sveltekit", "svelte"],
  "published": true
};
const { title, description, date, categories, published } = metadata;
function Bai_dang_2_md($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Mdsvex($$renderer, spread_props([
    $$sanitized_props,
    metadata,
    {
      children: ($$renderer2) => {
        $$renderer2.push(`<h2 id="table-of-contents">Table of Contents</h2> <ul><li><a href="#svelte">Svelte</a></li> <li><a href="#counter">Counter</a></li></ul> <h2 id="svelte">Svelte</h2> <p>Media inside the <strong>static</strong> folder is served from <code>/</code>.</p> `);
        Img($$renderer2, { src: "midcodekid.png", alt: "MidCodeKid" });
        $$renderer2.push(`<!----> <h2 id="counter">Counter</h2> `);
        Counter($$renderer2);
        $$renderer2.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bai_dang_2_md,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_1 as _
};
