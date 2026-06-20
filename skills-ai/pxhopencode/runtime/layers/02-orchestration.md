# Tầng 2: Điều phối

**Trách nhiệm:** Quản lý luồng thực thi, route tasks đến workers, theo dõi trạng thái, thi hành chính sách (thử lại/phục hồi/phản ánh).

**Chủ quản:** `pxh-pm`

**Trách nhiệm duy nhất:** Ra quyết định và điều khiển luồng. Không bao giờ thực thi công việc domain.

## Luồng

```
Nhận Request từ Tầng 1
    │
    ▼
Phân tích: loại dự án, phạm vi, ràng buộc
    │
    ▼
Nếu phức tạp / chưa rõ phạm vi:
    ├─ Gọi họp: `pxh-architect`, `pxh-expert`, `pxh-qa`, `pxh-devops` thảo luận
    ├─ Đạt đồng thuận về tech stack, workflow, timeline
    └─ Ghi quyết định → Event{decision} → Tầng 4
    │
    ▼
Lên kế hoạch: cần những phase nào? (architect → code → test → fix → review → build)
    │
    ▼
Với mỗi phase:
    ├─ Tạo Task contract
    ├─ Gửi đến Worker phù hợp (Tầng 3)
    ├─ Chờ Result
    ├─ Áp dụng Chính sách thử lại nếu cần (xem `policies/retry.md`)
    ├─ Áp dụng Chính sách phục hồi nếu thất bại (xem `policies/recovery.md`)
    └─ Gửi Event{phase_start/phase_end} đến Tầng 4
    │
    ▼
Mọi phase hoàn tất → tạo Response contract → gửi đến Tầng 1
```

## Bảng Routing

| Phase | Worker Agent | Loại Contract | Chính sách áp dụng |
|-------|-------------|---------------|-------------------|
| analyze | `pxh-pm` (tự thân) | — | — |
| meeting | `pxh-architect`, `pxh-expert`, `pxh-qa`, `pxh-devops` | — (thảo luận) | — |
| architect | `pxh-architect` | Task → Result | Thử lại, Phản ánh |
| code | `pxh-expert` | Task → Result | Thử lại, Phản ánh |
| fix | `pxh-fix-bugs` | Task → Result | Thử lại, Phục hồi, Phản ánh |
| test | `pxh-qa` | Task → Result | Thử lại, Phản ánh |
| review | `pxh-review-code` | Task → Result | Thử lại, Phản ánh |
| build | `pxh-devops` | Task → Result | Thử lại, Phục hồi, Phản ánh |
| persist | `pxh-save-history` | Event → Confirmed | Phục hồi |

## Quy tắc
- Mọi lời gọi worker PHẢI kèm đầy đủ Task contract fields `{phase, target, context, type}` — ngay cả khi route qua @mention. @mention là cơ chế gửi, KHÔNG phải thay thế cho contract.
- Không bao giờ route đến worker mà thiếu Task contract — @mention trần (vd: `@pxh-qa` không context) bị cấm.
- Trạng thái được quản lý độc quyền qua Hạ tầng (Tầng 4), không bao giờ trong bộ nhớ.
- Mọi quyết định chính sách (thử lại/bỏ qua/leo thang) phải được ghi là Event.
- Thêm Worker mới chỉ cần một dòng trong Bảng Routing — zero thay đổi ở các tầng khác.

## Tham chiếu chéo
- **Contracts:** `runtime/contracts/README.md` — Request (đầu vào), Task (đầu ra), Result (đầu vào), Response (đầu ra), Event (đầu ra), State (đầu vào)
- **Workers:** `runtime/layers/03-worker.md` — Workers nhận Task routing
- **Hạ tầng:** `runtime/layers/04-infrastructure.md` — Lưu trạng thái, checkpoint phục hồi
- **Chính sách — Thử lại:** `runtime/policies/retry.md` — Áp dụng khi worker lỗi tạm thời
- **Chính sách — Phục hồi:** `runtime/policies/recovery.md` — Áp dụng khi lỗi không thử lại được
- **Chính sách — Phản ánh:** `runtime/policies/reflection.md` — Điều phối kích hoạt phản ánh sau mỗi phase
