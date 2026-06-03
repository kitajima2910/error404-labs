# STATUS

## Current Task
- Ghi chú điểm danh sáng/chiều + popup action

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
- Học phí (payments): migration + API, tích hợp trong điểm danh
  - Bảng `error404labs.payments` (member_id, amount, month, year, note, paid_at)
  - `GET /api/admin/payments` — lấy payments + members + total income
  - `POST /api/admin/payments` — upsert payment (theo member+month+year)
  - `DELETE /api/admin/payments` — xoá payment
  - Cột "Học phí" trong bảng điểm danh: input số tiền + nút check/xoá
  - Stats: Đã đóng / Tổng thu nhập (thêm 2 stat card vào hàng đầu)
  - Badge Đã đóng (xanh) / Chưa đóng (vàng) cho từng học sinh
- Lọc member active trong attendance: API chỉ trả `m.status = 'active'`
- Refresh attendance dropdown sau khi thêm/sửa/khoá member (`loadAttendanceStudents()` trong form submit + toggle status)
- Filter inactive/deleted members khỏi dropdown search member (`?status=active`)
- **Phân ca sáng/chiều trong điểm danh**: migration 011 + API + UI
  - Migration 011: thêm cột `session TEXT` (`morning`/`afternoon`), đổi UNIQUE thành (member_id, check_in_date, session)
  - API GET: attendance_map dùng key `date_session` (vd `"2026-06-03_morning"`)
  - API POST: nhận `session`, mặc định `'morning'` cho backward compat
  - API DELETE: nhận `session` cho fallback
  - UI: day header động hiển thị Thứ (T2–CN) + Ngày (1–31)
  - Mỗi cell có 2 toggle xếp dọc: ☀ buổi sáng, ☾ buổi chiều
  - Nút "Điểm danh hôm nay": tự động chọn session theo giờ (trước 12h = sáng, sau 12h = chiều)
  - Stats cập nhật đúng với attendance_map key mới

## Modified Files
- src/pages/game-roadmap.astro
- src/pages/quan-ly.astro
- src/pages/api/admin/attendance.ts
- src/pages/api/admin/expected-sessions.ts (new)
- src/pages/api/admin/date-notes.ts (new)
- src/pages/api/admin/payments.ts (new)
- migrations/008_add_expected_sessions.sql (new)
- migrations/009_create_date_notes.sql (new)
- migrations/010_create_payments.sql (new)
- migrations/011_add_session_to_attendance.sql (new)
- migrations/012_add_note_to_attendance.sql (new)
- src/pages/api/admin/attendance.ts — GET trả notes_map, POST accept note + action 'note'

## Known Issues
- (đã fix) Toggle checkout trước đây xoá không được do date comparison không khớp
- (đã replace) attendanceStudentFilter từ plain `<select>` → searchable dropdown + hidden select (giữ backward compat)

## Next Step
- Restart `pnpm dev` và test toàn bộ: điểm danh sáng/chiều, ghi chú ngày, học phí, thêm member mới → dropdown cập nhật, member inactive không hiện
