---
name: games-physics
description: Physics & collision — AABB, spatial hash, raycast, response. Tối ưu cho hàng ngàn object, không overshoot.
---

# games-physics — Physics & Collision

## AABB Collision (nhanh nhất)

```typescript
interface AABB {
  x: number; y: number;
  width: number; height: number;
}

function aabbOverlap(a: AABB, b: AABB): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Swept AABB (ngăn object xuyên qua khi di chuyển nhanh)
function sweptAABB(a: AABB, b: AABB, vx: number, vy: number): { hit: boolean; t: number; nx: number; ny: number } {
  const entry: AABB = {
    x: vx > 0 ? b.x - (a.x + a.width) : (b.x + b.width) - a.x,
    y: vy > 0 ? b.y - (a.y + a.height) : (b.y + b.height) - a.y,
    width: vx > 0 ? b.width + a.width : -(b.width + a.width),
    height: vy > 0 ? b.height + a.height : -(b.height + a.height),
  };

  const tx = entry.x / vx;
  const ty = entry.y / vy;

  const tEntry = Math.max(
    vx !== 0 ? tx : -Infinity,
    vy !== 0 ? ty : -Infinity,
    0
  );
  const tExit = Math.min(
    vx !== 0 ? entry.width / vx : Infinity,
    vy !== 0 ? entry.height / vy : Infinity,
    1
  );

  if (tEntry > tExit || tEntry < 0 || tEntry > 1) {
    return { hit: false, t: 1, nx: 0, ny: 0 };
  }

  return {
    hit: true,
    t: tEntry,
    nx: tx > ty ? (vx > 0 ? -1 : 1) : 0,
    ny: ty > tx ? (vy > 0 ? -1 : 1) : 0,
  };
}
```

## Spatial Hash (va chạm hàng ngàn object)

```typescript
class SpatialHash {
  private cells = new Map<string, number[]>();
  private cellSize: number;

  constructor(cellSize: number = 64) {
    this.cellSize = cellSize;
  }

  private key(x: number, y: number): string {
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }

  clear() {
    this.cells.clear();
  }

  insert(id: number, x: number, y: number, w: number, h: number) {
    const minX = Math.floor(x / this.cellSize);
    const minY = Math.floor(y / this.cellSize);
    const maxX = Math.floor((x + w) / this.cellSize);
    const maxY = Math.floor((y + h) / this.cellSize);

    for (let cy = minY; cy <= maxY; cy++) {
      for (let cx = minX; cx <= maxX; cx++) {
        const k = `${cx},${cy}`;
        if (!this.cells.has(k)) this.cells.set(k, []);
        this.cells.get(k)!.push(id);
      }
    }
  }

  query(x: number, y: number, w: number, h: number): Set<number> {
    const result = new Set<number>();
    const minX = Math.floor(x / this.cellSize);
    const minY = Math.floor(y / this.cellSize);
    const maxX = Math.floor((x + w) / this.cellSize);
    const maxY = Math.floor((y + h) / this.cellSize);

    for (let cy = minY; cy <= maxY; cy++) {
      for (let cx = minX; cx <= maxX; cx++) {
        const k = `${cx},${cy}`;
        const cell = this.cells.get(k);
        if (cell) cell.forEach(id => result.add(id));
      }
    }
    return result;
  }
}
```

## Raycast

```typescript
interface RayHit {
  point: { x: number; y: number };
  distance: number;
  objectId: number;
}

function raycast(
  ox: number, oy: number,
  dx: number, dy: number,
  maxDist: number,
  objects: { id: number; x: number; y: number; w: number; h: number }[]
): RayHit | null {
  let closest: RayHit | null = null;

  for (const obj of objects) {
    const hit = rayVsAABB(ox, oy, dx, dy, obj);
    if (hit && hit.distance <= maxDist) {
      if (!closest || hit.distance < closest.distance) {
        closest = { ...hit, objectId: obj.id };
      }
    }
  }

  return closest;
}

function rayVsAABB(
  ox: number, oy: number,
  dx: number, dy: number,
  box: { x: number; y: number; w: number; h: number }
): { point: { x: number; y: number }; distance: number } | null {
  const t1 = (box.x - ox) / dx;
  const t2 = (box.x + box.w - ox) / dx;
  const t3 = (box.y - oy) / dy;
  const t4 = (box.y + box.h - oy) / dy;

  const tMin = Math.max(Math.min(t1, t2), Math.min(t3, t4));
  const tMax = Math.min(Math.max(t1, t2), Math.max(t3, t4));

  if (tMax < 0 || tMin > tMax) return null;

  const t = tMin < 0 ? tMax : tMin;
  return {
    point: { x: ox + dx * t, y: oy + dy * t },
    distance: t,
  };
}
```

## Collision Response (không overshoot, không stuck)

```typescript
interface CollisionResult {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  collided: boolean;
}

function resolveCollision(
  pos: { x: number; y: number },
  vel: { x: number; y: number },
  dt: number,
  solids: AABB[]
): CollisionResult {
  const newPos = {
    x: pos.x + vel.x * dt,
    y: pos.y + vel.y * dt,
  };

  let collided = false;

  for (const solid of solids) {
    const playerBox: AABB = { x: newPos.x - 0.4, y: newPos.y - 0.4, width: 0.8, height: 0.8 };
    if (!aabbOverlap(playerBox, solid)) continue;

    // Resolve X
    const overlapX = Math.min(newPos.x + 0.4 - solid.x, solid.x + solid.width - (newPos.x - 0.4));
    const overlapY = Math.min(newPos.y + 0.4 - solid.y, solid.y + solid.height - (newPos.y - 0.4));

    if (overlapX < overlapY) {
      if (vel.x > 0) newPos.x = solid.x - 0.4;
      else newPos.x = solid.x + solid.width + 0.4;
      vel.x = 0;
    } else {
      if (vel.y > 0) newPos.y = solid.y - 0.4;
      else newPos.y = solid.y + solid.height + 0.4;
      vel.y = 0;
    }
    collided = true;
  }

  return { position: newPos, velocity: vel, collided };
}
```
