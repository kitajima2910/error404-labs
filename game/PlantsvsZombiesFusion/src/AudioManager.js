export class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.masterVolume = 0.3;
    this.bgm = null;
    this.bgmPlaying = false;
  }

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch { this.enabled = false; }
    this._createBgm();
  }

  _createBgm() {
    try {
      const audio = new Audio();
      audio.src = new URL('assets/music/backyard-bone-party_M1aEhT44.mp3', window.location.href).href;
      audio.loop = true;
      audio.volume = this.masterVolume * 0.4;
      audio.preload = 'auto';
      this.bgm = audio;
    } catch { this.bgm = null; }
  }

  playBgm() {
    if (!this.bgm || this.bgmPlaying) return;
    this.ensureResumed();
    this.bgm.currentTime = 0;
    this.bgm.play().catch(() => {});
    this.bgmPlaying = true;
  }

  stopBgm() {
    if (!this.bgm) return;
    this.bgm.pause();
    this.bgm.currentTime = 0;
    this.bgmPlaying = false;
  }

  _updateBgmVolume() {
    if (this.bgm) this.bgm.volume = this.masterVolume * 0.4;
  }

  ensureResumed() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    if (this.bgm && this.bgmPlaying && this.bgm.paused) {
      this.bgm.play().catch(() => {});
    }
  }

  _playTone(freq, duration, type = 'square', volume = 1, decay = true) {
    if (!this.enabled || !this.ctx) return;
    this.ensureResumed();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(volume * this.masterVolume, this.ctx.currentTime);
    if (decay) gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  _playNoise(duration, volume = 0.1) {
    if (!this.enabled || !this.ctx) return;
    this.ensureResumed();
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * this.masterVolume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    source.connect(gain);
    gain.connect(this.ctx.destination);
    source.start();
  }

  playPlace() {
    this._playTone(400, 0.08, 'square', 0.15);
    setTimeout(() => this._playTone(600, 0.1, 'square', 0.12), 60);
  }

  playShoot() {
    this._playTone(800, 0.05, 'square', 0.08);
  }

  playHit() {
    this._playNoise(0.08, 0.08);
    this._playTone(200, 0.06, 'sawtooth', 0.06);
  }

  playZombieEat() {
    this._playNoise(0.12, 0.06);
    this._playTone(120, 0.1, 'sawtooth', 0.04);
  }

  playSunCollect() {
    this._playTone(600, 0.06, 'sine', 0.12);
    setTimeout(() => this._playTone(900, 0.08, 'sine', 0.1), 50);
    setTimeout(() => this._playTone(1200, 0.1, 'sine', 0.08), 100);
  }

  playExplosion() {
    this._playNoise(0.3, 0.2);
    this._playTone(80, 0.3, 'sawtooth', 0.15, true);
  }

  playFusion() {
    this._playTone(400, 0.1, 'sine', 0.12);
    setTimeout(() => this._playTone(600, 0.1, 'sine', 0.12), 80);
    setTimeout(() => this._playTone(800, 0.1, 'sine', 0.12), 160);
    setTimeout(() => this._playTone(1000, 0.15, 'sine', 0.15), 240);
  }

  playZombieDie() {
    this._playNoise(0.15, 0.1);
    this._playTone(150, 0.12, 'sawtooth', 0.06);
  }

  playWaveStart() {
    const notes = [400, 500, 600, 800];
    notes.forEach((n, i) => {
      setTimeout(() => this._playTone(n, 0.15, 'square', 0.1), i * 100);
    });
  }

  playGameOver() {
    const notes = [400, 350, 300, 200];
    notes.forEach((n, i) => {
      setTimeout(() => this._playTone(n, 0.3, 'sawtooth', 0.1), i * 200);
    });
  }

  playVictory() {
    const notes = [400, 500, 600, 800, 1000, 1200];
    notes.forEach((n, i) => {
      setTimeout(() => this._playTone(n, 0.2, 'sine', 0.1), i * 120);
    });
  }

  playChomp() {
    this._playNoise(0.1, 0.12);
    this._playTone(100, 0.08, 'sawtooth', 0.08);
  }

  playFreeze() {
    this._playTone(1200, 0.15, 'sine', 0.08);
    setTimeout(() => this._playTone(1800, 0.1, 'sine', 0.06), 100);
    setTimeout(() => this._playTone(800, 0.2, 'sine', 0.05), 200);
  }
}
