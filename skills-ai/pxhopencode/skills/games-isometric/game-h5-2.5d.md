# 🟪 Game H5 2.5D — Implementation

## Tổng quan
Skill phát triển game 2.5D (isometric / pseudo-3D) HTML5. Phù hợp cho: RPG, strategy, city builder, simulation game với góc nhìn isometric.

> **Bước 0: Download assets** — Chạy script ở `skills/games-assets/SKILL.md`. Dùng isometric tiles từ Kenney/OpenGameArt, fallback vẽ màu thủ công nếu không có.

## Isometric Basics

### Coordinate conversion
```
// World (cartesian) → Screen (isometric)
function worldToScreen(wx: number, wy: number): { x: number; y: number } {
  return {
    x: (wx - wy) * TILE_WIDTH / 2,
    y: (wx + wy) * TILE_HEIGHT / 2,
  };
}

// Screen → World
function screenToWorld(sx: number, sy: number): { x: number; y: number } {
  return {
    x: (sx / (TILE_WIDTH / 2) + sy / (TILE_HEIGHT / 2)) / 2,
    y: (sy / (TILE_HEIGHT / 2) - sx / (TILE_WIDTH / 2)) / 2,
  };
}
```

### Tile dimensions
```typescript
const TILE_WIDTH = 64;   // Width of tile
const TILE_HEIGHT = 32;  // Height of tile (half of width for 2:1 isometric)
const TILE_HEIGHT_3D = 16; // Pseudo-height for Y-axis stacking
```

## Setup với Phaser + Isometric plugin

```bash
npm install phaser
npm install phaser-isometric  # Isometric plugin cho Phaser
```

```typescript
import Phaser from "phaser";
import PhaserIsometric from "phaser-isometric";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  plugins: {
    scene: [
      { key: "Isometric", plugin: PhaserIsometric, mapping: "iso" }
    ]
  },
  scene: [IsoGameScene],
};
```

## Isometric Map

```typescript
export class IsoGameScene extends Phaser.Scene {
  private tiles: Phaser.GameObjects.Graphics;
  private entities: Phaser.GameObjects.Sprite[] = [];
  private tileMap: number[][] = [];
  private tileTextures: HTMLImageElement[] = [];

  constructor() { super("IsoGameScene"); }

  preload() {
    // Auto-detect tile assets, fallback procedural
    try {
      this.load.image("tile_grass", "assets/tiles_grass.png");
      this.load.image("tile_wall", "assets/tiles_wall.png");
      this.load.image("tile_water", "assets/tiles_water.png");
    } catch {
      // Fallback: tạo canvas texture
    }
  }

  create() {
    this.generateMap(10, 10);
    this.drawMap();
    this.placePlayer(5, 5);

    // Spawn entities with depth sorting
    this.events.on("postupdate", () => this.sortDepth());
  }

  private generateMap(cols: number, rows: number) {
    this.tileMap = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => {
        const r = Math.random();
        return r > 0.2 ? 0 : (r > 0.1 ? 1 : 2); // 0=grass, 1=wall, 2=water
      })
    );
  }

  private drawMap() {
    const tileColors = [0x4CAF50, 0x795548, 0x2196F3]; // grass, wall, water
    for (let y = 0; y < this.tileMap.length; y++) {
      for (let x = 0; x < this.tileMap[y].length; x++) {
        const pos = this.cartToIso(x, y);
        const color = tileColors[this.tileMap[y][x]] ?? 0x4CAF50;

        const tile = this.add.graphics();
        tile.fillStyle(color, 1);
        tile.beginPath();
        tile.moveTo(pos.x, pos.y);
        tile.lineTo(pos.x + TILE_WIDTH / 2, pos.y - TILE_HEIGHT / 2);
        tile.lineTo(pos.x + TILE_WIDTH, pos.y);
        tile.lineTo(pos.x + TILE_WIDTH / 2, pos.y + TILE_HEIGHT / 2);
        tile.closePath();
        tile.fillPath();
        tile.lineStyle(1, 0x333333, 0.5);
        tile.strokePath();
        tile.setData("tileX", x);
        tile.setData("tileY", y);
        tile.setDepth(x + y);
      }
    }
  }

  private sortDepth() {
    this.entities.sort((a, b) => {
      const ax = a.getData("tileX") + a.getData("tileY");
      const bx = b.getData("tileX") + b.getData("tileY");
      return ax - bx;
    });
    this.entities.forEach((e, i) => e.setDepth(i + 1000));
  }

  private cartToIso(x: number, y: number, z: number = 0) {
    return {
      x: (x - y) * TILE_WIDTH / 2 + this.cameras.main.width / 2,
      y: (x + y) * TILE_HEIGHT / 2 - z * TILE_HEIGHT_3D,
    };
  }

  private isoToCart(sx: number, sy: number) {
    const cx = sx - this.cameras.main.width / 2;
    const cy = sy;
    return {
      x: Math.floor((cx / (TILE_WIDTH / 2) + cy / (TILE_HEIGHT / 2)) / 2),
      y: Math.floor((cy / (TILE_HEIGHT / 2) - cx / (TILE_WIDTH / 2)) / 2),
    };
  }

  private placePlayer(tileX: number, tileY: number) {
    const pos = this.cartToIso(tileX, tileY, 1);
    const player = this.add.circle(pos.x, pos.y - TILE_HEIGHT_3D, 12, 0x2196F3);
    player.setData("tileX", tileX);
    player.setData("tileY", tileY);
    this.entities.push(player as any);
  }

  update(_time: number, _delta: number) {
    const cursors = this.input.keyboard!.createCursorKeys();
    const player = this.entities[0] as Phaser.GameObjects.Arc;
    if (!player || !player.active) return;
    let dx = 0, dy = 0;

    if (Phaser.Input.Keyboard.JustDown(cursors.left)) { dx = -1; dy = 1; }
    else if (Phaser.Input.Keyboard.JustDown(cursors.right)) { dx = 1; dy = -1; }
    else if (Phaser.Input.Keyboard.JustDown(cursors.up)) { dx = -1; dy = -1; }
    else if (Phaser.Input.Keyboard.JustDown(cursors.down)) { dx = 1; dy = 1; }

    if (dx !== 0) this.movePlayerTo(player, dx, dy);
  }

  private movePlayerTo(player: Phaser.GameObjects.Arc, dx: number, dy: number) {
    const newX = player.getData("tileX") + dx;
    const newY = player.getData("tileY") + dy;

    // Check bounds
    if (newY < 0 || newY >= this.tileMap.length ||
        newX < 0 || newX >= this.tileMap[0].length) return;

    // Check wall
    if (this.tileMap[newY][newX] === 1) return;

    // Animate movement
    const target = this.cartToIso(newX, newY, 1);
    this.tweens.add({
      targets: player,
      x: target.x,
      y: target.y - TILE_HEIGHT_3D,
      duration: 200,
      ease: "Power2",
    });

    player.setData("tileX", newX);
    player.setData("tileY", newY);
  }
}
```

