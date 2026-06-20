# 🟦 Game H5 2D — Implementation

## Tổng quan
Skill phát triển game 2D HTML5 sử dụng **Phaser 3** (ưu tiên) hoặc Canvas API thuần. Phù hợp cho: platformer, top-down RPG, shoot 'em up, puzzle, card game.

> **Bước 0: Download assets** — Chạy script ở `skills/games-assets/SKILL.md` trước. Dùng asset thật từ Kenney/OpenGameArt, fallback procedural nếu không có mạng.

## Setup Phaser 3

```bash
npm init -y
npm install phaser
npm install -D vite
```

```typescript
// main.ts
import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    touch: true,
    keyboard: true,
  },
};

const game = new Phaser.Game(config);
```

## Scenes

```typescript
// BootScene — load assets với progress bar
export class BootScene extends Phaser.Scene {
  constructor() { super("BootScene"); }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const bar = this.add.rectangle(width / 2, height / 2, 0, 20, 0x00ff00);

    this.load.on("progress", (value: number) => {
      bar.width = width * 0.6 * value;
    });

    // === Auto-detect assets: thử load asset thật, fallback procedural ===
    const ASSETS = [
      { key: "player",     path: "assets/player.png",          fallback: this.generateSprite("#2196F3") },
      { key: "enemy",      path: "assets/enemy.png",           fallback: this.generateSprite("#FF0000") },
      { key: "bullet",     path: "assets/bullet.png",          fallback: this.generateSprite("#FFFF00", 8) },
      { key: "tiles",      path: "assets/tiles.png",           fallback: null },
      { key: "player_sheet", path: "assets/player_sheet.png",  fallback: null },
    ];

    for (const asset of ASSETS) {
      if (asset.fallback) {
        // Luôn load fallback để không crash nếu asset thật không có
        this.textures.addCanvas(asset.key, asset.fallback);
      }
      try {
        this.load.image(asset.key, asset.path);
      } catch { /* fallback đã có */ }
    }

    // Sprite sheets (animation frames)
    this.load.spritesheet("player_sheet", "assets/player_sheet.png", {
      frameWidth: 32, frameHeight: 32,
    });

    // Animations — tự tạo nếu sheet không load được
    this.load.on("complete", () => {
      if (!this.anims.exists("player_idle")) {
        this.anims.create({ key: "player_idle",  frames: [{ key: "player_sheet", frame: 0 }], frameRate: 4, repeat: -1 });
        this.anims.create({ key: "player_run",   frames: this.anims.generateFrameNumbers("player_sheet", { start: 4, end: 9 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: "player_jump",  frames: this.anims.generateFrameNumbers("player_sheet", { start: 10, end: 12 }), frameRate: 8, repeat: 0 });
        this.anims.create({ key: "player_attack",frames: this.anims.generateFrameNumbers("player_sheet", { start: 13, end: 17 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: "player_hurt",  frames: this.anims.generateFrameNumbers("player_sheet", { start: 18, end: 19 }), frameRate: 4, repeat: 0 });
        this.anims.create({ key: "player_die",   frames: this.anims.generateFrameNumbers("player_sheet", { start: 20, end: 23 }), frameRate: 6, repeat: 0 });
      }
    });

    this.load.audio("shoot", "assets/shoot.mp3");
    this.load.audio("bgm", "assets/bgm.mp3");
  }

  create() {
    this.scene.start("MenuScene");
  }

  // Procedural fallback — tự vẽ sprite nếu không có file
  private generateSprite(color: string, size = 32): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#fff";
    ctx.font = `${size * 0.5}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", size / 2, size / 2);
    return canvas;
  }
}

// MenuScene
export class MenuScene extends Phaser.Scene {
  constructor() { super("MenuScene"); }

  create() {
    const { width, height } = this.cameras.main;

    this.add.text(width / 2, height / 3, "TÊN GAME", {
      fontSize: "48px",
      color: "#ffffff",
    }).setOrigin(0.5);

    const playBtn = this.add.text(width / 2, height / 2, "▶ CHƠI", {
      fontSize: "32px",
      color: "#00ff00",
    }).setOrigin(0.5).setInteractive();

    playBtn.on("pointerover", () => playBtn.setColor("#ffff00"));
    playBtn.on("pointerout", () => playBtn.setColor("#00ff00"));
    playBtn.on("pointerdown", () => this.scene.start("GameScene"));
  }
}
```

## Entity State Machine (dùng chung player + enemy)

```typescript
// States: idle, run, jump, attack, hurt, die
type State = "idle" | "run" | "jump" | "attack" | "hurt" | "die";

class EntityStateMachine {
  private current: State = "idle";
  private timer = 0;
  private durations: Record<State, number> = {
    idle: 0, run: 0, jump: 500, attack: 400, hurt: 300, die: 600,
  };

