import "clsx";
function Mdsvex($$renderer, $$props) {
  let { children } = $$props;
  children?.($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  Mdsvex as M
};
