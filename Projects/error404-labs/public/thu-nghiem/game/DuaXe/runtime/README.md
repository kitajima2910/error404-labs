# Enterprise AI Runtime — Kiến trúc 4 Tầng

Kiến trúc điều phối phân tầng, lấy cảm hứng từ Microsoft Agent Mode. Tách biệt điều phối khỏi thực thi, mỗi tầng một trách nhiệm duy nhất, giao tiếp qua contract cấu trúc.

## Cấu trúc thư mục

```
runtime/
├── README.md                 # File này — tổng quan + cấu trúc thư mục
├── layers/
│   ├── 01-interface.md       # Tầng 1: Đầu vào, xác thực, trình bày
│   ├── 02-orchestration.md   # Tầng 2: Điều khiển luồng, routing, theo dõi trạng thái
│   ├── 03-worker.md          # Tầng 3: Thực thi (thiết kế, code, test, build)
│   └── 04-infrastructure.md  # Tầng 4: Lưu trữ, ghi log, giám sát
├── contracts/
│   └── README.md             # Contract giao tiếp giữa các tầng
└── policies/
    ├── retry.md              # Chính sách thử lại
    ├── recovery.md           # Chính sách phục hồi
    └── reflection.md         # Chính sách phản ánh
```

## Trách nhiệm các tầng

| Tầng | Tên | Trách nhiệm | Agent chủ quản |
|------|-----|-------------|----------------|
| 1 | Giao diện | Nhận và xác thực đầu vào, định dạng đầu ra cho user | `pxh-help`, user prompt |
| 2 | Điều phối | Route tasks, quản lý luồng thực thi, theo dõi trạng thái, thi hành chính sách | `pxh-pm` |
| 3 | Nhân công | Thực thi công việc domain (lên kế hoạch, code, fix, test, review, build) | `pxh-architect`, `pxh-expert`, `pxh-fix-bugs`, `pxh-qa`, `pxh-review-code`, `pxh-devops` |
| 4 | Hạ tầng | Lưu trạng thái, ghi quyết định, lưu trữ artifact | `pxh-save-history` |

### Quy tắc cách ly tầng

1. Các tầng giao tiếp CHỈ qua contract cấu trúc — không dùng @mention trực tiếp để giao việc (meeting là ngoại lệ cho thảo luận thiết kế).
2. Điều phối không bao giờ thực thi công việc; nhân công không bao giờ điều phối.
3. Hạ tầng không bao giờ quyết định; chỉ ghi lại.
4. Thêm tầng mới không cần thay đổi tầng cũ — chỉ cập nhật bảng routing của điều phối.

## Thứ tự thực thi

```
User Prompt
    │
    ▼
┌─────────────────────────────┐
│  Tầng 1: GIAO DIỆN           │  Xác thực đầu vào, tạo Request contract
│  pxh-help / user prompt      │
└──────────┬──────────────────┘
           │ Request
           ▼
┌─────────────────────────────┐
│  Tầng 2: ĐIỀU PHỐI           │  Phân tích, lên kế hoạch, route đến workers
│  pxh-pm                      │  Theo dõi trạng thái, thi hành chính sách
└──────────┬──────────────────┘
           │ Task
           ▼
┌─────────────────────────────┐
│  Tầng 3: NHÂN CÔNG           │  Thực thi (design → code → test → review → build)
│  architect / expert / qa     │
│  fix-bugs / review / devops  │
└──────────┬──────────────────┘
           │ Result + Artifacts
           ▼
┌─────────────────────────────┐
│  Tầng 4: HẠ TẦNG             │  Lưu kết quả, ghi quyết định
│  pxh-save-history            │  Cập nhật .opencode/STATUS.md
└──────────┬──────────────────┘
           │ Confirmed
           ▼
┌─────────────────────────────┐
│  Tầng 2: ĐIỀU PHỐI           │  Đánh giá bước tiếp theo (xong? thử lại? task mới?)
│  pxh-pm                      │
└──────────┬──────────────────┘
           │ Response
           ▼
┌─────────────────────────────┐
│  Tầng 1: GIAO DIỆN           │  Định dạng và trình bày cho user
└─────────────────────────────┘
```

## Trách nhiệm Agent

### Tầng 1 — Giao diện
- **User / System Prompt**: Cung cấp đầu vào thô, chỉ định phạm vi TARGET
- **pxh-help**: Hướng dẫn user chọn workflow, chuyển ý định thành request cấu trúc

### Tầng 2 — Điều phối (pxh-pm)
- Nhận Request từ Giao diện, xác thực tính đầy đủ
- Route task đến Worker agents phù hợp
- Theo dõi trạng thái thực thi (phase hiện tại, trạng thái, blocker)
- Thi hành chính sách thử lại/phục hồi/phản ánh
- Quyết định hành động tiếp theo: tiếp tục / thử lại / leo thang / kết thúc
- Không bao giờ thực thi công việc domain

