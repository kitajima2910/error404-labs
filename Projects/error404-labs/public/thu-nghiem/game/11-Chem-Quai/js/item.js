// ITEM CLASS
class Item {
    constructor(x, y, type, dir = 0) {
        this.x = x
        this.y = y
        const velocityX = 500 + Math.random() * 300
        this.vx = dir !== 0 ? dir * velocityX : (Math.random() > 0.5 ? 1 : -1) * velocityX
        this.vy = -700 - Math.random() * 400
        this.type = type
        this.w = 35
        this.h = 35
        this.color = type === 'hp' ? '#ff2d2d' : '#ffd700'
        this.collected = false
        this.life = 300.0
        this.collectDelay = 0.6
        this.angle = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 15
    }
    update(dt) {
        this.vy += CONFIG.gravity * 0.8 * dt
        this.x += this.vx * dt
        this.y += this.vy * dt
        this.vx *= 0.99
        this.angle += this.rotSpeed * dt

        const game = window._gameInstance
        let floorY = CONFIG.floorY
        if (game) {
            for (let plat of game.platforms) {
                if (this.vy >= 0 && this.x > plat.x - plat.w / 2 && this.x < plat.x + plat.w / 2) {
                    const platY = plat.y
                    if (this.y >= platY - 10 && this.y <= platY + 20) {
                        floorY = platY
                        break
                    }
                }
            }
        }

        if (this.y > floorY) {
            this.y = floorY
            this.vy *= -0.6
            this.vx *= 0.7
            this.rotSpeed *= 0.6
        }
        this.life -= dt
        if (this.collectDelay > 0) this.collectDelay -= dt
    }
    draw(ctx) {
        const alpha = this.life < 2 ? (this.life * 5) % 1 : 1
        if (alpha < 0.2) return

        ctx.save()
        ctx.translate(Math.round(this.x), Math.round(this.y - 20))
        ctx.rotate(this.angle)

        ctx.shadowBlur = 15 + Math.sin(performance.now() * 0.01) * 5
        ctx.shadowColor = this.color
        ctx.globalAlpha = alpha

        if (this.type === 'hp') {
            ctx.fillStyle = '#fff'
            ctx.strokeStyle = this.color
            ctx.lineWidth = 3

            ctx.beginPath()
            ctx.moveTo(0, -18)
            ctx.lineTo(15, 0)
            ctx.lineTo(0, 18)
            ctx.lineTo(-15, 0)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()

            ctx.fillStyle = this.color
            ctx.fillRect(-8, -2, 16, 4)
            ctx.fillRect(-2, -8, 4, 16)
        } else {
            ctx.fillStyle = '#fff'
            ctx.strokeStyle = this.color
            ctx.lineWidth = 3

            ctx.beginPath()
            for (let i = 0; i < 8; i++) {
                const r = i % 2 === 0 ? 18 : 8
                const a = (i * Math.PI * 2) / 8
                ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
            }
            ctx.closePath()
            ctx.fill()
            ctx.stroke()

            ctx.fillStyle = this.color
            ctx.font = 'bold 12px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.rotate(-this.angle)
            ctx.fillText('$', 0, 0)
        }

        if (Math.abs(this.vy) > 100) {
            ctx.fillStyle = '#fff'
            for (let i = 0; i < 3; i++) {
                const ox = (Math.random() - 0.5) * 40
                const oy = (Math.random() - 0.5) * 40
                ctx.fillRect(ox, oy, 2, 2)
            }
        }

        ctx.restore()
    }
}
