# 🟥 Game H5 3D — Implementation

## Tổng quan
Skill phát triển game 3D HTML5 sử dụng **Three.js** (ưu tiên) hoặc Babylon.js. Phù hợp cho: FPS, third-person, racing, simulation 3D, open-world.

> **Bước 0: Download assets** — Chạy script ở `skills/games-assets/SKILL.md` trước. Dùng GLB models từ Poly Pizza / Sketchfab / Quaternius, fallback procedural geometry nếu không có mạng.

## Setup Three.js

```bash
npm init -y
npm install three @types/three
npm install -D vite
```

```typescript
// main.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue
scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

const camera = new THREE.PerspectiveCamera(
  75,                               // FOV
  window.innerWidth / window.innerHeight, // Aspect
  0.1,                              // Near
  1000                              // Far
);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Mềm hơn
document.getElementById("app")!.appendChild(renderer.domElement);

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## Lighting

```typescript
// Ambient light — chiếu sáng cơ bản
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Directional light — ánh sáng mặt trời (có shadow)
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(50, 100, 50);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 200;
sunLight.shadow.camera.left = -50;
sunLight.shadow.camera.right = 50;
sunLight.shadow.camera.top = 50;
sunLight.shadow.camera.bottom = -50;
scene.add(sunLight);

// Hemisphere light — ánh sáng bầu trời
const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x362907, 0.3);
scene.add(hemiLight);
```

## Ground / Terrain

```typescript
// Ground plane
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x4CAF50,
  roughness: 0.8,
  metalness: 0.1,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Grid helper
const gridHelper = new THREE.GridHelper(200, 20, 0x444444, 0x222222);
scene.add(gridHelper);
```

## Asset Loader (GLB + fallback)

```typescript
class AssetManager3D {
  private loader = new GLTFLoader();
  private textureLoader = new THREE.TextureLoader();
  private cache = new Map<string, any>();

  async loadModel(key: string, url: string, fallback: () => THREE.Group): Promise<THREE.Group> {
    if (this.cache.has(key)) return this.cache.get(key)!.clone();

    try {
      const gltf = await new Promise<GLTF>((resolve, reject) => {
        this.loader.load(url, resolve, undefined, reject);
      });
      const group = gltf.scene.clone();
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      this.cache.set(key, group);
      return group;
    } catch {
      console.warn(`Failed to load ${url}, using fallback`);
      const fallbackGroup = fallback();
      this.cache.set(key, fallbackGroup);
      return fallbackGroup.clone();
    }
  }
}

// Fallback: capsule + sphere player
function createFallbackPlayer(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.5, 1, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x2196F3 })
  );
  body.position.y = 1;
  body.castShadow = true;
  g.add(body);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xFFCC80 })
  );
  head.position.y = 1.8;
  head.castShadow = true;
  g.add(head);
  return g;
}
```

## Animation Controller (3D)

```typescript
class AnimationController3D {
  private mixer: THREE.AnimationMixer;
  private actions = new Map<string, THREE.AnimationAction>();
  private current: THREE.AnimationAction | null = null;

  // State → animation clip name mapping
  private stateAnimMap: Record<string, string> = {
    idle: "Idle", run: "Running", jump: "Jump",
    attack: "Punch", hurt: "Hurt", die: "Death",
  };

  constructor(model: THREE.Object3D, animations: THREE.AnimationClip[]) {
    this.mixer = new THREE.AnimationMixer(model);
    for (const clip of animations) {
      const action = this.mixer.clipAction(clip);
      this.actions.set(clip.name, action);
    }
  }

  play(state: string, crossFade = 0.2) {
    const clipName = this.stateAnimMap[state] || "Idle";
    const next = this.actions.get(clipName);
    if (!next || next === this.current) return;

    if (this.current) this.current.fadeOut(crossFade);
    next.reset().fadeIn(crossFade).play();
    this.current = next;
  }

