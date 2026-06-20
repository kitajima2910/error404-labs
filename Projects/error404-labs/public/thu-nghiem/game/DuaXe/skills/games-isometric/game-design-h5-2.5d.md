# 🎨 Game Design 2.5D H5 (Isometric)

## Tổng quan
Skill design cho game 2.5D isometric HTML5. Phù hợp cho: RPG, strategy, city builder, simulation, tactical games.

## 1. Isometric trong game design

### Ưu điểm
- ✅ Chiều sâu 3D ảo mà không cần 3D modeling
- ✅ Dễ sản xuất asset (chỉ cần vẽ tile 2D)
- ✅ Performance tốt hơn 3D thật
- ✅ Góc nhìn đẹp cho strategy / RPG

### Nhược điểm
- ❌ Click detection phức tạp (cần convert coordinate)
- ❌ Sorting (z-order) khó khi có nhiều entity chồng lên
- ❌ Góc nhìn cố định, không xoay được
- ❌ Tileset cần được vẽ đúng perspective

## 2. Tile Types

| Tile | Mô tả | Màu gợi ý | Chiều cao |
|------|-------|-----------|-----------|
| Grass | Đất bằng, đi được | #4CAF50 | 0 |
| Dirt | Đường đất | #8D6E63 | 0 |
| Water | Nước, không đi được | #2196F3 | -0.5 |
| Wall | Tường, chắn | #795548 | 1-3 |
| Building | Nhà, có mái | #FF5722 | 2-5 |
| Tree | Cây, che tầm nhìn | #228B22 | 2-4 |

## 3. Visual Hierarchy trong Isometric

### Depth ordering (Quan trọng nhất)
```
Vẽ theo thứ tự:
1. Ground tiles (xa → gần)
2. Objects thấp (cỏ, đá nhỏ)
3. Player / NPC / Entity
4. Objects cao (cây, cột đèn)
5. Objects trên không (mây, hiệu ứng)
6. UI (luôn trên cùng)
```

### Tile size guidelines
```
Desktop:    TILE_WIDTH=80,  TILE_HEIGHT=40   (2:1 ratio)
Mobile:     TILE_WIDTH=56,  TILE_HEIGHT=28   (2:1 ratio)
Tablet:     TILE_WIDTH=64,  TILE_HEIGHT=32   (2:1 ratio)
```

## 4. Camera & Viewport

### Isometric camera constraints
```typescript
// Giới hạn camera để không show "outside map"
const cameraBounds = {
  minX: -TILE_WIDTH * mapWidth / 2,
  maxX: TILE_WIDTH * mapWidth / 2,
  minY: -TILE_HEIGHT * mapHeight / 2,
  maxY: TILE_HEIGHT * mapHeight + TILE_HEIGHT * mapHeight / 2,
};

// Zoom limits
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.0;
```

### Edge scrolling
```typescript
function edgeScroll(camera: Phaser.Cameras.Scene2D.Camera, speed = 5) {
  const margin = 30;
  const mx = this.input.x;
  const my = this.input.y;

  if (mx < margin) camera.scrollX -= speed;
  else if (mx > window.innerWidth - margin) camera.scrollX += speed;
  if (my < margin) camera.scrollY -= speed;
  else if (my > window.innerHeight - margin) camera.scrollY += speed;
}
```

## 5. Fog of War (cho strategy)

