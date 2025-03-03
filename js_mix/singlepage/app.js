class App {
    constructor(root) {
        this.root = $(root);
    }

    init() {
        this.bindEvents();
        this.loadPage("home");

        // Active mặc định trang chủ khi mới vào
        $(".nav-link[data-page='home']").addClass("active");
    }

    bindEvents() {
        $(document).on("click", ".nav-link", (event) => {
            event.preventDefault();
            $(".nav-link").removeClass("active");
            $(event.target).addClass("active");
            const page = $(event.target).data("page");
            this.loadPage(page);
        });
    }

    loadPage(page) {
        this.root.html("");
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
        // Xóa CSS cũ
        $("link[data-component-style]").remove();

        // Thêm CSS mới
        $("<link>", {
            rel: "stylesheet",
            href: `app/components/${page}/main.css`,
            "data-component-style": page,
        }).appendTo("head");

        // Xóa Script cũ
        $("script[data-component-script]").remove();

        // Thêm Script mới
        $("<script>", {
            src: `app/components/${page}/main.js`,
            "data-component-script": page,
            type: "text/javascript",
        }).appendTo("body");
    }
}

$(document).ready(() => {
    const app = new App("#app");
    app.init();
});
