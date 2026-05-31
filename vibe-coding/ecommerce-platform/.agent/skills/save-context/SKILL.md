---
name: save-context
description: Ghi nhận tiến độ công việc vào nhật ký sau khi hoàn thành một tính năng.
triggers:
    - "/save"
    - "lưu ngữ cảnh"
---

# NHIỆM VỤ: GHI NHẬT KÝ TIẾN ĐỘ (STATE SAVING)

Khi nhận lệnh này, bạn BẮT BUỘC phải thực hiện các bước sau một cách im lặng (không giải thích dông dài):

1. **Quét thay đổi:** Tự động kiểm tra các file bạn vừa tạo, sửa đổi hoặc cập nhật trong phiên chat hiện tại.
2. **Tóm tắt siêu ngắn:** Viết một đoạn tóm tắt (dưới 50 chữ) về những gì đã hoàn thành (Ví dụ: "Đã hoàn thành UI Giỏ hàng (đọc từ Stitch), viết API lấy danh sách CartItem").
3. **Cập nhật file:** Mở file `.docs/FEATURES_DONE.md` và THÊM (Append) đoạn tóm tắt đó xuống cuối file, kèm theo ngày giờ hiện tại.
4. **Báo cáo:** Trả lời người dùng đúng 1 câu: _"✅ Đã lưu tiến độ vào FEATURES_DONE.md. Bạn có thể đóng phiên chat này."_

**Lưu ý:** Không ghi lại quá trình debug, không ghi lại lỗi. Chỉ ghi KẾT QUẢ CUỐI CÙNG đã chạy thành công.
