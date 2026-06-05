import * as THREE from 'three';
import { LEVELS, ENDLESS_WAVES, WAVE_MODIFIERS, MUTATIONS, ELITE_TYPES } from './constants.js';
import { randInt, rand } from './utils/helpers.js';

const MODIFIER_KEYS = Object.keys(WAVE_MODIFIERS);
const MUTATION_KEYS = Object.keys(MUTATIONS);
const ELITE_KEYS = Object.keys(ELITE_TYPES);

export class WaveManager {
  constructor(game) {
    this.game = game;
    this.levels = LEVELS;
    this.currentLevel = 0;
    this.waveInLevel = 0;
    this.totalLevels = LEVELS.length;
    this.state = 'idle';
    this.spawnTimer = 0;
    this.spawnIndex = 0;
    this.spawnQueue = [];
    this.prepTimer = 0;
    this.endlessMode = false;
    this.endlessWaveCount = 0;
    this.waveActive = false;
    this.currentModifier = null;
    this.minibossSpawned = false;

    this.onWaveComplete = null;
  }

  _startCurrentWave() {
    const level = this.levels[this.currentLevel];
    const wave = level.waves[this.waveInLevel];
    this._pickWaveModifier();
    this._buildSpawnQueue(wave);
    this.state = 'spawning';
    this.prepTimer = wave.prepTime || 5;
    this.spawnTimer = 0;
    this.spawnIndex = 0;
    this.waveActive = true;
    this.minibossSpawned = false;
    this._updateUI();
  }

  _pickWaveModifier() {
    const level = this.currentLevel;
    if (level < 2) { this.currentModifier = null; return; }
    const chance = 0.15 + level * 0.04;
    if (Math.random() < chance) {
      this.currentModifier = MODIFIER_KEYS[randInt(0, MODIFIER_KEYS.length - 1)];
    } else {
      this.currentModifier = null;
    }
  }

  _getMutationPool() {
    const level = this.currentLevel;
    if (level < 2) return [];
    if (level < 4) return ['fast', 'armored'];
    if (level < 6) return ['fast', 'armored', 'fire', 'regenerating'];
    return ['fast', 'armored', 'fire', 'icy', 'regenerating', 'explosive'];
  }

  _rollMutations() {
    const pool = this._getMutationPool();
    if (pool.length === 0) return [];
    const mutations = [];
    const level = this.currentLevel;
    const roll = Math.random();
    if (level >= 2 && roll < 0.25) mutations.push(pool[randInt(0, pool.length - 1)]);
    if (level >= 4 && roll < 0.12) {
      const second = pool[randInt(0, pool.length - 1)];
      if (!mutations.includes(second)) mutations.push(second);
    }
    return mutations;
  }

  _rollElite() {
    const level = this.currentLevel;
    if (level < 3) return null;
    const chance = level >= 6 ? 0.12 : 0.06;
    if (Math.random() < chance) {
      const pool = level >= 6 ? ELITE_KEYS : ELITE_KEYS.filter(k => k !== 'miniboss');
      return pool[randInt(0, pool.length - 1)];
    }
    return null;
  }

  _buildSpawnQueue(wave) {
    this.spawnQueue = [];
    const level = this.currentLevel;
    const wm = this.currentModifier ? WAVE_MODIFIERS[this.currentModifier] : null;

    // Adaptive composition: count plants on field
    const plants = this.game.plantManager.plants.filter(p => p.alive);
    let plantStrength = plants.reduce((sum, p) => {
      return sum + (p.config.damage || 0) + (p.config.hp || 80);
    }, 0);
    const avgStrength = (level + 1) * 50;
    const strengthRatio = plantStrength / Math.max(avgStrength, 1);

    const countMul = wm && wm.countMul ? wm.countMul : 1;
    const adaptiveMul = Math.min(1.5, Math.max(0.6, strengthRatio));

    for (const entry of wave.zombies) {
      let count = Math.round(entry.count * countMul * adaptiveMul);
      count = Math.max(1, count);
      for (let i = 0; i < count; i++) {
        const lane = randInt(0, 4);
        const eliteType = this._rollElite();
        const baseType = eliteType ? ELITE_TYPES[eliteType].base : entry.type;
        const mutations = this._rollMutations();
        this.spawnQueue.push({ type: baseType, lane, delay: wave.spawnInterval || 3, mutations, eliteType, isMiniboss: false, waveModifiers: wm || {} });
      }
    }

    // Shuffle
    for (let i = this.spawnQueue.length - 1; i > 0; i--) {
      const j = randInt(0, i);
      [this.spawnQueue[i], this.spawnQueue[j]] = [this.spawnQueue[j], this.spawnQueue[i]];
    }

    // Insert miniboss mid-wave (only level >= 5, 30% chance)
    if (level >= 5 && Math.random() < 0.3 && !this.endlessMode) {
      const midIdx = Math.floor(this.spawnQueue.length / 2);
      const lane = randInt(0, 4);
      this.spawnQueue.splice(midIdx, 0, { type: 'giant', lane, delay: 2, mutations: ['armored', 'fire'], eliteType: null, isMiniboss: true, waveModifiers: wm || {} });
    }

    this.spawnInterval = wm && wm.spawnIntervalMul ? (wave.spawnInterval || 3) * wm.spawnIntervalMul : (wave.spawnInterval || 3);
    this.spawnInterval = Math.max(0.8, this.spawnInterval);
  }

