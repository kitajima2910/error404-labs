# ⚡ SKILLS.md: PROJECT 03 - SAAS DIRECTORY

## 🛠 TECH STACK (2026 STANDARDS)

- **Frontend:** HTML5, Tailwind 4.x, DaisyUI 5.x.
- **Search Logic:** HTMX 2.x (`hx-get`, `hx-trigger="keyup changed delay:500ms"`).
- **Client UI:** Alpine.js 3.x (Cho việc đóng mở các Filter dropdown).
- **Database:** Neon (Postgres) - Chuyên về truy vấn SELECT và LIKE.

## 🎯 CÔNG VIỆC CỐT LÕI

1. Thiết kế Grid Layout chuẩn SaaS với các Card sản phẩm đẹp mắt.
2. Xây dựng API `/api/tools` nhận tham số `?search=...` và trả về các đoạn HTML `<div>`.
3. Tối ưu hóa Database Indexing trên Neon để tìm kiếm theo tên/mô tả cực nhanh.
4. Sử dụng CSS Skeleton loading (của DaisyUI) trong khi HTMX đang fetch dữ liệu.

## 🚫 QUY TẮC CỨNG (VIBE_CHECK TRIGGER)

- KHÔNG dùng Client-side filtering (không tải hết dữ liệu về máy user rồi mới lọc). Phải lọc ở Backend.
- Trả về Partial HTML cho mỗi Card sản phẩm, không trả về JSON thô.
- Đảm bảo thanh tìm kiếm có 'debounce' (trì hoãn) để không làm sập Database khi gõ nhanh.

## 📝 GHI CHÚ THÊM (Production-Ready Checklist)

- 🔐 **Bảo mật API**
  - Sử dụng API Key qua Header (`x-api-key`).
  - Rate limiting theo IP.
  - Validate & sanitize toàn bộ query `search`, `sort`, `filter`.

- 🗂 **Cấu trúc Project Chuẩn SaaS**
  - Tách rõ: `/api`, `/components`, `/partials`, `/layouts`.
  - Tạo `.gitignore` chuẩn Node/Vercel.
  - Viết `README.md` mô tả:
    - Cách chạy local
    - Biến môi trường `.env`
    - Cách deploy
  - Sử dụng pnpm cho việc quản lý package.

- 🚀 **Deploy & Infrastructure**
  - Hỗ trợ deploy Vercel (Edge Functions nếu cần).
  - Dùng Neon connection pooling.
  - Thiết lập Environment Variables an toàn.

- ⚡ **Performance Backend**
  - Tạo INDEX cho:
    - `name`
    - `description`

  - Ưu tiên `ILIKE` + `GIN index` nếu search full-text.
  - Tránh `SELECT *`, chỉ select cột cần thiết.
  - Pagination bằng `LIMIT + OFFSET` hoặc `cursor-based`.

- 🔍 **Search & Query Optimization**
  - Debounce 300–500ms phía HTMX.
  - Query có fallback khi search rỗng.
  - Chuẩn hóa search tiếng Việt (không dấu nếu cần).

- 🎛 **Tính năng Directory**
  - Pagination động bằng HTMX.
  - Sort theo:
    - Mới nhất
    - Phổ biến
    - Alphabet

  - Filter theo category/tag.
  - Deep-link query string (`?search=&sort=&page=`).

- 🎨 **UX/UI Optimization**
  - Skeleton loading khi fetch.
  - Không flash layout khi thay đổi dữ liệu.
  - Responsive chuẩn mobile-first.
  - Lazy load hình ảnh.

- 🧠 SEO Optimization\*\*
  - Server-render nội dung mặc định.
  - Meta dynamic theo search query.
  - Semantic HTML.
  - Sitemap.xml.
  - Open Graph tags.

- 🌏 Hỗ trợ Tiếng Việt
  - UTF-8 chuẩn.
  - Tìm kiếm không phân biệt hoa/thường.
  - Tùy chọn search không dấu.

- 🌍 Cross-Origin Control (Allow Domain từ Database)
  - Không hardcode CORS trong code
  - Không dùng Access-Control-Allow-Origin: \*
  - Không whitelist cố định trong server config.
  - Query ở app3.allowed_origins trong Postgres (Neon)
    ```sql
    CREATE TABLE app3.allowed_origins (
      id SERIAL PRIMARY KEY,
      domain TEXT UNIQUE NOT NULL,
      is_active BOOLEAN DEFAULT true
    );
    ```
