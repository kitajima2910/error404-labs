import { a7 as escape_html, a8 as attr_class } from "../../../chunks/index2.js";
import "../../../chunks/client.js";
import "clsx";
function Title($$renderer, $$props) {
  const { title = "Error404-Labs" } = $$props;
  $$renderer.push(`<div class="title flex justify-center items-center flex-wrap"><div class="w-[70px] h-[70px]"><img class="inline-block w-full h-full object-cover rounded-full" src="/midcodekid.webp" alt="site logo"/></div> <h1 class="ml-3! text-2xl">${escape_html(title)}</h1></div>`);
}
function _layout_($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let isOpenBar = false;
    $$renderer2.push(`<header class="sticky z-99999 top-0 bg-[#1e5b66] text-white text-center p-3! svelte-s21w7w"><nav class="flex items-center svelte-s21w7w"><div><a href="/" style="color:#fff; display: block; width: 100%; height: 100%;">`);
    Title($$renderer2, {});
    $$renderer2.push(`<!----></a></div> <div class="links hidden lg:flex ml-auto! text-center!"><div class="link ml-10! flex justify-center items-center p-[5px]! rounded-[5px] hover:bg-[#2a7a88]"><a href="/" style="color:#fff; display: block; width: 100%; height: 100%;">Trang Chủ</a></div> <div class="link ml-10! flex justify-center items-center p-[5px]! rounded-[5px] hover:bg-[#2a7a88]"><a href="/tro-choi" style="color:#fff; display: block; width: 100%; height: 100%;">Trò Chơi</a></div> <div class="link ml-10! flex justify-center items-center relative group p-[5px]! rounded-[5px] hover:bg-[#2a7a88]"><a href="/huong-dan-hoc" style="color:#fff; display: block; width: 100%; height: 100%;">Lập Trình</a> <div class="group-hover:block hidden absolute top-full right-0 w-[190px] bg-[#ffffff] text-left shadow[0_8px_16px_0_rgba(0,0,0,0.2)] text-[16px]"><span class="hover:bg-[#f1f1f1] inline-block w-full"><a href="/huong-dan-hoc/lap-trinh-c-cpp" style="color:#000; padding: calc((5 * 1rem) / 16) calc((15 * 1rem) / 16); display: block; width: 100%; height: 100%;">Lập Trình C/C++</a></span> <span class="hover:bg-[#f1f1f1] inline-block w-full"><a href="/huong-dan-hoc/lap-trinh-web" style="color:#000; padding: calc((5 * 1rem) / 16) calc((15 * 1rem) / 16); display: block; width: 100%; height: 100%;">Lập Trình Web</a></span></div></div> <div class="link ml-10! flex justify-center items-center p-[5px]! rounded-[5px] hover:bg-[#2a7a88]"><a href="/ve-toi" style="color:#fff; display: block; width: 100%; height: 100%;">Về Tôi</a></div></div> <button class="open-bar cursor-pointer fixed top-[2%] right-[3%] text-[2rem]! text-white border-0 bg-transparent lg:hidden">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`☰`);
    }
    $$renderer2.push(`<!--]--></button> <div${attr_class("hidden svelte-s21w7w", void 0, { "open": isOpenBar })}><div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]"><a href="/" style="color:#fff; display: block; width: 100%; height: 100%;">Trang Chủ</a></div> <div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]"><a href="/tro-choi" style="color:#fff; display: block; width: 100%; height: 100%;">Trò Chơi</a></div> <div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]"><a href="/huong-dan-hoc/lap-trinh-c-cpp" style="color:#fff; display: block; width: 100%; height: 100%;">Lập Trình C/C++</a></div> <div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]"><a href="/huong-dan-hoc/lap-trinh-web" style="color:#fff; display: block; width: 100%; height: 100%;">Lập Trình Web</a></div> <div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]"><a href="/ve-toi" style="color:#fff; display: block; width: 100%; height: 100%;">Về Tôi</a></div></div></nav></header> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<main class="max-w-[1200px] mx-auto! p-5!">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></main>`);
    }
    $$renderer2.push(`<!--]--> <footer class="text-center m-5!"><p>Copyright © ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} - Phạm Xuân Hoài</p></footer>`);
  });
}
export {
  _layout_ as default
};
