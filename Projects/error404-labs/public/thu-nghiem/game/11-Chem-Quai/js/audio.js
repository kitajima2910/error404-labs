// AUDIO MANAGER
class AudioManager {
    constructor() {
        const AC = window.AudioContext || window.webkitAudioContext
        this.ctx = new AC()
        this.enabled = true
    }
    init() {
        if (this.ctx.state === 'suspended') this.ctx.resume()
    }
    playSynth(type, freq, duration, vol, slide = null) {
        if (!this.enabled) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = type
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        const now = this.ctx.currentTime
        osc.frequency.setValueAtTime(freq, now)
        if (slide) osc.frequency.exponentialRampToValueAtTime(slide, now + duration)
        gain.gain.setValueAtTime(vol, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration)
        osc.start(now)
        osc.stop(now + duration)
    }
    playHit() {
        this.playSynth('square', 150, 0.1, 0.2, 50)
    }
    playCrit() {
        this.playSynth('sawtooth', 300, 0.2, 0.4, 100)
        setTimeout(() => this.playSynth('square', 600, 0.2, 0.3, 200), 50)
    }
    playSwing() {
        this.playSynth('sine', 400, 0.1, 0.1, 200)
    }
    playDash() {
        this.playSynth('triangle', 600, 0.15, 0.2, 300)
    }
    playBuy() {
        this.playSynth('square', 800, 0.1, 0.1, 1200)
    }
    playError() {
        this.playSynth('sawtooth', 100, 0.3, 0.2)
    }
    playJump() {
        this.playSynth('sine', 300, 0.1, 0.1, 500)
    }
    playClick() {
        this.playSynth('sine', 600, 0.05, 0.05, 800)
    }
}
const audio = new AudioManager()
