# LUẬT THIẾT KẾ: E-COMMERCE PLATFORM

## 1. Bảng màu & Điểm nhấn (Color & Hierarchy)

- **Primary Action (Màu chốt sale):** `bg-orange-600` (Sử dụng DUY NHẤT cho nút "Thêm vào giỏ" và "Thanh toán". Không dùng màu này cho các thành phần trang trí để điều hướng mắt người dùng).
- **Secondary Action:** `bg-slate-900` (Nút xem chi tiết, Phân loại).
- **Background:** `bg-gray-50` (Nền trang xám nhạt để làm nổi bật các thẻ sản phẩm màu trắng).
- **Giá tiền (Price):** Giá hiện tại dùng `text-red-600 font-bold`. Giá cũ dùng `text-slate-400 line-through`.

## 2. Thành phần đặc thù (E-com UI Components)

- **Product Card (Thẻ sản phẩm):**
    - Luôn có tỷ lệ ảnh khung vuông (Aspect Ratio 1:1) hoặc chữ nhật đứng (3:4).
    - Hình ảnh phải có background xám nhạt nếu ảnh gốc có nền trong suốt.
    - Phải có Badge hiển thị "% Giảm giá" góc trên bên phải.
- **Badges (Nhãn trạng thái):**
    - "Out of Stock" (Hết hàng): Khóa xám toàn bộ thẻ sản phẩm, Badge `bg-gray-500 text-white`.
    - "New" (Mới): Badge `bg-green-500 text-white`.
- **Layout danh sách (Grid):**
    - Mobile: 2 cột (`grid-cols-2`).
    - Tablet: 3 cột (`md:grid-cols-3`).
    - Desktop: 4 hoặc 5 cột (`lg:grid-cols-4 xl:grid-cols-5`).

## 3. Trải nghiệm người dùng (UX Constraints)

- **Giỏ hàng (Cart):** Sử dụng Drawer (Trượt từ phải sang) khi ấn vào icon giỏ hàng, KHÔNG nhảy sang trang mới để tránh đứt mạch mua sắm.
- **Phản hồi (Feedback):** Khi bấm "Thêm vào giỏ", phải có Toast Message góc trên cùng báo thành công.
