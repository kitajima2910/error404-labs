# STATUS

## Current Task
- Kiểm tra giao diện quiz trắc nghiệm trên bài theory

## Completed
- ✅ **Migration 013**: Tạo 7 bảng database (py_courses, py_chapters, py_lessons, py_test_cases, py_submissions, py_lesson_progress, py_profiles)
- ✅ **Migration 014**: Seed data khóa "Python Cơ Bản" — 3 chapters, 10 lessons, 27 test cases
- ✅ **Migration 016**: Tạo bảng `py_quiz_questions` + seed 18 câu trắc nghiệm cho 6 bài theory (2 khóa)
- ✅ **Quiz trắc nghiệm sau bài lý thuyết**: hiển thị 3 câu MCQ ở cuối LEFT panel, chọn đáp án → feedback đúng/sai + giải thích, progress "Đã đúng X/3"
- ✅ **Menu**: Thêm "Học Python" vào navData, fix lỗi Nav icon component undefined
- ✅ **Icon Python**: Thêm IconPython.astro + gắn vào menu Học Python
- ✅ **Public course catalog**: Gỡ yêu cầu login khỏi `/hoc-python/khoa-hoc`
- ✅ **Enrollment system**: API `/api/hoc-python/enrollment` (GET) + `/api/hoc-python/enroll` (POST) — đăng ký khoá học miễn phí, phân biệt guest/chưa ĐK/đã ĐK
- ✅ **Pages**: Landing `/hoc-python`, Course catalog `/hoc-python/khoa-hoc`, Course detail `/hoc-python/khoa-hoc/:slug`, Interactive workspace `/hoc-python/hoc/:courseSlug/:lessonSlug`
- ✅ **API**: POST `/api/hoc-python/submit` — chấm điểm + award XP + streak; GET `/api/hoc-python/progress` — lấy progress
- ✅ **CodeMirror 6 + Pyodide**: Interactive Python editor workspace, run code, submit + auto-grading
- ✅ **Lib files**: db.ts (Neon queries), pyodideRunner.ts (client-side Python WASM), grading.ts (output comparison), progress.ts (lesson unlock), gamification.ts (XP/streak)
- ✅ **Code execution**: Python 3 chạy hoàn toàn trong browser (Pyodide WASM), không cần server-side Python runtime

## Current Focus
- Chạy migration 014_seed_python_course.sql trên Neon console (nếu chưa chạy)

## Completed
- 4 trang Astro 5 cho Python learning platform
  - `/hoc-python` — Landing page: hero, features grid với 4 card
  - `/hoc-python/khoa-hoc` — Course catalog SSR từ Neon DB, responsive grid 1/2/3 cột
  - `/hoc-python/khoa-hoc/[slug]` — Course detail SSR: accordion chapters, lesson list với badges
  - `/hoc-python/hoc/[courseSlug]/[lessonSlug]` — Interactive workspace: CodeMirror 6 + Pyodide, Run/Submit, test results tab
- Seed data + API routes cho Python learning platform
  - Thêm nav item "Học Python" trong navData.js
  - API `POST /api/hoc-python/submit` — nhận submission, chấm điểm, award XP, update streak
  - API `GET /api/hoc-python/progress` — lấy progress user theo courseSlug
  - Migration `014_seed_python_course.sql` — 3 chapters, 10 lessons, 27 test cases
  - Grading utility `src/utils/python-grading.ts` — normalizeOutput + compareOutputs
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
- src/pages/hoc-python/index.astro (new) — landing page
- src/pages/hoc-python/khoa-hoc.astro (new) — course catalog SSR
- src/pages/hoc-python/khoa-hoc/[slug].astro (new) — course detail SSR
- src/pages/hoc-python/hoc/[courseSlug]/[lessonSlug].astro (new) — interactive workspace
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
- src/data/navData.js — thêm "Học Python"
- src/pages/api/hoc-python/submit.ts (new) — POST submission + grading
- src/pages/api/hoc-python/progress.ts (new) — GET progress
- src/utils/python-grading.ts (new) — normalize output + compare
- migrations/014_seed_python_course.sql (new) — course seed data
- migrations/016_seed_quiz_questions.sql (new) — quiz questions table + 18 questions seed

## Known Issues
- (đã fix) Toggle checkout trước đây xoá không được do date comparison không khớp
- (đã replace) attendanceStudentFilter từ plain `<select>` → searchable dropdown + hidden select (giữ backward compat)

## Next Step
- Restart `pnpm dev` và test toàn bộ: điểm danh sáng/chiều, ghi chú ngày, học phí, thêm member mới → dropdown cập nhật, member inactive không hiện
- Test sidebar toggle trên desktop
- Test cột Gameplay & Mechanics + Ảnh + upload ImageKit trong CRUD Prompts
- Kiểm tra hiển thị quiz trên các bài theory (vd `/hoc-python/hoc/python-co-ban/xin-chao-python`)
- Refresh pagefind index sau build (`pnpm build`)

## UX Redesign — Luồng học Python
### Vấn đề
- Button "Bắt đầu học" tại course detail dư thừa (click vào từng bài được rồi)
- Bài lý thuyết không có nút "Bài tiếp theo" và không thể đánh dấu hoàn thành
- Không có cơ chế skip warning nếu chưa hoàn thành bài

### Giải pháp (đã triển khai)
1. **Course detail** (`khoa-hoc/[slug].astro`):
   - Bỏ "Bắt đầu học" → thay bằng "Tiếp tục học →" dẫn đến bài chưa hoàn thành đầu tiên
   - Fetch progress API để tìm bài đang dở
   - Nếu hoàn thành hết → "✅ Hoàn thành" (disabled)
   - Fallback: "Đã đăng ký ✓" nếu API lỗi

2. **Lesson workspace** (`hoc/[courseSlug]/[lessonSlug].astro`):
   - Thêm nút "→ Bài tiếp" trong toolbar (gần nút Run/Submit) — luôn hiển thị
   - Nếu bài đã hoàn thành → nút xanh "🎉 Bài tiếp →"
   - Nếu chưa hoàn thành → click nút hiện modal warning ⚠️ "Bạn chưa hoàn thành bài học này..."
   - Modal có 2 nút: "Ở lại" (dismiss) và "Bỏ qua" (skip)
   - Top bar "Bài tiếp →" cũng kiểm tra completion trước khi điều hướng
   - `localStorage` key `py_completed` cache trạng thái hoàn thành

3. **Bài lý thuyết**:
   - Submit button luôn hiển thị (không ẩn với theory)
   - Click "Nộp bài" — gọi API → đánh dấu hoàn thành + nhận XP
   - Xoá early return trong `submitCode` cho theory lessons

4. **Test Results pane**:
   - Xoá nút "Bài tiếp theo" khỏi test results (vì đã có trong toolbar)
   - Giữ message "Hoàn thành khóa học" nếu là bài cuối
