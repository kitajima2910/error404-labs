import * as THREE from 'three';
import { SceneManager } from './SceneManager.js';
import { GridManager } from './GridManager.js';
import { InputManager } from './InputManager.js';
import { SunManager } from './SunManager.js';
import { PlantManager } from './PlantManager.js';
import { ZombieManager } from './ZombieManager.js';
import { ProjectileManager } from './ProjectileManager.js';
import { WaveManager } from './WaveManager.js';
import { FusionManager } from './FusionManager.js';
import { ParticleManager } from './ParticleManager.js';
import { AudioManager } from './AudioManager.js';
import { UIManager } from './UIManager.js';
import { HazardsManager } from './HazardsManager.js';
import { PlantCollectionManager } from './PlantCollectionManager.js';
import { PLANT_TYPES, STARTING_SUN, CELL_SIZE, GRID_OFFSET_X, GRID_OFFSET_Z, LEVELS, LEVEL_THEMES } from './constants.js';

const PROGRESS_KEY = 'pvz_fusion_progress';

export class Game {
  static getProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { completed: [], highestUnlocked: 0 };
    } catch {
      return { completed: [], highestUnlocked: 0 };
    }
  }

  static resetProgress() {
    localStorage.removeItem(PROGRESS_KEY);
  }

  constructor(container) {
    this.container = container;
    this.running = false;
    this.paused = false;
    this.score = 0;
    this.lives = 3;
    this.time = 0;
    this.currentLevelIndex = 0;
    this._rafId = null;
    this._hitStopTimer = 0;
    this._damagePopups = [];

    this.audio = new AudioManager();
    this.audio.init();
    this.noCooldown = false;

    this.collectionManager = new PlantCollectionManager();
    this.sceneManager = new SceneManager(container);
    this.gridManager = new GridManager();
    this.inputManager = new InputManager(container);
    this.particleManager = new ParticleManager(this.sceneManager.scene);
    this.hazardsManager = new HazardsManager(this.sceneManager.scene, this);
    this.sunManager = new SunManager(this.sceneManager.scene, this.audio);
    this.projectileManager = new ProjectileManager(this.sceneManager.scene, this.particleManager, this.audio, this);
    this.zombieManager = new ZombieManager(this.sceneManager.scene, this.particleManager, this.audio, this);
    this.plantManager = new PlantManager(this.sceneManager.scene, this.gridManager, this.particleManager, this.audio, this);
    this.waveManager = new WaveManager(this);
    this.fusionManager = new FusionManager(this);
    this.uiManager = new UIManager(this);

    this._setupInput();
    this._setupWaveCallbacks();
  }

  _collectRewards(levelIdx) {
    const levelConfig = LEVELS[levelIdx];
    if (levelConfig.rewards) {
      this.collectionManager.addBatch(levelConfig.rewards);
    }
  }

  _saveProgress(levelIdx) {
    const progress = Game.getProgress();
    if (!progress.completed.includes(levelIdx)) {
      progress.completed.push(levelIdx);
    }
    if (levelIdx + 1 > progress.highestUnlocked && levelIdx + 1 < 10) {
      progress.highestUnlocked = levelIdx + 1;
    }
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  _setupInput() {
    this.inputManager.onClick((x, y) => {
      this.audio.ensureResumed();
      if (!this.running || this.paused) return;

      const world = this.sceneManager.screenToWorld(x, y);

      const sunHit = this.sunManager.hitTest(world.x, world.z);
      if (sunHit) {
        this.sunManager.collectSun(sunHit);
        return;
      }

      const grid = this.gridManager.worldToGrid(world.x, world.z);
      if (!grid) return;

      const { row, col } = grid;

      const existingPlant = this.plantManager.getPlantAt(row, col);
      if (existingPlant && existingPlant.alive && existingPlant.config.fuseable) {
        const fusionOptions = this.fusionManager.getFusionOptions(row, col);
        if (fusionOptions.length > 0) {
          this.uiManager.showFusionPanel(x, y, fusionOptions, (opt) => {
            this.fusionManager.performFusion(row, col, opt.neighborRow, opt.neighborCol, opt.recipe);
            this.uiManager.clearSelection();
          });
          return;
        }
      }

      this.uiManager.hideFusionPanel();

      const selected = this.uiManager.getSelectedPlant();
      if (!selected) return;

      if (this.gridManager.isOccupied(row, col)) {
        this.uiManager.showMessage('⛔ Ô đã có cây!', 0.8, '#ff6666');
        return;
      }

      const config = PLANT_TYPES[selected];
      if (!this.sunManager.spend(config.cost)) {
        this.uiManager.showMessage('⛔ Không đủ nắng!', 0.8, '#ff6666');
        return;
      }

      this.plantManager.placePlant(selected, row, col);
      this.uiManager.startCooldown(selected);
      this.uiManager.clearSelection();
      this.sceneManager.clearHighlights();
    });

    this.inputManager.onMouseMove((x, y) => {
      if (!this.running) return;
      this.sceneManager.clearHighlights();
      const world = this.sceneManager.screenToWorld(x, y);
      const grid = this.gridManager.worldToGrid(world.x, world.z);
      if (grid && this.uiManager.getSelectedPlant()) {
        this.sceneManager.highlightCell(grid.row, grid.col, !this.gridManager.isOccupied(grid.row, grid.col));
      }
    });
  }

  _setupWaveCallbacks() {
    this.waveManager.onWaveComplete = (levelIdx, waveIdx) => {
      if (this.waveManager.endlessMode) {
        setTimeout(() => this.waveManager._nextEndlessWave(), 3000);
        this.audio.playWaveStart();
        return;
      }

      if (waveIdx < 2) {
        setTimeout(() => {
          this.waveManager.startNextWave();
          this.audio.playWaveStart();
          this.uiManager.showMessage(`🌊 Đợt ${waveIdx + 2}/3 sắp tới!`, 2, '#ff8844');
        }, 3000);
      } else {
        this._collectRewards(levelIdx);
        this._saveProgress(levelIdx);
        if (levelIdx >= this.waveManager.totalLevels - 1) {
          this.victory();
        } else {
          const rewards = LEVELS[levelIdx].rewards || [];
          const rewardMsg = rewards.length > 0 ? ` 🌱+${rewards.length} cây mới!` : '';
          this.uiManager.showMessage(`✅ Màn ${levelIdx + 1} hoàn thành!${rewardMsg}`, 2.5, '#44ff44');
          setTimeout(() => {
            this.destroy();
            this.waveManager.reset();
            this.uiManager.showLevelSelect();
          }, 2500);
        }
      }
    };
  }

  start(levelIdx = 0, deck = null) {
    this.destroy();
    this.waveManager.reset();
    this.uiManager.clearSelection();
    this.uiManager.hideFusionPanel();

    const levelConfig = LEVELS[levelIdx];
    const theme = LEVEL_THEMES[levelConfig.theme];
    this.sceneManager.setTheme(theme);

    const plantList = deck || levelConfig.availablePlants || Object.keys(PLANT_TYPES).slice(0, 6);
    this.uiManager.rebuildPlantBar(plantList);

    this.currentLevelIndex = levelIdx;
    this.running = true;
    this.audio.playBgm();
    this.time = 0;
    this.score = 0;
    this.lives = 3;
    this.sunManager.setSun(STARTING_SUN);
    this.uiManager.showMessage(`🌱 ${theme.label} - Đặt cây để phòng thủ!`, 2, '#44ff44');

    setTimeout(() => {
      this.waveManager.startLevel(levelIdx);
      this.audio.playWaveStart();
      this.uiManager.showMessage(`🌊 Màn ${levelIdx + 1} - Đợt 1 sắp tới!`, 2, '#ff8844');
    }, 3000);

    this._loop();
  }

  startEndless() {
    this.destroy();
    this.waveManager.reset();
    this.uiManager.clearSelection();
    this.uiManager.hideFusionPanel();
    this.running = true;
    this.audio.playBgm();
    this.waveManager.startEndless();
    this.uiManager.showMessage('♾️ Chế Độ Bất Tận!', 2, '#ffd700');
    this._loop();
  }

  loseLife(count = 1) {
    this.lives -= count;
    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.running = false;
    this.audio.stopBgm();
    this.audio.playGameOver();
    this.uiManager.showGameOver();
  }

  victory() {
    this.running = false;
    this.audio.stopBgm();
    this.audio.playVictory();
    this._saveProgress(this.currentLevelIndex);
    this.uiManager.showVictory(this.currentLevelIndex);
  }

  addScore(amount) {
    this.score += amount;
    const el = document.getElementById('score-amount');
    if (el) el.textContent = this.score;
  }

  cheatAddSun() {
    this.sunManager.addSun(1000);
    this.uiManager.showMessage('☀️ +1000 Nắng', 1, '#ffd700');
  }

  cheatKillAll() {
    [...this.zombieManager.zombies].forEach(z => this.zombieManager.kill(z));
    this.uiManager.showMessage('💀 Đã giết hết zombie', 1, '#ff4444');
  }

  cheatCompleteWave() {
    const wm = this.waveManager;
    wm.prepTimer = 0;
    wm.spawnIndex = wm.spawnQueue.length;
    wm.state = 'waiting';
    [...this.zombieManager.zombies].forEach(z => this.zombieManager.kill(z));
    this.uiManager.showMessage('🏆 Chiến thắng đợt', 1, '#44ff44');
  }

  cheatUnlockAll() {
    const progress = { completed: [0,1,2,3,4,5,6,7,8,9], highestUnlocked: 9 };
    localStorage.setItem('pvz_fusion_progress', JSON.stringify(progress));
    const allPlantIds = Object.keys(PLANT_TYPES);
    const fusionRecipes = this.fusionManager.recipes;
    const fusionIds = fusionRecipes.map(r => r.result);
    const collectible = allPlantIds.filter(id => !fusionIds.includes(id));
    this.collectionManager.addBatch(collectible);
    this.uiManager.showMessage('🔓 Đã mở khoá tất cả màn + cây', 1.5, '#ffd700');
  }

  cheatWarpTo(levelIdx) {
    this.destroy();
    this.waveManager.reset();
    this.start(levelIdx);
  }

  cheatResetFactory() {
    Game.resetProgress();
    this.collectionManager.reset();
    this.audio.stopBgm();
    this.destroy();
    this.waveManager.reset();
    this.noCooldown = false;
    this.uiManager.showMessage('🗑️ Đã reset về ban đầu!', 2, '#ff6666');
    this.uiManager.hideGameOver();
    this.uiManager.hideVictoryScreen();
    this.uiManager.hideLevelSelect();
    this.uiManager.startScreen.style.display = 'flex';
  }

  cheatToggleNoCooldown() {
    this.noCooldown = !this.noCooldown;
    if (this.noCooldown) {
      this.uiManager.plantCards.forEach(c => {
        c.cooldownTimer = 0;
        c.element.classList.remove('disabled');
      });
      this.uiManager.showMessage('⏰ Tắt cooldown cây', 1.5, '#ff8844');
    } else {
      this.uiManager.showMessage('⏰ Bật lại cooldown cây', 1.5, '#88ff88');
    }
  }

  _loop() {
    if (!this.running) return;
    let dt = Math.min(this._deltaTime(), 0.05);

    if (this._hitStopTimer > 0) {
      this._hitStopTimer -= dt;
      dt = 0;
    }

    this.time += dt;

    this.sunManager.update(dt);
    this.zombieManager.update(dt, this.gridManager);
    this.plantManager.update(dt);
    this.projectileManager.update(dt, this.zombieManager);
    this.waveManager.update(dt);
    this.particleManager.update(dt);
    this.hazardsManager.update(dt, this.zombieManager);
    this.uiManager.update(dt);
    this.sceneManager.update(dt);
    this._updateDamagePopups(dt);

    this.sceneManager.render();
    this._rafId = requestAnimationFrame(() => this._loop());
  }

  hitStop(duration = 0.06) {
    this._hitStopTimer = duration;
  }

  spawnDamagePopup(pos, amount, color = '#ffffff') {
    const el = document.createElement('div');
    el.className = 'damage-popup';
    el.textContent = Math.round(amount);
    el.style.cssText = `position:fixed;font-size:${18+Math.min(amount,40)*0.3}px;font-weight:bold;color:${color};text-shadow:0 2px 4px rgba(0,0,0,0.8);pointer-events:none;z-index:50;font-family:'Segoe UI',Arial,sans-serif;`;
    document.body.appendChild(el);
    this._damagePopups.push({ el, x: 0, y: 0, life: 0.8, maxLife: 0.8, pos });
  }

  _updateDamagePopups(dt) {
    const cam = this.sceneManager.camera;
    for (let i = this._damagePopups.length - 1; i >= 0; i--) {
      const p = this._damagePopups[i];
      p.life -= dt;
      if (p.life <= 0) {
        p.el.remove();
        this._damagePopups.splice(i, 1);
        continue;
      }
      const v = p.pos.clone().add(new THREE.Vector3(0, 0.6 + (1 - p.life / p.maxLife) * 1.5, 0));
      v.project(cam);
      const x = (v.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
      p.el.style.left = x + 'px';
      p.el.style.top = y + 'px';
      const t = p.life / p.maxLife;
      p.el.style.opacity = t;
      p.el.style.transform = `translateY(${-(1-t)*30}px)`;
    }
  }

  _deltaTime() {
    const now = performance.now() / 1000;
    if (!this._lastTime) this._lastTime = now;
    const dt = now - this._lastTime;
    this._lastTime = now;
    return dt;
  }

  destroy() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this.running = false;
    this.projectileManager.clear();
    this.zombieManager.clear();
    this.plantManager.clear();
    this.sunManager.clear();
    this.particleManager.clear();
    this.hazardsManager.clear();
  }
}