## Entity State + Animation cho Isometric

```typescript
// Entity có states: idle, walk, attack, hurt, die
// Với isometric, direction quan trọng — entity có 8 hướng
type IsoDirection = "S" | "SW" | "W" | "NW" | "N" | "NE" | "E" | "SE";

interface IsoEntity {
  sprite: Phaser.GameObjects.Sprite;
  tileX: number;
  tileY: number;
  direction: IsoDirection;
  state: "idle" | "walk" | "attack" | "hurt" | "die";
  health: number;
  speed: number;
}

// Direction vectors for isometric movement
const ISO_DIRS: Record<string, [number, number]> = {
  "S":  [ 0,  1], "SW": [-1,  1], "W":  [-1, 0], "NW": [-1, -1],
  "N":  [ 0, -1], "NE": [ 1, -1], "E":  [ 1, 0], "SE": [ 1,  1],
};

// Depth sorting (painter's algorithm)
function sortByDepth(objects: Phaser.GameObjects.GameObject[]) {
  objects.sort((a, b) => {
    const ax = a.getData("tileX") + a.getData("tileY");
    const bx = b.getData("tileX") + b.getData("tileY");
    return ax - bx;
  });
  objects.forEach((obj, i) => obj.setDepth(i + 500));
}

// Tween movement with animation
function moveIsoEntity(
  scene: Phaser.Scene,
  entity: Phaser.GameObjects.GameObject,
  fromX: number, fromY: number,
  toX: number, toY: number,
  duration = 150
) {
  const fromIso = cartToIso(fromX, fromY, 1);
  const toIso = cartToIso(toX, toY, 1);

  return new Promise<void>((resolve) => {
    scene.tweens.add({
      targets: entity,
      x: { from: fromIso.x, to: toIso.x },
      y: { from: fromIso.y - TILE_HEIGHT_3D, to: toIso.y - TILE_HEIGHT_3D },
      duration,
      ease: "Power2",
      onComplete: () => resolve(),
    });
  });
}
```

## Pseudo-3D stacking

```typescript
// Stack tiles để tạo chiều cao (building, tree, mountain)
function drawStackedTile(x: number, y: number, height: number, color: number) {
  for (let z = 0; z < height; z++) {
    const pos = cartToIso(x, y, z);
    drawTileAt(pos.x, pos.y, darkenColor(color, z * 0.1));
  }
}

function darkenColor(color: number, amount: number): number {
  const r = Math.floor(((color >> 16) & 0xFF) * (1 - amount));
  const g = Math.floor(((color >> 8) & 0xFF) * (1 - amount));
  const b = Math.floor((color & 0xFF) * (1 - amount));
  return (r << 16) | (g << 8) | b;
}

// Tree: base 3 tiles tall, top 1 tile
function drawTree(x: number, y: number) {
  drawStackedTile(x, y, 3, 0x8B4513); // Trunk
  const top = cartToIso(x, y, 3);
  drawTileAt(top.x, top.y, 0x228B22); // Leaves
}
```

## Click detection

```typescript
function getClickedTile(pointer: Phaser.Input.Pointer) {
  const worldX = pointer.x;
  const worldY = pointer.y;

  // Convert screen → cartesian
  const halfW = TILE_WIDTH / 2;
  const halfH = TILE_HEIGHT / 2;
  const cx = worldX - this.cameras.main.width / 2;
  const cy = worldY;

  const tileX = Math.floor((cx / halfW + cy / halfH) / 2);
  const tileY = Math.floor((cy / halfH - cx / halfW) / 2);

  return { x: tileX, y: tileY };
}
```

## Optimization cho Isometric

- **Frustum culling**: Chỉ vẽ tile trong màn hình
- **Tile LOD**: Tile xa vẽ đơn giản hơn
- **Chunk system**: Chia map thành chunk, chỉ update chunk gần player
- **Pre-render**: Render tile tĩnh ra texture, chỉ vẽ lại khi có thay đổi

## Build

```bash
npx vite build
```

### Tham khảo
- Design: `game-design-h5-2.5d.md`
- Main game skill: `games/SKILL.md`
