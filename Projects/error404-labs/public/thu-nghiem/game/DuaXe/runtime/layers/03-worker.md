# Tầng 3: Nhân công

**Trách nhiệm:** Thực thi các tác vụ theo domain. Mỗi worker có ĐÚNG MỘT công việc.

**Chủ quản:** `pxh-architect`, `pxh-expert`, `pxh-fix-bugs`, `pxh-qa`, `pxh-review-code`, `pxh-devops`

**Trách nhiệm duy nhất mỗi Worker:**

| Worker | Công việc |
|--------|----------|
| `pxh-architect` | Thiết kế kiến trúc, tech stack, schema |
| `pxh-expert` | Viết code production |
| `pxh-fix-bugs` | Chẩn đoán và sửa lỗi |
| `pxh-qa` | Chạy test, xác thực chất lượng |
| `pxh-review-code` | Rà soát bảo mật, hiệu năng, quy ước |
| `pxh-devops` | Lint, typecheck, build, đóng gói |

## Luồng

```
Nhận Task contract từ Tầng 2
    │
    ▼
Xác thực: mục tiêu rõ ràng không? có đủ context không?
    │
    ▼
Thực thi trong phạm vi TARGET chỉ
    │
    ▼
Tự kiểm tra: output đáp ứng yêu cầu không? code cũ vẫn chạy không?
    │
    ▼
Tạo Result contract → trả về Tầng 2
    │
    ▼
Gửi Event phản ánh đến Tầng 4
```

## Quy tắc
- KHÔNG BAO GIỜ sửa code ngoài phạm vi TARGET.
- KHÔNG BAO GIỜ tự quyết định thử lại hoặc hủy bỏ — trả Result và để Điều phối quyết định.
- Ưu tiên thay đổi tối thiểu: thêm, không viết lại.
- Đọc .opencode/STATUS.md trước khi bắt đầu bất kỳ task nào.
- Gửi `Event{reflection}` đến Tầng 4 sau mỗi task.
- Nếu không thể hoàn thành, trả về `Result{status:"failure"}` kèm lỗi rõ ràng, mức độ nghiêm trọng, và các bước tái hiện.

## Tham chiếu chéo
- **Contracts:** `runtime/contracts/README.md` — Task (đầu vào), Result (đầu ra), Event (phản ánh)
- **Chính sách — Thử lại:** `runtime/policies/retry.md` — Điều phối thử lại, không phải worker
- **Chính sách — Phục hồi:** `runtime/policies/recovery.md` — Điều phối phục hồi qua checkpoint
- **Chính sách — Phản ánh:** `runtime/policies/reflection.md` — Worker gửi phản ánh nhẹ sau mỗi task
- **Điều phối:** `runtime/layers/02-orchestration.md` — Gửi Task, nhận Result
- **Hạ tầng:** `runtime/layers/04-infrastructure.md` — Nhận Event, lưu phản ánh
