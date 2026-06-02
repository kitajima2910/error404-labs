# STATUS

## Current Task
- Sửa format copy prompt ở modal "Sử dụng Prompt Template" (game-roadmap)

## Current Focus
-

## Completed
- Đổi format Copy Prompt template thành form mới (6 RULE + TARGET, bỏ ACTION)
- Fix toggle attendance: click entire cell, POST cả checkin/checkout, không còn DELETE 404
- POST handler checkout: return 200 (deleted: true/false) thay vì 404
- GET summary: đổi `dates` array → `attendance_map` JSONB {date: id}
- Render table: dùng `attendance_map` + lưu `data-attendance-id` vào toggle cell
- Toggle hàm: gửi `attendance_id` khi checkout → xoá bằng primary key (không dựa vào date comparison)
- POST handler checkout: ưu tiên `DELETE WHERE id = ${attendance_id}` fallback date-based
- Ghi chú theo ngày (date_notes): migration + API + UI popover trên day-header
  - Bảng `error404labs.date_notes` (note_date UNIQUE, note TEXT)
  - `GET /api/admin/date-notes` — lấy notes theo tháng
  - `POST /api/admin/date-notes` — upsert note
  - `DELETE /api/admin/date-notes` — xoá note
  - Day-header có note: nền vàng + chấm cam
  - Click day-header → popover textarea: lưu/xoá/huỷ
  - Popover đóng khi click outside / Escape

## Modified Files
- src/pages/game-roadmap.astro
- src/pages/quan-ly.astro
- src/pages/api/admin/attendance.ts
- src/pages/api/admin/expected-sessions.ts (new)
- src/pages/api/admin/date-notes.ts (new)
- migrations/008_add_expected_sessions.sql (new)
- migrations/009_create_date_notes.sql (new)

## Known Issues
- (đã fix) Toggle checkout trước đây xoá không được do date comparison không khớp
- (đã replace) attendanceStudentFilter từ plain `<select>` → searchable dropdown + hidden select (giữ backward compat)

## Next Step
- Restart `pnpm dev` và test toàn bộ flow + ghi chú ngày
