# 🏁 Turbo Rush 2 — Arcade Racing Game (V2.4)

## Status: ✅ Complete (2026-06-21) — V2.4: Garage Customization & Shop System

Hệ thống độ xe (Garage Customization) toàn diện với các nâng cấp ngoại thất (sơn, decal, mâm bánh, cánh gió, neon gầm, lửa nitro, biển số cá nhân) mua bằng xu tích lũy và lưu trữ loadouts, hoàn toàn là cosmetic để giữ công bằng cho game.

## Phiên bản 2.4 — Garage Customization & Shop System

| Tính năng                     | Mô tả                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 🎨 **Sơn xe đa dạng**         | 8 màu sắc phân chia theo độ hiếm (Common, Rare, Epic, Legendary) mở khóa bằng xu                                            |
| ✨ **Tem xe đua độc đáo**     | Thiết kế decal Sọc dọc thể thao, Ngọn lửa hông, Ngôi sao vàng tốc độ, Lưới ma trận Cyber Grid                               |
| 🛞 **Mâm xe thể thao & Neon** | Các kiểu mâm Cổ điển nan hoa, Hợp kim thể thao 5 chấu, Đĩa sáng Neon phát quang, Mâm Vàng 24K                               |
| 🏁 **Cánh gió khí động học**  | 4 thiết kế đuôi vịt nhỏ (Low profile), Cánh thể thao, Cánh đua GT cỡ lớn, Carbon Active 2 tầng                              |
| 💡 **Đèn Neon Underglow**     | Hiệu ứng phát sáng dưới gầm xe: Xanh băng, Đỏ rực, Xanh Toxic, Vòng màu RGB biến đổi                                        |
| 🔥 **Màu lửa xả Nitro**       | Hạt lửa xả đa lớp đổi màu: Mặc định (Cyan/Orange), Hỏa ngục đỏ, Plasma tím, Acid xanh lá, Tinh vân vàng                     |
| 💳 **Biển số cá nhân hoá**    | Nhập văn bản tùy ý (tối đa 8 ký tự) + 5 kiểu màu biển (Trắng, Vàng taxi, Đỏ ngoại giao, Xanh công vụ, Đen Underground)      |
| 💾 **Saveable Loadouts**      | 3 Slots lưu trữ và tải nhanh cấu hình xe tùy biến đã chọn                                                                   |
| 🔍 **Chế độ Preview Stage**   | Chiếc xe preview được scale 1.35x đặt trên bục trưng bày (Showroom platform) phát sáng, có nhấp nhô động và khói xả nhè nhẹ |

## Phiên bản 2.3 — XP & Level Perk System

| Tính năng                     | Mô tả                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| ⬆️ **Cấp dựa trên XP**        | Level tính từ tổng XP tích lũy (persistent). Công thức: `100×(N²−1)` XP để đạt cấp N     |
| 💯 **XP từ mọi điểm**         | Pass xe (+XP), suýt (+XP × nearMissMult), nhặt xu (+XP × coinValueMult), bonus cuối game |
| 🏅 **10 Perks tích lũy**      | Mỗi cấp mới buff mạnh hơn, stack dần trong run                                           |
| ⚡ **Nitro refill nhanh hơn** | Cấp 2+: nitro hồi 1.2x, hồi nhanh hơn 20%                                                |
| ❤️ **+1 Mạng sống**           | Cấp 3: max 4 mạng. Cấp 6: max 5. Cấp 10: max 6                                           |
| 💰 **Xu x2**                  | Cấp 4+: mỗi xu đáng giá gấp đôi                                                          |
| 🌟 **Score multiplier**       | Cấp 5: 1.5x. Cấp 9: 2x                                                                   |
| 🛡️ **Invincibility +0.5s**    | Cấp 7+: thời gian bất tử sau va chạm dài hơn                                             |
| ⚠️ **Near miss x2**           | Cấp 8+: điểm suýt nhân đôi                                                               |
| 📊 **XP Bar HUD**             | Thanh progress gradient + level number + biểu tượng buff bên cạnh                        |
| 🎆 **Level-up hiệu ứng**      | Screen shake + particle burst + floating text + 4-note SFX ascending                     |
| 💾 **Lưu XP giữa các run**    | localStorage key `turborush2` mới có `xp` + `lvl`, level xuyên suốt                      |

## Phiên bản 2.2 — Premium Visual Polish

