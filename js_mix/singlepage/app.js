class App {
    constructor(root) {
        this.root = $(root);
        this.currentPage = null;
        this.loadedAssets = new Set();
    }

    init() {
        this.bindEvents();

        const savedPage = localStorage.getItem("currentPage") || "games";
        this.loadPage(savedPage);
        $(`.nav-link[data-page='${savedPage}']`).addClass("active");
    }

    bindEvents() {
        $(document).on("click", ".nav-link", (event) => {
            event.preventDefault();
            const page = $(event.target).data("page");
            if (page !== this.currentPage) {
                $(".nav-link").removeClass("active");
                $(event.target).addClass("active");
                this.loadPage(page);

                localStorage.setItem("currentPage", page);
            }
        });
    }

    loadPage(page) {
        if (page === this.currentPage) return;
        this.currentPage = page;
        this.root.empty();
        $.ajax({
            url: `app/components/${page}/index.html`,
            success: (data) => {
                this.root.html(data);
                this.loadAssets(page);

                window.title = ` -:- ${
                    page.charAt(0).toUpperCase() + page.slice(1)
                } . ${"pxh2910".toUpperCase()} -:- `;
            },
            error: () => {
                this.root.html("<p>Lỗi tải trang!</p>");
            },
        });
    }

    loadAssets(page) {
        $(`style[data-component-script="${page}"]`).remove();
        $("<link>", {
            rel: "stylesheet",
            href: `app/components/${page}/main.css`,
            "data-component-style": page,
        }).appendTo("head");
        this.loadedAssets.add(`${page}.css`);

        $(`script[data-component-script="${page}"]`).remove();
        $("<script>", {
            src: `app/components/${page}/main.js`,
            "data-component-script": page,
            type: "text/javascript",
        }).appendTo("body");
        this.loadedAssets.add(`${page}.js`);
    }
}

$(document).ready(() => {
    app = new App("#app");
    app?.init();

    let position = window.title.length;

    function scrollTitle() {
        document.title =
            window.title.slice(position) + window.title.slice(0, position);
        position = position > 0 ? position - 1 : window.title.length;
        setTimeout(scrollTitle, 50);
    }

    scrollTitle();
});
