// PARTICLE SYSTEM
class ParticleSystem {
    constructor() {
        this.particles = []
        this.ghosts = []
    }
    spawn(x, y, color, count, speed = 1, life = 1) {
        if (this.particles.length > 200) return
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2,
                s = Math.random() * 400 * speed
            this.particles.push({
                x,
                y,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s,
                life: (0.2 + Math.random() * 0.3) * life,
                maxLife: 0.5 * life,
                size: Math.random() * 10 + 5,
                color,
            })
        }
    }
    spawnSlash(x, y, dir, size, color) {
        this.particles.push({ type: 'slash', x, y, dir, size, life: 0.2, maxLife: 0.2, color })
        for (let i = 0; i < 8; i++) {
            const a = Math.random() - 0.5 + (dir > 0 ? 0 : Math.PI)
            const s = 400 + Math.random() * 400
            this.particles.push({
                x,
                y,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s,
                life: 0.1 + Math.random() * 0.2,
                maxLife: 0.3,
                size: Math.random() * 4 + 2,
                color,
            })
        }
    }
    spawnSkillVFX(x, y, skillId) {
        this.particles.push({ type: 'skill_vfx', skillId, x, y, life: 0.2, maxLife: 0.2 })
    }
    spawnGhost(entity) {
        this.ghosts.push({
            x: entity.x,
            y: entity.y,
            z: entity.z,
            dir: entity.dir,
            life: 0.85,
            maxLife: 0.85,
            color: entity.color,
            state: entity.state,
            stateTime: entity.stateTime,
        })
    }
    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i]
            p.life -= dt
            if (p.life <= 0) {
                this.particles.splice(i, 1)
                continue
            }
            if (!p.type) {
                p.x += p.vx * dt
                p.y += p.vy * dt
                p.vy += CONFIG.gravity * 0.4 * dt
            }
        }
        for (let i = this.ghosts.length - 1; i >= 0; i--) {
            this.ghosts[i].life -= dt
            if (this.ghosts[i].life <= 0) this.ghosts.splice(i, 1)
        }
    }
    draw(ctx, drawFn) {
        ctx.save()
        for (let g of this.ghosts) {
            const ratio = g.life / (g.maxLife || 0.6)
            ctx.globalAlpha = ratio * 0.7
            
            // Premium blur effect for ghosts if performance allows
            if (window._gameInstance && window._gameInstance.currentFps > 50) {
                ctx.shadowBlur = 10 * ratio
                ctx.shadowColor = g.color
            }
            
            drawFn(ctx, g, true)
        }
        ctx.restore()

        ctx.globalCompositeOperation = 'lighter'
        for (let p of this.particles) {
            const a = Math.max(0, p.life / p.maxLife)
            ctx.fillStyle = p.color
            ctx.globalAlpha = a
            if (p.type === 'slash') {
                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.scale(p.dir, 1)
                const grad = ctx.createLinearGradient(0, 0, p.size, 0)
                grad.addColorStop(0, '#fff')
                grad.addColorStop(0.5, p.color)
                grad.addColorStop(1, 'transparent')
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.moveTo(0, -p.size * 0.4)
                ctx.quadraticCurveTo(p.size * 1.2, 0, 0, p.size * 0.4)
                ctx.lineTo(0, -p.size * 0.4)
                ctx.fill()
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 2 * a
                ctx.stroke()
                ctx.restore()
            } else if (p.type === 'skill_vfx') {
                const frames = SPRITES[p.skillId][0]
                const frameIdx = Math.min(Math.floor((1 - a) * frames.length), frames.length - 1)
                const sprite = frames[frameIdx]
                if (sprite && sprite.complete) {
                    ctx.save()
                    ctx.globalCompositeOperation = 'source-over'
                    ctx.translate(p.x, p.y)
                    const sz = 200
                    ctx.drawImage(sprite, -sz / 2, -sz / 2, sz, sz)
                    ctx.restore()
                }
            } else {
                const s = p.size * a
                ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s)
            }
        }
        ctx.globalAlpha = 1.0
        ctx.globalCompositeOperation = 'source-over'
    }
}