### Tầng 3 — Nhân công
- **pxh-architect (Người thiết kế)**: Thiết kế kiến trúc, tech stack, schema, API
- **pxh-expert (Người thực thi)**: Viết code theo kiến trúc
- **pxh-fix-bugs (Người sửa lỗi)**: Chẩn đoán và sửa lỗi
- **pxh-qa (Người kiểm thử)**: Chạy test, xác thực chất lượng
- **pxh-review-code (Người rà soát)**: Kiểm tra bảo mật, hiệu năng, quy ước
- **pxh-devops (Người xây dựng)**: Lint, typecheck, build, đóng gói

### Tầng 4 — Hạ tầng (pxh-save-history)
- Lưu output của mọi tầng vào .opencode/STATUS.md và kho lưu trữ
- Ghi lại quyết định (ADR), bug, changelog
- Cung cấp lịch sử cho phản ánh và phục hồi

## Contract giao tiếp

Tất cả 6 contract (`Request`, `Task`, `Result`, `Response`, `Event`, `State`) được định nghĩa đầy đủ schema tại `runtime/contracts/README.md`.

| Contract | Hướng | Mục đích | Tham khảo |
|----------|-------|----------|-----------|
| `Request` | Tầng 1 → Tầng 2 | Yêu cầu từ user | `contracts/README.md` #1 |
| `Task` | Tầng 2 → Tầng 3 | Giao việc | `contracts/README.md` #2 |
| `Result` | Tầng 3 → Tầng 2 | Kết quả hoàn thành | `contracts/README.md` #3 |
| `Response` | Tầng 2 → Tầng 1 | Kết quả cuối cùng cho user | `contracts/README.md` #4 |
| `Event` | Mọi tầng → Tầng 4 | Thông báo / log / checkpoint | `contracts/README.md` #5 |
| `State` | Tầng 4 → Tầng 2 | Checkpoint phục hồi | `contracts/README.md` #6 |

**Luồng contract:** Xem `contracts/README.md` → "Contract Flow Per Workflow Phase" cho toàn bộ vòng đời.

## Chính sách

Tất cả chính sách được định nghĩa chi tiết tại `runtime/policies/`.

| Chính sách | Phạm vi | Áp dụng bởi | Tham khảo |
|-----------|---------|-------------|-----------|
| Thử lại | Chỉ lỗi tạm thời (timeout, rate limit) | Tầng 2 — Điều phối | `policies/retry.md` |
| Phục hồi | Lỗi mọi tầng, dựa trên checkpoint | Tầng 2 — Điều phối | `policies/recovery.md` |
| Phản ánh | Sau task, sau phase, sau workflow, sự cố | Mọi tầng → Tầng 4 lưu | `policies/reflection.md` |

**Thi hành chính sách:**
- Tầng 2 (Điều phối) là người thi hành duy nhất — quyết định thử lại, đường phục hồi, và khi nào phản ánh.
- Workers KHÔNG BAO GIỜ tự thử lại hoặc tự phục hồi. Họ trả về `Result{status:"failure"}` và để Điều phối quyết định.
- Hạ tầng (Tầng 4) cung cấp dữ liệu cho quyết định chính sách (checkpoint, lịch sử lỗi).

## Điều kiện hoàn thành

### Điều kiện từng tầng
| Tầng | Tiêu chí |
|------|----------|
| 1 Giao diện | Có thể nhận `Request`, xác thực, chuyển tiếp đến Điều phối |
| 2 Điều phối | Có thể route tasks, thi hành chính sách, theo dõi trạng thái, quyết định bước tiếp |
| 3 Nhân công | Mỗi agent có thể nhận `Task`, thực thi, trả về `Result` |
| 4 Hạ tầng | Có thể lưu sự kiện, trạng thái, phản ánh; cung cấp trạng thái cho phục hồi |

### Điều kiện tích hợp
- [ ] Cả 4 tầng hoạt động và kết nối qua contracts
- [ ] Contracts được định nghĩa, phiên bản hóa, và xác thực tại biên giới tầng
- [ ] Điều phối route đến mọi Worker agent
- [ ] Chính sách thử lại được thi hành (lỗi tạm thời thử lại, lỗi vĩnh viễn leo thang)
- [ ] Luồng phục hồi hoạt động (checkpoint → phát hiện → phục hồi)
- [ ] Phản ánh sinh output ở cả 4 mức kích hoạt
- [ ] .opencode/STATUS.md được cập nhật tại mọi chuyển tiếp tầng
- [ ] Thêm Worker agent mới không cần thay đổi tầng khác (chỉ cập nhật bảng routing Điều phối)

### Điều kiện Runtime
- [ ] Workflow company đầy đủ thực thi qua cả 4 tầng
- [ ] Mỗi tầng giao tiếp CHỈ qua contracts
- [ ] Lỗi ở bất kỳ tầng nào không làm sập tầng khác
- [ ] Thử lại cạn kiệt được leo thang đúng đến user
- [ ] Workflow hoàn tất với mọi artifact được lưu và phản ánh
