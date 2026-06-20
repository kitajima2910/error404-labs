# Chính sách Phản ánh

## Tham chiếu chéo
- **Người tạo:** Mọi tầng (`runtime/layers/`) — Mỗi tầng gửi sự kiện phản ánh
- **Lưu trữ:** `runtime/layers/04-infrastructure.md` — Tầng 4 lưu mọi phản ánh
- **Người dùng:** `runtime/layers/02-orchestration.md` — Điều phối xem lại phản ánh trước task tương tự
- **Thử lại:** `runtime/policies/retry.md` — Thử lại nhiều lần kích hoạt phản ánh sự cố
- **Phục hồi:** `runtime/policies/recovery.md` — Phản ánh sau phục hồi ghi lại nguyên nhân gốc
- **Contracts:** `runtime/contracts/README.md` — Event{reflection} mang nội dung phản ánh

## Mức kích hoạt

| Mức | Khi nào | Loại | Đích xuất |
|-----|---------|------|-----------|
| Task hoàn tất | Sau mỗi Result Worker | Nhẹ | `.opencode/docs/reflections/` (inline) |
| Phase hoàn tất | Sau mọi task trong phase | Tiêu chuẩn | `.opencode/docs/reflections/` |
| Workflow hoàn tất | Sau phase cuối | Đầy đủ | `.opencode/docs/reflections/` + .opencode/STATUS.md |
| Lỗi lặp lại | 3+ lỗi cùng phase | Sự cố | `.opencode/docs/reflections/` + `.opencode/docs/bugs/` |

## Lược đồ

```json
{
  "type": "reflection",
  "trigger": "task|phase|workflow|incident",
  "scope": {
    "workflow": "company|web|game|ai|debug|release",
    "phase": "architect|code|fix|test|review|build",
    "task_id": "uuid"
  },
  "what_went_well": [],
  "what_went_wrong": [],
  "improvements": [],
  "decisions": [],
  "data": {
    "duration_ms": 0,
    "retries": 0,
    "errors": []
  }
}
```

## Quy tắc
1. Mọi task PHẢI tạo ít nhất một phản ánh nhẹ.
2. Phản ánh là append-only — không bao giờ sửa sau khi tạo.
3. Điều phối xem lại phản ánh trước khi bắt đầu task tương tự trong tương lai.
4. Phản ánh sự cố PHẢI bao gồm phân tích nguyên nhân gốc.
