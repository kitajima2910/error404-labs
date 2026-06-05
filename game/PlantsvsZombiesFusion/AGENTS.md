# AGENTS

Đọc `.aiignore` → `STATUS.md` trước khi làm. Cập nhật STATUS.md sau khi xong task. Trả lời tiếng Việt.

## Dev

```sh
npm run dev     # port 3000, auto-open
npm run build   # dist/ + sourcemap
```

ESM (`"type": "module"`). Deps: `three ^0.170.0` + `vite ^6.0.0`.

## Entry & Game loop

`index.html` → `src/main.js` → `new Game(document.body)` → màn hình start → click `Bắt Đầu` → `game.start()`.

Game loop (`Game._loop`, thứ tự QUAN TRỌNG):

```
sunManager → zombieManager → plantManager → projectileManager
→ waveManager → particleManager → hazardsManager → uiManager → sceneManager.render()
```

`dt` capped 0.05s. Zombie chạy TRƯỚC plant để đảm bảo zombie ăn trước khi cây tấn công.

## Manager dependencies

Tất cả managers là class, nhận `game` ở constructor để gọi chéo:

| Manager | Params after `game` | Notes |
|---------|---------------------|-------|
| `ZombieManager` | scene, particleManager, audio | param thứ 4 |
| `PlantManager` | scene, gridManager, particleManager, audio | param thứ 5 |
| `WaveManager` | game (duy nhất) | |
| `SunManager` | scene, audio | ko cần game |
| `ProjectileManager` | scene, particleManager, audio | ko cần game |
| `ParticleManager` | scene | ko cần game |
| `FusionManager` | game (duy nhất) | |
| `AudioManager` | ko có | |
| `UIManager` | game (duy nhất) | |
| `HazardsManager` | scene, game | quản lý vũng lửa/băng/độc |

## Entity patterns — KHÔNG dùng class

**Plant** (`PlantManager.placePlant`): dùng closure `self = this` trỏ về PlantManager vì method được gọi từ zombie.

```js
const self = this;
const plant = {
  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp <= 0) self.removePlant(this);
    // redraw HP bar canvas...
  }
};
```

**Zombie** (`ZombieManager.spawn`): dùng `this.game` gán sau object literal.

```js
const zombie = { ..., takeDamage(amount) { ... this.game.zombieManager.kill(this); } };
zombie.game = this.game;
```

Khi thêm logic damage, dùng đúng pattern tương ứng — KHÔNG trộn lẫn.

## Grid & coordinate system

```
GRID_ROWS=5, GRID_COLS=9, CELL_SIZE=1.6
GRID_OFFSET_X=-6.4, GRID_OFFSET_Z=-3.2
COL_X[c] = -6.4 + c*1.6     (9 phần tử, index 0-8)
LANE_Z[r] = -3.2 + r*1.6    (5 phần tử, index 0-4)
```

- `worldToGrid(x, z)`: `round((x+6.4)/1.6), round((z+3.2)/1.6)`
- `gridToWorld(row, col)`: `{ x: COL_X[col], z: LANE_Z[row] }`
- Zombie di chuyển −X, spawn tại `SPAWN_X=8`, chết tại `ZOMBIE_KILL_ZONE=-7.5`
- Đạn bay +X, speed=4

### ⚠️ Array bounds

LUÔN dùng `COL_X[c]` / `LANE_Z[r]` — không hardcode `-4.8 + c*1.6`. Array bounds crash (NaN position) đã fix nhiều lần. `isOccupied()` trả về `true` cho ô ngoài lưới — không dùng để check lân cận, dùng `isInBounds()`.

## Zombie eating detection

Trong `ZombieManager.update`, quét columns 0-8 của lane zombie:

```js
const dist = z.x - COL_X[c];
if (dist <= 0.35 && dist >= -1e-10) {
```

**`dist >= -1e-10`** (thay vì `> -0.35`): zombie chỉ detect cây **phía trước mặt** (bên trái), không detect cây sau lưng. Tránh bug zombie kẹp giữa 2 cây ăn luôn cây phía sau.

