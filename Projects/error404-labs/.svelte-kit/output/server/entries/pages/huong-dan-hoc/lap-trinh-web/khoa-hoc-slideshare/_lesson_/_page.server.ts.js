import { _ as __variableDynamicImportRuntimeHelper } from "../../../../../../chunks/dynamic-import-helper.js";
import { redirect } from "@sveltejs/kit";
const load = async ({ params }) => {
  try {
    const lesson = params.lesson;
    const lessonRaw = (await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai01/README.md": () => import("../../../../../../chunks/README.js"), "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai02/README.md": () => import("../../../../../../chunks/README2.js"), "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai03/README.md": () => import("../../../../../../chunks/README3.js"), "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai04/README.md": () => import("../../../../../../chunks/README4.js"), "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai05/README.md": () => import("../../../../../../chunks/README5.js"), "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai06/README.md": () => import("../../../../../../chunks/README6.js"), "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai07/README.md": () => import("../../../../../../chunks/README7.js"), "../../../../../lib/md/HocWeb/CoBan/slideshare/Bai08/README.md": () => import("../../../../../../chunks/README8.js") }), `../../../../../lib/md/HocWeb/CoBan/slideshare/Bai${lesson}/README.md`, 12)).default;
    return {
      dataLESSONRaw: lessonRaw
    };
  } catch (error) {
    throw redirect(307, "/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/");
  }
};
export {
  load
};
