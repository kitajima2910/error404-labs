# 🏁 Turbo Rush 2 — Arcade Racing Game (V2.0)

## Status: ✅ Complete (2026-06-20) — V2.1: Chế độ chơi + Center fix

Massive update từ phiên bản 1.0 lên 2.0. Game đua xe arcade 2D chạy trên HTML5 Canvas đơn file, zero dependencies.

## Phiên bản 2.0 — Tính năng mới

| Tính năng | Mô tả |
|-----------|-------|
| 🌆 **5 Chủ đề đường phố** | City, Highway, Desert, Rain, Night — mỗi theme có màu sắc, bầu trời, mặt đường, hiệu ứng thời tiết riêng |
| 🚗 **6 Loại xe AI** | Normal, Aggressive (Đua Xe), Cautious (Cẩn Thận), Weaver (Rắn), Truck (Xe Tải), Sports (Thể Thao) |
| 🧠 **AI chuyển làn thông minh** | Xe tự đánh giá không gian làn bên cạnh, né chướng ngại vật, tránh xe chậm, phản ứng với người chơi |
| 🚧 **Công trường xây dựng** | Chướng ngại vật có nón cảnh báo, dải phân cách — gây sát thương và giảm tốc |
| 🛢️ **Vết dầu trơn** | Vệt dầu trên đường — xe người chơi bị trượt làn mất kiểm soát tạm thời |
| ⛔ **Rào chắn di động** | Barrier di chuyển qua lại giữa các làn, đèn cảnh báo nhấp nháy |
| 🎯 **Độ khó thích ứng** | Game tự động điều chỉnh mật độ xe, tần suất chướng ngại vật dựa trên hiệu suất người chơi |
| 🌧️ **Hiệu ứng thời tiết** | Mưa (Rain theme) với hạt mưa rơi, bụi sa mạc (Desert theme), sương mù |
| 🔄 **Chuyển cảnh mượt mà** | Transition giữa các theme kéo dài 4 giây với hiệu ứng làm mờ dần |
| 🎨 **Đồ hoạ cải tiến** | Lane markings theo theme, road edge markers màu sắc động, cây cối sa mạc, toà nhà thành phố |
| 📊 **HUD nâng cao** | Hiển thị tên theme hiện tại, chỉ số độ khó, thống kê sau game over |

## V2.1 — Cập nhật (2026-06-20)

| Tính năng | Chi tiết |
|-----------|----------|
| 🎮 **4 chế độ chơi** | Vô Tận, Tính Giờ (60s), Vượt Chướng Ngại Vật, Đêm Tối |
| 📐 **Canvas center fix** | Sử dụng `100dvw`/`100dvh`, ResizeObserver, `flex-shrink:0`, `margin:auto` |
| ⏱️ **Timer HUD** | Hiển thị đồng hồ đếm ngược khi chơi chế độ Tính Giờ |
| 🎯 **Mode multipliers** | Mỗi chế độ có hệ số riêng cho obstacle, traffic, coin spawn |

### Chế độ chơi chi tiết

| Chế độ | Mạng | Tốc độ đầu | Đặc điểm |
|--------|------|-----------|----------|
| 🔄 Vô Tận | 3 | 240 | Endless mặc định, tất cả theme |
| ⏱️ Tính Giờ | 5 | 280 | Sống sót 60s, điểm + xu x2 |
| ⚠️ Vượt Chướng Ngại Vật | 3 | 260 | Obstacle x2, traffic x0.5, coin x2.5 |
| 🌙 Đêm Tối | 4 | 220 | Chỉ theme Night, obstacle x1.5 |

## So sánh V1.0 vs V2.0

| Khía cạnh | V1.0 | V2.0 |
|-----------|------|------|
| Chủ đề đường | 1 (cố định) | 5 (luân phiên) |
| Loại xe AI | 1 loại (màu sắc khác nhau) | 6 loại (hành vi khác nhau) |
| AI chuyển làn | Ngẫu nhiên đơn giản | Đa mục tiêu (né obstacle, tránh xe, phản ứng player) |
| Chướng ngại vật | ❌ Không có | ✅ Công trường, dầu trơn, rào chắn |
| Độ khó | Tuyến tính (tốc độ tăng dần) | Thích ứng (dựa trên điểm + thời gian sống) |
| Thời tiết | ❌ Không có | ✅ Mưa, bụi, sương mù |
| Chuyển cảnh | ❌ Không có | ✅ Smooth 4 giây |
| Kích thước | 1184 dòng | 2028 dòng |

## Features V1.0 (Giữ nguyên)

| Feature | Status |
|---------|--------|
| 4-lane road with smooth lane switching | ✅ |
| Nitro boost with visual flame effects | ✅ |
| Coin collection with earn mechanics | ✅ |
| Near-miss bonus scoring system | ✅ |
| Escalating speed progression + level system | ✅ |
| 5 unlockable vehicles in Garage (coin purchase) | ✅ |
| Responsive mobile (touch buttons) + desktop (keyboard) | ✅ |
| Particle systems (exhaust, sparks, coins, crash) | ✅ |
| Screen shake on actions | ✅ (cải tiến mượt hơn) |
| Combo multiplier (x2, x3, x4...) | ✅ |
| Premium HUD (score, speed gauge, hearts, nitro bar) | ✅ |
| Neon arcade visuals with glow effects | ✅ |
| Procedural sound effects (Web Audio API) | ✅ |
| High score + coin persistence (localStorage) | ✅ |
| Title screen, Game Over, Garage menus | ✅ |
| Pause overlay + Main Menu button (ESC/HUD ⏸) | ✅ |

## Controls

- **Desktop**: Arrow Keys (← →) or WASD to switch lanes, Space/↑ for Nitro
- **Mobile**: On-screen touch buttons (left, right, nitro)
- **Menus**: Tap/click to navigate

## Road Themes Chi Tiết

| Theme | Màu chủ đạo | Hiệu ứng đặc biệt | Loại hazard chính |
|-------|-------------|-------------------|-------------------|
| 🌃 City | Xanh đêm | Toà nhà, sao | Dầu trơn + công trường |
| 🛣️ Highway | Xanh dương | Dải cỏ sọc | Công trường + rào chắn |
| 🏜️ Sa Mạc | Cam nắng | Cây xương rồng, bụi | Công trường + rào chắn |
| 🌧️ Mưa | Xám tối | Hạt mưa, lane mờ | Dầu trơn + rào chắn |
| 🌙 Đêm | Tối đen | Nhiều sao, building | Cân bằng |

## Traffic Types Chi Tiết

| Loại | Tốc độ | Hành vi |
|------|--------|---------|
| Normal | 60-85% | Chuyển làn ngẫu nhiên cơ bản |
| Đua Xe | 80-100% | Chủ động chặn người chơi, chuyển làn nhanh |
| Cẩn Thận | 40-65% | Hiếm khi chuyển làn, lái chậm |
| Rắn | 70-90% | Liên tục đổi làn như rắn |
| Xe Tải | 35-55% | To, chậm, chiếm nhiều không gian |
| Thể Thao | 90-115% | Nhanh, hung hãn, áp sát người chơi |

## Files

- `index.html` — Single-file game (2163 lines, 81KB)
- `favicon.svg` — SVG favicon (xe đua neon style)
- `STATUS.md` — This file

## Saved Data (localStorage key: `turborush2`)

- High score, total coins, unlocked cars, selected car
