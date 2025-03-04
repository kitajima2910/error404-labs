class App {
    constructor(root) {
        this.root = $(root);
        this.currentPage = null;
        this.loadedAssets = new Set();
    }

    init() {
        this.bindEvents();
        this.loadPage("home");
        $(".nav-link[data-page='home']").addClass("active");
    }

    bindEvents() {
        $(document).on("click", ".nav-link", (event) => {
            event.preventDefault();
            const page = $(event.target).data("page");
            if (page !== this.currentPage) {
                $(".nav-link").removeClass("active");
                $(event.target).addClass("active");
                this.loadPage(page);
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
            },
            error: () => {
                this.root.html("<p>Lỗi tải trang!</p>");
            },
        });
    }

    loadAssets(page) {
        // Load CSS nếu chưa được load
        if (!this.loadedAssets.has(`${page}.css`)) {
            $("<link>", {
                rel: "stylesheet",
                href: `app/components/${page}/main.css`,
                "data-component-style": page,
            }).appendTo("head");
            this.loadedAssets.add(`${page}.css`);
        }

        // Load Script nếu chưa được load
        if (!this.loadedAssets.has(`${page}.js`)) {
            $("<script>", {
                src: `app/components/${page}/main.js`,
                "data-component-script": page,
                type: "text/javascript",
            }).appendTo("body");
            this.loadedAssets.add(`${page}.js`);
        }
    }
}

$(document).ready(() => {
    const app = new App("#app");
    app.init();
});
