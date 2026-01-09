import { _ as attributes } from "./index2.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
function PreloadLinkWithData($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      href,
      data = {},
      preload = "hover",
      keepOnReload = "hover",
      mode = "push",
      style = "color:#1e5b66",
      children
    } = $$props;
    let attrs = {};
    if (preload) {
      attrs["data-sveltekit-preload-data"] = "hover";
      attrs["data-sveltekit-preload"] = "hover";
    }
    $$renderer2.push(`<a${attributes({
      href,
      ...attrs,
      style,
      class: "inline-block cursor-pointer decoration-0 w-full h-full transition-colors duration-75 ease-in"
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></a>`);
  });
}
export {
  PreloadLinkWithData as P
};