  get state() { return this.current; }

  set(next: State) {
    if (this.current === "die") return;
    const valid: Record<State, State[]> = {
      idle:   ["run","jump","attack","hurt","die"],
      run:    ["idle","jump","attack","hurt","die"],
      jump:   ["idle","hurt","die"],
      attack: ["idle","hurt","die"],
      hurt:   ["idle","die"],
      die:    [],
    };
    if (!valid[this.current].includes(next)) return;
    this.current = next;
    this.timer = 0;
  }

  update(dt: number) {
    if (this.current === "die") return;
    this.timer += dt * 1000;
    const d = this.durations[this.current];
    if (d > 0 && this.timer >= d) this.set("idle");
  }
}
```

## Player (FSM + animations)

```typescript
export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private fsm = new EntityStateMachine();
  private speed = 200;
  private health = 100;
  private attackKey!: Phaser.Input.Keyboard.Key;
  private invincible = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player_sheet");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.attackKey = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update(_time: number, delta: number) {
    this.fsm.update(delta / 1000);

    if (!this.fsm.state) this.setVelocity(0, 0);

    if (this.fsm.state === "idle" || this.fsm.state === "run") {
      // Movement
      const vx = (this.cursors.right.isDown ? 1 : 0) - (this.cursors.left.isDown ? 1 : 0);
      const vy = this.cursors.up.isDown && this.body!.blocked.down ? -300 : this.body!.velocity.y;
      this.setVelocityX(vx * this.speed);
      if (vx !== 0) this.setFlipX(vx < 0);

      // State
      if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
        this.fsm.set("attack");
        this.scene.events.emit("player-attack");
      } else if (!this.body!.blocked.down) {
        this.fsm.set("jump");
      } else if (Math.abs(this.body!.velocity.x) > 10) {
        this.fsm.set("run");
      } else {
        this.fsm.set("idle");
      }
    }

    // Animation
    const animMap: Record<string, string> = {
      idle: "player_idle", run: "player_run", jump: "player_jump",
      attack: "player_attack", hurt: "player_hurt", die: "player_die",
    };
    this.play(animMap[this.fsm.state], true);
  }

  takeDamage(amount: number) {
    if (this.invincible || this.fsm.state === "die") return;
    this.health -= amount;
    this.fsm.set("hurt");
    this.invincible = true;
    this.scene.time.delayedCall(500, () => { this.invincible = false; });

    if (this.health <= 0) {
      this.fsm.set("die");
      this.scene.time.delayedCall(600, () => {
        this.scene.events.emit("player-died");
      });
    }
  }
}
```

## Enemy (FSM + patrol/chase)

```typescript
type EnemyAI = "idle" | "patrol" | "chase" | "attack" | "hurt" | "die";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private fsm = new EntityStateMachine();
  private speed = 80;
  private health = 2;
  private patrolDir = 1;
  private startX: number;
  private playerRef: Player | null = null;
  private detectionRange = 200;

  constructor(scene: Phaser.Scene, x: number, y: number, player?: Player) {
    super(scene, x, y, "enemy");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.startX = x;
    this.setCollideWorldBounds(true);
    this.playerRef = player ?? null;
  }

  update(_time: number, delta: number) {
    this.fsm.update(delta / 1000);
    if (this.fsm.state === "die") return;

    // Detect player
    const dist = this.playerRef
      ? Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y)
      : Infinity;

    if (dist < this.detectionRange && this.fsm.state === "patrol") {
      this.fsm.set("chase");
    } else if (dist >= this.detectionRange && this.fsm.state === "chase") {
      this.fsm.set("patrol");
    }

    // Behavior per state
    if (this.fsm.state === "patrol") {
      this.setVelocityX(this.speed * this.patrolDir);
      if (this.x >= this.startX + 100) { this.patrolDir = -1; this.setFlipX(true); }
      else if (this.x <= this.startX - 100) { this.patrolDir = 1; this.setFlipX(false); }
    } else if (this.fsm.state === "chase" && this.playerRef) {
      const dir = this.playerRef.x > this.x ? 1 : -1;
      this.setVelocityX(this.speed * 1.5 * dir);
      this.setFlipX(dir < 0);
    } else {
      this.setVelocityX(0);
    }

    // Animation
    this.play(`enemy_${this.fsm.state}`, true);
  }

  takeDamage() {
    if (this.fsm.state === "die") return;
    this.health--;
    this.fsm.set("hurt");
    this.setTint(0xff0000);
    this.scene.time.delayedCall(100, () => this.clearTint());

    if (this.health <= 0) {
      this.fsm.set("die");
      this.scene.time.delayedCall(600, () => {
        this.scene.events.emit("enemy-killed", this);
        this.destroy();
      });
    }
  }
}
```

## Collision & Physics (GameScene)

```typescript
export class GameScene extends Phaser.Scene {
  private player!: Player;
  private enemies!: Phaser.Physics.Arcade.Group;
  private bullets!: Phaser.Physics.Arcade.Group;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private healthBar!: HealthBar;

