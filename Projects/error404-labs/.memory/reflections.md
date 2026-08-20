# Reflections

## stats
- total_memories: 3
- review_findings: 6 CRITICAL, 9 HIGH, 10 MEDIUM, 8 LOW
- files_reviewed: 18 API, 5 utils, 5 lib, 1 middleware, 21 migrations

## fix
- bugs_fixed: 3 (hidden test leak, TS errors achievements/submit, dead param)
- ts_errors_src: 3 -> 0
- build: compile pages OK, Vercel adapter EPERM pre-existing

## review
- audit_scope: full_project
- top_risk: CRITICAL #4 (targetMemberId undefined) + CRITICAL #5 (promptFiles undefined) = 2 broken features
- security_hotspot: render.ts (XSS + open proxy)

## devops
- mcp_neon: not_connected_in_session -> config_fixed (opencode.json) -> need_restart
- mcp_config_location: .pxhvibe/mcp.json (Claude shape) wrong; opencode reads opencode.json only
- db_fallback: @neondatabase/serverless v1.0.2 select 1 = OK
