# STATUS

## Current Task
- Thêm đăng nhập bằng tài khoản Google thật.

## Completed
### Kiểm tra cảnh báo hơn 10.000 thay đổi
- ✅ Xác định nguyên nhân là cache `.pnpm-store` từng được pnpm tạo bên trong project, không phải thay đổi source code.
- ✅ Xác nhận thư mục cache không còn tồn tại và rule `.pnpm-store/` trong `.gitignore` đang được Git áp dụng.
- ✅ Git hiện chỉ báo 9 file thay đổi thuộc tính năng Google Login và tài liệu liên quan.
- **File đã sửa**: `STATUS.md` (rule `.pnpm-store/` trong `.gitignore` là thay đổi đã có của người dùng và được giữ nguyên).
- **Kết quả kiểm tra**: `git status --porcelain=v1 --untracked-files=all` trả về 9 mục; `git check-ignore -v .pnpm-store/v10` xác nhận ignore thành công; không tìm thấy thư mục `.pnpm-store` trong project.
- **Vấn đề còn lại**: Nếu VS Code vẫn hiện 10k, cần Refresh Source Control hoặc Reload Window để xóa trạng thái cache giao diện.

### Đăng nhập bằng Google
- ✅ Thêm nút Google Identity Services vào modal đăng nhập hiện tại; đăng nhập mật khẩu cũ vẫn hoạt động.
- ✅ Thêm API xác minh Google ID token ở server, tự tạo thành viên lần đầu và phát hành JWT/session nội bộ tương thích với các API hiện có.
- ✅ Thêm migration ánh xạ tài khoản qua `google_sub` và email đã xác minh.
- ✅ Bổ sung cấu hình mẫu `PUBLIC_GOOGLE_CLIENT_ID` và dependency chính thức `google-auth-library`.
- **File đã sửa**: `.env.example`, `package.json`, `pnpm-lock.yaml`, `PROJECT.md`, `src/components/Nav.astro`, `src/pages/api/google-login.ts`, `migrations/019_add_google_login.sql`, `STATUS.md`.
- **Kết quả kiểm tra**: `git diff --check` đạt; Prettier check cho API mới đạt. Astro check chưa chạy hoàn tất vì process khác/permission đang khóa file `.astro/content.d.ts` (`EPERM`).
- **Vấn đề còn lại**: Cần chạy migration 019 trên Neon, tạo OAuth Client ID loại Web trong Google Cloud Console, khai báo authorized origins và đặt `PUBLIC_GOOGLE_CLIENT_ID` trên local/Vercel trước khi kiểm thử end-to-end.

### Ẩn danh sách game và căn giữa Prompt Template — game-roadmap
- ✅ Ẩn khu vực “Tất cả Game Prompt” nhưng giữ các phần tử trong DOM để JavaScript hiện tại không phát sinh lỗi.
- ✅ Chuyển “Mẹo Prompt cho Game” từ sidebar thành card nội dung chính căn giữa, responsive với chiều rộng tối đa phù hợp.
- ✅ Làm mới nền trang, header, typography, khoảng cách và nút “Sử dụng Template”.
- **File đã sửa**: `src/pages/game-roadmap.astro`, `STATUS.md`.
- **Kết quả kiểm tra**: `git diff --check` đạt; xác nhận các DOM ID mà JavaScript đang dùng vẫn tồn tại và card mới có layout căn giữa responsive.
- **Vấn đề còn lại**: Build chưa thể chạy qua bước tối ưu dependency vì file cache `node_modules/.vite/deps/@codemirror_lang-python.js.map` đang bị process khác khóa (`EPERM`).

### Cải thiện giao diện RULE — game-roadmap
- ✅ Mở rộng sidebar “Mẹo Prompt cho Game” theo breakpoint `xl/2xl`, giữ nguyên chiều rộng cũ ở màn hình laptop.
- ✅ Chuyển nút Copy sang header riêng, không còn đè lên nội dung RULE.
- ✅ Trình bày RULE thành danh sách có bullet, khoảng cách và phân cấp rõ ràng; làm nổi bật khu vực TARGET.
- **File đã sửa**: `src/pages/game-roadmap.astro`, `STATUS.md`.
- **Kết quả kiểm tra**: `git diff --check` đạt; xác nhận `copy-template-btn` chỉ có một phần tử giao diện và JavaScript vẫn trỏ đúng ID.
- **Vấn đề còn lại**: Không thể build/kiểm tra trực quan vì không có dev server local và Vite không thể xóa file cache `node_modules/.vite/deps/@codemirror_lang-python.js` đang bị process khác khóa (`EPERM`).

### Cập nhật Prompt Template — game-roadmap
- ✅ Thay RULE cũ bằng RULE mới trong popup "Sử dụng Prompt Template" và chức năng copy prompt.
- ✅ Đồng bộ phần preview Prompt Template trên giao diện.
- **File đã sửa**: `src/pages/game-roadmap.astro`, `STATUS.md`.
- **Kết quả kiểm tra**: `git diff --check` đạt; tìm kiếm xác nhận rule cũ đã được loại bỏ và rule mới có đủ ở 3 vị trí.
- **Vấn đề còn lại**: Không thể chạy Astro build/sync do file cache `node_modules/.vite/deps/@codemirror_lang-python.js` đang bị process khác khóa (`EPERM`); project không cài binary `prettier` để chạy format check riêng.

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