  constructor() { super("GameScene"); }

  create() {
    // Player
    this.player = new Player(this, 400, 300);

    // Enemies (runChildUpdate = true để tự động gọi update enemy)
    this.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true,
    });

    // Bullet pool
    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 30,
    });

    // Platform / ground
    const platforms = this.physics.add.staticGroup();
    platforms.add(this.add.rectangle(400, 568, 800, 64, 0x666666));
    platforms.add(this.add.rectangle(200, 450, 200, 16, 0x666666));
    platforms.add(this.add.rectangle(600, 350, 200, 16, 0x666666));

    // Collisions
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.enemies, platforms);
    this.physics.add.overlap(this.bullets, this.enemies, this.onBulletHitEnemy, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.onPlayerHitEnemy, undefined, this);

    // Spawn enemies
    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => this.spawnEnemy(),
    });

    // UI
    this.scoreText = this.add.text(16, 16, "Điểm: 0", {
      fontSize: "24px", color: "#ffffff",
    });
    this.healthBar = new HealthBar(this, 16, 48, 200, 20, 100);

    // Input
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this.player.active) this.fireBullet(pointer.x, pointer.y);
    });

    // Player-died → restart
    this.events.on("player-died", () => {
      this.time.delayedCall(1000, () => this.scene.restart());
    });
  }

  update(_time: number, delta: number) {
    this.player.update(_time, delta);
    this.healthBar.setHealth(this.player["health"]);

    // Clean off-screen bullets
    this.bullets.getChildren().forEach((b) => {
      const bullet = b as Phaser.Physics.Arcade.Sprite;
      if (bullet.active && (
        bullet.y < -20 || bullet.y > 620 ||
        bullet.x < -20 || bullet.x > 820
      )) {
        bullet.setActive(false).setVisible(false);
        bullet.body!.enable = false;
      }
    });
  }

  private fireBullet(targetX: number, targetY: number) {
    const bullet = this.bullets.get(this.player.x, this.player.y) as Phaser.Physics.Arcade.Sprite;
    if (!bullet) return;

    bullet.setActive(true).setVisible(true);
    bullet.body!.enable = true;

    const angle = Phaser.Math.Angle.Between(
      this.player.x, this.player.y, targetX, targetY
    );
    bullet.setVelocity(Math.cos(angle) * 500, Math.sin(angle) * 500);

    this.time.delayedCall(2000, () => {
      bullet.setActive(false).setVisible(false);
      bullet.body!.enable = false;
    });
  }

  private onBulletHitEnemy(bullet: Phaser.Physics.Arcade.Sprite, enemy: Enemy) {
    bullet.setActive(false).setVisible(false);
    bullet.body!.enable = false;
    enemy.takeDamage();

    if (enemy.active === false) {
      this.score += 100;
      this.scoreText.setText(`Điểm: ${this.score}`);
    }
  }

  private onPlayerHitEnemy(_player: Player, _enemy: Enemy) {
    this.player.takeDamage(10);
  }

  private spawnEnemy() {
    const x = Phaser.Math.Between(50, 750);
    const enemy = new Enemy(this, x, 0, this.player);
    this.enemies.add(enemy);
  }
}
```

## UI (HUD)

```typescript
// HealthBar component
export class HealthBar {
  private bar: Phaser.GameObjects.Graphics;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private maxHealth: number;
  private currentHealth: number;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, maxHealth: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.bar = scene.add.graphics();
    this.draw();
  }

  setHealth(health: number) {
    this.currentHealth = Math.max(0, health);
    this.draw();
  }

  private draw() {
    this.bar.clear();

    // Background
    this.bar.fillStyle(0x333333);
    this.bar.fillRect(this.x, this.y, this.width, this.height);

    // Health
    const ratio = this.currentHealth / this.maxHealth;
    const color = ratio > 0.5 ? 0x00ff00 : ratio > 0.25 ? 0xffff00 : 0xff0000;
    this.bar.fillStyle(color);
    this.bar.fillRect(this.x, this.y, this.width * ratio, this.height);

    // Border
    this.bar.lineStyle(2, 0xffffff);
    this.bar.strokeRect(this.x, this.y, this.width, this.height);
  }
}
```

## Audio (Web Audio API + procedural fallback)

```typescript
export class SoundManager {
  private ctx: AudioContext;
  private bgmGain: GainNode;
  private sfxGain: GainNode;
  private bgmBuffer: AudioBuffer | null = null;
  private bgmSource: AudioBufferSourceNode | null = null;
  private sounds = new Map<string, AudioBuffer>();
  private loaded = false;

