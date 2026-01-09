import { X as sanitize_props, a4 as spread_props } from "./index2.js";
import { M as Mdsvex } from "./mdsvex.js";
import { h as html } from "./html.js";
const metadata = {
  "title": "First post",
  "description": "First post.",
  "date": "2025-12-31",
  "categories": ["sveltekit", "svelte"],
  "published": true
};
const { title, description, date, categories, published } = metadata;
function Bai_dang_1_md($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Mdsvex($$renderer, spread_props([
    $$sanitized_props,
    metadata,
    {
      children: ($$renderer2) => {
        $$renderer2.push(`<h1 id="markdown">Markdown</h1> <p>Hey friends 🔥</p> ${html(`<pre class="shiki poimandres" style="background-color:#1b1e28;color:#a6accd" tabindex="0"><code><span class="line"><span style="color:#91B4D5">function</span><span style="color:#ADD7FF"> greet</span><span style="color:#A6ACCD">(</span><span style="color:#E4F0FB">name</span><span style="color:#91B4D5">:</span><span style="color:#A6ACCDC0"> string</span><span style="color:#A6ACCD">) &#123;</span></span>
<span class="line"><span style="color:#E4F0FB">	console</span><span style="color:#A6ACCD">.</span><span style="color:#E4F0FBD0">log</span><span style="color:#A6ACCD">(</span><span style="color:#A6ACCD">&#96;</span><span style="color:#5DE4C7">Hello </span><span style="color:#A6ACCD">$&#123;</span><span style="color:#E4F0FB">name</span><span style="color:#A6ACCD">&#125;</span><span style="color:#5DE4C7"> 🔥</span><span style="color:#A6ACCD">&#96;</span><span style="color:#A6ACCD">);</span></span>
<span class="line"><span style="color:#A6ACCD">&#125;</span></span></code></pre>`)}`);
      },
      $$slots: { default: true }
    }
  ]));
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bai_dang_1_md,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_0 as _
};