  update(delta: number) {
    this.mixer.update(delta);
  }
}
```

## Player (Third-Person + animation)

```typescript
class Player {
  mesh: THREE.Group;
  private fsm = new FSM();
  private anim!: AnimationController3D;
  private speed = 10;
  private direction = new THREE.Vector3();
  private keys = { w: false, a: false, s: false, d: false, space: false };
  private health = 100;

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, assetMgr: AssetManager3D) {
    this.mesh = new THREE.Group();
    this.mesh.position.set(0, 0, 0);
    scene.add(this.mesh);

    // Load model (fallback nếu không có GLB)
    assetMgr.loadModel("player", "assets/player.glb", createFallbackPlayer).then((model) => {
      this.mesh.add(model);
      // Setup animation mixer từ model animations
      model.traverse((child) => {
        if (child instanceof THREE.SkinnedMesh) {
          // Mixamo animations attached
        }
      });
    });

    // Setup keyboard
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyW": this.keys.w = true; break;
        case "KeyA": this.keys.a = true; break;
        case "KeyS": this.keys.s = true; break;
        case "KeyD": this.keys.d = true; break;
        case "Space": this.keys.space = true; break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyW": this.keys.w = false; break;
        case "KeyA": this.keys.a = false; break;
        case "KeyS": this.keys.s = false; break;
        case "KeyD": this.keys.d = false; break;
        case "Space": this.keys.space = false; break;
      }
    });
  }

  update(delta: number, camera: THREE.PerspectiveCamera) {
    this.fsm.update(delta);

    // Movement (only in idle/run states)
    if (this.fsm.state === "idle" || this.fsm.state === "run") {
      this.direction.set(0, 0, 0);
      if (this.keys.w) this.direction.z -= 1;
      if (this.keys.s) this.direction.z += 1;
      if (this.keys.a) this.direction.x -= 1;
      if (this.keys.d) this.direction.x += 1;
      this.direction.normalize();

      const moving = this.direction.length() > 0;
      this.fsm.transition(moving ? "run" : "idle");

      if (moving) {
        this.mesh.position.x += this.direction.x * this.speed * delta;
        this.mesh.position.z += this.direction.z * this.speed * delta;
        this.mesh.lookAt(
          this.mesh.position.x + this.direction.x,
          this.mesh.position.y,
          this.mesh.position.z + this.direction.z
        );
      }
    }

    // Attack
    if (this.keys.space && (this.fsm.state === "idle" || this.fsm.state === "run")) {
      this.fsm.transition("attack");
    }

    // Animation
    this.anim?.update(delta);
    this.anim?.play(this.fsm.state);

    // Third-person camera
    const cameraOffset = new THREE.Vector3(-5, 5, 5);
    const targetPos = this.mesh.position.clone().add(cameraOffset);
    camera.position.lerp(targetPos, 0.1);
    camera.lookAt(this.mesh.position);
  }

  takeDamage(amount: number) {
    if (this.fsm.state === "die" || this.fsm.state === "hurt") return;
    this.health -= amount;
    this.fsm.transition("hurt");
    if (this.health <= 0) this.fsm.transition("die");
  }
}
```

## First-Person Controls

```typescript
class FirstPersonController {
  private pitch = 0;
  private yaw = 0;
  private speed = 8;
  private sensitivity = 0.002;
  private isLocked = false;

