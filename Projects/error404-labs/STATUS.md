# STATUS

## Current Task
- (none)

## Completed
### Platform Review & Fixes (batch)
- ✅ **Review toàn bộ Python platform**: DB schema + seed, lesson page, API endpoints, course pages — tìm 4 critical, 4 major, 12 minor
- ✅ **DB fixes**: Sửa expected output C077 (`'2'`→`'3'`), C078 (`'2'`→`'1'`) trong Neon + migration file
- ✅ **Migration 017**: Tạo `rate_limits` table trong DB + file SQL
- ✅ **Auth shared utility**: `src/utils/auth.ts` — refactor submit.ts, enrollment.ts, enroll.ts xoá duplicate verifyAuth
- ✅ **submit.ts**: XP duplication protection, `COALESCE(completed_at, NOW())`, profile INSERT race condition (`ON CONFLICT`)
- ✅ **progress.ts**: Thêm JWT authentication, bỏ userId query param, filter `published = true`
- ✅ **rateLimit.ts**: In-memory Map → Neon DB table (async), cập nhật caller login.ts
- ✅ **Khoá học pages**: fixed `total_lessons` count, `export const prerender = true` cho landing, null safety xp_reward/estimated_minutes, xử lý token expired → guest mode
- ✅ **Migration 013 file**: Thêm `'contains'` vào CHECK constraint
- ✅ **z-index fix**: User popup nâng lên z-[60], modal z-[70], accountLockedModal z-[80]
- ✅ **Migration 016**: Tạo bảng `py_quiz_questions` + seed 18 câu trắc nghiệm cho 6 bài theory (đã apply main)
- ✅ **Quiz UI**: Card "Kiểm tra nhanh" dưới LEFT panel bài theory — chọn đáp án → feedback đúng/sai + giải thích

### Lesson Page fixes (10 items)
- ✅ **Pyodide CDN version**: `314.0.2` → `0.27.3` (2 occurrences)
- ✅ **XSS escape**: Thêm `escapeHtml()` helper, áp dụng cho `r.error`/`r.expected`/`r.actual` + quiz explanation
- ✅ **normalizeOutput client-side**: Thêm `compareClientOutputs()` đồng bộ với server (xử lý `\r\n`, trailing spaces)
- ✅ **Quiz retry on wrong**: Chỉ lock option khi đúng — sai thì highlight đỏ nhưng vẫn cho chọn lại
- ✅ **Quiz header id**: Class selector `.bg-gradient-to-r` → `#quiz-header-title`
- ✅ **TS cast → JSDoc**: `as HTMLElement` → `/** @type {HTMLElement} */`
- ✅ **Pyodide init race**: Promise caching pattern — tránh tải Pyodide 2 lần đồng thời
- ✅ **Quiz NOT auto-submit**: Không auto-pass khi quiz đúng — "Nộp bài" vẫn là hành động duy nhất (đã đúng)
- ✅ **marked.parse await**: Đã có `await` (đã đúng)
- ✅ **SQL error handling**: submit.ts + progress.ts đã có `console.error` + user message (đã đúng)

### Fix XP, Quiz & Course page progress
- ✅ **submit.ts**: Fix `alreadyCompleted` check cho cả theory + practice — chuyển lên TRƯỚC upsert progress (tránh always 0 XP)
- ✅ **Lesson page**: Thêm quiz summary console sau khi nộp bài theory — hiển thị `x/y câu đúng`
- ✅ **Course detail page**: Hiển thị trạng thái hoàn thành bài học — icon ✅ xanh cho bài đã làm, nền xanh nhạt
- ✅ **Run/Submit phân tách test cases**: Nút Run chạy public test (visible), nút Nộp bài chạy ALL test (public + hidden)

### Trước đó
- ✅ **Migration 013**: 7 bảng database (py_courses, py_chapters, py_lessons, py_test_cases, py_submissions, py_lesson_progress, py_profiles)
- ✅ **Migration 014**: Seed "Python Cơ Bản" — 3 chapters, 10 lessons, 27 test cases
- ✅ **Pages**: Landing, Course catalog, Course detail, Interactive workspace
- ✅ **Enrollment system**: API GET + POST, public course catalog
- ✅ **UX Redesign**: Course detail "Tiếp tục học →", skip warning modal, "Nộp bài" cho theory

## Modified Files (gần đây)
- `src/pages/hoc-python/hoc/[courseSlug]/[lessonSlug].astro` — 7+ fixes
- `src/pages/api/hoc-python/submit.ts` — XP protection, race condition
- `src/pages/api/hoc-python/progress.ts` — JWT auth
- `src/utils/auth.ts` — shared verifyAuth (mới)
- `src/utils/rateLimit.ts` — DB-based (sửa)
- `migrations/016_seed_quiz_questions.sql` — quiz questions
- `migrations/017_add_rate_limits.sql` — rate_limits table

## Known Issues
- (none blocking)

## Next Step
- Restart `pnpm dev` và test toàn bộ flow: quiz → nộp bài → XP → progress
- Kiểm tra `contains` comparison mode hoạt động client-side
- Xác nhận Pyodide version `0.27.3` hoạt động ổn định
- Refresh pagefind index sau build (`pnpm build`)
