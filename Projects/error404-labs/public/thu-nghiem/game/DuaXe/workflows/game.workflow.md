# 🎮 Workflow Game — Phát triển game H5

Dùng workflow này khi bạn làm: game HTML5, game 2D/2.5D/3D, game mobile web, Godot Web export, Unity WebGL, game canvas.

> **🌏 LUẬT NGÔN NGỮ**: UI game (nút bấm, menu, thông báo, HUD, hướng dẫn) phải là **tiếng Việt**. Animation state (`idle`, `run`, `jump`) giữ tiếng Anh vì là kỹ thuật.

## 🚀 Quy trình vibe code game

> **Bước 0: Download assets** — Chạy `skills/games-assets/SKILL.md`:
> ```bash
> # Auto-download sprites/models từ Kenney / Poly Pizza / Mixamo
> # Fallback procedural nếu không có internet
> # Gồm: idle, run, jump, attack, hurt, death animation states
> ```
> Agent phải chạy script download assets TRƯỚC KHI code.

### Bước 1: Chọn loại game & engine

| Loại | Engine / Library | Skill có sẵn |
|------|-----------------|-------------|
| 🟦 Game 2D | Phaser 3 / PixiJS / Canvas API | `skills/games-2d/game-h5-2d.md` |
| 🟪 Game 2.5D | Isometric + Phaser / Custom engine | `skills/games-isometric/game-h5-2.5d.md` |
| 🟥 Game 3D | Three.js / Babylon.js / Godot → Web | `skills/games-3d/game-h5-3d.md` |

### Bước 2: Setup engine

```bash
# Three.js (3D - mặc định)
npm install three @types/three
npm install -D vite

# Phaser (2D)
npm install phaser
```

### Bước 2.1: Setup `.gitignore`

Sau khi cài dependencies, đảm bảo `.gitignore` đúng chuẩn game H5:
- Luôn có `.opencode`, `.playwright-mcp`, `.gitignore`, `node_modules/`, `dist/`, `*.log`, `.env`
- Nếu download assets: thêm `public/assets/` hoặc thư mục chứa assets
- Nếu đã có `.gitignore` → chỉ cần ensure `.opencode`, `.playwright-mcp`, `.gitignore` được thêm vào

### Bước 2.2: Tạo favicon SVG

Favicon là biểu tượng hiển thị trên tab trình duyệt. Tạo `public/favicon.svg` hoặc `favicon.svg` ở root:

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <text x="16" y="22" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-size="18" font-weight="700">[CHỮ CÁI ĐẦU]</text>
</svg>
````

Thêm vào `<head>` trong `index.html`:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Tuỳ chỉnh màu gradient (hồng/đỏ cho game, xanh cho web, tím cho AI). Nếu là Canvas game thuần, vẫn có `index.html` → thêm link favicon vào đó.

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

Mọi entity (player, enemy, NPC) phải có FSM với đủ states: `idle`, `run`, `jump`, `attack`, `hurt`, `die`. Dùng pattern từ `skills/games-core/SKILL.md`.

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
- 2D: `skills/games-2d/game-design-h5-2d.md`
- 2.5D: `skills/games-isometric/game-design-h5-2.5d.md`
- 3D: `skills/games-3d/game-design-h5-3d.md`

### Chất lượng & Phát hành — Tầng 2 (Điều phối) route Task contracts

Sau khi code xong, Orchestration tạo Task contracts và route đến Workers:

| Phase | Task contract | Route đến | Result mong đợi |
|-------|--------------|-----------|-----------------|
| test | `Task{target: game code, type: gameplay + perf test}` | `@pxh-qa` | `Result{pass/fail, bugs[], fps}` |
| fix | `Task{target: bugs từ QA, type: fix}` | `@pxh-fix-bugs` | `Result{fixed[], status}` |
| review | `Task{target: game code, type: review, focus: structure/perf}` | `@pxh-review-code` | `Result{issues[], score}` |
| build | `Task{target: game project, type: build}` | `@pxh-devops` | `Result{build_size, status}` |
| persist | `Event{type: decision, phase: done, data: game design}` | `@pxh-save-history` | `Confirmed{status: saved}` |

> Game HTML5 chạy bằng `npx vite` hoặc Live Server — bạn tự test và deploy.

### Luồng Runtime (Các tầng)
```
Tầng 1 (Interface): User prompt → Request
Tầng 2 (Orchestration): pxh-pm phân tích, chọn workflow
Tầng 3 (Worker / Executor): pxh-expert code game theo skills/games-
Tầng 3 (Worker / Validator): pxh-qa test gameplay
Tầng 3 (Worker / Fixer): pxh-fix-bugs (nếu có)
Tầng 3 (Worker / Reviewer): pxh-review-code
Tầng 3 (Worker / Builder): pxh-devops build
Tầng 4 (Infrastructure): pxh-save-history persist game design decisions
```

### Liên kết
- Workflow cha: `@vibe`
- Runtime: `runtime/README.md`, `runtime/layers/03-worker.md`
- Skills: `skills/games-*` (2D, 2.5D, 3D, core, physics, audio, assets)
- Contracts: `runtime/contracts/README.md`
- Agents: `@pxh-pm` (Tầng 2), `@pxh-expert` (Tầng 3 Executor), `@pxh-architect` (Tầng 3 Planner)