  constructor() {
    this.ctx = new AudioContext();
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.3;
    this.bgmGain.connect(this.ctx.destination);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.5;
    this.sfxGain.connect(this.ctx.destination);
  }

  async loadAll() {
    if (this.loaded) return;
    this.loaded = true;

    // Thử load từ file, fallback procedural
    const sfxKeys = ["shoot", "explosion", "jump", "collect", "hurt", "die"];
    for (const key of sfxKeys) {
      try {
        const res = await fetch(`assets/audio/${key}.mp3`);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          this.sounds.set(key, await this.ctx.decodeAudioData(buf));
          continue;
        }
      } catch { /* fallback */ }
      // Procedural fallback
      this.sounds.set(key, this.generateSFX(key));
    }

    // BGM
    try {
      const res = await fetch("assets/audio/bgm.mp3");
      if (res.ok) {
        const buf = await res.arrayBuffer();
        this.bgmBuffer = await this.ctx.decodeAudioData(buf);
      }
    } catch { /* fallback */ }
    if (!this.bgmBuffer) this.bgmBuffer = this.generateBGM();
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

  // Procedural SFX generation (Web Audio API)
  private generateSFX(type: string): AudioBuffer {
    const sr = this.ctx.sampleRate;
    const dur = 0.3;
    const len = sr * dur;
    const buf = this.ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);

    switch (type) {
      case "shoot":
        for (let i = 0; i < len; i++) {
          const t = i / sr;
          d[i] = Math.sin(2 * Math.PI * (800 - t * 2000) * t) * Math.max(0, 1 - t / dur) * 0.5;
        }
        break;
      case "explosion": case "hit":
        for (let i = 0; i < len; i++) {
          const t = i / sr;
          d[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - t / dur) * 0.6;
        }
        break;
      case "jump":
        for (let i = 0; i < len; i++) {
          const t = i / sr;
          d[i] = Math.sin(2 * Math.PI * (300 + t * 1500) * t) * Math.max(0, 1 - t / dur) * 0.4;
        }
        break;
      case "collect":
        for (let i = 0; i < len; i++) {
          const t = i / sr;
          d[i] = (Math.sin(2 * Math.PI * 880 * t) * 0.3 + Math.sin(2 * Math.PI * 1320 * t) * 0.2) *
            Math.max(0, 1 - t / dur);
        }
        break;
      case "hurt":
        for (let i = 0; i < len; i++) {
          const t = i / sr;
          d[i] = Math.sin(2 * Math.PI * (200 - t * 500) * t) * Math.max(0, 1 - t / dur) * 0.5;
        }
        break;
      case "die":
        for (let i = 0; i < len * 2; i++) {
          const t = i / sr;
          d[i] = Math.sin(2 * Math.PI * (400 - t * 800) * t) * Math.max(0, 1 - t / (dur * 2)) * 0.5;
        }
        break;
    }
    return buf;
  }

  // Procedural BGM
  private generateBGM(): AudioBuffer {
    const sr = this.ctx.sampleRate;
    const dur = 8;
    const len = sr * dur;
    const buf = this.ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    const notes = [262, 294, 330, 349, 392, 349, 330, 294];
    const noteLen = dur / notes.length;

    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const freq = notes[Math.floor(t / noteLen) % notes.length];
      const phase = (freq * t) % 1;
      d[i] = (phase < 0.5 ? 0.3 : -0.3) *
        Math.min(1, (t % noteLen) * 4) *
        Math.max(0, 1 - (t % noteLen) / noteLen * 0.5);
    }
    return buf;
  }
}

// === Gắn vào GameScene ===
// Trong create():
// const audio = new SoundManager();
// audio.loadAll().then(() => audio.playBGM());
//
// Khi player jump → audio.playSFX("jump")
// Khi player shoot → audio.playSFX("shoot")
// Khi player hurt → audio.playSFX("hurt")
// Khi enemy die → audio.playSFX("die")
// Khi collect item → audio.playSFX("collect")
```

## Optimization cho 2D
- **Sprite sheet**: gộp nhiều frame vào 1 file, dùng `Phaser.Loader.spritesheet`
- **Tilemap**: Dùng tilemap JSON (Tiled editor) thay vì nhiều sprite riêng cho map
- **Atlas**: Dùng texture atlas (TexturePacker) để giảm draw calls
- **Object pool**: Cho đạn, particle, enemy (tránh tạo/destroy liên tục)
- **Disable off-screen**: Tắt update/render cho object ngoài camera

## Build & Deploy

```bash
# Game HTML5 — chạy với live server
npx vite
# Build
npx vite build
# Output trong dist/
```

### Tham khảo
- Assets: `skills/games-assets/SKILL.md`
- Design: `game-design-h5-2d.md`
- Main game skill: `games/SKILL.md`
