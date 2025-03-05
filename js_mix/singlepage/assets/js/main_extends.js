$(document).ready(() => {
    if (app) {
        $("img[alt='logo']").click((event) => {
            const page = $(event.target).data("page");
            if (page !== this.currentPage) {
                const navLinkHome = $(".nav-link[data-page='games']");

                // Thêm/xóa class active cho các link điều hướng
                $(".nav-link").removeClass("active");
                $(navLinkHome).addClass("active");
                app.loadPage(page); // Tải trang tương ứng

                // Lưu trang hiện tại vào localStorage
                localStorage.setItem("currentPage", page);
            }
        });
    }
});
