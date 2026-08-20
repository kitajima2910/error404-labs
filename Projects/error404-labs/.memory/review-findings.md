# Full Project Review — 2026-08-20

## Event
- **type**: task_result
- **phase**: ANALYZE → PERSIST
- **category**: security-audit, code-quality

## Summary
Audit toàn bộ project Astro 5 SSR — 18 API endpoints, 5 utils, 5 lib modules, middleware, 21 migrations.

## Findings

### CRITICAL (6)
1. `Math.random()` cho session token — predict/forged auth — `src/pages/api/login.ts:148`
2. JWT trong localStorage — XSS trích xuất dễ — `src/pages/api/login.ts:170`
3. Rate limiter fail-open khi DB down — brute-force — `src/utils/rateLimit.ts:43`
4. `targetMemberId` undefined — POST page-store hoàn toàn broken — `src/pages/api/user/page-store/[username].ts:196`
5. `promptFiles` undefined — prompt system hoàn toàn broken — `src/pages/api/get-prompt.ts:249`
6. XSS trong render.ts — user HTML concat thẳng — `src/pages/api/render.ts:15`

### HIGH (9)
1. CSP 'unsafe-inline' + 'unsafe-eval' — XSS protection vô hiệu
2. Không CSRF admin mutation endpoints
3. Không CSRF user upload-avatar
4. Logout CSRF bypassable (origin null)
5. SQL interpolation fragile — `rateLimit.ts:39`
6. Super admin hardcoded username
7. User-Agent fingerprint spoofable
8. Heartbeat farming unlimited (~14,400 pts/ngày)
9. render.ts open proxy — no auth, no CSRF, no rate-limit

### MEDIUM (10)
1. Pyodide version mismatch (3 versions)
2. 3 duplicate streak implementations
3. 4 duplicate normalizeOutput implementations
4. Dead code trong db.ts (4 functions)
5. N+1 query trong getCourseBySlug
6. checkAdmin inconsistency — banned admin still access
7. SQL string interpolation bugs (payments.ts, attendance.ts)
8. Response format inconsistency
9. Client-trusted grading
10. checkAdmin duplicated 8 times

### LOW (8)
1. JWT expiry 7 ngày — too long
2. No input length validation
3. verify.ts HTTP 200 cho failure
4. DST edge case streak
5. TextConst.ts dead file
6. gamification.ts dead code
7. No .env.example
8. Migration numbering conflict

## Recommended Priority
1. Fix CRITICAL bugs: targetMemberId, promptFiles, render.ts XSS
2. Security hardening: crypto session token, HttpOnly cookie, fail-closed rate limiter
3. Code consolidation: normalizeOutput, streak logic, dead code
4. Consistency: checkAdmin shared, Content-Type, HTTP status
