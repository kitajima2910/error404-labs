$(document).ready(() => {
    if (app) {
        $("img[alt='logo']").click((event) => {
            const page = $(event.target).data("page");
            if (page !== this.currentPage) {
                const navLinkHome = $(".nav-link[data-page='games']");

                $(".nav-link").removeClass("active");
                $(navLinkHome).addClass("active");
                app.loadPage(page);

                localStorage.setItem("currentPage", page);
            }
        });
    }
});