```typescript
class FogOfWar {
  private fog: number[][]; // 0=hidden, 1=fog, 2=visible, 3=explored
  private visionRadius = 3;

  constructor(cols: number, rows: number) {
    this.fog = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
  }

  update(playerX: number, playerY: number) {
    // Reveal around player
    for (let y = -this.visionRadius; y <= this.visionRadius; y++) {
      for (let x = -this.visionRadius; x <= this.visionRadius; x++) {
        const dist = Math.sqrt(x * x + y * y);
        if (dist > this.visionRadius) continue;

        const tx = playerX + x;
        const ty = playerY + y;
        if (ty >= 0 && ty < this.fog.length &&
            tx >= 0 && tx < this.fog[0].length) {
          this.fog[ty][tx] = 2; // visible
        }
      }
    }

    // Fade explored to fog
    for (let y = 0; y < this.fog.length; y++) {
      for (let x = 0; x < this.fog[0].length; x++) {
        if (this.fog[y][x] === 2) {
          this.fog[y][x] = 3; // explored but not visible
        }
      }
    }
  }

  isVisible(x: number, y: number): boolean {
    return this.fog[y]?.[x] === 2;
  }

  isExplored(x: number, y: number): boolean {
    return (this.fog[y]?.[x] ?? 0) >= 2;
  }
}
```

## 6. UX Considerations

### Click target size
- Tile clickable area = toàn bộ tile isometric (hình thoi)
- Minimum touch target: 44×44px (mobile)
- Nếu tile quá nhỏ → dùng magnifier / snap-to-grid

### Selection feedback
```typescript
function showSelectionIndicator(tileX: number, tileY: number) {
  // Highlight tile với border sáng
  const pos = cartToIso(tileX, tileY);
  // Vẽ hình thoi border vàng + glow
}

function showMovementRange(tiles: { x: number; y: number }[]) {
  tiles.forEach(t => {
    // Vẽ tile màu xanh nhạt + opacity
  });
}

function showAttackRange(tiles: { x: number; y: number }[]) {
  tiles.forEach(t => {
    // Vẽ tile màu đỏ nhạt + opacity
  });
}
```

## 7. Pathfinding (A* trên grid isometric)

```typescript
function findPath(start: { x: number; y: number }, end: { x: number; y: number }, map: number[][]) {
  const openSet = [start];
  const cameFrom = new Map<string, { x: number; y: number }>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  const key = (p: { x: number; y: number }) => `${p.x},${p.y}`;
  gScore.set(key(start), 0);
  fScore.set(key(start), heuristic(start, end));

  while (openSet.length > 0) {
    const current = openSet.reduce((a, b) =>
      (fScore.get(key(a)) ?? Infinity) < (fScore.get(key(b)) ?? Infinity) ? a : b
    );

    if (current.x === end.x && current.y === end.y) {
      return reconstructPath(cameFrom, current);
    }

    openSet.splice(openSet.indexOf(current), 1);

    for (const neighbor of getNeighbors(current, map)) {
      const tentativeG = (gScore.get(key(current)) ?? Infinity) + 1;
      if (tentativeG < (gScore.get(key(neighbor)) ?? Infinity)) {
        cameFrom.set(key(neighbor), current);
        gScore.set(key(neighbor), tentativeG);
        fScore.set(key(neighbor), tentativeG + heuristic(neighbor, end));
        if (!openSet.find(o => o.x === neighbor.x && o.y === neighbor.y)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return []; // No path found
}

function heuristic(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance
}

function getNeighbors(p: { x: number; y: number }, map: number[][]) {
  const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
  return dirs
    .map(d => ({ x: p.x + d.x, y: p.y + d.y }))
    .filter(n =>
      n.y >= 0 && n.y < map.length &&
      n.x >= 0 && n.x < map[0].length &&
      map[n.y][n.x] === 0 // Walkable
    );
}
```

## 8. Testing Checklist

- [ ] Click detection chính xác trên mọi tile
- [ ] Depth sorting đúng (entity không bị "lệch" so với tile)
- [ ] Fog of war hoạt động
- [ ] Pathfinding tìm được đường, không đi xuyên tường
- [ ] Performance ổn định với map lớn (> 50×50 tiles)
- [ ] Camera pan/zoom mượt
- [ ] Touch input hoạt động (mobile)

### Tham khảo
- Implementation: `game-h5-2.5d.md`
- Main game skill: `games/SKILL.md`
