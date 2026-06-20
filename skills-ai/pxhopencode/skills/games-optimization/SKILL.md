---
name: games-optimization
description: Performance optimization cho game H5 — object pool, instancing, LOD, GC tuning, profiling. 60 FPS trên mobile.
---

# games-optimization — Performance

## Object Pool (generic, zero GC)

```typescript
class ObjectPool<T> {
  private pool: T[] = [];
  private active = new Set<T>();
  private factory: () => T;
  private reset: (obj: T) => void;

  constructor(factory: () => T, reset: (obj: T) => void, initialSize = 20) {
    this.factory = factory;
    this.reset = reset;
    for (let i = 0; i < initialSize; i++) this.pool.push(factory());
  }

  acquire(): T {
    const obj = this.pool.pop() ?? this.factory();
    this.active.add(obj);
    return obj;
  }

  release(obj: T) {
    if (this.active.delete(obj)) {
      this.reset(obj);
      this.pool.push(obj);
    }
  }

  releaseAll() {
    for (const obj of this.active) {
      this.reset(obj);
      this.pool.push(obj);
    }
    this.active.clear();
  }

  get activeCount(): number { return this.active.size; }
  get poolSize(): number { return this.pool.length; }
}

// Sử dụng: bullet pool
interface Bullet { x: number; y: number; vx: number; vy: number; alive: boolean; }

const bulletPool = new ObjectPool<Bullet>(
  () => ({ x: 0, y: 0, vx: 0, vy: 0, alive: false }),
  (b) => { b.alive = false; },
  100
);
```

## Instancing (Three.js — hàng ngàn object)

```typescript
import * as THREE from "three";

class InstancedMeshes {
  private instances: Map<string, THREE.InstancedMesh> = new Map();
  private tempMatrix = new THREE.Matrix4();
  private tempColor = new THREE.Color();

  create(name: string, geometry: THREE.BufferGeometry, material: THREE.Material, count: number) {
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instances.set(name, mesh);
    return mesh;
  }

  setTransform(name: string, index: number, position: THREE.Vector3, rotation?: THREE.Euler, scale?: THREE.Vector3) {
    const mesh = this.instances.get(name);
    if (!mesh) return;

    this.tempMatrix.identity();
    if (position) this.tempMatrix.setPosition(position);
    if (rotation) this.tempMatrix.makeRotationFromEuler(rotation);
    if (scale) this.tempMatrix.scale(scale);
    mesh.setMatrixAt(index, this.tempMatrix);
  }

  setColor(name: string, index: number, color: THREE.Color) {
    const mesh = this.instances.get(name);
    if (mesh && mesh.instanceColor) {
      mesh.setColorAt(index, color);
    }
  }

  update(name: string) {
    const mesh = this.instances.get(name);
    if (mesh) {
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
  }
}
```

## LOD (Level of Detail)

```typescript
class LODSystem {
  private entries: { mesh: THREE.Mesh; distance: number }[][] = [];
  private camera: THREE.Camera;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
  }

  add(meshes: { mesh: THREE.Mesh; distance: number }[]) {
    this.entries.push(meshes.sort((a, b) => a.distance - b.distance));
  }

  update() {
    for (const levels of this.entries) {
      const dist = this.camera.position.distanceTo(levels[0].mesh.position);
      let shown = false;

      for (const level of levels) {
        if (dist <= level.distance && !shown) {
          level.mesh.visible = true;
          shown = true;
        } else {
          level.mesh.visible = false;
        }
      }

      if (!shown) {
        levels[levels.length - 1].mesh.visible = true;
      }
    }
  }
}
```

## Frustum Culling (manual)

```typescript
class FrustumCuller {
  private frustum = new THREE.Frustum();
  private projScreenMatrix = new THREE.Matrix4();

  update(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera) {
    this.projScreenMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    this.frustum.setFromProjectionMatrix(this.projScreenMatrix);
  }

  isVisible(boundingSphere: { center: THREE.Vector3; radius: number }): boolean {
    return this.frustum.intersectsSphere(boundingSphere);
  }
}
```

## GC Tuning

```typescript
// 1. Tránh tạo object trong game loop
const _vec3 = new THREE.Vector3(); // reuse
const _mat4 = new THREE.Matrix4(); // reuse

function update() {
  _vec3.set(x, y, z); // Không new
  _mat4.identity();
}

// 2. Array pool cho particle
class ArrayPool {
  private arrays: number[][] = [];

  acquire(size: number): number[] {
    for (let i = 0; i < this.arrays.length; i++) {
      if (this.arrays[i].length >= size) {
        const arr = this.arrays.splice(i, 1)[0];
        arr.length = 0;
        return arr;
      }
    }
    return new Array(size);
  }

  release(arr: number[]) {
    arr.length = 0;
    this.arrays.push(arr);
  }
}

// 3. Batch các DOM operation
function batchDOM(updates: (() => void)[]) {
  requestAnimationFrame(() => {
    updates.forEach(fn => fn());
  });
}
```

## Profiling (FPS + Memory)

```typescript
class Profiler {
  private frames = 0;
  private lastTime = performance.now();
  fps = 0;
  private memory: number[] = [];

  update() {
    this.frames++;
    const now = performance.now();
    if (now - this.lastTime >= 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.lastTime = now;
    }

    // Memory tracking (Chrome only)
    const mem = (performance as any).memory;
    if (mem) {
      this.memory.push(mem.usedJSHeapSize);
      if (this.memory.length > 100) this.memory.shift();
    }
  }

  get avgMemory(): number {
    return this.memory.reduce((a, b) => a + b, 0) / this.memory.length;
  }

  getMemoryTrend(): "stable" | "leak" | "dropping" {
    if (this.memory.length < 10) return "stable";
    const first = this.memory[0];
    const last = this.memory[this.memory.length - 1];
    if (last > first * 1.5) return "leak";
    if (last < first * 0.8) return "dropping";
    return "stable";
  }
}
```
