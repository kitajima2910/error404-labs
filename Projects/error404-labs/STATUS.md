# STATUS

## Current Task
- **hoc-python Redesign** — Lesson page upgrade: editor optimization, split pane resize, test result UI, mobile responsive, "Nang Cao" course seed
- **Full Project Review v2** — Deep security + code review. 25 API endpoints, 5 utils, 4 lib modules, middleware reviewed. 2026-08-20.
- **Tổng findings: 6 CRITICAL, 13 HIGH, 14 MEDIUM, 10 LOW + 15 hoc-python findings**

## QA Verification (2026-08-20)
| # | Finding | File:Line | Status |
|---|---------|-----------|--------|
| 1 | `Math.random()` session token | `login.ts:148` | **CONFIRMED** — `Math.random().toString(36)` không secure |
| 2 | JWT localStorage | `login.ts:170` | **CONFIRMED** — token trả trong body, client lưu localStorage |
| 3 | Rate limiter fail-open | `rateLimit.ts:43-46` | **CONFIRMED** — catch block trả `allowed: true` |
| 4 | `targetMemberId` undefined | `page-store/[username].ts:196` | **FIXED** — `targetMemberId` → `decoded.id` |
| 5 | `promptFiles` undefined | `get-prompt.ts:249` | **FIXED** — restore `import.meta.glob` cho prompt .txt files |
| 6 | XSS render.ts | `render.ts:15` | **FIXED** — thêm `prerender=false`, origin check (CSRF), CSP header, size limit |

## Completed
### hoc-python Redesign (2026-08-20)
- ✅ **Pyodide singleton cache** — `window.__pyodide` global avoids reload on SPA navigation
- ✅ **CodeMirror singleton cache** — `window.__cmModules` global caches EditorView, python, oneDark modules. Parallel import via `Promise.all`
- ✅ **Split pane resize** — Draggable divider between lesson panel and editor. Mouse + touch support
- ✅ **Console resize** — Draggable divider between editor and console panel. Min 100px, max 500px
- ✅ **Test result UI enhanced** — Diff view chi tiet, animated fadeUp, test tab label shows live pass count
- ✅ **Custom input modal** — Button "Input tuy chinh" khi lesson khong co test cases
- ✅ **Mobile sidebar toggle** — Floating button toggle giua lesson content va editor tren mobile
- ✅ **runPythonWithStdin()** — Extract helper, loai bo code trung lap
- ✅ **Migration 019** — Seed "Python Nâng Cao" (4 chapters, 7 lessons, 18 test cases)
- ✅ **Fix diff view** — `split('\\n')` → `split('\n')` trong `[lessonSlug].astro:906-907` — diff view hien gio tach dong dung
- ✅ **Fix null safety quiz** — Thêm null check cho `optEl.querySelector('input')` tại line 1174 — tranh TypeError
- ✅ **Vietnamese content** — Rewrite migration 019: content co dau tieng Viet, starter code Decorators la skeleton khong co solution, them 2 test cases cho Decorators
- **File modified**: `[lessonSlug].astro` (1432 lines), `migrations/019_seed_python_nang_cao.sql` (rewrite)
- **Vấn đề còn lại**: Migration 019 chưa apply Neon DB; chưa tach components; Pyodide Web Worker chua implement; khong co test suite

### Fix `marked` module missing (2026-08-20)
- ✅ `marked@18.0.6` đã có trong `package.json` + `pnpm-lock.yaml` nhưng thiếu trong `node_modules/`
- ✅ `pnpm install` đã resolve — `node_modules/marked/package.json` exists
- ✅ Astro build compile thành công — `[lessonSlug].astro` import `marked` không lỗi
- **File đã sửa**: Không — chỉ dependency install
- **Kết quả kiểm tra**: Build pass Astro compilation. Vercel bundling step fail do Windows symlink EPERM (pre-existing, không liên quan)
- **Vấn đề còn lại**: Vercel adapter EPERM trên Windows (symlink) — cần build trên CI/Linux

