---
name: games-core
description: Game engine core — fixed-timestep loop, scene manager, asset loader, input handling. Nền tảng cho mọi thể loại game H5.
---

# games-core — Game Engine Core

## Fixed-Timestep Game Loop (không lag, không giật)

```typescript
class GameEngine {
  private lastTime = 0;
  private accumulator = 0;
  private readonly TICK_RATE = 1000 / 60; // 60 FPS
  private running = false;
  private frameId = 0;

  start() {
    this.running = true;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  private loop(now: number) {
    if (!this.running) return;
    this.frameId = requestAnimationFrame(this.loop.bind(this));

    const dt = now - this.lastTime;
    this.lastTime = now;

    // Clamp dt để tránh spiral of death
    this.accumulator += Math.min(dt, 100);

    while (this.accumulator >= this.TICK_RATE) {
      this.fixedUpdate(this.TICK_RATE / 1000);
      this.accumulator -= this.TICK_RATE;
    }

    const alpha = this.accumulator / this.TICK_RATE;
    this.render(alpha);
  }

  protected fixedUpdate(dt: number) {
    // Physics, AI, movement — override
  }

  protected render(alpha: number) {
    // Interpolate + draw — override
  }
}
```

## Scene Manager (zero memory leak)

```typescript
interface Scene {
  name: string;
  init(): void;
  fixedUpdate(dt: number): void;
  render(alpha: number): void;
  destroy(): void;
}

class SceneManager {
  private scenes = new Map<string, Scene>();
  private current: Scene | null = null;
  private next: Scene | null = null;
  private transitioning = false;

  add(scene: Scene) {
    this.scenes.set(scene.name, scene);
  }

  switchTo(name: string) {
    this.next = this.scenes.get(name) ?? null;
    this.transitioning = true;
  }

  update(dt: number, alpha: number) {
    if (this.transitioning) {
      if (this.current) {
        this.current.destroy();
        this.current = null;
      }
      if (this.next) {
        this.next.init();
        this.current = this.next;
        this.next = null;
      }
      this.transitioning = false;
    }
    this.current?.fixedUpdate(dt);
    this.current?.render(alpha);
  }

  destroyAll() {
    for (const scene of this.scenes.values()) {
      scene.destroy();
    }
    this.scenes.clear();
    this.current = null;
  }
}
```

## Asset Loader (parallel + retry)

```typescript
class AssetLoader {
  private cache = new Map<string, any>();
  private loading = new Map<string, Promise<any>>();
  private maxRetries = 2;

  async load<T>(url: string): Promise<T> {
    if (this.cache.has(url)) return this.cache.get(url) as T;

    if (this.loading.has(url)) {
      return this.loading.get(url) as Promise<T>;
    }

    const promise = this.loadWithRetry<T>(url);
    this.loading.set(url, promise);

    try {
      const asset = await promise;
      this.cache.set(url, asset);
      return asset;
    } finally {
      this.loading.delete(url);
    }
  }

  private async loadWithRetry<T>(url: string, attempt = 0): Promise<T> {
    try {
      const ext = url.split(".").pop()?.toLowerCase();
      switch (ext) {
        case "png": case "jpg": case "webp": return this.loadImage(url) as T;
        case "mp3": case "wav": case "ogg": return this.loadAudio(url) as T;
        case "json": return this.loadJSON(url) as T;
        case "glb": return this.loadGLTF(url) as T;
        default: throw new Error(`Unknown asset type: ${ext}`);
      }
    } catch (err) {
      if (attempt < this.maxRetries) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return this.loadWithRetry<T>(url, attempt + 1);
      }
      throw err;
    }
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  private loadAudio(url: string): Promise<AudioBuffer> {
    return fetch(url)
      .then(r => r.arrayBuffer())
      .then(buf => new AudioContext().decodeAudioData(buf));
  }

  private async loadJSON(url: string): Promise<any> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    return res.json();
  }

  private loadGLTF(url: string): Promise<any> {
    // THREE.GLTFLoader
    return import("three/examples/jsm/loaders/GLTFLoader.js").then(m => {
      const loader = new m.GLTFLoader();
      return new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject));
    });
  }

  preload(urls: string[], onProgress?: (pct: number) => void) {
    let done = 0;
    return Promise.all(urls.map(url =>
      this.load(url).then(() => {
        done++;
        onProgress?.(done / urls.length);
      })
    ));
  }
}
```

