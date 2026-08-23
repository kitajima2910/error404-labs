# PROJECT

## Goal
- 

## Product Type
- Web App / H5 Game / AI App / Tool / Other

## Stack
- Frontend:
- Backend:
- Database:
- AI:
- Storage:

## Current Architecture
- 

## Active Systems
- Auth: đăng nhập nội bộ bằng mật khẩu hoặc Google Identity Services; cả hai cùng phát hành JWT nội bộ và dùng single-session.

## Important Decisions
- Google ID token luôn được xác minh ở server bằng `google-auth-library`; không tin dữ liệu hồ sơ do client tự gửi.
- Tài khoản Google được ánh xạ vào bảng `error404labs.members` bằng `google_sub` để giữ tương thích với toàn bộ API hiện tại.

## Constraints
- 

## Stable Core
- 

## Self-Healing Rule
Keep this file synchronized with the current project reality.
If the task changes architecture, stack, modules, or decisions, update this file immediately.
Remove anything that is no longer true.
