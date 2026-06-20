# Chính sách Thử lại

## Phạm vi
Được Tầng 2 — Điều phối (`layers/02-orchestration.md`) áp dụng khi Worker (`layers/03-worker.md`) trả về lỗi có thể thử lại.

## Tham chiếu chéo
- **Người thi hành:** `runtime/layers/02-orchestration.md` — Điều phối áp dụng chính sách này
- **Workers bị ảnh hưởng:** `runtime/layers/03-worker.md` — Workers trả về Result{status:"failure"}, Điều phối quyết định thử lại
- **Phục hồi:** `runtime/policies/recovery.md` — Khi thử lại cạn kiệt, Chính sách phục hồi tiếp quản
- **Phản ánh:** `runtime/policies/reflection.md` — Thử lại nhiều lần kích hoạt phản ánh sự cố
- **Contracts:** `runtime/contracts/README.md` — Task chứa tham số thử lại, Result mang chi tiết lỗi

## Khi nào thử lại
Chỉ thử lại lỗi TẠM THỜI:
- Network timeout
- Rate limiting (HTTP 429 / 503)
- Tranh chấp tài nguyên
- Dịch vụ tạm thời không khả dụng

KHÔNG BAO GIỜ thử lại:
- Lỗi xác thực
- Lỗi xác thực danh tính / phân quyền
- Lỗi logic (code sai, thuật toán sai)
- Vi phạm contract

## Tham số
```
Số lần tối đa:    3 (lần đầu + 2 lần thử lại)
Backoff:           Exponential với jitter
Delay cơ sở:      1s
Hệ số nhân:       2x
Delay tối đa:     30s
Jitter:            ±25% delay hiện tại
```

## Luồng

```
Lần 1 → lỗi (tạm thời)
  chờ 1s ±250ms
Lần 2 → lỗi (tạm thời)
  chờ 2s ±500ms
Lần 3 → lỗi (tạm thời)
  → đánh dấu cạn kiệt → leo thang đến Điều phối
```

## Cạn kiệt
Sau khi thử lại cạn kiệt:
1. Điều phối ghi cả 3 lần lỗi vào Hạ tầng (Tầng 4)
2. Điều phối quyết định: bỏ qua task / thay worker / hủy workflow
3. User được thông báo với tóm tắt lỗi và các lựa chọn khả dụng