  _notifyModifier() {
    if (!this.currentModifier) return;
    const mod = WAVE_MODIFIERS[this.currentModifier];
    if (mod) {
      this.game.uiManager.showMessage(`🌀 ${mod.name}: ${mod.desc}`, 2.5, mod.color);
    }
  }

  startLevel(levelIdx) {
    this.currentLevel = levelIdx;
    this.waveInLevel = 0;
    this._startCurrentWave();
    this._notifyModifier();
  }

  startNextWave() {
    this.waveInLevel++;
    const level = this.levels[this.currentLevel];
    if (this.waveInLevel >= level.waves.length) return;
    this._startCurrentWave();
    this._notifyModifier();
  }

  update(dt) {
    if (this.state === 'spawning') {
      if (this.prepTimer > 0) {
        this.prepTimer -= dt;
        return;
      }
      this.spawnTimer += dt;
      if (this.spawnIndex < this.spawnQueue.length && this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        const entry = this.spawnQueue[this.spawnIndex];
        const z = this.game.zombieManager.spawn(entry.type, entry.lane, entry.lane, {
          mutations: entry.mutations || [],
          eliteType: entry.eliteType || null,
          isMiniboss: entry.isMiniboss || false,
          waveModifiers: entry.waveModifiers || {},
        });
        if (entry.isMiniboss) {
          this.game.uiManager.showMessage('👹 Mini Trùm xuất hiện!', 2, '#8844ff');
          this.game.sceneManager.shake(0.3, 0.3);
          this.game.sceneManager.flash(0x8844ff, 0.12);
        }
        this.spawnIndex++;

        if (this.spawnIndex >= this.spawnQueue.length) {
          this.state = 'waiting';
        }
      }
    }

    if (this.state === 'waiting') {
      if (this.game.zombieManager.getAliveCount() === 0) {
        this.waveActive = false;
        this.state = 'idle';
        this.currentModifier = null;
        if (this.onWaveComplete) this.onWaveComplete(this.currentLevel, this.waveInLevel);
      }
    }
  }

  _updateUI() {
    const el = document.getElementById('wave-info');
    if (el) {
      if (this.endlessMode) {
        el.textContent = `♾️ Bất Tận - Đợt ${this.endlessWaveCount}`;
      } else {
        const levelNum = this.currentLevel + 1;
        const waveNum = this.waveInLevel + 1;
        let txt = `🏰 Màn ${levelNum} - Đợt ${waveNum}/3`;
        if (this.currentModifier) {
          const mod = WAVE_MODIFIERS[this.currentModifier];
          txt += ` | ${mod.name}`;
        }
        el.textContent = txt;
      }
    }
  }

  startEndless() {
    this.endlessMode = true;
    this.endlessWaveCount = 0;
    this.currentLevel = 9;
    this._nextEndlessWave();
  }

  _nextEndlessWave() {
    const idx = this.endlessWaveCount % ENDLESS_WAVES.length;
    const wave = ENDLESS_WAVES[idx];
    this._pickWaveModifier();
    this._buildSpawnQueue(wave);
    this.state = 'spawning';
    this.prepTimer = wave.prepTime || 4;
    this.waveActive = true;
    this.spawnTimer = 0;
    this.spawnIndex = 0;
    this.minibossSpawned = false;
    this.endlessWaveCount++;
    this._updateUI();
    if (this.currentModifier) {
      const mod = WAVE_MODIFIERS[this.currentModifier];
      if (mod) this.game.uiManager.showMessage(`🌀 ${mod.name}: ${mod.desc}`, 2.5, mod.color);
    }
  }

  reset() {
    this.currentLevel = 0;
    this.waveInLevel = 0;
    this.state = 'idle';
    this.spawnQueue = [];
    this.spawnIndex = 0;
    this.spawnTimer = 0;
    this.waveActive = false;
    this.endlessMode = false;
    this.endlessWaveCount = 0;
    this.currentModifier = null;
    this.minibossSpawned = false;
  }
}
