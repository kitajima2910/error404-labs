# STATUS

## Current Task
- **QA Verify CRITICAL findings** — All 6 CRITICAL confirmed. Ready for IMPLEMENT phase.

## QA Verification (2026-08-20)
| # | Finding | File:Line | Status |
|---|---------|-----------|--------|
| 1 | `Math.random()` session token | `login.ts:148` | **CONFIRMED** — `Math.random().toString(36)` không secure |
| 2 | JWT localStorage | `login.ts:170` | **CONFIRMED** — token trả trong body, client lưu localStorage |
| 3 | Rate limiter fail-open | `rateLimit.ts:43-46` | **CONFIRMED** — catch block trả `allowed: true` |
| 4 | `targetMemberId` undefined | `page-store/[username].ts:196` | **CONFIRMED** —从未 declared, POST throw ReferenceError |
| 5 | `promptFiles` undefined | `get-prompt.ts:249` | **CONFIRMED** —从未 declared, prompt system broken |
| 6 | XSS render.ts | `render.ts:15` | **CONFIRMED** — user HTML/CSS/JS concat thẳng, không sanitization |

## Completed
### QA Verify CRITICAL findings (2026-08-20)
- ✅ Verify 6 CRITICAL findings từ Full Project Review
- ✅ Tất cả 6 đều **CONFIRMED** — 2 functional bug (#4, #5), 4 security issues (#1-3, #6)
- ✅ STATUS.md updated, findings evidence recorded

### Full Project Review (2026-08-20)
- Scope: Security audit, code quality, dependencies, database, architecture
- Files reviewed: 18 API endpoints, 5 utils, 5 lib modules, middleware, migrations, package.json
- **Tổng findings: 6 CRITICAL, 9 HIGH, 10+ MEDIUM, 10+ LOW**
- Chi tiết xem bên dưới
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

## Full Review Findings (2026-08-20)

### CRITICAL (6)
1. **Session token dùng `Math.random()`** — `src/pages/api/login.ts:148` — Không cryptographically secure, attacker có thể predict/forged session token. Fix: `crypto.randomUUID()` hoặc `crypto.randomBytes(32).toString('hex')`
2. **JWT lưu localStorage** — `src/pages/api/login.ts:170-188` — Bị XSS trích xuất dễ dàng. Fix: HttpOnly + Secure + SameSite=Strict cookie
3. **Rate limiter fail-open khi DB down** — `src/utils/rateLimit.ts:43-46` — DB error → cho phép tất cả requests, attacker có thể brute-force login. Fix: fail closed hoặc in-memory fallback
4. **`targetMemberId` undefined** — `src/pages/api/user/page-store/[username].ts:196` — POST handler sẽ throw ReferenceError mỗi request. Chức năng tạo page hoàn toàn broken
5. **`promptFiles` undefined** — `src/pages/api/get-prompt.ts:249-250` — Variable never declared/initialized. Prompt content system hoàn toàn broken
6. **XSS trong render.ts** — `src/pages/api/render.ts:15` — User-supplied HTML/CSS/JS được concat thẳng vào response, không sanitization. Reflected XSS vector

### HIGH (9)
1. **CSP cho phép 'unsafe-inline' + 'unsafe-eval'** — `src/middleware.ts:21` — Hiệu quả vô hiệu hóa XSS protection từ CSP. Combined với JWT trong localStorage (#CRITICAL-2), một XSS = full account compromise
2. **Không có CSRF protection trên admin mutation endpoints** — `src/pages/api/admin/members.ts` — POST/PUT/DELETE không validate origin
3. **Không có CSRF trên user upload-avatar** — `src/pages/api/user/upload-avatar.ts`
4. **Logout CSRF bypassable** — `src/pages/api/logout.ts:18` — Origin check bị skip khi origin là null (same-origin requests, curl)
5. **SQL interpolation pattern fragile** — `src/utils/rateLimit.ts:39` — `INTERVAL '${windowSec} seconds'` — hiện tại safe nhưng pattern nguy hiểm
6. **Super admin hardcoded username** — `src/pages/api/admin/members.ts:163,201,303` — `admin.member !== 'pxh2910'`. Nên dùng role field
7. **User-Agent fingerprint trivially spoofable** — `src/utils/auth.ts:35` — JWT stolen + fake fingerprint = bypass session check
8. **Heartbeat point farming unlimited** — `src/pages/api/user/heartbeat.ts:71-72` — Bot có thể earn ~14,400 points/ngày. Thiếu daily cap
9. **render.ts không auth, không CSRF, không rate-limit** — Open proxy cho arbitrary HTML rendering

### MEDIUM (10)
1. **Pyodide version mismatch** — Lesson page CDN: `0.27.3`, `pyodideRunner.ts` CDN: `v0.25.0`, `package.json`: `^314.0.2`. Ba version khác nhau
2. **3 duplicate streak implementations** — `gamification.ts`, `db.ts`, `submit.ts` (×2) — Logic giống nhau nhưng khác biệt subtle
3. **4 duplicate `normalizeOutput` implementations** — `grading.ts`, `python-grading.ts`, lesson page client-side — Kết quả grading khác nhau giữa server/client
4. **Dead code trong db.ts** — `saveSubmission()`, `awardXp()`, `updateStreak()`, `updateProgress()` — Không được import ở đâu
5. **N+1 query trong `getCourseBySlug`** — `src/lib/python-course/db.ts:137-146` — Mỗi chapter 1 query riêng
6. **`checkAdmin` inconsistency** — `prompt-access.ts` và `get-prompt.ts` không check `status` — Banned admin vẫn access được
7. **SQL string interpolation bugs** — `payments.ts:108` và `attendance.ts:212-213` — `'CURRENT_DATE'`/`'CURRENT_TIME'` truyền as string thay vì SQL keyword
8. **Response format inconsistency** — Thiếu `Content-Type: application/json` trong `payments.ts`, `lessons.ts`. HTTP 200 cho access denied trong `get-game-prompt.ts`
9. **Client-trusted grading** — `submit.ts:44,199-202` — `outputs` array từ client được trust cho XP/achievement grading. Dễ bị game
10. **checkAdmin duplicated 8 lần** với implementations khác nhau — Nên refactor thành shared utility

### LOW (8)
1. JWT expiry 7 ngày — Khung thời gian quá dài nếu token bị leak
2. Không có input length validation trong admin endpoints
3. `verify.ts` trả HTTP 200 cho JWT verification failure
4. DST edge case trong streak calculation (`Date.now() - 86400000`)
5. `TextConst.ts` — File thừa, chỉ có 1 constant, không được import
6. `gamification.ts` functions never called — Dead code
7. Không có `.env.example` — Khó cho developers mới
8. Migration numbering conflict: 2 file `004_*`, 2 file `013_*`

## Modified Files (gần đây)
- `src/pages/hoc-python/hoc/[courseSlug]/[lessonSlug].astro` — 7+ fixes
- `src/pages/api/hoc-python/submit.ts` — XP protection, race condition
- `src/pages/api/hoc-python/progress.ts` — JWT auth
- `src/utils/auth.ts` — shared verifyAuth (mới)
- `src/utils/rateLimit.ts` — DB-based (sửa)
- `migrations/016_seed_quiz_questions.sql` — quiz questions
- `migrations/017_add_rate_limits.sql` — rate_limits table

## Known Issues
- 6 CRITICAL: session token Math.random(), JWT localStorage, rate limiter fail-open, undefined targetMemberId (page-store POST broken), undefined promptFiles (get-prompt broken), XSS render.ts
- 9 HIGH: CSP unsafe-inline/eval, no CSRF on admin/user endpoints, logout CSRF bypass, super admin hardcoded, heartbeat farming, render.ts no auth
- Pyodide version mismatch: 3 different versions across lesson page, pyodideRunner.ts, package.json
- Client-trusted grading: outputs array từ client dùng cho XP/achievement
- Dead code: 4 functions trong db.ts, gamification.ts functions, TextConst.ts
- Code duplication: streak logic ×4, normalizeOutput ×4, checkAdmin ×8

## Next Step (QA Verified)
- **Priority 1 — Fix CRITICAL functional bugs**: targetMemberId (page-store POST), promptFiles (get-prompt)
- **Priority 2 — Fix CRITICAL security**: render.ts XSS (no auth, no CSRF, no sanitization)
- **Priority 3 — Security hardening**: Session token → crypto, JWT → HttpOnly cookie, rate limiter fail-closed
- **Priority 4 — Code consolidation**: Unique normalizeOutput/compareOutputs, unique streak logic, wire up or delete dead code in db.ts
- **Priority 5 — Consistency**: checkAdmin shared utility, Content-Type headers, HTTP status codes
- Unify Pyodide version across all 3 locations
- Tạo `.env.example`
- Add daily cap cho heartbeat points
