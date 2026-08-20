# Fix Findings — Debug workflow — 2026-08-20

## Event
- **type**: task_result
- **phase**: ANALYZE -> FIX -> TEST -> REVIEW -> PERSIST
- **category**: bug-fix, code-quality, security

## Summary
Fix 3 bug thực tế tìm được từ Full Project Review v2 (debug workflow): hidden test leak, TS type errors, dead param cleanup. QA + Reviewer xác nhận PASS, không regression.

## Fixes
### B9 (HIGH) — Hidden test leak — FIXED
- **File**: `src/pages/hoc-python/hoc/[courseSlug]/[lessonSlug].astro`, `src/pages/api/hoc-python/submit.ts`
- **Cause**: `[lessonSlug].astro` serialize toàn bộ `expected_output` (kể cả hidden test) vào `data-test-cases` -> đáp án hidden test lộ trong page source, vô hiệu hóa tính năng "ẩn test" (từ commit `154b3f774`).
- **Fix**: Hidden test chỉ gửi `stdin` + `is_hidden` tới client (không `expected_output`). Client chạy hidden test lấy output nhưng KHÔNG chấm (hiển thị pending), kết quả chính thức từ server `data.results`. `markLessonCompleted` chỉ khi server xác nhận `passed`.
- **Verify**: grep `expected_output` còn lại 5 chỗ đều server-side/visible-only; ordering client (`ORDER BY order_index ASC`) == server (`submit.ts:174`); guard render `!tc.is_hidden`.

### TS errors — FIXED
- **File**: `src/utils/achievements.ts`
- **Cause**: `checkAchievements` dùng `ReturnType<typeof neon>` = `NeonQueryFunction<boolean, boolean>` -> variance error khi nhận `NeonQueryFunction<false,false>` từ caller (submit.ts:150,308) + lỗi destructure iterator.
- **Fix**: Đổi signature thành `NeonQueryFunction<false, false>` (type-only import).
- **Verify**: `npx tsc --noEmit` — 0 lỗi trong `src/` (trước đó 3 lỗi). Lỗi còn lại pre-existing ở `ui/ui-game-roadmap` (React SPA bị tsconfig `**/*` kéo nhầm, nên exclude).

### Cleanup (LOW) — dead param — FIXED
- **File**: `src/pages/hoc-python/khoa-hoc/[slug].astro`
- **Cause**: `userId` query param thừa — `progress.ts` đã chuyển sang JWT auth (Bearer token), param cũ vô dụng. `getUserIdFromToken()` dead code.
- **Fix**: Xóa `userId` param + dead function.

## Verification
- `npx tsc --noEmit`: 0 lỗi `src/`
- `npx astro build`: compile toàn bộ pages OK; fail duy nhất Vercel adapter symlink EPERM trên Windows — pre-existing (đã ghi STATUS)
- Chưa verify end-to-end: cần Pyodide + Neon DB live

## Remaining
- Grading vẫn client-trusted (client POST `outputs`, server chấm lại — server không có Python runtime). Hidden test ẩn đáp án nhưng vẫn probe được qua `passed`/`input` riêng lẻ — track HIGH-11/C2.
- B3: Decorators hidden test truyền stdin nhưng bài không đọc stdin -> fail ở server.
- UX: fetch submit lỗi mạng -> hidden test kẹt pending không retry.
- 3 CRITICAL security chưa fix: Math.random session token, JWT localStorage, rate limiter fail-open.
- Migration 019 chưa apply Neon DB.