  constructor(
    private camera: THREE.PerspectiveCamera,
    private domElement: HTMLElement
  ) {
    // Pointer lock for FPS
    this.domElement.addEventListener("click", () => {
      this.domElement.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
      this.isLocked = document.pointerLockElement === this.domElement;
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.isLocked) return;
      this.yaw -= e.movementX * this.sensitivity;
      this.pitch -= e.movementY * this.sensitivity;
      this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
    });
  }

  update(delta: number) {
    // Apply rotation
    const qx = new THREE.Quaternion();
    const qy = new THREE.Quaternion();
    qx.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.pitch);
    qy.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    this.camera.quaternion.copy(qx.multiply(qy));

    // Movement
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    right.y = 0;
    right.normalize();

    const keys = this.getKeys();
    const velocity = new THREE.Vector3();
    if (keys.w) velocity.add(forward);
    if (keys.s) velocity.sub(forward);
    if (keys.a) velocity.sub(right);
    if (keys.d) velocity.add(right);
    velocity.normalize().multiplyScalar(this.speed * delta);

    this.camera.position.add(velocity);
  }

  private getKeys() {
    return {
      w: this.isKeyDown("KeyW"),
      a: this.isKeyDown("KeyA"),
      s: this.isKeyDown("KeyS"),
      d: this.isKeyDown("KeyD"),
    };
  }

  private isKeyDown(code: string): boolean {
    // Giả sử có InputManager global
    return false; // Implement với keyboard listener
  }
}
```

## Shooting System

```typescript
class ShootingSystem {
  private bullets: THREE.Mesh[] = [];
  private fireRate = 0.1; // seconds
  private lastFire = 0;
  private bulletGeometry: THREE.BufferGeometry;
  private bulletMaterial: THREE.Material;

  constructor(private scene: THREE.Scene, private camera: THREE.PerspectiveCamera) {
    this.bulletGeometry = new THREE.SphereGeometry(0.05, 4, 4);
    this.bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    window.addEventListener("mousedown", () => this.fire());
  }

  fire() {
    const now = performance.now() / 1000;
    if (now - this.lastFire < this.fireRate) return;
    this.lastFire = now;

    const bullet = new THREE.Mesh(this.bulletGeometry, this.bulletMaterial);
    bullet.position.copy(this.camera.position);

    // Direction = camera forward
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(this.camera.quaternion);
    bullet.userData.velocity = direction.multiplyScalar(50);

    this.scene.add(bullet);
    this.bullets.push(bullet);
  }

  update(delta: number) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.position.add(bullet.userData.velocity.clone().multiplyScalar(delta));

      // Remove if too far
      if (bullet.position.length() > 100) {
        this.scene.remove(bullet);
        this.bullets.splice(i, 1);
      }
    }
  }
}
```

## Collision Detection (Raycaster)

```typescript
class CollisionSystem {
  private raycaster = new THREE.Raycaster();
  private meshes: THREE.Mesh[] = [];

  addMesh(mesh: THREE.Mesh) {
    this.meshes.push(mesh);
  }

  raycast(origin: THREE.Vector3, direction: THREE.Vector3, maxDist: number = 1000): THREE.Intersection | null {
    this.raycaster.set(origin, direction.normalize());
    this.raycaster.far = maxDist;
    const intersects = this.raycaster.intersectObjects(this.meshes);
    return intersects[0] || null;
  }

  // Check sphere collision với meshes
  checkSphereCollision(position: THREE.Vector3, radius: number): THREE.Intersection | null {
    for (const mesh of this.meshes) {
      const dist = position.distanceTo(mesh.position);
      const meshRadius = (mesh.geometry.boundingSphere?.radius ?? 1) * Math.max(
        mesh.scale.x, mesh.scale.y, mesh.scale.z
      );
      if (dist < radius + meshRadius) {
        return { object: mesh, distance: dist, point: position, face: null! };
      }
    }
    return null;
  }
}
```

## Enemy (FSM + chase)

```typescript
class Enemy {
  mesh: THREE.Group;
  private fsm = new FSM();
  private health = 3;
  private speed = 3;
  private detectionRange = 20;