### QA Verify CRITICAL findings (2026-08-20)
- ✅ Verify 6 CRITICAL findings từ Full Project Review
- ✅ Tất cả 6 đều **CONFIRMED** — 2 functional bug (#4, #5), 4 security issues (#1-3, #6)
- ✅ STATUS.md updated, findings evidence recorded

### Fix 3 CRITICAL functional bugs (2026-08-20)
- ✅ **C4**: `targetMemberId` → `decoded.id` trong `page-store POST` — page store POST hoạt động lại
- ✅ **C5**: Restore `import.meta.glob` cho prompt .txt files — prompt content system hoạt động lại
- ✅ **C6**: render.ts — thêm `prerender=false`, origin check (CSRF), CSP header, size limit 100KB
- **File đã sửa**: `src/pages/api/user/page-store/[username].ts`, `src/pages/api/get-prompt.ts`, `src/pages/api/render.ts`
- **Kết quả kiểm tra**: `npx tsc --noEmit` — 3 errors pre-existing (pyodide module, neon type), không regressions
- **Vấn đề còn lại**: 3 CRITICAL security (session token, JWT localStorage, rate limiter fail-open) chưa fix

### Full Project Review (2026-08-20) — Updated v2
- Scope: Deep security audit + code review, all API endpoints
- Files reviewed: 25 API endpoints, 5 utils, 4 lib modules, middleware, migrations, package.json
- **Tổng findings: 6 CRITICAL, 13 HIGH, 14 MEDIUM, 10 LOW + 15 hoc-python findings**
- Chi tiết xem section "Full Review Findings" ở đầu file
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

## Full Review Findings (2026-08-20) — v2

### CRITICAL (6)
1. **Session token dùng `Math.random()`** — `src/pages/api/login.ts:148` — Không cryptographically secure, attacker có thể predict/forged session token. Fix: `crypto.randomUUID()` hoặc `crypto.randomBytes(32).toString('hex')`
2. **JWT lưu localStorage** — `src/pages/api/login.ts:170-188` — Bị XSS trích xuất dễ dàng. Fix: HttpOnly + Secure + SameSite=Strict cookie
3. **Rate limiter fail-open khi DB down** — `src/utils/rateLimit.ts:43-46` — DB error → cho phép tất cả requests, attacker có thể brute-force login. Fix: fail closed hoặc in-memory fallback
4. **`targetMemberId` undefined** — `src/pages/api/user/page-store/[username].ts:196` — **FIXED** — `targetMemberId` → `decoded.id`
5. **`promptFiles` undefined** — `src/pages/api/get-prompt.ts:249-250` — **FIXED** — restore `import.meta.glob` cho prompt .txt files
6. **XSS trong render.ts** — `src/pages/api/render.ts:15` — **FIXED** — thêm `prerender=false`, origin check (CSRF), CSP header, size limit

### HIGH (13)
1. **CSP cho phép 'unsafe-inline' + 'unsafe-eval'** — `src/middleware.ts:21` — Hiệu quả vô hiệu hóa XSS protection từ CSP. Combined với JWT trong localStorage (#CRITICAL-2), một XSS = full account compromise
2. **Không có CSRF protection trên admin mutation endpoints** — `src/pages/api/admin/members.ts`, `prompt-access.ts`, `lessons.ts`, `payments.ts`, `attendance.ts`, `date-notes.ts`, `roadmap-games.ts`, `expected-sessions.ts`, `upload-image.ts` — ALL POST/PUT/DELETE không validate origin. Confirmed 10 endpoints affected (v不仅仅是 members.ts)
3. **Không có CSRF trên user upload-avatar** — `src/pages/api/user/upload-avatar.ts` — Không origin check
4. **Logout CSRF bypassable** — `src/pages/api/logout.ts:18` — Origin check bị skip khi origin là null (same-origin requests, curl)
5. **SQL interpolation pattern fragile** — `src/utils/rateLimit.ts:39` — `INTERVAL '${windowSec} seconds'` — hiện tại safe nhưng pattern nguy hiểm
6. **Super admin hardcoded username** — `src/pages/api/admin/members.ts:163,201,303` — `admin.member !== 'pxh2910'`. Nên dùng role field
7. **User-Agent fingerprint trivially spoofable** — `src/utils/auth.ts:35` — JWT stolen + fake fingerprint = bypass session check
8. **Heartbeat point farming unlimited** — `src/pages/api/user/heartbeat.ts:71-72` — Bot có thể earn ~14,400 points/ngày. Thiếu daily cap
9. **render.ts không auth** — Origin check có nhưng không check JWT. Bất kỳ same-origin request nào cũng render được HTML/CSS/JS arbitrary
10. **Path traversal get-game-prompt** — `src/pages/api/get-game-prompt.ts:69` — `gameName` từ query param → `join()` with `..` có thể escape directory. Fix: validate `/^[a-zA-Z0-9_-]+$/`
11. **hoc-python: Submit API trusts client outputs** — `submit.ts:44,199-202` — `outputs` array từ client dùng cho grading + XP. Student có thể fake
12. **get-game-prompt.ts: No session verification** — Lines 28-41: Chỉ check JWT, không check `logined`, `session_token`, `session_fingerprint` từ DB — session invalidated vẫn access được content
13. **checkAdmin không check `status`** — `prompt-access.ts:17-40` và `get-prompt.ts:23-41` — SELECT query không có field `status`, conditional check thiếu `dbUser.status !== 'active'`. Banned admin vẫn access admin endpoints

### MEDIUM (14)
1. **Pyodide version mismatch** — Lesson page CDN: `0.27.3`, `pyodideRunner.ts` CDN: `v0.25.0`, `package.json`: `^314.0.2`. Ba version khác nhau
2. **4 duplicate streak implementations** — `gamification.ts:calculateStreak()`, `db.ts:updateStreak()`, `submit.ts` (×2 lines 118-146 và 265-293) — Logic giống nhau nhưng `Date.now()-86400000` DST edge case trong submit.ts
3. **4 duplicate `normalizeOutput` implementations** — `grading.ts:35`, `python-grading.ts:7`, lesson page client-side — Kết quả grading có thể khác nhau giữa server/client
4. **Dead code trong db.ts** — `saveSubmission()`, `awardXp()`, `updateStreak()`, `updateProgress()` — Không được import ở đâu
5. **N+1 query trong `getCourseBySlug`** — `src/lib/python-course/db.ts:137-146` — Mỗi chapter 1 query riêng
6. **SQL string interpolation bugs** — `payments.ts:108,116` và `attendance.ts:212-213,227` — `'CURRENT_DATE'`/`'CURRENT_TIME'` truyền as parameterized string thay vì SQL keyword — sẽ fail nếu giá trị default được dùng
7. **Response format inconsistency** — Thiếu `Content-Type: application/json` trong `payments.ts:70,111,120`, `lessons.ts:139,162,184,202`. HTTP 200 cho access denied trong `get-game-prompt.ts:62`
8. **Client-trusted grading** — `submit.ts:44,199-202` — `outputs` array từ client được trust cho XP/achievement grading. Dễ bị game
9. **checkAdmin duplicated ~10 lần** — `admin/members.ts`, `prompt-access.ts`, `lessons.ts`, `payments.ts`, `attendance.ts`, `date-notes.ts`, `roadmap-games.ts`, `expected-sessions.ts`, `upload-image.ts` — implementations khác nhau, nên refactor thành shared utility
10. **hoc-python: Monolith 1,433 dòng** — `[lessonSlug].astro]` chứa server fetch + HTML + client JS + CSS. Nên tách components
11. **hoc-python: Pyodide main thread** — `runPythonWithStdin()` block UI 1-3s mỗi lần run. Nên dùng Web Worker
12. **Module-scope `sql = neon()`** — 9 admin files tạo `sql` tại module scope. Nếu `DATABASE_URL` missing → query fail tại runtime thay vì fail-fast
13. **leaderboard.ts: No rate limiting** — GET public endpoint, bot có thể spam để gây load DB
14. **enrollment.ts: CSRF on GET** — GET handler có origin check — không cần CSRF cho GET (read-only)

### LOW (10)
1. JWT expiry 7 ngày — Khung thời gian quá dài nếu token bị leak
2. Không có input length validation trong admin endpoints (username, password, display_name không giới hạn độ dài)
3. `verify.ts` trả HTTP 200 cho JWT verification failure + server error — monitoring khó phát hiện
4. DST edge case trong streak calculation — `submit.ts` dùng `Date.now() - 86400000` thay vì calendar day
5. `TextConst.ts` — File thừa, chỉ có 1 constant, không được import
6. `gamification.ts` functions `calculateXp()`, `calculateStreak()` never imported — Dead code
7. Không có `.env.example` — Khó cho developers mới
8. Migration numbering conflict: 2 file `004_*`, 2 file `013_*`
9. `payments.ts:108` — `paid_at = ${(paid_at || 'CURRENT_DATE')}::date` — nếu `paid_at` undefined, parameterized string `'CURRENT_DATE'` sẽ fail `::date` cast
10. `attendance.ts:212-213` — `${dateStr}::date` và `${timeStr}::time` có thể nhận giá trị `'CURRENT_DATE'`/`'CURRENT_TIME'` strings thay vì SQL keywords

## hoc-python Review Findings (2026-08-20)
- Scope: 6 pages + 6 APIs + 4 migrations + 4 utils
- **B1 (FIXED)**: `split('\\n')` → `split('\n')` trong diff view
- **B2 (FIXED)**: Null safety quiz handler
- **B3 (HIGH)**: Decorators hidden test vô dụng — truyền stdin `E'1\n2'` nhưng bài không đọc stdin
- **B4 (MEDIUM)**: Starter code có solution sẵn — students chỉ cần thay `pass`
- **B5 (MEDIUM)**: Monolith 1,433 dòng — nên tách components
- **B6 (MEDIUM)**: Pyodide main thread — block UI 1-3s mỗi lần run
- **B7 (LOW)**: `pre::before` hardcode "Python"
- **B8 (LOW)**: Landing page quá đơn giản
- **C1 (MEDIUM)**: Migration 019 chưa apply lên Neon DB
- **C2 (MEDIUM)**: Submit API trusts client outputs
- **C3 (LOW)**: Streak logic duplicated trong submit.ts
- **C4 (LOW)**: ca-nhan.astro breadcrumb hardcode về "Cơ bản"
- **C5 (LOW)**: bang-xep-hang.astro duplicate rendering
- **P1 (MEDIUM)**: CodeMirror thiếu autocomplete
- **P2-P4 (LOW)**: Skeleton loading, split pane state persist, console resize selector brittle

## Modified Files (gần đây)
- `src/pages/hoc-python/hoc/[courseSlug]/[lessonSlug].astro` — 7+ fixes + redesign (Pyodide cache, split pane, test UI, mobile, custom input)
- `migrations/019_seed_python_nang_cao.sql` — NEW: seed "Python Nang Cao" (rewrite: Vietnamese content, fixed starter code, added test cases)
- `src/pages/api/hoc-python/submit.ts` — XP protection, race condition
- `src/pages/api/hoc-python/progress.ts` — JWT auth
- `src/utils/auth.ts` — shared verifyAuth (mới)
- `src/utils/rateLimit.ts` — DB-based (sửa)
- `migrations/016_seed_quiz_questions.sql` — quiz questions
- `migrations/017_add_rate_limits.sql` — rate_limits table
- `src/pages/api/user/page-store/[username].ts` — CRITICAL fix: `targetMemberId` → `decoded.id`
- `src/pages/api/get-prompt.ts` — CRITICAL fix: restore `import.meta.glob` cho prompt files
- `src/pages/api/render.ts` — CRITICAL fix: add origin check, size limit, CSP header, prerender=false

## Known Issues
- 3 CRITICAL security: session token Math.random(), JWT localStorage, rate limiter fail-open
- 13 HIGH: CSP unsafe-inline/eval, CSRF on ALL admin endpoints (10 files), no CSRF upload-avatar, logout CSRF bypass, super admin hardcoded, heartbeat farming, render.ts no auth, get-game-prompt no session check, checkAdmin missing status check
- Pyodide version mismatch: 3 different versions across lesson page, pyodideRunner.ts, package.json
- Client-trusted grading: outputs array từ client dùng cho XP/achievement
- Dead code: 4 functions trong db.ts, gamification.ts functions, TextConst.ts
- Code duplication: streak logic ×4, normalizeOutput ×4, checkAdmin ×10
- **hoc-python**: B3 hidden test vô dụng (Decorators), B4 starter code có solution sẵn, C1 migration 019 chưa apply Neon DB
- SQL bugs: payments.ts/attendance.ts `'CURRENT_DATE'`/`'CURRENT_TIME'` as parameterized strings

## Next Step (Review v2)
- **Priority 1 — Fix CRITICAL security**: Session token → crypto, JWT → HttpOnly cookie, rate limiter fail-closed
- **Priority 2 — Fix HIGH security**: CSRF on all admin endpoints (add origin check), render.ts auth, get-game-prompt session check
- **Priority 3 — Security hardening**: checkAdmin shared utility (with status check), path traversal get-game-prompt, daily cap heartbeat
- **Priority 4 — Code consolidation**: Unified normalizeOutput/compareOutputs, streak logic, wire up or delete dead code
- **Priority 5 — Quality**: Content-Type headers, HTTP status codes, SQL string bugs, input length validation
- Unify Pyodide version across all 3 locations
- Tạo `.env.example`
- **hoc-python**: Apply migration 019 lên Neon DB, fix B3 (hidden test vô dụng), fix B4 (starter code có solution sẵn)
