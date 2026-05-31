# MÀN HÌNH: Giỏ Hàng Trượt (Slide-out Cart Drawer)

**1. Thông tin chung (Meta Info)**

- **Dự án:** TechBite E-commerce (Bán đồ công nghệ).
- **Tính năng:** Giỏ hàng dạng Ngăn kéo trượt (Drawer) từ cạnh phải màn hình thay vì chuyển sang một trang (Page) riêng biệt.
- **Mục đích:** Giúp khách hàng kiểm tra lại sản phẩm vừa thêm vào giỏ, xem tổng tiền và đi đến bước Thanh toán một cách nhanh nhất mà không làm gián đoạn luồng mua sắm hiện tại.

**2. Đối tượng & Trải nghiệm (Target & UX)**

- **Người dùng chính:** Khách hàng đang lướt xem và mua sắm đồ công nghệ.
- **Hành động chính:** Bấm nút [+] / [-] để tăng giảm số lượng, xóa sản phẩm, và bấm nút "Thanh Toán Ngay" (Checkout).
- **Cảm xúc mang lại:** Tốc độ, mượt mà (smooth animations), hiện đại và đáng tin cậy.

**3. Đặc tả Thiết kế (Design Specs)**

- **Phong cách UI:** Minimalist (Tối giản) kết hợp Glassmorphism.
- **Quy tắc hiển thị:** - Khi mở Giỏ hàng, phần nền (background) của trang web bên dưới phải tối đi và làm mờ (backdrop-blur) để tập trung ánh nhìn vào Drawer.
    - Vùng chứa danh sách sản phẩm phải có thanh cuộn (scrollable) bên trong, trong khi phần Tạm tính & Nút Thanh toán phải ghim cố định (sticky) ở dưới cùng.
- **Màu sắc chủ đạo:** - Nút "Thanh Toán" BẮT BUỘC dùng màu Cam rực rỡ (`bg-orange-600`) để chốt sale.
    - Các nút phụ (Xóa, Đóng) dùng màu Xám nhạt trung tính.

**4. Dữ liệu cốt lõi (Core Data)**

- **Danh sách sản phẩm (Cart Items):** Hình ảnh Thumbnail (vuông), Tên sản phẩm, Giá bán hiện tại, Bộ đếm số lượng (Quantity Counter).
- **Phần Tổng kết (Summary):** - Phí giao hàng (Hiển thị "Miễn phí" bằng màu xanh lá).
    - Tổng tiền (Tổng cộng).
- **Call to Action (CTA):** Nút "Thanh Toán".