  constructor(scene: THREE.Scene, position: THREE.Vector3, assetMgr: AssetManager3D) {
    this.mesh = new THREE.Group();
    this.mesh.position.copy(position);
    scene.add(this.mesh);

    assetMgr.loadModel("enemy", "assets/enemy.glb", () => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.4, 0.8, 4, 8),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
      );
      body.position.y = 0.6;
      body.castShadow = true;
      g.add(body);
      return g;
    }).then((model) => this.mesh.add(model));
  }

  update(delta: number, playerPos: THREE.Vector3) {
    this.fsm.update(delta);
    if (this.fsm.state === "die") return;

    const dist = this.mesh.position.distanceTo(playerPos);

    if (dist < this.detectionRange && this.fsm.state !== "chase") {
      this.fsm.transition("chase");
    } else if (dist >= this.detectionRange && this.fsm.state !== "patrol") {
      this.fsm.transition("idle");
    }

    if (this.fsm.state === "chase") {
      const dir = new THREE.Vector3().copy(playerPos).sub(this.mesh.position).normalize();
      this.mesh.position.add(dir.multiplyScalar(this.speed * delta));
      this.mesh.lookAt(playerPos);
    }
  }

  takeDamage(): boolean {
    if (this.fsm.state === "die") return false;
    this.health--;
    this.fsm.transition("hurt");
    if (this.health <= 0) {
      this.fsm.transition("die");
      setTimeout(() => {
        this.mesh.parent?.remove(this.mesh);
      }, 600);
      return true;
    }
    return false;
  }
}
```

## Game Loop

```typescript
class Game {
  private player: Player;
  private enemies: Enemy[] = [];
  private shooting: ShootingSystem;
  private clock = new THREE.Clock();

  constructor() {
    this.player = new Player(scene, camera);
    this.shooting = new ShootingSystem(scene, camera);

    // Spawn enemies
    for (let i = 0; i < 5; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        0,
        (Math.random() - 0.5) * 40
      );
      this.enemies.push(new Enemy(scene, pos));
    }

    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();

    this.player.update(delta, camera);
    this.shooting.update(delta);

    this.enemies.forEach(e => e.update(delta, this.player.mesh.position));

    renderer.render(scene, camera);
  }
}
```

## Performance Optimization

```typescript
// 1. Object pooling
const bulletPool: THREE.Mesh[] = [];
function getBullet(): THREE.Mesh {
  return bulletPool.pop() || new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 4, 4),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  );
}
function returnBullet(bullet: THREE.Mesh) {
  scene.remove(bullet);
  bulletPool.push(bullet);
}

// 2. LOD (Level of Detail)
const lod = new THREE.LOD();
lod.addLevel(highPolyMesh, 0);
lod.addLevel(mediumPolyMesh, 20);
lod.addLevel(lowPolyMesh, 50);
scene.add(lod);

// 3. Frustum culling (Three.js tự động)
renderer.frustumCulling = true;

// 4. Merge geometries (static objects)
const merged = BufferGeometryUtils.mergeGeometries([
  rock1.geometry, rock2.geometry, rock3.geometry
]);
const mergedMesh = new THREE.Mesh(merged, rockMaterial);
```

## Audio (dùng chung với 2D)

```typescript
// Copy class SoundManager từ 2D game-h5-2d.md (giống hệt)
// Web Audio API + procedural fallback

// Trong Game:
// const audio = new SoundManager();
// audio.loadAll().then(() => audio.playBGM());
//
// Gắn SFX vào FSM transitions:
// player.fsm.onStateChange = (from, to) => {
//   const sfxMap: Record<string, string> = { jump: "jump", attack: "shoot", hurt: "hurt", die: "die" };
//   if (sfxMap[to]) audio.playSFX(sfxMap[to]);
// };
// enemy.takeDamage() → audio.playSFX("hit")
// enemy.die() → audio.playSFX("die")
```

## Build

```bash
npx vite
# Game HTML5 — chạy với live server
npx vite build
# Output dist/
```

## Tham khảo
- Assets: `skills/games-assets/SKILL.md`
- Design: `game-design-h5-3d.md`
- Main game skill: `games/SKILL.md`