**`dist <= 0.35`** (thay vì `< 0.35`): tránh floating point miss khi `dist` chính xác bằng 0.35.

**Snap position**: `z.x = COL_X[c] + 0.34` (thay vì `+ 0.35`). Tránh floating point `(COL_X[c] + 0.35) - COL_X[c] > 0.35`.

Luôn dùng `COL_X[c]` — không hardcode `-4.8 + c*1.6`.

- `potato` (armed): zombie đi xuyên qua, nổ gây 150 dmg
- `iceberg`: đóng băng zombie, cây chết ngay
- còn lại: `blockingPlant = plant`, zombie dừng ăn

Khi zombie ăn: `z.x = COL_X[c] + 0.34`. Zombie và plant sát thương nhau đồng thời trong cùng frame.

## Model rotations

- Plant: `rotation.y = Math.PI / 2` (mặt về +X = phải = hướng zombie)
- Zombie: `rotation.y = -Math.PI / 2` (mặt về -X = trái = hướng cây)

## Damage flow chi tiết

Game loop order: zombie → plant → projectile.

**Zombie ăn plant (zombieManager trước)**:
1. Zombie detect plant, attackTimer += dt
2. Khi attackTimer ≥ attackInterval: `blockingPlant.takeDamage(z.damage)`
3. Nếu plant là `chomper`: zombie cũng nhận `chompDamage` ngay sau (cả 2 đánh nhau trong cùng frame)
4. PlantManager chạy sau: Chomper cắn zombie trong range

**Projectile trúng zombie** (projectileManager chạy cuối):
- fire: dmg × 1.5, ice: dmg + slow, wintermelon: AoE slow, sun: callback

**HP bar**: Sprite với CanvasTexture 64×10, `depthTest: false`, `tex.needsUpdate = true` khi thay đổi.

## Fusion

Click cây `fuseable: true` → `FusionManager.getFusionOptions()` kiểm tra 4 ô lân cận → hiện panel. Cả 2 cây phải `fuseable && !isFusion`. `performFusion()` xoá cả 2 → `placePlant(recipe.result)`. Fusion plants không `fuseable`, không có trong plant bar.

## Important gotchas

- **Floating point eating**: `(COL_X[c] + 0.35) - COL_X[c]` có thể > 0.35. Luôn dùng `<= 0.35` và snap `+ 0.34`. Thêm epsilon `>= -1e-10` thay vì `>= 0` để tránh -0.
- **Potato Mine** không block zombie (zombie đi qua), chỉ nổ khi `plant.armed === true` (sau 5s)
- **Cherry Bomb** nổ ngay khi đặt, tự gọi `_explodePlant`
- **Iceberg** đóng băng zombie ngay khi detect (không cần ăn)
- **Multi-shot** (`shotsPerFire > 1`): `setTimeout(100ms)` stagger + kiểm tra `p.alive`
- **Chomper** kiểm tra zombie trong `range` (1.5). Khi zombie ăn Chomper, cả 2 đánh nhau đồng thời
- **Endless mode** (`WaveManager`): ghi đè `this.waves` — `reset()` không khôi phục array gốc
- **Audio**: Web Audio API tone-based, cần `ensureResumed()` sau user gesture
- **Grid highlight** (`SceneManager`): dùng PlaneGeometry tạm, xoá mỗi frame
- **Zombie model**: armL/armR lưu qua `model.getObjectByName()`, animate trong update
- **UI**: DOM overlay (pointer-events: none → auto), không Three.js trừ HP bar Sprite
- **Tất cả tên tiếng Việt**: cây, zombie, fusion, thông báo, nút bấm

## Zombie Mutations (`MUTATIONS` in constants.js)

Áp dụng cho zombie riêng lẻ (từ màn 3 trở đi):

