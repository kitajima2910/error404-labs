/**
 * Audio System
 */
const AudioSys = {
    init: function () {
        if (!STATE.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext
            STATE.audioCtx = new AudioContext()
        }
        if (STATE.audioCtx.state === 'suspended') STATE.audioCtx.resume()
        if (!STATE.bgmBuffer) this.loadBGM()
    },
    playPew: function () {
        if (!STATE.audioCtx) return
        const ctx = STATE.audioCtx,
            t = ctx.currentTime
        const osc = ctx.createOscillator(),
            gain = ctx.createGain()
        osc.type = 'square'
        osc.frequency.setValueAtTime(300, t)
        osc.frequency.exponentialRampToValueAtTime(0.01, t + 0.1)
        gain.gain.setValueAtTime(0.1, t)
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(t)
        osc.stop(t + 0.1)
    },
    playHitReal: function () {
        if (!STATE.audioCtx) return
        const ctx = STATE.audioCtx,
            t = ctx.currentTime
        const osc = ctx.createOscillator(),
            gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(600, t)
        osc.frequency.linearRampToValueAtTime(1200, t + 0.1)
        gain.gain.setValueAtTime(0.15, t)
        gain.gain.linearRampToValueAtTime(0, t + 0.2)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(t)
        osc.stop(t + 0.2)
    },
    playHitDecoy: function () {
        if (!STATE.audioCtx) return
        const ctx = STATE.audioCtx,
            t = ctx.currentTime
        const osc = ctx.createOscillator(),
            gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(150, t)
        osc.frequency.linearRampToValueAtTime(40, t + 0.4)
        gain.gain.setValueAtTime(0.2, t)
        gain.gain.linearRampToValueAtTime(0, t + 0.4)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(t)
        osc.stop(t + 0.4)
    },
    playEmpty: function () {
        if (!STATE.audioCtx) return
        const ctx = STATE.audioCtx,
            t = ctx.currentTime
        const osc = ctx.createOscillator(),
            gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(800, t)
        gain.gain.setValueAtTime(0.05, t)
        gain.gain.linearRampToValueAtTime(0, t + 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(t)
        osc.stop(t + 0.05)
    },
    loadBGM: function () {
        if (!STATE.audioCtx) return
        fetch('nhac/nhac-nen.mp3')
            .then((r) => r.arrayBuffer())
            .then((b) => STATE.audioCtx.decodeAudioData(b))
            .then((buffer) => {
                STATE.bgmBuffer = buffer
                // Nếu đã đang chơi thì thử phát ngay
                if (STATE.phase === 'PLAYING') this.startBGM()
            })
    },
    startBGM: function () {
        if (!STATE.bgmBuffer || !STATE.audioCtx || STATE.bgmSource) return
        const ctx = STATE.audioCtx
        const source = ctx.createBufferSource()
        source.buffer = STATE.bgmBuffer
        source.loop = true
        const gain = ctx.createGain()
        gain.gain.value = 0.3
        source.connect(gain)
        gain.connect(ctx.destination)
        source.start(0)
        STATE.bgmSource = source
    },
    stopBGM: function () {
        if (STATE.bgmSource) {
            try {
                STATE.bgmSource.stop()
            } catch (e) {}
            STATE.bgmSource = null
        }
    },
    updateBGM: function () {
        // Đã thay thế bằng MP3 loop
    },
}
