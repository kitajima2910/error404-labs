"use strict";

import { clamp } from './constants.js';

export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.windGain = null;
    this.windFilter = null;
    this.rollGain = null;
    this.rollOsc = null;
    this.musicGain = null;
    this.musicLfo = null;
    this.musicVoices = [];
    this.musicLastStep = -1;
    this.ready = false;
  }

  ensure() {
    if (this.ready) {
      return;
    }
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }
    this.ctx = new AudioContextCtor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.3;
    this.master.connect(this.ctx.destination);

    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
    const channel = noiseBuffer.getChannelData(0);
    for (let i = 0; i < channel.length; i += 1) {
      channel[i] = Math.random() * 2 - 1;
    }

    const windSource = this.ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;
    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = "bandpass";
    this.windFilter.frequency.value = 380;
    this.windFilter.Q.value = 0.35;
    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0;
    windSource.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.master);
    windSource.start();

    this.rollOsc = this.ctx.createOscillator();
    this.rollOsc.type = "triangle";
    this.rollOsc.frequency.value = 110;
    const rollFilter = this.ctx.createBiquadFilter();
    rollFilter.type = "lowpass";
    rollFilter.frequency.value = 380;
    this.rollGain = this.ctx.createGain();
    this.rollGain.gain.value = 0;
    this.rollOsc.connect(rollFilter);
    rollFilter.connect(this.rollGain);
    this.rollGain.connect(this.master);
    this.rollOsc.start();

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.0001;
    const musicFilter = this.ctx.createBiquadFilter();
    musicFilter.type = "lowpass";
    musicFilter.frequency.value = 1200;
    this.musicGain.connect(musicFilter);
    musicFilter.connect(this.master);

    this.musicLfo = this.ctx.createOscillator();
    const musicLfoGain = this.ctx.createGain();
    this.musicLfo.type = "sine";
    this.musicLfo.frequency.value = 0.21;
    musicLfoGain.gain.value = 0.012;
    this.musicLfo.connect(musicLfoGain);
    musicLfoGain.connect(this.musicGain.gain);
    this.musicLfo.start();

    const notes = [220, 277.18, 329.63];
    for (let i = 0; i < notes.length; i += 1) {
      const voice = this.ctx.createOscillator();
      const voiceGain = this.ctx.createGain();
      voice.type = i === 0 ? "triangle" : "sine";
      voice.frequency.value = notes[i];
      voiceGain.gain.value = i === 0 ? 0.03 : 0.022;
      voice.connect(voiceGain);
      voiceGain.connect(this.musicGain);
      voice.start();
      this.musicVoices.push({ osc: voice, gain: voiceGain });
    }

    this.ready = true;
  }

  resume() {
    this.ensure();
    if (this.ctx && this.ctx.state !== "running") {
      this.ctx.resume();
    }
  }

  update(currentState) {
    if (!this.ready || !this.ctx || this.ctx.state !== "running") {
      return;
    }
    const now = this.ctx.currentTime;
    const windAmount = currentState.mode === "playing" ? currentState.wind.strength : 0;
    const rollingAmount = currentState.mode === "playing" && currentState.ball.onBoard
      ? clamp(Math.abs(currentState.ball.sVel) / 420, 0, 1) * (0.28 + currentState.ball.danger * 0.72)
      : 0;
    const musicAmount = currentState.mode === "playing" ? 1 : (currentState.mode === "title" ? 0.72 : 0.38);

    this.windGain.gain.cancelScheduledValues(now);
    this.windGain.gain.linearRampToValueAtTime(0.005 + windAmount * 0.06, now + 0.08);
    this.windFilter.frequency.cancelScheduledValues(now);
    this.windFilter.frequency.linearRampToValueAtTime(240 + windAmount * 1200, now + 0.08);

    this.rollGain.gain.cancelScheduledValues(now);
    this.rollGain.gain.linearRampToValueAtTime(rollingAmount * 0.075, now + 0.05);
    this.rollOsc.frequency.cancelScheduledValues(now);
    this.rollOsc.frequency.linearRampToValueAtTime(
      90 + clamp(Math.abs(currentState.ball.sVel), 0, 600) * 0.35 + (currentState.ball.massNorm - 1) * 45,
      now + 0.05
    );

    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.linearRampToValueAtTime(0.04 * musicAmount, now + 0.15);

    const chordStep = Math.floor(currentState.time * 0.5) % 4;
    if (chordStep !== this.musicLastStep && this.musicVoices.length === 3) {
      const chordMap = [
        [220, 277.18, 329.63],
        [196, 246.94, 329.63],
        [174.61, 220, 293.66],
        [196, 246.94, 293.66],
      ];
      this.musicLastStep = chordStep;
      const freqs = chordMap[chordStep];
      for (let i = 0; i < this.musicVoices.length; i += 1) {
        this.musicVoices[i].osc.frequency.cancelScheduledValues(now);
        this.musicVoices[i].osc.frequency.linearRampToValueAtTime(freqs[i], now + 0.45);
      }
    }
  }

  playGameOver() {
    if (!this.ready || !this.ctx) {
      return;
    }
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.64);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.66);
  }
}
