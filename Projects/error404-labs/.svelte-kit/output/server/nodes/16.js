import * as server from '../entries/pages/ve-toi/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ve-toi/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/ve-toi/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.DiotzQry.js","_app/immutable/chunks/1ECRtOeo.js","_app/immutable/chunks/BlOM0YrC.js","_app/immutable/chunks/DCRZB7lX.js","_app/immutable/chunks/Bnydf9ai.js"];
export const stylesheets = ["_app/immutable/assets/16.f-Nua9y1.css","_app/immutable/assets/github-markdown-light.CSRUKxnt.css"];
export const fonts = [];
