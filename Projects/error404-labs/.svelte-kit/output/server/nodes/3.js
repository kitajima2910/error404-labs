import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.YhIr47O_.js","_app/immutable/chunks/1ECRtOeo.js","_app/immutable/chunks/BlOM0YrC.js","_app/immutable/chunks/BNWoGOOp.js","_app/immutable/chunks/ChtZeQb_.js","_app/immutable/chunks/DyuYgVPQ.js","_app/immutable/chunks/DE61Jw4-.js","_app/immutable/chunks/Bnydf9ai.js","_app/immutable/chunks/URnVk1Lo.js","_app/immutable/chunks/CyE5DhW1.js"];
export const stylesheets = ["_app/immutable/assets/3.DB0crdOi.css"];
export const fonts = [];