| Tính năng                       | Mô tả                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 💨 **Tire Smoke System**        | Khói lốp khi đánh lái gấp, dày hơn khi bật nitro, vật lý bay lên nhẹ                                       |
| 🛞 **Skid Marks**               | Vết trượt đen trên đường khi vào cua gấp, tự động fade sau vài giây                                        |
| 🎯 **Enhanced Speed Lines**     | Vạch tốc độ đổi màu (trắng → xanh) khi tốc độ cao, dày hơn khi nitro                                       |
| 💡 **Animated Headlights**      | Đèn pha nhấp nháy tự nhiên, chùm sáng hình nón động, độ sáng theo tốc độ                                   |
| 🔴 **Animated Taillights**      | Đèn hậu sáng mạnh khi phanh/giảm tốc, hiệu ứng glow halo đỏ                                                |
| 🔄 **Turn Signals**             | Đèn xi-nhan trái/phải khi chuyển làn                                                                       |
| 🌧️ **Reflective Wet Roads**     | Mặt đường phản chiếu trong theme Mưa, vệt sáng đèn đường trên mặt nước                                     |
| 🎬 **Enhanced Camera Shake**    | Rung có hướng (ngang/khi chuyển làn, dọc/khi va chạm), tần số động                                         |
| 🔥 **Multi-layer Nitro Flames** | Lửa xanh (core nhiệt cao) + cam (giữa) + tia lửa + khói xả — 4 lớp riêng                                   |
| 💥 **Impact Sparks**            | Tia lửa bắn ra khi va chạm, vật lý rơi tự do                                                               |
| ⭐ **Enhanced Floating Texts**  | Chữ nổi scale + bounce animation, icon kèm theo                                                            |
| 🏆 **Modern Arcade HUD**        | Glass-morphism, speed bar động, segment nitro bar, score pulse, combo banner scale                         |
| 🔄 **Smooth UI Transitions**    | Fade-in/scale khi chuyển màn hình, hiệu ứng mượt giữa các menu                                             |
| 🔊 **Polished Audio**           | Âm thanh động cơ liên tục (sawtooth), tiếng gió tốc độ cao, rít lốp khi chuyển làn, combo sound milestones |
| 🎉 **Celebration Effects**      | Hạt vàng rơi khi đạt điểm cao mới, combo subtitle "INSANE"                                                 |
| ⚡ **Performance**              | Auto-detect thiết bị low-end, giới hạn particle theo phần cứng, object pool                                |

## Phiên bản 2.1 — Game Modes & Center Fix

| Tính năng                | Chi tiết                                                                  |
| ------------------------ | ------------------------------------------------------------------------- |
| 🎮 **4 chế độ chơi**     | Vô Tận, Tính Giờ (60s), Vượt Chướng Ngại Vật, Đêm Tối                     |
| 📐 **Canvas center fix** | Sử dụng `100dvw`/`100dvh`, ResizeObserver, `flex-shrink:0`, `margin:auto` |
| ⏱️ **Timer HUD**         | Hiển thị đồng hồ đếm ngược khi chơi chế độ Tính Giờ                       |
| 🎯 **Mode multipliers**  | Mỗi chế độ có hệ số riêng cho obstacle, traffic, coin spawn               |

## Phiên bản 2.0 — Tính năng gốc

| Tính năng                       | Mô tả                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 🌆 **5 Chủ đề đường phố**       | City, Highway, Desert, Rain, Night — mỗi theme có màu sắc, bầu trời, mặt đường, hiệu ứng thời tiết riêng |
| 🚗 **6 Loại xe AI**             | Normal, Aggressive (Đua Xe), Cautious (Cẩn Thận), Weaver (Rắn), Truck (Xe Tải), Sports (Thể Thao)        |
| 🧠 **AI chuyển làn thông minh** | Xe tự đánh giá không gian làn bên cạnh, né chướng ngại vật, tránh xe chậm, phản ứng với người chơi       |
| 🚧 **Chướng ngại vật**          | Công trường, vết dầu trơn, rào chắn di động với đèn nháy                                                 |
| 🎯 **Độ khó thích ứng**         | Game tự động điều chỉnh mật độ xe, tần suất chướng ngại vật dựa trên hiệu suất người chơi                |
| 🌧️ **Hiệu ứng thời tiết**       | Mưa (Rain theme) với hạt mưa rơi, bụi sa mạc (Desert theme), sương mù                                    |
| 🔄 **Chuyển cảnh mượt mà**      | Transition giữa các theme kéo dài 4 giây với hiệu ứng làm mờ dần                                         |

## Controls

- **Desktop**: Arrow Keys (← →) or WASD to switch lanes, Space/↑ for Nitro
- **Mobile**: On-screen touch buttons (left, right, nitro)
- **Menus**: Tap/click to navigate

## Files

- `index.html` — Single-file game (~3250 lines)
- `favicon.svg` — SVG favicon (xe đua neon style)
- `STATUS.md` — This file

## Saved Data (localStorage key: `turborush2`)

- High score, total coins, unlocked cars, selected car, **xp**, **level**

## Perk Chart

| Cấp | Perk              | Chi tiết              |
| --- | ----------------- | --------------------- |
| 1   | —                 | Khởi đầu              |
| 2   | ⚡ Nitro hồi 1.2x | `NITRO_REFILL × 1.2`  |
| 3   | ❤️ +1 mạng        | maxLives = 4          |
| 4   | 💰 Xu x2          | coinValueMult = 2     |
| 5   | 🌟 Score 1.5x     | scoreMult = 1.5       |
| 6   | ❤️ +1 mạng        | maxLives = 5          |
| 7   | 🛡️ Bất tử +0.5s   | bonusInvincible = 0.5 |
| 8   | ⚠️ Near miss x2   | nearMissMult = 2      |
| 9   | 🌟 Score 2x       | scoreMult = 2         |
| 10  | ❤️ +1 mạng        | maxLives = 6          |

## XP Requirements

| Cấp | Tổng XP cần | XP cho cấp tiếp |
| --- | ----------- | --------------- |
| 1   | 0           | 300             |
| 2   | 300         | 500             |
| 3   | 800         | 700             |
| 4   | 1500        | 900             |
| 5   | 2400        | 1100            |
| 6   | 3500        | 1300            |
| 7   | 4800        | 1500            |
| 8   | 6300        | 1700            |
| 9   | 8000        | 1900            |
| 10  | 9900        | — (max)         |

## Performance Notes

- Auto-detects low-end devices (concurrency < 4)
- Tire smoke cap: 8 (low-end) / 20 (high-end)
- Skid marks cap: 15 (low-end) / 40 (high-end)
- Particle cap: 30 (low-end) / 80 (high-end)
- Continuous audio engine with dynamic frequency scaling
