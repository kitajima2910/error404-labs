---
name: archive-memory
description: Nén bộ nhớ, dọn dẹp nhật ký cũ và cập nhật kiến trúc cốt lõi.
triggers:
    - "/archive"
    - "dọn dẹp bộ nhớ"
---

# NHIỆM VỤ: NÉN BỘ NHỚ VÀ CHUYỂN GIAO SỰ THẬT (MEMORY ARCHIVING)

File `.docs/FEATURES_DONE.md` đang quá dài. Bạn cần dọn dẹp nó theo quy trình 3 bước sau:

**BƯỚC 1: TRÍCH XUẤT KIẾN TRÚC LÕI (KNOWLEDGE EXTRACTION)**
Đọc toàn bộ file `.docs/FEATURES_DONE.md`. Tìm kiếm xem có bất kỳ thay đổi nào liên quan đến:

- **Database:** Bảng mới, trường mới, quan hệ mới.
- **Luồng logic:** Quy trình thanh toán mới, phân quyền mới.
- **UI/UX:** Component mới dùng chung, màu sắc mới.

**BƯỚC 2: CHUYỂN GIAO SỰ THẬT (STATE TRANSFER)**

- Mở file `.docs/ARCHITECTURE.md` và CẬP NHẬT các thay đổi về Database/Logic vào đó.
- Mở file `.docs/STYLEGUIDE.md` và CẬP NHẬT các component/luật UI mới vào đó.

**BƯỚC 3: DỌN RÁC (GARBAGE COLLECTION - QUAN TRỌNG NHẤT)**
Mở lại file `.docs/FEATURES_DONE.md`.

- **Xóa sạch** các chi tiết lặt vặt.
- **Thay thế** toàn bộ lịch sử cũ bằng một danh sách tóm tắt cực kỳ ngắn gọn (Bullet points) mang tên `[Archived Milestones]`.
- Chỉ giữ lại chi tiết của **1 tính năng gần nhất**.

**Báo cáo:** In ra danh sách các file đã được dọn dẹp và cập nhật.
