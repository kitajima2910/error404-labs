/**
 * Game Logic Entities
 */
class Target {
    constructor() {
        this.active = false
        this.dead = false
        this.shotTime = 0
    }
    spawn(type, level) {
        this.active = true
        this.dead = false
        this.type = type
        this.state = 'FLYING'
        this.dir = Math.random() > 0.5 ? 1 : -1
        this.x = this.dir === 1 ? -50 : canvas.width + 50
        this.baseY = canvas.height * 0.15 + Math.random() * (canvas.height * 0.4)
        this.y = this.baseY
        this.time = Math.random() * 100
        this.shotTime = 0
        this.fleeing = false
        let speedMult = 1 + level * 0.12
        if (type === 0) {
            this.vx = (120 + Math.random() * 100) * this.dir * speedMult
            this.vy = 0
        } else {
            this.vx = (100 + Math.random() * 60) * this.dir * speedMult
            this.vy = -40 + Math.random() * 80
        }
    }
    update(dt) {
        this.time += dt
        if (this.dead) {
            this.shotTime += dt
            this.vy = 600
            this.vx *= 0.95
        } else if (this.type === 0 && !this.fleeing && this.state !== 'FALLING') {
            this.y = this.baseY + Math.sin(this.time * 3.5) * 60
        }
        
        if (this.state === 'FALLING') {
            this.vy += 1200 * dt
            this.x += this.vx * 0.3 * dt
        }
        
        this.x += this.vx * dt
        this.y += this.vy * dt
        
        if (!this.dead && this.type === 1) {
            if (this.y > canvas.height - 150) this.vy = -Math.abs(this.vy)
            if (this.y < 50) this.vy = Math.abs(this.vy)
        }
        
        if (this.fleeing && !this.dead && this.state !== 'FALLING') this.vy -= 900 * dt
        
        if (
            (this.dir === 1 && this.x > canvas.width + 100) ||
            (this.dir === -1 && this.x < -100) ||
            this.y > canvas.height + 200 ||
            this.y < -150
        ) {
            this.active = false
            if (this.type === 0 && !this.fleeing && !this.dead && this.state !== 'FALLING') STATE.combo = 1
        }
    }
}

class Particle {
    constructor() {
        this.active = false
    }
    spawn(x, y, isRed, isBlood = false) {
        this.active = true
        this.x = x
        this.y = y
        this.isRed = isRed
        this.isBlood = isBlood
        this.life = 1.0
        if (isBlood) {
            this.vx = 0
            this.vy = 0
            this.rot = 0
            this.vrot = 0
        } else {
            let a = Math.random() * Math.PI * 2,
                s = Math.random() * 400
            this.vx = Math.cos(a) * s
            this.vy = Math.sin(a) * s
            this.rot = Math.random() * Math.PI * 2
            this.vrot = (Math.random() - 0.5) * 10
        }
    }
    update(dt) {
        if (this.isBlood) {
            this.life -= dt * 2.0
        } else {
            this.x += this.vx * dt
            this.y += this.vy * dt
            this.vy += 800 * dt
            this.rot += this.vrot * dt
            this.life -= dt * 1.5
        }
        if (this.life <= 0) this.active = false
    }
}

const targets = Array.from({ length: CONFIG.MAX_TARGETS }, () => new Target())
const particles = Array.from({ length: CONFIG.MAX_PARTICLES }, () => new Particle())

function spawnParticles(x, y, count, isRed, isBlood = false) {
    let spawned = 0
    for (let i = 0; i < particles.length && spawned < count; i++) {
        if (!particles[i].active) {
            particles[i].spawn(x, y, isRed, isBlood)
            spawned++
        }
    }
}

function spawnFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            let fx = Math.random() * canvas.width,
                fy = Math.random() * (canvas.height * 0.5)
            spawnParticles(fx, fy, 40, false)
        }, i * 300)
    }
}
