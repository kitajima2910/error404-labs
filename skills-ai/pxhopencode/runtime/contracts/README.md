# Contract Giao tiếp

Mọi giao tiếp giữa các tầng đều qua contract JSON cấu trúc. Không có truyền text thô. Mỗi contract có trường `version` cho tiến hóa schema sau này.

Xem thêm: File tầng trong `runtime/layers/` cho ngữ cảnh sử dụng theo từng tầng.

## Các loại Contract

| # | Contract | Hướng | Mục đích |
|---|----------|-------|----------|
| 1 | `Request` | Tầng 1 → Tầng 2 | Yêu cầu từ user |
| 2 | `Task` | Tầng 2 → Tầng 3 | Giao việc |
| 3 | `Result` | Tầng 3 → Tầng 2 | Kết quả hoàn thành |
| 4 | `Response` | Tầng 2 → Tầng 1 | Kết quả cuối cho user |
| 5 | `Event` | Mọi tầng → Tầng 4 | Thông báo / log / checkpoint |
| 6 | `State` | Tầng 4 → Tầng 2 | Checkpoint phục hồi |

## Quy tắc thiết kế Contract

1. Mọi contract có `type`, `version`, `metadata` (timestamp + trace_id).
2. `trace_id` lan truyền qua mọi tầng để truy vết toàn bộ request — một request user duy nhất được truy vết qua mọi contract.
3. Contract được xác thực tại biên giới tầng bởi tầng nhận. Contract không hợp lệ bị từ chối kèm lỗi vi phạm schema.
4. Tầng tương lai thêm trường mới với giá trị mặc định optional — không bao giờ xóa hoặc đổi tên trường hiện tại.
5. Mọi contract dùng snake_case cho tên trường.

## Lược đồ Contract

### 1. Request Contract (Tầng 1 → Tầng 2)

Được `pxh-pm` nhận (`layers/02-orchestration.md`). Được Điều phối xác thực trước khi routing.

```json
{
  "type": "request",
  "version": "1.0",
  "payload": {
    "project_type": "web|game|ai|tool|debug",
    "description": "...",
    "scope": "new|feature|fix|refactor",
    "target": "đường dẫn file hoặc tên module (bắt buộc)",
    "constraints": { "tech_stack": [], "deadline": null }
  },
  "metadata": {
    "timestamp": "ISO8601",
    "source": "user|pxh-help",
    "trace_id": "uuid"
  }
}
```

### 2. Task Contract (Tầng 2 → Tầng 3)

Được `pxh-pm` gửi đến bất kỳ Worker agent nào. Worker PHẢI trả về `Result`.

```json
{
  "type": "task",
  "version": "1.0",
  "task_id": "uuid",
  "workflow": "company|web|game|ai|debug|release",
  "phase": "architect|code|fix|test|review|build",
  "payload": {
    "input": { "...": "..." },
    "context": { "status_md": "đường dẫn", "artifacts": [] },
    "target": "phạm vi cụ thể cho task này"
  },
  "policies": {
    "retry": { "max_attempts": 3, "backoff": "exponential" },
    "timeout_ms": 300000
  },
  "metadata": {
    "trace_id": "uuid",
    "parent_task_id": null
  }
}
```

### 3. Result Contract (Tầng 3 → Tầng 2)

Worker trả về cho Điều phối. Điều phối đánh giá và quyết định bước tiếp.

```json
{
  "type": "result",
  "version": "1.0",
  "task_id": "uuid",
  "status": "success|failure|partial",
  "artifacts": {
    "files_changed": [],
    "tests_passed": null,
    "test_results": null
  },
  "errors": [
    {
      "code": "...",
      "message": "...",
      "severity": "critical|warning|info"
    }
  ],
  "state": {
    "phase_complete": true,
    "next_phase": "test"
  },
  "metadata": {
    "duration_ms": 1234,
    "trace_id": "uuid"
  }
}
```

### 4. Response Contract (Tầng 2 → Tầng 1)

Điều phối gửi đến Giao diện sau khi mọi phase hoàn tất. Giao diện định dạng cho user.

```json
{
  "type": "response",
  "version": "1.0",
  "status": "success|failure|partial",
  "summary": {
    "project": "...",
    "phases_completed": ["architect", "code", "test", "review", "build"],
    "artifacts": [],
    "duration_ms": 0
  },
  "errors": [],
  "next_steps": [
    "Chạy `@pxh-devops` để build",
    "Deploy thủ công"
  ],
  "metadata": {
    "trace_id": "uuid",
    "timestamp": "ISO8601"
  }
}
```

### 5. Event Contract (Mọi tầng → Tầng 4)

Bất kỳ tầng nào gửi đến Hạ tầng để lưu/ghi log.

```json
{
  "type": "event",
  "version": "1.0",
  "source_layer": 1|2|3|4,
  "event_type": "phase_start|phase_end|error|decision|checkpoint|reflection",
  "payload": { "...": "..." },
  "metadata": {
    "timestamp": "ISO8601",
    "trace_id": "uuid"
  }
}
```

### 6. State Contract (Tầng 4 → Tầng 2)

Hạ tầng trả về khi có yêu cầu phục hồi. Điều phối tiếp tục từ trạng thái này.

```json
{
  "type": "state",
  "version": "1.0",
  "current_phase": "code|test|...",
  "completed_phases": [],
  "last_checkpoint": "ISO8601",
  "artifacts": [],
  "errors": []
}
```

## Luồng Contract theo Phase Workflow

```
Bắt đầu Phase                 Kết thúc Phase
    │                          │
    ▼                          ▼
Tầng 2 → Event{phase_start} → Tầng 4 (lưu)
Tầng 2 → Task{phase:"..."}  → Tầng 3 (worker thực thi)
Tầng 3 → Result{status}     → Tầng 2 (đánh giá)
Tầng 2 → Event{phase_end}   → Tầng 4 (lưu)
Tầng 2 → Event{checkpoint}  → Tầng 4 (snapshot)
```

Khi lỗi:
```
Tầng 3 → Result{status:"failure", errors} → Tầng 2
Tầng 2 → áp dụng Chính sách thử lại hoặc Chính sách phục hồi
Tầng 2 → Event{error} → Tầng 4 (ghi log)
Tầng 2 → Yêu cầu State từ Tầng 4 (nếu phục hồi)
Tầng 4 → State{...} → Tầng 2 (tiếp tục)
```

## Phiên bản

- Contracts dùng semver: `major.minor`
- Major bump: thay đổi trường phá vỡ (xóa, đổi tên, đổi kiểu)
- Minor bump: thay đổi trường cộng thêm (trường optional mới, giá trị enum mới)
- Tầng CÓ THỂ từ chối contract với version major không biết
- Tầng PHẢI chấp nhận contract với version minor mới hơn
