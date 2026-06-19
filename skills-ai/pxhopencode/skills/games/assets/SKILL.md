---
name: games-assets
description: Free game assets + auto-download. 2D sprites, 3D models, 2.5D tiles, sounds, fonts. Animation-ready — idle/run/jump/attack/hurt/death states.
---

# games/assets — Free Game Assets & Auto-Download

Skill này cung cấp nguồn assets free hợp pháp và script tự động download, setup animation states cho game 2D/2.5D/3D.

## Free Asset Sources

### 🟦 2D Sprites & Tilesets

| Nguồn | URL | Loại | License |
|-------|-----|------|---------|
| **Kenney** | `https://kenney.nl/assets` | Sprites, UI, tiles, audio | CC0 (public domain) |
| **OpenGameArt** | `https://opengameart.org` | Sprites, tilesets, backgrounds | CC0 / CC-BY / GPL |
| **Itch.io Game Assets** | `https://itch.io/game-assets/free` | Sprites, spritesheets, UI | Miễn phí |
| **Sprite Database** | `https://spritedatabase.net` | Game sprite sheets | Fair use |
| **Lospec Palette** | `https://lospec.com/palette-list` | Color palettes | Miễn phí |

### 🟧 2.5D / Isometric Tiles

| Nguồn | URL | Loại |
|-------|-----|------|
| **Kenney Isometric** | `https://kenney.nl/assets?q=isometric` | Isometric tiles, buildings |
| **OpenGameArt Isometric** | `https://opengameart.org/art-search?keys=isometric` | Tile sets, objects |
| **CrusenDho** | `https://crusen-dho.en.lo4d.com` | Isometric RPG tiles |

### 🟥 3D Models (GLB/GLTF)

| Nguồn | URL | Loại | License |
|-------|-----|------|---------|
| **Sketchfab** | `https://sketchfab.com/3d-models?features=downloadable&sort=-free` | GLTF/GLB models | CC0 / CC-BY |
| **Quaternius** | `https://quaternius.com` | Low-poly characters, vehicles, buildings | CC0 (public domain) |
| **Poly Pizza** | `https://poly.pizza` | Low-poly GLB models | CC0 |
| **Google Poly** | `https://poly.pizza` | GLTF models | CC0 |
| **AmbientCG** | `https://ambientcg.com` | PBR textures | CC0 |
| **Mixamo** | `https://mixamo.com` | 3D character animations (FBX/GLB) | Free (Adobe account) |

### 🔊 Audio & SFX

| Nguồn | URL | Loại | License |
|-------|-----|------|---------|
| **Freesound** | `https://freesound.org` | SFX, ambient, music | CC0 / CC-BY |
| **Kenney Audio** | `https://kenney.nl/assets?q=audio` | SFX, BGM packs | CC0 |
| **Pixabay Music** | `https://pixabay.com/music` | BGM, SFX | Miễn phí |
| **Zapsplat** | `https://zapsplat.com` | SFX, UI sounds | Miễn phí (attribute) |
| **Mixkit** | `https://mixkit.co/free-sound-effects` | SFX, music loops | Miễn phí |
| **OpenGameArt Audio** | `https://opengameart.org/art-search?keys=&field_art_type_tid%5B%5D=13` | SFX, BGM | CC0 / CC-BY |
| **jsfxr** | `https://sfxr.me` | Tạo SFX 8-bit ngay trong browser | — |
| **Chiptone** | `https://sb.bitsnbites.eu` | Tạo SFX chiptune online | — |
| **BFXR** | `https://www.bfxr.net` | Tạo SFX retro (download) | — |
| **MusicGen (Meta)** | `https://huggingface.co/spaces/facebook/MusicGen` | AI sinh nhạc | Research |

### BGM nên dùng

