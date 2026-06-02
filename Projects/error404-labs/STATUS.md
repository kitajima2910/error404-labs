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

## Modified Files
- src/pages/game-roadmap.astro
- src/pages/quan-ly.astro
- src/pages/api/admin/attendance.ts

## Known Issues
- (đã fix) Toggle checkout trước đây xoá không được do date comparison không khớp
- (đã replace) attendanceStudentFilter từ plain `<select>` → searchable dropdown + hidden select (giữ backward compat)

## Next Step
- Restart `pnpm dev` và test toàn bộ flow: checkin bằng nút, checkin bằng toggle, checkout bằng toggle, F5 verify, tìm kiếm học sinh trong dropdown
