# STATUS

## Current Task
Dựng game Plants vs Zombies Fusion 2.5D với Three.js

## Current Focus
Hoàn thiện luồng chơi: xong màn → về chọn màn

## Completed
- Khởi tạo dự án Vite + Three.js, build dist/ thành công
- Scene 2.5D: PerspectiveCamera(35), lưới 5×9, directional light shadow 2048², sky fog
- Hệ thống 10 màn chơi × 3 đợt, đợt cuối luôn có boss (Trùm / Khổng Lồ)
- Grid 5 hàng × 9 cột, click chọn ô, worldToGrid/gridToWorld
- 10 cây gốc + 9 fusion + 7 zombie — tất cả tên tiếng Việt
- 10 theme khung cảnh riêng (Bãi Cỏ, Rừng Tre, Sa Mạc, Đầm Lầy, Tuyết, Hoàng Hôn, Biển Đêm, Núi Lửa, Rừng Ma, Không Gian)
- Cây khả dụng khác nhau theo từng màn (mở khoá dần), plant bar động
- Menu chọn màn (level select): 10 màn, khoá/mở khoá theo tiến độ, lưu localStorage
- Fusion: click cây fuseable → panel → chọn → xoá 2 cây → tạo fusion
- Wave: 10 wave + endless mode (4 wave), spawn random lane
- Sun: rơi tự nhiên, nhà máy sản xuất, click thu thập
- Projectile: 5 loại (normal/ice/fire/sun/wintermelon), bay +X speed=4
- Particle: nổ, hit, fusion, zombie chết, plant place
- Audio: Web Audio API tone-based SFX
- 3D models: Three.js geometry thuần (Sphere/Cylinder/Cone/Box/Torus/Plane)
- HP bar: Sprite + CanvasTexture, depthTest: false
- Damage visual: material ×0.55 khi HP < 50%
- Zombie arm animation: tay đưa trước, lắc lư khi đi, đưa vào miệng khi ăn (xen kẽ)

## Gameplay flow
- Bắt Đầu → Chọn Màn → chơi → xong màn → lưu progress (localStorage) → về Chọn Màn
- Màn tiếp theo mở khoá, chọn để chơi với khung cảnh + cây mới
- Xong màn 10 → Chiến Thắng → Bất Tận / Chơi Lại / Chọn Màn
- Thua → Thử Lại (cùng màn) / Chọn Màn

## New Features
- **Nhạc nền**: Phát `backyard-bone-party.mp3` khi vào game, tự dừng khi game over/victory/về màn chính
- **📖 Hướng Dẫn**: Bảng tra cứu trong game — 3 tab (🌱 Cây / ⚗️ Fusion / 🧟 Zombie) với chỉ số chi tiết. Mở từ màn hình Bắt Đầu hoặc nút 📖 trên top-bar
- **Đạn riêng cho từng cây**: Mỗi cây bắn đạn có hình dạng, màu sắc, hiệu ứng riêng (40 cây)
- **Hiệu ứng đặc biệt**: Sun producer glow, defensive shield spark, torchwood lửa, garlic khói, coffee năng lượng, moonflower hào quang, lotus chữa lành, umbrella chắn, gravebuster ma thuật, carrot ánh sáng
- **Nổ theo loại**: Squash (xanh), Thunder (sét), Jalapeno (sóng lửa) — mỗi loại particle riêng
- **🧬 Zombie Mutations** (từ màn 3): fast, armored, fire, icy, regenerating, explosive — thay đổi stats, hiệu ứng, vòng hào quang màu sắc
- **🪖 Elite Variants** (từ màn 4): Nón Kim Loại, Xô Vàng, Bóng Bầu Dị Chủng — nhân stats ×2-3
- **🌀 Wave Modifiers** (từ màn 3): Bầy Đàn, Đại Hội, Xung Kích, Bóng Đêm, Độc Tố, Gió Băng, Thiết Giáp — ảnh hưởng cả wave
- **👹 Mini Trùm** (từ màn 5, 30%): Mid-wave boss, scale 1.5×, particles hoành tráng
- **🌋 Environmental Hazards**: Vũng Lửa, Băng Trơn, Mây Độc — zombie để lại khi có mutation fire/poison trait
- **📊 Adaptive Composition**: Số lượng zombie tự điều chỉnh dựa trên sức mạnh cây trên sân
- **🧬 Mutation + Elite visual**: Vòng hào quang RingGeometry ×2 màu tương ứng bên dưới zombie

## Bug fixes applied
- restart game loop bị duplicate rAF khi chọn màn mới: thêm `_rafId` + `cancelAnimationFrame`
- Grid line NaN: dùng toạ độ tính trực tiếp, không lấy từ LANE_Z ngoài mảng
- takeDamage thiếu trên zombie/plant → thêm pattern closure/this.game
- Potato Mine không block zombie, chỉ nổ khi armed
- Zombie detection: `dist <= 0.35` (fix `<=` thay vì `<` để không mất detect)
- Chomper + zombie đánh nhau đồng thời trong cùng frame (zombieManager trước)
- Fusion `particles` → `particleManager`
- Game treo khi chọn Bất Tận: `startEndless()` thiếu `running = true` + `_loop()`
- Endless không thực sự bất tận: dùng `% ENDLESS_WAVES.length` để wrap vô hạn

## Bug fixes applied (v2)
- `z.z` NaN crash (6 chỗ): homing target search, spike/cactus hit, jalapeno filter, electric chain — dùng `z.model.position.z` thay vì `z.z` (zombie không có property `.z`)
- `hit.z` → `hit.row` trong electric chain (getClosestZombie param thứ 2 là row)
- Icy mutation: property name mismatch `_slowTimer` → `_icySlowTimer` để khớp PlantManager
- Normal death memory leak: zombie không bao giờ bị splice khỏi array ~33% số chết
- localStorage setItem không try/catch: private browsing iOS crash
- Hardcode `6.4`/`1.6` → `GRID_OFFSET_X`/`CELL_SIZE`
- `target.z`/`zombie.z` → `target.model.position.z` trong PlantManager fire()

## Known Issues
- Audio cần `ensureResumed()` sau user gesture
- Zombie arm animation chỉ dùng vật lý cứng (không bone/skeletal)

## Cheat Menu
Bấm **`` ` ``** (backtick) hoặc click nút **⚡** góc phải màn hình để mở:
- ☀️ +1000 Nắng
- 💀 Giết hết zombie (kết thúc đợt ngay)
- 🏆 Chiến thắng đợt
- 🔓 Mở khoá tất cả màn
- 🚀 Warp tới màn bất kỳ (dropdown)

## Navigation
- **🏠** (top-bar): Về màn chính ngay trong khi chơi
- **🏠 Màn Chính** (game over / victory): Về màn chính
- **← Quay Lại** (level select): Về màn chính
- **🏰 Chọn Màn**: Về menu chọn màn

## Next Step
Chạy `npm run dev` và test gameplay
