# 🎨 Game Design 3D H5

## Tổng quan
Skill design cho game 3D HTML5 (Three.js / Babylon.js). Bao gồm level design 3D, lighting, camera, environment art, và UX cho không gian 3D.

## 1. Camera Systems

### Third-Person
```
      Camera
        🎥
         \
          \
        [Player] → Direction
```
- **Distance**: 5-8 units từ player
- **Height**: 2-4 units phía trên
- **Lerp**: Smooth follow với lerp 0.05-0.1
- **Collision**: Camera không xuyên tường (dùng raycast)

### First-Person (FPS)
```
    [Camera] ← → (mouse look)
       |
    [Body]
```
- **FOV**: 70-90 (mặc định 75)
- **Sensitivity**: 0.001-0.003
- **Head bob**: Nhẹ khi chạy (sin wave ±0.02)
- **Weapon offset**: Góc dưới phải màn hình

### Top-Down / Isometric 3D
```
        🎥
         |
    [Game World]
```
- **Orthographic camera** cho chiến thuật
- **Perspective** cho 3D thật
- Góc 45-60 độ cho strategy

## 2. Level Design 3D

### Environment Layout
```
[Player Spawn] → [Corridor] → [Open Area] → [Boss Arena]
      ↑                            ↑              ↑
  Tutorial zone              Combat zone     Challenge zone
```

### Modular pieces
```
Tạo level từ các module ghép lại:
├── Floor (4×4, 8×8, 16×16)
├── Wall (4×2, 8×2, 4×4)
├── Corner
├── Doorway
├── Window
├── Stair (up/down)
└── Pillar
```

### Height map cho terrain
```typescript
// Tạo terrain từ height map
function createTerrain(width: number, depth: number, heightData: number[][]) {
  const geometry = new THREE.PlaneGeometry(width, depth, heightData[0].length - 1, heightData.length - 1);
  const vertices = geometry.attributes.position.array;

  for (let z = 0; z < heightData.length; z++) {
    for (let x = 0; x < heightData[0].length; x++) {
      const idx = (z * heightData[0].length + x) * 3;
      vertices[idx + 2] = heightData[z][x]; // Z = up trong Three.js PlaneGeometry
    }
  }

  geometry.computeVertexNormals();
  return geometry;
}
```

## 3. Lighting Design

### Time of day system
```typescript
interface TimeOfDay {
  sunColor: THREE.Color;
  ambientColor: THREE.Color;
  fogColor: THREE.Color;
  shadowIntensity: number;
}

const TIMES = {
  dawn: {
    sunColor: new THREE.Color(0xFF6B35),
    ambientColor: new THREE.Color(0x404060),
    fogColor: new THREE.Color(0xCC8844),
    shadowIntensity: 0.8,
  },
  noon: {
    sunColor: new THREE.Color(0xFFFFFF),
    ambientColor: new THREE.Color(0x406040),
    fogColor: new THREE.Color(0x87CEEB),
    shadowIntensity: 1.0,
  },
  dusk: {
    sunColor: new THREE.Color(0xFF4444),
    ambientColor: new THREE.Color(0x402040),
    fogColor: new THREE.Color(0x884466),
    shadowIntensity: 0.7,
  },
  night: {
    sunColor: new THREE.Color(0x112244),
    ambientColor: new THREE.Color(0x101020),
    fogColor: new THREE.Color(0x000011),
    shadowIntensity: 0.3,
  },
};
```

### Lighting mood guide
| Mood | Setup | Use case |
|------|-------|----------|
| Sáng, vui | Sun cao, ambient 0.5, bóng mềm | Outdoor, platformer |
| Tối, horror | Sun thấp, ambient 0.1, fog dày | Horror, dungeon |
| Ấm cúng | Point light vàng, ambient 0.3 | Indoor, hub |
| Neon | Multiple point lights màu, ambient 0.2 | Cyberpunk, sci-fi |
| Huyền ảo | Hemisphere + rim light | Fantasy, magical |

## 4. UI trong không gian 3D

### World-space UI (billboard)
```typescript
// Health bar trên đầu enemy
function createBillboard(element: HTMLElement, target: THREE.Object3D, camera: THREE.Camera) {
  // Project 3D position → screen coordinates
  const vector = target.position.clone().add(new THREE.Vector3(0, 2, 0));
  vector.project(camera);

  const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

  element.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
  element.style.display = vector.z < 1 ? "block" : "none";
}

// Crosshair (screen-space)
function drawCrosshair(ctx: CanvasRenderingContext2D) {
  const cx = ctx.canvas.width / 2;
  const cy = ctx.canvas.height / 2;
  const size = 10;
  const gap = 4;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - size, cy); ctx.lineTo(cx - gap, cy);
  ctx.moveTo(cx + gap, cy); ctx.lineTo(cx + size, cy);
  ctx.moveTo(cx, cy - size); ctx.lineTo(cx, cy - gap);
  ctx.moveTo(cx, cy + gap); ctx.lineTo(cx, cy + size);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
  ctx.fill();
}
```

## 5. Sound Design cho 3D

### Positional audio
```typescript
// Web Audio API với positional tracking
class PositionalAudio3D {
  private ctx: AudioContext;
  private listener: AudioListener;

  constructor() {
    this.ctx = new AudioContext();
    this.listener = this.ctx.listener;
  }

  updateListener(camera: THREE.PerspectiveCamera) {
    const pos = camera.position;
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    this.listener.positionX.value = pos.x;
    this.listener.positionY.value = pos.y;
    this.listener.positionZ.value = pos.z;
    this.listener.forwardX.value = dir.x;
    this.listener.forwardY.value = dir.y;
    this.listener.forwardZ.value = dir.z;
  }

  playAt(url: string, position: THREE.Vector3, volume: number = 1) {
    const panner = this.ctx.createPanner();
    panner.positionX.value = position.x;
    panner.positionY.value = position.y;
    panner.positionZ.value = position.z;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.distanceModel = "inverse";
    panner.refDistance = 10;
    panner.maxDistance = 100;

    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    gain.gain.value = volume;

    source.connect(panner).connect(gain).connect(this.ctx.destination);
    // Load audio buffer...
  }
}
```

## 6. Performance Targets (WebGL)

| Target | Desktop | Mobile |
|--------|---------|--------|
| FPS | 60 | 30+ |
| Draw calls | < 500 | < 200 |
| Triangles | < 200K | < 50K |
| Textures | < 2048×2048 | < 1024×1024 |
| Lights | < 4 dynamic | < 2 dynamic |
| Shadows | 2048 map | 1024 map |

### Optimization tips
- **Instancing**: Dùng `InstancedMesh` cho nhiều object giống nhau (cây, đá)
- **Texture atlas**: Gộp nhiều texture nhỏ vào 1 atlas
- **Compression**: Dùng Draco compressed geometry
- **LOD**: 3 levels, fade ở 20 và 50 units
- **Occlusion culling**: Không render object bị che khuất

## 7. Testing Checklist

- [ ] FPS ổn định trên target device
- [ ] Camera không xuyên tường / floor
- [ ] Collision detection chính xác
- [ ] Lighting + shadows đẹp
- [ ] Audio 3D hoạt động (trái/phải, xa/gần)
- [ ] UI billboard luôn hướng về camera
- [ ] Resize mượt
- [ ] Touch controls (joystick ảo) cho mobile

### Tham khảo
- Implementation: `game-h5-3d.md`
- Main game skill: `games/SKILL.md`
