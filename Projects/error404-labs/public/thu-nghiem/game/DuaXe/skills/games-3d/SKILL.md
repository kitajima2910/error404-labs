---
name: games-3d
description: Game 3D với Three.js — lighting, FPS/TPS camera, shooting, enemy AI, LOD, instancing. 60 FPS, draw calls < 200.
---

# games-3d — Game 3D

Xem file chi tiết:
- `game-h5-3d.md` — Implementation (Three.js setup, lighting, FPS/TPS controller, shooting, enemy AI, collision)
- `game-design-h5-3d.md` — Game design (camera systems, modular level design, time-of-day lighting, world-space UI, positional audio)

## Bắt đầu nhanh

```bash
npm install three @types/three
```

```typescript
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById("app")!.appendChild(renderer.domElement);
```

## Mẫu chính (chống lag)
- **InstancedMesh**: Cho hàng ngàn object giống nhau (cây, đá, enemy)
- **LOD**: 3 levels, fade ở 20 và 50 units
- **Frustum culling**: Three.js tự động, bật `renderer.frustumCulling = true`
- **Texture atlas + Draco compression**: Giảm dung lượng texture
- **Shadow map 1024×1024** trên mobile (2048 trên desktop)
- **Reuse Vector3/Matrix4**: Không `new` trong game loop
