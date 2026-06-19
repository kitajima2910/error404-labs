# 🏁 Turbo Rush — Arcade Racing Game

## Status: ✅ Complete (Bug Fixed: 2026-06-19)

A polished 2D arcade racing game built in a single `index.html` file using HTML5 Canvas and vanilla JavaScript (no dependencies).

## Features Implemented

| Feature | Status |
|---------|--------|
| 4-lane road with smooth lane switching | ✅ |
| AI traffic cars (weaving, multiple colors) | ✅ |
| Nitro boost with visual flame effects | ✅ |
| Coin collection with earn mechanics | ✅ |
| Near-miss bonus scoring system | ✅ |
| Escalating speed progression + level system | ✅ |
| 5 unlockable vehicles in Garage (coin purchase) | ✅ |
| Responsive mobile (touch buttons) + desktop (keyboard) | ✅ |
| Dynamic road with scrolling lane markings | ✅ |
| Particle systems (exhaust, sparks, coins, crash) | ✅ |
| Screen shake on actions | ✅ |
| Combo multiplier (x2, x3, x4...) | ✅ |
| Premium HUD (score, speed gauge, hearts, nitro bar) | ✅ |
| Neon arcade visuals with glow effects | ✅ |
| Procedural sound effects (Web Audio API) | ✅ |
| High score + coin persistence (localStorage) | ✅ |
| Title screen, Game Over, Garage menus | ✅ |

## Controls

- **Desktop**: Arrow Keys (← →) or WASD to switch lanes, Space/↑ for Nitro
- **Mobile**: On-screen touch buttons (left, right, nitro)
- **Menus**: Tap/click to navigate

## Files

- `index.html` — Single-file game (37.8 KB, 1091 lines)
- `STATUS.md` — This file

## Bug Fixes (2026-06-19)

| # | Bug | Root Cause | Fix |
|---|-----|-----------|-----|
| 1 | Nitro cạn nhưng speed boost vẫn active | Thiếu `nitroActive=false` khi nitro ≤ 0 | Thêm `nitroActive=false` khi nitro cạn |
| 2 | `nitro=false` gán boolean vào biến number | Dòng `nitro=false;nitro=0` | Bỏ `nitro=false`, chỉ giữ `nitro=0` |
| 3 | Speed blur vẽ full-screen rect không điều kiện | `ctx.fillRect` nằm ngoài `if(sr>0.5)` | Đưa `fillRect` vào trong block `if` |
| 4 | Game Over — tap bất kỳ đâu cũng restart | `else startGame()` ở cuối handler | Xóa dòng `else startGame()` |
| 5 | Collision bị bỏ qua khi nitro | Điều kiện `&&!nitroActive` | Bỏ `&&!nitroActive` khỏi check |
| 6 | Biến `distance` dead code | Khai báo nhưng không dùng | Xóa khai báo, increment và reset |
| 7 | Icon coin `\u{1FA99}` (🪙) hiển thị hình chữ nhật trên Canvas | Emoji Unicode 13.0 không được font hỗ trợ | Thay bằng `$` — tương thích mọi trình duyệt |

## Saved Data (localStorage key: `turborush`)

- High score, total coins, unlocked cars, selected car
