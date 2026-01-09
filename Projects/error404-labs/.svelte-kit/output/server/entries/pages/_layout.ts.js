const prerender = true;
async function load({ url }) {
  return {
    url: url.pathname
  };
}
export {
  load,
  prerender
};
