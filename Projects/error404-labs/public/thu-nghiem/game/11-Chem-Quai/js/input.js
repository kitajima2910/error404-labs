// INPUT MANAGER
class InputManager {
    constructor() {
        this.keys = {}
        this.buffer = []
        this.bufferTime = 0.15
        this.joystick = { x: 0, y: 0, active: false }
        window.addEventListener('keydown', (e) => {
            const c = e.code
            if (!this.keys[c]) {
                this._registerAction(c)
            }
            this.keys[c] = true
            if (
                [
                    'Space',
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowLeft',
                    'ArrowRight',
                    'KeyW',
                    'KeyA',
                    'KeyS',
                    'KeyD',
                    'KeyJ',
                    'Enter',
                ].includes(c)
            ) {
                e.preventDefault()
            }
        })
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false
        })
        this._setupJoystick()
    }
    _setupJoystick() {
        const joy = document.getElementById('joy-area'),
            base = document.getElementById('joy-base'),
            stick = document.getElementById('joy-stick')
        let touchId = null,
            startX = 0,
            startY = 0
        joy.addEventListener('touchstart', (e) => {
            e.preventDefault()
            const t = e.changedTouches[0]
            touchId = t.identifier
            startX = t.clientX
            startY = t.clientY
            base.style.display = 'block'
            base.style.left = startX - 60 + 'px'
            base.style.top = startY - 60 + 'px'
            stick.style.transform = `translate(0, 0)`
            this.joystick.active = true
        })
        joy.addEventListener('touchmove', (e) => {
            e.preventDefault()
            for (let t of e.changedTouches)
                if (t.identifier === touchId) {
                    let dx = t.clientX - startX,
                        dy = t.clientY - startY,
                        dist = Math.hypot(dx, dy),
                        max = 50
                    if (dist > max) {
                        dx = (dx / dist) * max
                        dy = (dy / dist) * max
                    }
                    stick.style.transform = `translate(${dx}px, ${dy}px)`
                    this.joystick.x = dx / max
                    this.joystick.y = dy / max
                }
        })
        const end = (e) => {
            for (let t of e.changedTouches)
                if (t.identifier === touchId) {
                    touchId = null
                    base.style.display = 'none'
                    this.joystick = { x: 0, y: 0, active: false }
                }
        }
        joy.addEventListener('touchend', end)
        joy.addEventListener('touchcancel', end)
        const bind = (id, code) => {
            const el = document.getElementById(id)
            if (el) {
                el.addEventListener('touchstart', (e) => {
                    e.preventDefault()
                    this._registerAction(code)
                    this.keys[code] = true
                })
                el.addEventListener('touchend', (e) => {
                    e.preventDefault()
                    this.keys[code] = false
                })
            }
        }
        bind('btn-atk', 'KeyJ')
        bind('btn-dash', 'Space')
    }
    _registerAction(c) {
        if (
            [
                'KeyJ',
                'Space',
                'KeyW',
                'ArrowUp',
            ].includes(c)
        )
            this.buffer.push({ code: c, time: performance.now() / 1000 })
    }
    update() {
        const now = performance.now() / 1000
        this.buffer = this.buffer.filter((b) => now - b.time < this.bufferTime)
    }
    consume(c) {
        const i = this.buffer.findIndex((b) => b.code === c)
        if (i !== -1) {
            this.buffer.splice(i, 1)
            return true
        }
        return false
    }
    getAxisX() {
        if (this.joystick.active) return this.joystick.x > 0.3 ? 1 : this.joystick.x < -0.3 ? -1 : 0
        return (
            (this.keys['ArrowRight'] || this.keys['KeyD'] ? 1 : 0) -
            (this.keys['ArrowLeft'] || this.keys['KeyA'] ? 1 : 0)
        )
    }
    getAxisY() {
        if (this.joystick.active) return this.joystick.y > 0.3 ? 1 : this.joystick.y < -0.3 ? -1 : 0
        return (
            (this.keys['ArrowDown'] || this.keys['KeyS'] ? 1 : 0) - (this.keys['ArrowUp'] || this.keys['KeyW'] ? 1 : 0)
        )
    }
}
