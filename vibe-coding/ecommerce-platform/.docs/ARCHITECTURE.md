# KIẾN TRÚC HỆ THỐNG: E-COMMERCE PLATFORM

## 1. Sơ đồ dữ liệu cốt lõi (Core Database Entities)

- **Product (Sản phẩm):** Lưu thông tin cơ bản, `price` (giá gốc), `salePrice` (giá khuyến mãi), `stock` (tồn kho).
- **Category (Danh mục):** Phân loại sản phẩm (Quần áo, Điện tử...). Hỗ trợ cấu trúc cây (Parent - Child).
- **Cart & CartItem (Giỏ hàng):** Lưu trạng thái giỏ hàng tạm thời. Nếu user chưa login, dùng Session/Local Storage. Nếu đã login, lưu vào DB.
- **Order & OrderItem (Đơn hàng):** Lưu trữ lịch sử mua hàng bất biến (Snapshot). Giá sản phẩm trong OrderItem BẮT BUỘC lưu cứng tại thời điểm mua, không tham chiếu lại giá bảng Product.

## 2. Luồng nghiệp vụ tối quan trọng (Critical Business Logic)

- **Tính toán tiền (Pricing):** - Mọi phép tính tiền tệ (Tổng đơn, Giảm giá, Thuế) BẮT BUỘC thực hiện ở Backend (NestJS/Laravel).
    - TUYỆT ĐỐI không tin tưởng dữ liệu giá tiền gửi lên từ Frontend. Frontend chỉ gửi `productId` và `quantity`.
- **Quản lý Tồn kho (Inventory):**
    - Trừ `stock` ngay khi thanh toán thành công.
    - Nếu `stock === 0`, API không cho phép thêm vào giỏ hàng.
- **Thanh toán (Payment Checkout):**
    - Trạng thái Order mặc định là `PENDING`.
    - Chỉ chuyển sang `PAID` qua Webhook trả về từ Cổng thanh toán (Stripe/VNPay).

## 3. Quy chuẩn API (API Standards)

- **Phân trang (Pagination):** Mọi API trả về danh sách (Ví dụ: Lấy danh sách sản phẩm) bắt buộc phải có phân trang (page, limit, totalPages).
- **Bảo mật:** API tạo Đơn hàng bắt buộc phải có Rate Limit để chống Spam.
