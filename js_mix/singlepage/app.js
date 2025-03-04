// Class App chịu trách nhiệm quản lý điều hướng và tải trang động
class App {
    constructor(root) {
        // Phần tử gốc để render nội dung các trang
        this.root = $(root);
        // Trang hiện tại đang được hiển thị
        this.currentPage = null;
        // Set lưu lại các tài nguyên đã được load để tránh tải lại
        this.loadedAssets = new Set();
    }

    // Khởi tạo ứng dụng
    init() {
        this.bindEvents(); // Gán sự kiện cho các phần tử trên trang

        // Kiểm tra localStorage để tải lại trang trước đó khi F5
        const savedPage = localStorage.getItem("currentPage") || "home";
        this.loadPage(savedPage);
        $(`.nav-link[data-page='${savedPage}']`).addClass("active");
    }

    // Gán sự kiện click cho các liên kết điều hướng
    bindEvents() {
        $(document).on("click", ".nav-link", (event) => {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
            const page = $(event.target).data("page"); // Lấy tên trang từ thuộc tính data-page
            if (page !== this.currentPage) {
                // Thêm/xóa class active cho các link điều hướng
                $(".nav-link").removeClass("active");
                $(event.target).addClass("active");
                this.loadPage(page); // Tải trang tương ứng

                // Lưu trang hiện tại vào localStorage
                localStorage.setItem("currentPage", page);
            }
        });
    }

    // Phương thức tải trang động từ thư mục components
    loadPage(page) {
        if (page === this.currentPage) return; // Nếu trang hiện tại giống trang cần load thì không làm gì
        this.currentPage = page;
        this.root.empty(); // Xóa nội dung cũ trong phần tử gốc
        $.ajax({
            url: `app/components/${page}/index.html`,
            success: (data) => {
                this.root.html(data); // Đổ nội dung trang vào phần tử gốc
                this.loadAssets(page); // Load các tài nguyên (CSS, JS) của trang
            },
            error: () => {
                this.root.html("<p>Lỗi tải trang!</p>"); // Hiển thị thông báo lỗi nếu không tải được trang
            },
        });
    }

    // Phương thức load các tài nguyên bổ sung (CSS, JS) cho từng component
    loadAssets(page) {
        // Kiểm tra và load CSS nếu chưa được load
        if (!this.loadedAssets.has(`${page}.css`)) {
            $("<link>", {
                rel: "stylesheet",
                href: `app/components/${page}/main.css`,
                "data-component-style": page,
            }).appendTo("head");
            this.loadedAssets.add(`${page}.css`);
        }

        // Kiểm tra và load Script nếu chưa được load
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

// Khi tài liệu HTML đã sẵn sàng, khởi tạo ứng dụng
$(document).ready(() => {
    const app = new App("#app"); // Khởi tạo app với phần tử gốc #app
    app.init(); // Gọi phương thức khởi tạo
});
