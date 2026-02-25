# ⚡ SKILLS.md: PROJECT 02 - VIRAL WAITLIST

## 🛠 TECH STACK (2026 STANDARDS)
- **Frontend:** HTML5, Tailwind 4.x, DaisyUI 5.x.
- **Dynamic Logic:** HTMX 2.x (Gửi form không load lại trang).
- **Client State:** Alpine.js 3.x (Hiển thị thông báo thành công/lỗi).
- **Backend:** Vercel Serverless Functions (Node.js 22.x).
- **Database:** Neon (PostgreSQL) - Kết nối qua @neondatabase/serverless.

## 🎯 CÔNG VIỆC CỐT LÕI
1. Xây dựng Form thu thập Email với hiệu ứng mượt mà.
2. Thiết kế Database Schema trên Neon để lưu trữ lead.
3. Sử dụng HTMX để gửi dữ liệu từ Frontend lên Vercel Function.
4. Xử lý logic Backend: Kiểm tra email hợp lệ, kiểm tra trùng lặp trong DB.
5. Phản hồi HTML Partial từ Backend để HTMX cập nhật giao diện ngay lập tức.

## 🚫 QUY TẮC CỨNG (VIBE_CHECK TRIGGER)
- TUYỆT ĐỐI KHÔNG dùng React/Next.js.
- Phải dùng Connection Pooling cho Neon DB để chịu tải 100k users.
- API phải trả về đoạn mã HTML (không phải JSON) để HTMX xử lý.

## 📝 PHẦN KHÁC (VIBE_CHECK TRIGGER)
- Sử dụng tiếng Việt để giao tiếp với tôi.
- Các files như plan.md, SKILLS.md, README.md, ... phải được viết bằng tiếng Việt (nếu có)
- Tạo ra file .gitignore để git ignore các files không cần thiết.
- Không sử dụng các thư viện không cần thiết, code phải được tối ưu hóa, không để lộ thông tin nhạy cảm, API key, database credentials, ...
- Không dùng gradient cho bất kì thứ gì, chỉ dùng màu đơn sắc.