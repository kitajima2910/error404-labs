# 🎮 Game Workflow — Phát triển game H5

Dùng workflow này khi bạn làm: game HTML5, game 2D/2.5D/3D, game mobile web, Godot Web export, Unity WebGL, game canvas.

## 🚀 Quy trình vibe code game

> **Bước 0: Download assets** — Chạy `skills/games/assets/SKILL.md`:
> ```bash
> # Auto-download sprites/models từ Kenney / Poly Pizza / Mixamo
> # Fallback procedural nếu không có internet
> # Gồm: idle, run, jump, attack, hurt, death animation states
> ```
> Agent phải chạy script download assets TRƯỚC KHI code.

### Bước 1: Chọn loại game & engine

| Loại | Engine / Library | Skill có sẵn |
|------|-----------------|-------------|
| 🟦 Game 2D | Phaser 3 / PixiJS / Canvas API | `skills/games/2d/game-h5-2d.md` |
| 🟪 Game 2.5D | Isometric + Phaser / Custom engine | `skills/games/2.5d/game-h5-2.5d.md` |
| 🟥 Game 3D | Three.js / Babylon.js / Godot → Web | `skills/games/3d/game-h5-3d.md` |

### Bước 2: Setup engine

```bash
# Three.js (3D - mặc định)
npm install three @types/three
npm install -D vite

# Phaser (2D)
npm install phaser
```

### Bước 3: Cấu trúc thư mục game chuẩn

```
game/
├── src/
│   ├── scenes/       # Game scenes (Menu, Game, GameOver)
│   ├── entities/     # Player, Enemy, NPC, Bullet
│   ├── systems/      # Physics, Collision, Particle, Audio
│   ├── ui/           # HUD, Menu, HealthBar, Score
│   ├── levels/       # Level data, map, config
│   ├── assets/       # Images, sprites, sounds (imported)
│   └── utils/        # Math helpers, constants, types
├── public/
│   └── assets/       # Static assets (images, audio)
├── index.html
├── vite.config.ts
└── package.json
```

### Bước 4: Flow code game

```
Concept → Scene Setup → Player → Enemies → Mechanics → UI → Audio → Polish
```

Chi tiết từng bước:

1. **Scene**: Tạo game loop (init, update, render), scene manager
2. **Player**: Movement (WASD/click/touch), animation, health, attack
3. **Enemies**: Spawn system, AI behavior (patrol, chase, attack), health/damage
4. **Mechanics**: Collision detection, scoring, power-ups, wave system
5. **UI**: HUD (health bar, score, ammo), menu screen, game over screen
6. **Audio**: SFX (shoot, hit, collect), BGM, volume control
7. **Polish**: Screen shake, particles, transitions, mobile touch support

### Bước 5: Optimization cho H5

- Dùng `requestAnimationFrame` cho game loop
- Object pooling cho bullets/enemies (tránh GC)
- Sprite sheet / texture atlas thay vì nhiều file riêng
- Debounce input, nhất là touch/mobile
- Dùng `will-change` CSS hint cho hardware acceleration

### Bước 6: Entity State Machine

Mọi entity (player, enemy, NPC) phải có FSM với đủ states: `idle`, `run`, `jump`, `attack`, `hurt`, `die`. Dùng pattern từ `skills/games/core/SKILL.md`.

Kiểm tra:
- Transition không hợp lệ bị chặn (vd: die → idle)
- Animation state khớp với FSM state
- duration state (attack/hurt/die) tự động về idle sau khi kết thúc

### Bước 7: Chạy thử với Live Server

```bash
# Game HTML5 — chạy live server để test ngay
npx vite
# hoặc dùng extension Live Server trong VS Code
```

### Bước 8: Build & Share (tuỳ chọn)

```bash
npm run build
# Output trong dist/ — bạn tự deploy
```

### Bước 9: Game Design (nếu cần)

Đọc skill design tương ứng trước khi code:
- 2D: `skills/games/2d/game-design-h5-2d.md`
- 2.5D: `skills/games/2.5d/game-design-h5-2.5d.md`
- 3D: `skills/games/3d/game-design-h5-3d.md`

### Quality & Release

Sau khi code xong:
1. `@pxh-qa` — Kiểm tra gameplay, performance
2. `@pxh-fix-bugs` — Fix bug (nếu có)
3. `@pxh-review-code` — Review cấu trúc & performance
4. `@release.workflow` — Build
5. `@pxh-save-history` — Lưu quyết định game design

> Game HTML5 chạy bằng `npx vite` hoặc Live Server — bạn tự test và deploy.

### Liên kết
- Workflow cha: `@company.workflow`
- Skills: `games/*`, `games/2d/*`, `games/3d/*`
- Agents: `@pxh-pm`, `@pxh-expert`, `@pxh-architect`
