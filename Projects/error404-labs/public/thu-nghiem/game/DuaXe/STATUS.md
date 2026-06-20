# 🏁 Turbo Rush 2 — Arcade Racing Game (V2.2)

## Status: ✅ Complete (2026-06-20) — V2.2: Premium Visual Polish

Massive visual overhaul with premium arcade-quality effects while maintaining 60 FPS on mobile.

## Phiên bản 2.2 — Premium Visual Polish

| Tính năng | Mô tả |
|-----------|-------|
| 💨 **Tire Smoke System** | Khói lốp khi đánh lái gấp, dày hơn khi bật nitro, vật lý bay lên nhẹ |
| 🛞 **Skid Marks** | Vết trượt đen trên đường khi vào cua gấp, tự động fade sau vài giây |
| 🎯 **Enhanced Speed Lines** | Vạch tốc độ đổi màu (trắng → xanh) khi tốc độ cao, dày hơn khi nitro |
| 💡 **Animated Headlights** | Đèn pha nhấp nháy tự nhiên, chùm sáng hình nón động, độ sáng theo tốc độ |
| 🔴 **Animated Taillights** | Đèn hậu sáng mạnh khi phanh/giảm tốc, hiệu ứng glow halo đỏ |
| 🔄 **Turn Signals** | Đèn xi-nhan trái/phải khi chuyển làn |
| 🌧️ **Reflective Wet Roads** | Mặt đường phản chiếu trong theme Mưa, vệt sáng đèn đường trên mặt nước |
| 🎬 **Enhanced Camera Shake** | Rung có hướng (ngang/khi chuyển làn, dọc/khi va chạm), tần số động |
| 🔥 **Multi-layer Nitro Flames** | Lửa xanh (core nhiệt cao) + cam (giữa) + tia lửa + khói xả — 4 lớp riêng |
| 💥 **Impact Sparks** | Tia lửa bắn ra khi va chạm, vật lý rơi tự do |
| ⭐ **Enhanced Floating Texts** | Chữ nổi scale + bounce animation, icon kèm theo |
| 🏆 **Modern Arcade HUD** | Glass-morphism, speed bar động, segment nitro bar, score pulse, combo banner scale |
| 🔄 **Smooth UI Transitions** | Fade-in/scale khi chuyển màn hình, hiệu ứng mượt giữa các menu |
| 🔊 **Polished Audio** | Âm thanh động cơ liên tục (sawtooth), tiếng gió tốc độ cao, rít lốp khi chuyển làn, combo sound milestones |
| 🎉 **Celebration Effects** | Hạt vàng rơi khi đạt điểm cao mới, combo subtitle "INSANE" |
| ⚡ **Performance** | Auto-detect thiết bị low-end, giới hạn particle theo phần cứng, object pool |

## Phiên bản 2.1 — Game Modes & Center Fix

| Tính năng | Chi tiết |
|-----------|----------|
| 🎮 **4 chế độ chơi** | Vô Tận, Tính Giờ (60s), Vượt Chướng Ngại Vật, Đêm Tối |
| 📐 **Canvas center fix** | Sử dụng `100dvw`/`100dvh`, ResizeObserver, `flex-shrink:0`, `margin:auto` |
| ⏱️ **Timer HUD** | Hiển thị đồng hồ đếm ngược khi chơi chế độ Tính Giờ |
| 🎯 **Mode multipliers** | Mỗi chế độ có hệ số riêng cho obstacle, traffic, coin spawn |

## Phiên bản 2.0 — Tính năng gốc

| Tính năng | Mô tả |
|-----------|-------|
| 🌆 **5 Chủ đề đường phố** | City, Highway, Desert, Rain, Night — mỗi theme có màu sắc, bầu trời, mặt đường, hiệu ứng thời tiết riêng |
| 🚗 **6 Loại xe AI** | Normal, Aggressive (Đua Xe), Cautious (Cẩn Thận), Weaver (Rắn), Truck (Xe Tải), Sports (Thể Thao) |
| 🧠 **AI chuyển làn thông minh** | Xe tự đánh giá không gian làn bên cạnh, né chướng ngại vật, tránh xe chậm, phản ứng với người chơi |
| 🚧 **Chướng ngại vật** | Công trường, vết dầu trơn, rào chắn di động với đèn nháy |
| 🎯 **Độ khó thích ứng** | Game tự động điều chỉnh mật độ xe, tần suất chướng ngại vật dựa trên hiệu suất người chơi |
| 🌧️ **Hiệu ứng thời tiết** | Mưa (Rain theme) với hạt mưa rơi, bụi sa mạc (Desert theme), sương mù |
| 🔄 **Chuyển cảnh mượt mà** | Transition giữa các theme kéo dài 4 giây với hiệu ứng làm mờ dần |

## Controls

- **Desktop**: Arrow Keys (← →) or WASD to switch lanes, Space/↑ for Nitro
- **Mobile**: On-screen touch buttons (left, right, nitro)
- **Menus**: Tap/click to navigate

## Files

- `index.html` — Single-file game (~3050 lines)
- `favicon.svg` — SVG favicon (xe đua neon style)
- `STATUS.md` — This file

## Saved Data (localStorage key: `turborush2`)

- High score, total coins, unlocked cars, selected car

## Performance Notes

- Auto-detects low-end devices (concurrency < 4)
- Tire smoke cap: 8 (low-end) / 20 (high-end)
- Skid marks cap: 15 (low-end) / 40 (high-end)
- Particle cap: 30 (low-end) / 80 (high-end)
- Continuous audio engine with dynamic frequency scaling
