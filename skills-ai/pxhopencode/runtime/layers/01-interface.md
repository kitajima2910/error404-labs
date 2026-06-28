# Tầng 1: Giao diện

**Trách nhiệm:** Đầu vào cho mọi yêu cầu user. Xác thực input, tạo Request contract cấu trúc, trình bày kết quả cuối cho user.

**Chủ quản:** `pxh-help`, `pxh-prompt-optimizer`, user/system prompt

**Trách nhiệm duy nhất:** Xác thực đầu vào + Prompt Optimization + định dạng đầu ra. Không bao giờ thực thi công việc domain.

## Luồng mở rộng (với Prompt Optimization)

```
Prompt thô (có thể tiếng Việt)
    │
    ▼
Xác thực: có TARGET không? mô tả rõ ràng không?
    │
    ▼ (không hợp lệ)
Trả lỗi xác thực, yêu cầu user làm rõ
    │
    ▼ (hợp lệ)
Prompt Optimization (pxh-prompt-optimizer):
    │ 1. Phát hiện ngôn ngữ (Việt/Anh)
    │ 2. Translate → English (nếu cần)
    │ 3. Rewrite → Prompt Engineering chuẩn
    │ 4. Gap Analysis → Bổ sung requirement
    ▼
Tạo Request contract (với optimized_prompt) → gửi đến Tầng 2 (Điều phối)
    │
    ▼ (sau đó)
Nhận Response từ Tầng 2 → định dạng thành output thân thiện cho user
```

## Quy tắc
- Mọi Request PHẢI có trường `target`. Nếu thiếu, yêu cầu user chỉ định.
- Prompt Optimization luôn chạy trước khi tạo Request contract.
- Nếu prompt là tiếng Việt → tự động dịch sang Anh, giữ nguyên ý định.
- Gap Analysis bổ sung requirement còn thiếu (TARGET, tech stack, constraints).
- Định dạng đầu ra luôn bằng tiếng Việt để user dễ hiểu.

## Đầu vào → Đầu ra
| Đầu vào | Đầu ra |
|---------|--------|
| Text thô từ user (Việt/Anh) | `Request` contract với prompt đã optimize |
| `Response` contract | Tin nhắn tiếng Việt đã định dạng cho user |

## Tham chiếu chéo
- **Contracts:** `runtime/contracts/README.md` — Request (đầu ra), Response (đầu vào)
- **Điều phối:** `runtime/layers/02-orchestration.md` — Nhận Request, trả Response
- **Prompt Optimizer:** `agents/pxh-prompt-optimizer.md` — Translate + Rewrite + Gap Analysis
- **Planner:** `agents/pxh-planner.md` — Nhận prompt đã optimize, break thành tasks
- **Workflow:** `workflows/optimized.workflow.md` — Pipeline đầy đủ
- **Chính sách — Phục hồi:** `runtime/policies/recovery.md` — Phục hồi request không hợp lệ
