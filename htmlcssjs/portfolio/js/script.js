document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        header.classList.toggle("sticky", window.scrollY > 0);
    });

    const menu = document.querySelector("#menu-icon");
    const navlist = document.querySelector(".navlist");

    menu.addEventListener("click", () => {
        menu.classList.toggle("bx-x");
        navlist.classList.toggle("active");
    });

    window.addEventListener("scroll", () => {
        navlist.classList.remove("active");
        menu.classList.remove("bx-x");
    });

    const sr = ScrollReveal({
        distance: "45px",
        duration: 2700,
        reset: true,
    });

    sr.reveal(".home-text", { delay: 350, origin: "left" });
    sr.reveal(".home-img", { delay: 350, origin: "right" });
    sr.reveal(".sub-service, .about, .contact, .portfolio, .service, .cta", { delay: 200, origin: "bottom" });
});
