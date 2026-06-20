---
name: games-2d
description: Game 2D với Phaser 3 — player, enemy, bullet pool, tilemap, HUD, animation. 60 FPS, object pool cho đạn/enemy.
---

# games-2d — Game 2D

Xem file chi tiết:
- `game-h5-2d.md` — Implementation (Phaser 3 scenes, player, enemy, collision, HUD, audio, optimization)
- `game-design-h5-2d.md` — Game design (core loop, difficulty curve, level design, color palette, touch controls, feedback systems)

## Bắt đầu nhanh

```bash
npm install phaser
```

```typescript
import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800, height: 600,
  physics: { default: "arcade", arcade: { gravity: { y: 300 } } },
  scene: [BootScene, GameScene],
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
});
```

## Mẫu chính (chống lag)
- **Object pool**: Cho đạn, particle, enemy — dùng `Phaser.Group.maxSize`
- **Sprite sheet**: Gộp texture vào atlas, giảm draw calls
- **Tilemap**: Dùng Tiled JSON, không vẽ từng tile riêng
- **Disable off-screen**: Kiểm tra `sprite.y > camera.height + margin` trước khi update