## Entity State Machine (chống bug state)

```typescript
type EntityState = "idle" | "run" | "jump" | "attack" | "hurt" | "die";

interface StateRule {
  animation: string;
  speed: number;
  canMove: boolean;
  canAttack: boolean;
  duration: number; // ms, 0 = infinite
  transitions: EntityState[];
}

const STATE_RULES: Record<EntityState, StateRule> = {
  idle:   { animation: "idle",   speed: 0,   canMove: true,  canAttack: true,  duration: 0,    transitions: ["run","jump","attack","hurt","die"] },
  run:    { animation: "run",    speed: 200, canMove: true,  canAttack: true,  duration: 0,    transitions: ["idle","jump","attack","hurt","die"] },
  jump:   { animation: "jump",   speed: 200, canMove: true,  canAttack: false, duration: 500,  transitions: ["idle","hurt","die"] },
  attack: { animation: "attack", speed: 0,   canMove: false, canAttack: false, duration: 400,  transitions: ["idle","hurt","die"] },
  hurt:   { animation: "hurt",   speed: 0,   canMove: false, canAttack: false, duration: 300,  transitions: ["idle","die"] },
  die:    { animation: "die",    speed: 0,   canMove: false, canAttack: false, duration: 600,  transitions: [] },
};

class FSM {
  private current: EntityState = "idle";
  private timer = 0;
  private locked = false;

  get state() { return this.current; }

  transition(to: EntityState) {
    if (this.locked) return;
    if (this.current === "die") return;
    const rule = STATE_RULES[this.current];
    if (!rule.transitions.includes(to)) return; // invalid transition
    this.current = to;
    this.timer = 0;
  }

  update(dt: number) {
    if (this.current === "die") return;
    this.timer += dt * 1000;
    const rule = STATE_RULES[this.current];
    if (rule.duration > 0 && this.timer >= rule.duration) {
      this.transition("idle");
    }
  }

  lock(ms: number) {
    this.locked = true;
    setTimeout(() => { this.locked = false; }, ms);
  }
}
```

## Input Manager (unified keyboard + touch)

```typescript
class InputManager {
  keys = new Set<string>();
  justPressed = new Set<string>();
  mouse = { x: 0, y: 0, down: false, justDown: false };
  touches = new Map<number, { x: number; y: number }>();

  constructor() {
    if (typeof window === "undefined") return;

    window.addEventListener("keydown", (e) => {
      if (!this.keys.has(e.code)) this.justPressed.add(e.code);
      this.keys.add(e.code);
    });
    window.addEventListener("keyup", (e) => this.keys.delete(e.code));
    window.addEventListener("blur", () => this.keys.clear());

    window.addEventListener("mousedown", () => {
      this.mouse.justDown = true;
      this.mouse.down = true;
    });
    window.addEventListener("mouseup", () => { this.mouse.down = false; });
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener("touchstart", (e) => {
      for (const t of e.changedTouches) {
        this.touches.set(t.identifier, { x: t.clientX, y: t.clientY });
        this.mouse.down = true;
      }
    });
    window.addEventListener("touchmove", (e) => {
      for (const t of e.changedTouches) {
        this.touches.set(t.identifier, { x: t.clientX, y: t.clientY });
      }
    });
    window.addEventListener("touchend", (e) => {
      for (const t of e.changedTouches) {
        this.touches.delete(t.identifier);
      }
      if (this.touches.size === 0) this.mouse.down = false;
    });
  }

  clearFrame() {
    this.justPressed.clear();
    this.mouse.justDown = false;
  }

  isDown(key: string): boolean { return this.keys.has(key); }
  isPressed(key: string): boolean { return this.justPressed.has(key); }
}
```