| Mutation | Effect | Visual |
|----------|--------|--------|
| `fast` | speed ×1.5, hp ×0.9 | Vòng aura xanh lá |
| `armored` | hp ×2.5, speed ×0.8 | Vòng aura xám |
| `fire` | speed ×1.1, damage ×1.3, để lại vũng lửa | Vòng aura cam |
| `icy` | hp ×1.4, làm chậm cây khi cắn | Vòng aura xanh dương |
| `regenerating` | hp ×0.8, hồi 8 HP/s khi không ăn | Vòng aura xanh lá nhạt |
| `explosive` | nổ 60 dmg vùng + vũng lửa khi chết | Vòng aura cam |

Mutations stack được (tối đa 2), roll ngẫu nhiên từ pool theo level.

## Elite Variants (`ELITE_TYPES` in constants.js)

Phiên bản mạnh hơn của zombie thường, từ màn 4:

| Elite | Base | hpMul | speedMul | damageMul | scoreMul |
|-------|------|-------|----------|-----------|----------|
| `elite_cone` (Nón Kim Loại) | cone | ×2.5 | ×1.1 | ×1.5 | ×3 |
| `elite_bucket` (Xô Vàng) | bucket | ×2.0 | ×1.0 | ×1.5 | ×3 |
| `elite_football` (Bóng Bầu Dị Chủng) | football | ×2.0 | ×1.4 | ×1.5 | ×3 |
| `miniboss` (Mini Trùm) | giant | ×3.0 | ×0.6 | ×2.0 | ×5 |

Mini Trùm xuất hiện giữa wave (từ màn 5, 30% cơ hội). Tỉ lệ elite tăng dần.

## Wave Modifiers (`WAVE_MODIFIERS` in constants.js)

Áp dụng cho toàn bộ wave, từ màn 3 (cơ hội tăng dần):

| Modifier | Effect |
|----------|--------|
| `swarm` (Bầy Đàn) | count ×2, hp ×0.6, spawnInterval ×0.7 |
| `horde` (Đại Hội) | spawnInterval ×0.5, count ×1.3 |
| `rush` (Xung Kích) | speed ×1.6, count ×0.8 |
| `night` (Bóng Đêm) | hp ×1.25, speed ×1.15 |
| `poison` (Độc Tố) | zombie để lại vũng độc |
| `ice_wind` (Gió Băng) | slowFactor 0.6 toàn bộ zombie |
| `armored_wave` (Thiết Giáp) | bonusHp +80 cho mỗi zombie |

Hiển thị thông báo + tag trên wave-info khi modifier active.

## HazardsManager (`src/HazardsManager.js`)

Quản lý vũng môi trường:

```js
this.hazardsManager = new HazardsManager(scene, game);
```

| Hazard | Damage | Slow | Duration |
|--------|--------|------|----------|
| `firePuddle` (Vũng Lửa) | 20/s | - | 8s |
| `icePatch` (Băng Trơn) | - | ×0.35 | 7s |
| `toxicCloud` (Mây Độc) | 15/s | - | 6s |

- Được tạo từ: zombie `fire` mutation (bước đi), zombie `explosive` mutation (chết), `poison` wave modifier
- Mỗi 0.5s tick sát thương zombie trong radius
- Opacity giảm dần, scale nở nhẹ khi sắp biến mất

## Adaptive Composition

Trong `WaveManager._buildSpawnQueue()`:

```
plantStrength = sum(plants.map(damage + hp))
avgStrength = (level + 1) * 50
strengthRatio = plantStrength / avgStrength
countMul = clamp(0.6, 1.5, strengthRatio)
```

- Nếu người chơi build mạnh → nhiều zombie hơn
- Nếu build yếu → bớt zombie để không bị quá sức
- Kết hợp với countMul của wave modifier

## Zombie.spawn() signature

```js
spawn(type, lane, row, extra = { mutations: [], eliteType: null, isMiniboss: false, waveModifiers: {} })
```

- `mutations`: array string IDs từ MUTATIONS
- `eliteType`: string ID từ ELITE_TYPES
- `isMiniboss`: bool — particles + shake + flash khi spawn
- `waveModifiers`: object — hpMul, speedMul, bonusHp, poisonTrail