| Thể loại game | Loại nhạc | Nguồn gợi ý |
|--------------|-----------|------------|
| Platformer / Action | Energetic electronic, 8-bit chiptune | Kenney "Platformer Audio", Pixabay "Electronic" |
| RPG / Adventure | Orchestral, ambient, fantasy | Freesound "Fantasy", Mixkit "Cinematic" |
| Puzzle / Casual | Relaxing, lo-fi, acoustic | Pixabay "Lo-fi", Mixkit "Relax" |
| Horror | Dark ambient, drone, suspense | Freesound "Horror", Zapsplat "Dark" |
| Racing / Sports | Rock, EDM, high-tempo | Pixabay "Rock", Mixkit "Sport" |

### 🖌 Fonts

| Nguồn | URL |
|-------|-----|
| **Google Fonts** | `https://fonts.google.com` |
| **Kenney Fonts** | `https://kenney.nl/assets/kenney-fonts` |

---

## Auto-Download Script

Khi vibe code game, agent phải chạy script này để download assets **trước khi code**.

```bash
# assets/download.sh — Chạy đầu phiên vibe code game
$assetType = "2d" # hoặc "3d" hoặc "2.5d"
$gameStyle = "platformer" # platformer, rpg, shooter, puzzle, casual

function Download-Assets {
  param([string]$url, [string]$output)

  $outDir = Split-Path $output -Parent
  if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

  if (Test-Path $output) {
    Write-Output "  ✓ $output (cached)"
    return
  }

  try {
    Invoke-WebRequest -Uri $url -OutFile $output -TimeoutSec 30
    Write-Output "  ✓ Downloaded: $output"
  } catch {
    Write-Warning "  ✗ Failed: $url — $($_.Exception.Message)"
  }
}

# === 2D: Sprite sheets từ Kenney (CC0) ===
if ($assetType -eq "2d") {
  # Character spritesheets — idle, run, jump, attack, hurt, die
  switch ($gameStyle) {
    "platformer" {
      # Player
      Download-Assets "https://kenney.nl/platformer-character" "assets/player.png"
      Download-Assets "https://kenney.nl/platformer-character" "assets/player.json"
      # Enemy
      Download-Assets "https://kenney.nl/platformer-enemies" "assets/enemy.png"
      Download-Assets "https://kenney.nl/platformer-enemies" "assets/enemy.json"
      # Tiles
      Download-Assets "https://kenney.nl/platformer-tiles" "assets/tiles.png"
      Download-Assets "https://kenney.nl/platformer-tiles" "assets/tiles.json"
    }
    "rpg" {
      Download-Assets "https://kenney.nl/rpg-characters" "assets/player.png"
      Download-Assets "https://kenney.nl/rpg-enemies" "assets/enemy.png"
    }
  }

  # Audio theo thể loại game
  switch ($gameStyle) {
    "platformer" {
      Download-Assets "https://kenney.nl/data/audio/platformer-audio.zip" "assets/audio/sfx.zip"
      Download-Assets "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8b3c5c0f8c.mp3" "assets/audio/bgm.mp3"
    }
    "rpg" {
      Download-Assets "https://kenney.nl/data/audio/rpg-audio.zip" "assets/audio/sfx.zip"
      Download-Assets "https://cdn.pixabay.com/download/audio/2022/05/27/audio_8b4f2a5d4c.mp3" "assets/audio/bgm.mp3"
    }
    "shooter" {
      Download-Assets "https://kenney.nl/data/audio/shooter-audio.zip" "assets/audio/sfx.zip"
    }
    default {
      Download-Assets "https://kenney.nl/data/audio/platformer-audio.zip" "assets/audio/sfx.zip"
    }
  }

  # Extract SFX zip
  if (Test-Path "assets/audio/sfx.zip") {
    Expand-Archive -Path "assets/audio/sfx.zip" -DestinationPath "assets/audio/" -Force
    Remove-Item "assets/audio/sfx.zip"
    Write-Output "  ✓ Extracted SFX to assets/audio/"
  }
}

# === 3D: GLB models từ Poly Pizza (CC0) ===
if ($assetType -eq "3d") {
  # Dùng API của Poly Pizza để search và download
  $query = $gameStyle -eq "rpg" ? "character" : "player"
  $apiUrl = "https://api.poly.pizza/v0.1/models?q=$query&limit=1"
  try {
    $response = Invoke-RestMethod -Uri $apiUrl
    $modelUrl = $response.results[0].url
    Download-Assets $modelUrl "assets/player.glb"
  } catch {
    Write-Warning "Poly Pizza API fail, dùng fallback URL"
    Download-Assets "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF/DamagedHelmet.gltf" "assets/player.gltf"
  }
}

# === 2.5D: Isometric tiles từ Kenney ===
if ($assetType -eq "2.5d") {
  Download-Assets "https://kenney.nl/isometric-tiles" "assets/tiles.png"
  Download-Assets "https://kenney.nl/isometric-buildings" "assets/buildings.png"
}

Write-Output "`n✅ Assets downloaded to assets/"
```

> **Fallback khi không internet**: Dùng procedural generation — vẽ shape bằng code, sinh âm thanh bằng Web Audio API.

---

## Animation States Chuẩn

Mọi entity (player, enemy, NPC) phải có các state sau:

### 2D Sprite Sheet Format

```
player.png (spritesheet)
├── idle:    frames 0-3   (đứng yên, hít thở)
├── run:     frames 4-9   (chạy, 6 frame)
├── jump:    frames 10-12 (nhảy lên, trên không, rơi xuống)
├── attack:  frames 13-17 (tấn công, 5 frame)
├── hurt:    frames 18-19 (bị đau, 2 frame)
└── die:     frames 20-23 (chết, 4 frame)
```

```typescript
// Key animation config
const ANIM_CONFIG = {
  player_idle:  { start: 0, end: 3,  speed: 6,  repeat: -1 },
  player_run:   { start: 4, end: 9,  speed: 10, repeat: -1 },
  player_jump:  { start: 10,end: 12, speed: 8,  repeat: 0 },
  player_attack:{ start: 13,end: 17, speed: 12, repeat: 0 },
  player_hurt:  { start: 18,end: 19, speed: 4,  repeat: 0 },
  player_die:   { start: 20,end: 23, speed: 6,  repeat: 0 },
};
```

### 3D Animation States

3D model GLB đã có sẵn animations từ Mixamo / Sketchfab:

| State | Animation Clip | Looping |
|-------|---------------|---------|
| idle | `Idle` | Yes |
| run | `Running` / `Walk` | Yes |
| jump | `Jump` | No |
| attack | `Punch` / `Slash` | No |
| hurt | `Hit` / `Hurt` | No |
| die | `Death` / `Dying` | No |

```typescript
// 3D animation loader
import { AnimationMixer, AnimationAction } from "three";

