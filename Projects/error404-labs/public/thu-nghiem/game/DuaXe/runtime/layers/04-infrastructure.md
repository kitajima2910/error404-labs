# Tầng 4: Hạ tầng

**Trách nhiệm:** Lưu trạng thái, ghi sự kiện, lưu trữ artifact, phục vụ checkpoint phục hồi.

**Chủ quản:** `pxh-save-history`

**Trách nhiệm duy nhất:** Lưu trữ và truy xuất dữ liệu. Không bao giờ ra quyết định.

## Luồng

```
Nhận Event contract từ bất kỳ tầng nào
    │
    ▼
Xác định loại: phase_start / phase_end / error / decision / checkpoint / reflection
    │
    ▼
Lưu vào vị trí phù hợp:
    ├─ .opencode/STATUS.md          → trạng thái hiện tại, phase, artifact
    ├─ `.opencode/docs/reflections/`  → bản ghi phản ánh
    ├─ `.opencode/docs/decisions/`    → ADR (quyết định kiến trúc)
    ├─ `.opencode/docs/bugs/`         → báo cáo lỗi
    └─ `.opencode/docs/changelog/`    → log phiên
    │
    ▼
Xác nhận lưu trữ → trả về Event{status:"confirmed"} cho người gửi
```

## Bảng lưu trữ

| Loại Event | Vị trí lưu | Định dạng |
|-----------|-----------|----------|
| phase_start / phase_end | .opencode/STATUS.md | Markdown |
| error | .opencode/STATUS.md + `.opencode/docs/bugs/` | Markdown |
| decision | `.opencode/docs/decisions/ADR-*.md` | Markdown |
| checkpoint | .opencode/STATUS.md (snapshot) | Markdown |
| reflection | `.opencode/docs/reflections/` | JSON |
| task_result | .opencode/STATUS.md (mục artifacts) | Markdown |

## Tham chiếu chéo
- **Contracts:** `runtime/contracts/README.md` — Event (đầu vào), State (đầu ra)
- **Điều phối:** `runtime/layers/02-orchestration.md` — Gửi Event, yêu cầu State
- **Workers:** `runtime/layers/03-worker.md` — Gửi Event{reflection} sau tasks
- **Chính sách — Phục hồi:** `runtime/policies/recovery.md` — Hạ tầng phục vụ checkpoint cho phục hồi
- **Chính sách — Phản ánh:** `runtime/policies/reflection.md` — Hạ tầng lưu mọi bản ghi phản ánh

## Quy tắc
- Không bao giờ sửa dữ liệu — append-only cho log, ghi đè .opencode/STATUS.md cho trạng thái hiện tại.
- Khi được yêu cầu checkpoint, serialize toàn bộ trạng thái Tầng 2 vào .opencode/STATUS.md.
- Khi được yêu cầu phục hồi, trả về trạng thái checkpoint cuối cùng dưới dạng State contract.
- Mọi ghi phải idempotent nếu có thể.
