# STATUS

## Current Task
Fix lỗi điểm danh (409) + chuẩn hóa layout lưới 28x28 ở view=attendance

## Current Focus
Ngăn POST trùng khi ô đã có dữ liệu, đồng bộ trạng thái UI, và fix lệch ô/border

## Completed
- Cập nhật skills-lock.json: thêm 13 skills local từ .agents/skills/ (ai-app, bug-fix, core, database, h5-game, h5-game-2d, h5-game-3d, neon-postgres, status-manager, token-guard, tools-app, vibe-orchestrator, web-app)
- Đổi sourceType từ "github" sang "local"
- JSON hợp lệ
- Fix page quan-ly: bổ sung attendanceView, tách initAttendance ra khỏi switchView, chuẩn hóa switchView theo query param view
- Fix attendance cells: normalize date parsing để UI không sai trạng thái, chặn click spam + xử lý 409 rõ ràng, chuẩn hóa ô 28x28 + border ổn định

## Modified Files
- skills-lock.json
- src/pages/quan-ly.astro
- STATUS.md

## Known Issues
- Đã xóa computedHash cho neon-postgres (không còn phù hợp với file local)

## Next Step
- Cập nhật PROJECT.md với kiến trúc tổng quan (nếu cần)