class AnimationController {
  private mixer: AnimationMixer;
  private actions = new Map<string, AnimationAction>();
  private currentAction: AnimationAction | null = null;

  constructor(model: THREE.Object3D, animations: THREE.AnimationClip[]) {
    this.mixer = new AnimationMixer(model);
    for (const clip of animations) {
      const action = this.mixer.clipAction(clip);
      this.actions.set(clip.name.toLowerCase(), action);
    }
  }

  play(name: string, crossFade = 0.2) {
    const nextAction = this.actions.get(name);
    if (!nextAction || nextAction === this.currentAction) return;

    if (this.currentAction) {
      this.currentAction.fadeOut(crossFade);
    }

    nextAction.reset().fadeIn(crossFade).play();
    this.currentAction = nextAction;
  }

  update(delta: number) {
    this.mixer.update(delta);
  }
}
```

---

## Entity State Machine (không lỗi)

```typescript
// Finite State Machine cho mọi entity
type EntityState = "idle" | "run" | "jump" | "attack" | "hurt" | "die";

interface StateConfig {
  animation: string;
  speed?: number;
  canMove?: boolean;
  canAttack?: boolean;
  duration?: number; // ms, 0 = infinite
  onEnter?: () => void;
  onExit?: () => void;
}

const STATE_MAP: Record<EntityState, StateConfig> = {
  idle:   { animation: "idle",   speed: 0,  canMove: true,  canAttack: true,  duration: 0 },
  run:    { animation: "run",    speed: 1,  canMove: true,  canAttack: true,  duration: 0 },
  jump:   { animation: "jump",   speed: 1,  canMove: true,  canAttack: false, duration: 500 },
  attack: { animation: "attack", speed: 0,  canMove: false, canAttack: false, duration: 400 },
  hurt:   { animation: "hurt",   speed: 0,  canMove: false, canAttack: false, duration: 300 },
  die:    { animation: "die",    speed: 0,  canMove: false, canAttack: false, duration: 600 },
};

