# STATUS

## Current Task
Thêm tính năng Điểm danh học sinh vào trang quản lý

## Current Focus
-

## Completed
- Tạo migration 007_create_attendance_table.sql (bảng attendance với FK, UNIQUE, indexes)
- Tạo API endpoint /api/admin/attendance.ts (GET summary/member/today, POST check-in, DELETE)
- Thêm nav item 'Điểm danh' vào sidebar quan-ly.astro
- Thêm attendance view section (stats cards, month/year filter, student filter, per-day table, check-in button)
- Cập nhật switchView JS xử lý attendance case
- Chạy migration thành công qua Neon

## Modified Files
- migrations/007_create_attendance_table.sql (new)
- src/pages/api/admin/attendance.ts (new)
- src/pages/quan-ly.astro (nav item, view section, JS functions)

## Known Issues
- Access token từ OAuth có thời hạn, cần refresh định kỳ

## Fixed
- [2026-06-01] Fix lỗi options filter học sinh bị lặp tên trong view attendance: thêm `while (select.options.length > 1) { select.remove(1) }` trước khi append options mới trong `loadAttendanceStudents()`

## Next Step
-
