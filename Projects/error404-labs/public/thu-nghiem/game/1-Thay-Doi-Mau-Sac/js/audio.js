import { CONFIG } from './config.js';

export class AudioManager {
    constructor() {
        this.ctx = null;
        this.started = false;
        this.melody = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 440.00, 392.00, 349.23, 329.63, 293.66, 392.00];
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.startMusic();
    }

    startMusic() {
        if (this.started) return;
        this.started = true;
        const noteLen = (60 / CONFIG.AUDIO.BPM) * 0.5;
        let step = 0;
        
        const playStep = () => {
            if (window.gameInstance && window.gameInstance.state === 'FAIL') {
                setTimeout(playStep, noteLen * 1000);
                return;
            }

            const now = this.ctx.currentTime;
            
            // Simple Synth
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(this.melody[step % this.melody.length], now);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.04, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + noteLen);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + noteLen);

            // Add simple kick
            if (step % 4 === 0) this.playKick(now);

            step++;
            setTimeout(playStep, noteLen * 1000);
        };

        playStep();
    }

    playKick(time) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(120, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
        gain.gain.setValueAtTime(0.06, time);
        gain.gain.linearRampToValueAtTime(0, time + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.1);
    }

    playSfx(type) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        if (type === 'click') {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(now); osc.stop(now + 0.1);
        } else if (type === 'win') {
            [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
                const o = this.ctx.createOscillator();
                const g = this.ctx.createGain();
                o.frequency.setValueAtTime(f, now + i * 0.1);
                g.gain.setValueAtTime(0.05, now + i * 0.1);
                g.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.1) + 0.2);
                o.connect(g); g.connect(this.ctx.destination);
                o.start(now + i * 0.1); o.stop(now + (i * 0.1) + 0.2);
            });
        } else if (type === 'fail') {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, now);
            osc.frequency.linearRampToValueAtTime(55, now + 0.5);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.5);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(now); osc.stop(now + 0.5);
        }
    }
}
