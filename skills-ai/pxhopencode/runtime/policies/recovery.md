# Chính sách Phục hồi

## Tham chiếu chéo
- **Người thi hành:** `runtime/layers/02-orchestration.md` — Điều phối quyết định đường phục hồi
- **Nguồn dữ liệu:** `runtime/layers/04-infrastructure.md` — Cung cấp checkpoint cho phục hồi
- **Workers:** `runtime/layers/03-worker.md` — Workers không bao giờ tự phục hồi, chỉ Điều phối quyết định
- **Thử lại:** `runtime/policies/retry.md` — Áp dụng trước Phục hồi cho lỗi tạm thời
- **Phản ánh:** `runtime/policies/reflection.md` — Phản ánh sự cố được kích hoạt khi lỗi lặp lại
- **Contracts:** `runtime/contracts/README.md` — Event (checkpoint), State (dữ liệu phục hồi), Result (chi tiết lỗi)

## Nguyên tắc
1. **Lỗi tại biên giới tầng** — không bao giờ để lỗi vượt qua biên giới trong im lặng.
2. **Checkpoint trước mọi chuyển tiếp** — Hạ tầng lưu trước khi tầng tiếp theo bắt đầu.
3. **Điều phối quyết định** — workers không bao giờ tự thử lại hoặc tự hủy.
4. **Trạng thái là nguồn sự thật** — sau sập, phục hồi từ checkpoint cuối.

## Phục hồi theo tầng

| Tầng | Lỗi | Phát hiện | Phục hồi |
|------|-----|-----------|----------|
| 1 Giao diện | Request không hợp lệ | Xác thực schema | Trả lỗi cho user, yêu cầu sửa |
| 2 Điều phối | Hỏng trạng thái | Checkpoint không khớp | Khôi phục từ Hạ tầng, chạy lại phase hiện tại |
| 3 Nhân công | Timeout (>5 phút) | Theo dõi timeout của Điều phối | Thử lại (xem policy thử lại) → leo thang |
| 3 Nhân công | Lỗi logic | Result không success | Điều phối quyết định: bỏ qua / thay / hủy |
| 4 Hạ tầng | Lỗi ghi | Exception khi lưu | Cache local → thử lại với backoff → leo thang |
| Mọi tầng | Lỗi dây chuyền | Nhiều lỗi trong <30s | Checkpoint khẩn cấp → thông báo user → hủy |

## Định dạng Checkpoint
Mỗi checkpoint ghi lại:
```
- Phase hiện tại
- Các phase đã hoàn tất
- Mọi artifact đã sinh ra
- Lịch sử lỗi (nếu có)
- Timestamp
```

## Luồng Phục hồi
```
1. Tầng 2 phát hiện lỗi (hoặc Tầng 4 không phản hồi)
2. Tầng 2 yêu cầu State contract từ Tầng 4
3. Tầng 4 trả về checkpoint cuối
4. Tầng 2 tiếp tục từ checkpoint:
   a. Nếu worker phase hiện tại đã bắt đầu → gửi lại Task
   b. Nếu worker phase hiện tại chưa bắt đầu → bắt đầu bình thường
   c. Nếu phase hiện tại đã hoàn tất → tiến đến phase tiếp theo
5. Nếu Tầng 4 cũng lỗi → Tầng 2 dùng trạng thái biết cuối tự thân
```