class EntityFSM {
  private state: EntityState = "idle";
  private stateTimer = 0;
  private config: StateConfig;
  private onStateChange?: (from: EntityState, to: EntityState) => void;

  constructor(onChange?: (from: EntityState, to: EntityState) => void) {
    this.config = STATE_MAP.idle;
    this.onStateChange = onChange;
  }

  setState(newState: EntityState) {
    if (newState === this.state) return;
    if (this.state === "die") return; // dead can't change

    const prev = this.state;
    this.config.onExit?.();
    this.state = newState;
    this.config = STATE_MAP[newState];
    this.stateTimer = 0;
    this.config.onEnter?.();
    this.onStateChange?.(prev, newState);
  }

  update(dt: number): EntityState {
    if (this.config.duration > 0) {
      this.stateTimer += dt * 1000;
      if (this.stateTimer >= this.config.duration) {
        this.setState("idle");
      }
    }
    return this.state;
  }

  getState() { return this.state; }
  canMove() { return this.config.canMove; }
  canAttack() { return this.config.canAttack; }
  isDead() { return this.state === "die"; }
}
```

---

## Audio Auto-Download + Procedural Generation

### SoundManager hoàn chỉnh (load + fallback)

```typescript
class SoundManager {
  private ctx: AudioContext;
  private bgmGain: GainNode;
  private sfxGain: GainNode;
  private bgmBuffer: AudioBuffer | null = null;
  private bgmSource: AudioBufferSourceNode | null = null;
  private sounds = new Map<string, AudioBuffer>();

  constructor() {
    this.ctx = new AudioContext();
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.3;
    this.bgmGain.connect(this.ctx.destination);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.5;
    this.sfxGain.connect(this.ctx.destination);
  }

  // Load từ file, fallback procedural
  async loadSFX(key: string, url?: string) {
    if (url) {
      try {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        this.sounds.set(key, await this.ctx.decodeAudioData(buf));
        return;
      } catch { /* fallback */ }
    }
    // Procedural fallback
    this.sounds.set(key, this.generateSFX(key));
  }

  async loadBGM(url?: string) {
    if (url) {
      try {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        this.bgmBuffer = await this.ctx.decodeAudioData(buf);
        return;
      } catch { /* fallback */ }
    }
    this.bgmBuffer = this.generateBGM();
  }

  playSFX(key: string) {
    const buf = this.sounds.get(key);
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(this.sfxGain);
    src.start();
  }

  playBGM() {
    if (!this.bgmBuffer || this.bgmSource) return;
    this.bgmSource = this.ctx.createBufferSource();
    this.bgmSource.buffer = this.bgmBuffer;
    this.bgmSource.loop = true;
    this.bgmSource.connect(this.bgmGain);
    this.bgmSource.start();
  }

  stopBGM() {
    this.bgmSource?.stop();
    this.bgmSource = null;
  }

