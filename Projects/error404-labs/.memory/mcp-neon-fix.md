# MCP Neon check — workflow company — 2026-08-20

## Event
- **type**: task_result
- **phase**: ANALYZE -> ARCHITECT -> CODE -> TEST -> FIX -> REVIEW -> BUILD -> PERSIST
- **category**: devops, config

## Summary
Verify MCP Neon connect. Root cause: cấu hình MCP nằm ở `.pxhvibe/mcp.json` (Claude Desktop shape) — file opencode KHÔNG đọc; opencode chỉ nạp `mcp` từ `opencode.json` (project/global). Global `~/.config/opencode/opencode.json` chỉ có `$schema`, thiếu `mcp`. => MCP Neon không bao giờ được nạp.

## Fix (FIX phase)
- Tạo `opencode.json` project (`Projects/error404-labs/opencode.json`) với `mcp.neon` mirror từ `.pxhvibe/mcp.json`:
  `{ "$schema": "https://opencode.ai/config.json", "mcp": { "neon": { "type": "remote", "url": "https://mcp.neon.tech/mcp", "enabled": true } } }`
- JSON valid, schema-valid theo opencode.ai/config.json (McpRemoteConfig: type + url, enabled optional).

## Verification
- REVIEW PASS: schema chính thức xác nhận shape; không secret; diff scope chỉ STATUS/runtime-state/opencode.json.
- BUILD: `opencode.json` tồn tại + parse OK; DB fallback `sql\`select 1\`` qua `@neondatabase/serverless` v1.0.2 -> `DB OK: [{"ok":1,"ts":"2026-08-20T16:52:27Z"}]`.
- Session hiện tại vẫn KHÔNG có tool `mcp__neon__*` (chỉ bash/filesystem/web/skill) -> MCP chưa connect tới khi restart opencode.

## Remaining
- Phải **restart opencode** từ `Projects/error404-labs` mới nạp tool `mcp__neon__*`; lần chạy đầu có thể cần OAuth Neon.
- `filesystem` server trong `.pxhvibe/mcp.json` không được mirror — ngoài phạm vi.
- Task chỉ cần query DB thì dùng package Neon serverless là đủ — không cần MCP.