  // === Procedural SFX generation ===
  private generateSFX(type: string): AudioBuffer {
    const sampleRate = this.ctx.sampleRate;
    const duration = 0.3;
    const length = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    switch (type) {
      case "shoot": case "laser":
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          data[i] = Math.sin(2 * Math.PI * (800 - t * 2000) * t) *
            Math.max(0, 1 - t / duration) * 0.5;
        }
        break;
      case "explosion": case "hit":
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          data[i] = (Math.random() * 2 - 1) *
            Math.max(0, 1 - t / duration) * 0.6;
        }
        break;
      case "jump":
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          data[i] = Math.sin(2 * Math.PI * (300 + t * 1500) * t) *
            Math.max(0, 1 - t / duration) * 0.4;
        }
        break;
      case "collect": case "coin":
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          data[i] = (Math.sin(2 * Math.PI * 880 * t) * 0.3 +
            Math.sin(2 * Math.PI * 1320 * t) * 0.2) *
            Math.max(0, 1 - t / duration);
        }
        break;
      case "hurt":
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          data[i] = Math.sin(2 * Math.PI * (200 - t * 500) * t) *
            Math.max(0, 1 - t / duration) * 0.5;
        }
        break;
      case "die":
        for (let i = 0; i < length * 2; i++) {
          const t = i / sampleRate;
          data[i] = Math.sin(2 * Math.PI * (400 - t * 800) * t) *
            Math.max(0, 1 - t / (duration * 2)) * 0.5;
        }
        break;
      default: // noise
        for (let i = 0; i < length; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.3;
        }
    }
    return buffer;
  }

  // === Procedural BGM ===
  private generateBGM(): AudioBuffer {
    const sampleRate = this.ctx.sampleRate;
    const duration = 8; // 8 second loop
    const length = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    // Simple melody loop
    const notes = [262, 294, 330, 349, 392, 349, 330, 294]; // C D E F G F E D
    const noteLen = duration / notes.length;

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const noteIdx = Math.floor(t / noteLen) % notes.length;
      const freq = notes[noteIdx];
      // Square wave + envelope
      const phase = (freq * t) % 1;
      data[i] = (phase < 0.5 ? 0.3 : -0.3) *
        Math.min(1, (t % noteLen) * 4) * // attack
        Math.max(0, 1 - (t % noteLen) / noteLen * 0.5); // release
    }
    return buffer;
  }
}
```

### Gắn SoundManager vào game loop

```typescript
// BootScene / init
const audio = new SoundManager();

// Load SFX
const SFX_LIST = ["shoot", "explosion", "jump", "collect", "hurt", "die", "hit"];
for (const key of SFX_LIST) {
  audio.loadSFX(key, `assets/audio/${key}.mp3`);
}
audio.loadBGM("assets/audio/bgm.mp3");

// Play events
function onShoot() { audio.playSFX("shoot"); }
function onJump() { audio.playSFX("jump"); }
function onHurt() { audio.playSFX("hurt"); }
function onDeath() { audio.playSFX("die"); }
function onCollect() { audio.playSFX("collect"); }

audio.playBGM(); // Start background music
```

### Audio mapping theo Entity State

```typescript
// SFX tự động theo FSM state transition
const SFX_MAP: Record<string, string> = {
  jump:   "jump",
  attack: "shoot",
  hurt:   "hurt",
  die:    "die",
};
// Gọi trong onStateChange: if (SFX_MAP[to]) audio.playSFX(SFX_MAP[to])
```

---

## Xử lý khi không có assets thật

Khi không thể download (mất mạng, URL die), dùng **procedural fallback**:

```typescript
// 2D: Tạo sprite từ canvas
function generatePlaceholderSprite(color: string, size = 32): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(2, 2, size - 4, size - 4);
  return canvas;
}

// 3D: Tạo model từ geometry
function createFallbackPlayer(): THREE.Group {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.5, 1, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x2196F3 })
  );
  body.position.y = 1;
  group.add(body);
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xFFCC80 })
  );
  head.position.y = 1.8;
  group.add(head);
  return group;
}

// Audio: Web Audio API synthesis (no files needed)
// Đã có SoundManager.generateSFX() và generateBGM() ở trên
```
