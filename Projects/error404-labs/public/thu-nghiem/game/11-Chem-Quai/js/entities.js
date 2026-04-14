// ENTITIES
class Entity {
    constructor(x, y, z, w, h) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
        this.h = h
        this.vx = 0
        this.vy = 0
        this.vz = 0
        this.dir = 1
        this.hp = 100
        this.maxHp = 100
        this.state = 'IDLE'
        this.stateTime = 0
        this.color = '#fff'
        this.hitFlicker = 0
        this.weaponType = 'sword'
        this.onPlatform = false
        this.armor = 0
    }
    getDrawY() {
        return this.y - this.z
    }
    getHitbox() {
        return { x: this.x - this.w / 2, y: this.getDrawY() - this.h, w: this.w, h: this.h }
    }
    updatePhysics(dt) {
        this.x += this.vx * dt

        const game = window._gameInstance
        if (game && game.exitGateX !== null) {
            this.x = Utils.clamp(this.x, 0, game.exitGateX)
        }

        this.y += this.vy * dt
        this.z += this.vz * dt

        let groundZ = 0
        if (this.isFlyer && this.state !== 'DEAD') {
            // Flyer handles its own Z movement or stays airborne
            // Don't apply default gravity
        } else if (this.z > groundZ) {
            this.vz -= CONFIG.gravity * dt
        } else {
            this.z = groundZ
            this.vz = 0
        }

        if (this.state !== 'DASH') {
            this.vx *= Math.pow(0.001, dt)
            this.vy *= Math.pow(0.001, dt)
        }

        if (!this.onPlatform) {
            this.y = CONFIG.floorY
        }
    }
    changeState(s) {
        if (this.state === s) return
        this.state = s
        this.stateTime = 0
    }
    takeDamage(a, kbx, src) {
        if (this.state === 'DEAD' || this.state === 'DASH') return false
        
        // Armor implementation: reduction = 100 / (100 + armor)
        const reduction = 100 / (100 + (this.armor || 0))
        const actualDamage = a * reduction
        
        this.hp -= actualDamage
        this.hitFlicker = 0.1
        this.vx = kbx
        if (this.hp <= 0) {
            this.hp = 0
            this.changeState('DEAD')
            this.vz = 300

            const game = window._gameInstance
            if (game && this.constructor.name === 'Enemy') {
                game.waveKills++
                if (this.type === 'boss') game.money += 500 + game.wave * 100
                else game.money += 10 + Math.floor(Math.random() * 15)
                game.updateHUD()
            }

            audio.playSynth('sawtooth', 80, 0.4, 0.4)
        } else {
            this.changeState('HURT')
            audio.playHit()
        }
        return true
    }
    static drawEntity(ctx, e, isGhost = false) {
        const t = e.stateTime,
            drawY = e.y - e.z
        ctx.save()
        ctx.translate(Math.round(e.x), Math.round(drawY))
        ctx.scale(e.dir, 1)

        if (!isGhost && e.hitFlicker > 0) ctx.globalCompositeOperation = 'lighter'

        const isPlayer = e.constructor.name === 'Player'
        if (SPRITES.loaded && !isGhost && isPlayer) {
            const sSize = 110
            let sprite = null
            if (e.state === 'DEAD') {
                const totalFrames = 8
                sprite = SPRITES.dead[0][Math.min(Math.floor(t * 6), totalFrames - 1)]
            } else if (e.state === 'HURT') {
                sprite = SPRITES.hurt
            } else if (e.state.startsWith('ATTACK')) {
                const step = parseInt(e.state.split('_')[1])
                const atk = e.attacks[step]
                const totalDur = atk.startup + atk.active + atk.recover
                const totalFrames = 5
                sprite = SPRITES.attack[0][Math.min(Math.floor((t / totalDur) * totalFrames), totalFrames - 1)]
            } else if (e.z > 0 && !e.onPlatform) {
                const totalFrames = 7
                sprite = SPRITES.jump[0][Math.floor(t * 12) % totalFrames]
            } else if (e.state === 'IDLE') {
                const totalFrames = 5
                sprite = SPRITES.idle[0][Math.floor(t * 10) % totalFrames]
            } else if (e.state === 'RUN') {
                const totalFrames = 8
                sprite = SPRITES.run[0][Math.floor(t * 12) % totalFrames]
            }

            if (sprite && sprite.complete) {
                ctx.drawImage(sprite, -sSize / 2, -sSize, sSize, sSize)
                ctx.restore()
                return
            }
        }

        let sX = 1,
            sY = 1,
            bOff = 0,
            headBob = Math.sin(t * 12) * 2,
            legM = 0,
            armA = 0
        if (e.state === 'RUN') {
            legM = Math.sin(t * 18) * 18
            armA = -Math.sin(t * 18) * 25
            bOff = Math.sin(t * 18) * 4
        } else if (e.state.startsWith('ATTACK')) {
            armA = 70
            sX = 1.2
            bOff = 2
        } else if (e.state === 'DASH') {
            sX = 1.6
            sY = 0.6
        }

        const bs = e.bodyScale || 1.0
        ctx.scale(sX * bs, sY * bs)
        ctx.strokeStyle = e.color
        ctx.lineWidth = 4
        ctx.lineCap = 'round'

        ctx.fillStyle = isGhost ? e.color : '#111'
        if (e.type === 'ninja') {
            ctx.fillRect(-7, -50 + bOff, 14, 28)
            ctx.strokeRect(-7, -50 + bOff, 14, 28)
            ctx.beginPath()
            ctx.arc(0, -57 + bOff + headBob, 8, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            if (!isGhost) {
                ctx.fillStyle = '#f00'
                ctx.fillRect(3, -60 + bOff + headBob, 5, 2)
            }
            ctx.strokeStyle = '#0ff'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(-8, -57 + bOff)
            ctx.lineTo(-18 + Math.sin(t * 15) * 5, -62 + bOff)
            ctx.stroke()
            ctx.strokeStyle = e.color
            ctx.lineWidth = 4
        } else if (e.type === 'shield') {
            ctx.fillRect(-14, -55 + bOff, 28, 38)
            ctx.strokeRect(-14, -55 + bOff, 28, 38)
            ctx.beginPath()
            ctx.arc(0, -65 + bOff + headBob, 12, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            if (!isGhost) {
                ctx.fillStyle = '#fff'
                ctx.fillRect(3, -68 + bOff + headBob, 7, 3)
            }
            ctx.fillStyle = e.color
            ctx.globalAlpha = 0.4
            ctx.fillRect(-18, -55 + bOff, 6, 12)
            ctx.fillRect(12, -55 + bOff, 6, 12)
            ctx.globalAlpha = 1.0
        } else if (e.type === 'advanced') {
            ctx.fillRect(-12, -55 + bOff, 24, 38)
            ctx.strokeRect(-12, -55 + bOff, 24, 38)
            ctx.beginPath()
            ctx.arc(0, -65 + bOff + headBob, 11, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            if (!isGhost) {
                ctx.fillStyle = '#fff'
                ctx.fillRect(3, -68 + bOff + headBob, 7, 3)
            }
        } else if (e.type === 'slime') {
            const squash = 1 + Math.sin(t * 10) * 0.1
            const stretch = 1 / squash
            ctx.scale(squash, stretch)
            ctx.beginPath()
            ctx.arc(0, -20, 20, Math.PI, 0)
            ctx.lineTo(20, 0)
            ctx.lineTo(-20, 0)
            ctx.closePath()
            ctx.fillStyle = e.color
            ctx.globalAlpha = 0.6
            ctx.fill()
            ctx.globalAlpha = 1.0
            ctx.strokeStyle = '#fff'
            ctx.stroke()
            ctx.fillStyle = '#fff'
            ctx.beginPath()
            ctx.arc(-7, -15, 3, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.arc(7, -15, 3, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
            return
        } else if (e.type === 'flyer') {
            // Wing logic
            const wingH = Math.sin(t * 15) * 20
            ctx.fillStyle = e.color
            ctx.beginPath()
            ctx.moveTo(-10, -30)
            ctx.quadraticCurveTo(-30, -30 - wingH, -40, -10)
            ctx.lineTo(-10, -10)
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(10, -30)
            ctx.quadraticCurveTo(30, -30 - wingH, 40, -10)
            ctx.lineTo(10, -10)
            ctx.fill()

            ctx.fillRect(-8, -40, 16, 25)
            ctx.strokeRect(-8, -40, 16, 25)
            ctx.beginPath()
            ctx.arc(0, -45 + headBob, 8, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            if (!isGhost) {
                ctx.fillStyle = '#fff'
                ctx.fillRect(2, -48 + headBob, 5, 2)
            }
            ctx.restore()
            return
        } else {
            ctx.fillRect(-10, -55 + bOff, 20, 35)
            ctx.strokeRect(-10, -55 + bOff, 20, 35)
            ctx.beginPath()
            ctx.arc(0, -65 + bOff + headBob, 10, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            if (!isGhost) {
                ctx.fillStyle = '#fff'
                ctx.fillRect(3, -68 + bOff + headBob, 7, 3)
            }
        }
        ctx.beginPath()
        ctx.moveTo(-5, -20 + bOff)
        ctx.lineTo(-5 - legM, 0)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(5, -20 + bOff)
        ctx.lineTo(5 + legM, 0)
        ctx.stroke()
        ctx.save()
        ctx.translate(-8, -50 + bOff)
        ctx.rotate((-armA * Math.PI) / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 22)
        ctx.stroke()
        if (e.type === 'shield' && !isGhost) {
            ctx.strokeStyle = '#0f0'
            ctx.lineWidth = 3
            ctx.strokeRect(-12, 5, 10, 30)
            ctx.fillStyle = 'rgba(0,255,0,0.15)'
            ctx.fillRect(-12, 5, 10, 30)
            ctx.strokeStyle = e.color
            ctx.lineWidth = 4
        }
        ctx.restore()
        ctx.save()
        ctx.translate(8, -50 + bOff)
        ctx.rotate((armA * Math.PI) / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 22)
        ctx.stroke()
        if (e.state.startsWith('ATTACK') && !isGhost) {
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 4
            ctx.beginPath()
            if (e.weaponType === 'hammer') {
                ctx.lineWidth = 6
                ctx.moveTo(0, 0)
                ctx.lineTo(10, 35)
                ctx.stroke()
                ctx.fillStyle = '#aaa'
                ctx.fillRect(-10, 25, 30, 15)
            } else if (e.weaponType === 'dagger') {
                ctx.lineWidth = 3
                ctx.strokeStyle = '#0ff'
                ctx.moveTo(0, 18)
                ctx.lineTo(18, 30)
                ctx.stroke()
                ctx.moveTo(0, 18)
                ctx.lineTo(8, 12)
                ctx.stroke()
            } else if (e.weaponType === 'bow') {
                ctx.beginPath()
                ctx.arc(12, 18, 18, -Math.PI / 2, Math.PI / 2)
                ctx.stroke()
                ctx.moveTo(12, 0)
                ctx.lineTo(12, 36)
                ctx.stroke()
            } else if (e.weaponType === 'shield') {
                ctx.strokeStyle = '#fff'
                ctx.moveTo(0, 20)
                ctx.lineTo(20, 38)
                ctx.stroke()
            } else {
                ctx.lineWidth = 5
                ctx.moveTo(0, 22)
                ctx.lineTo(25, 45)
                ctx.stroke()
            }
        } else if (!isGhost) {
            ctx.strokeStyle = e.color
            ctx.globalAlpha = 0.4
            ctx.lineWidth = 2
            if (e.weaponType === 'bow') {
                ctx.beginPath()
                ctx.arc(8, 18, 12, -Math.PI / 2, Math.PI / 2)
                ctx.stroke()
            } else if (e.weaponType === 'dagger') {
                ctx.beginPath()
                ctx.moveTo(0, 20)
                ctx.lineTo(10, 28)
                ctx.stroke()
            } else if (e.weaponType === 'hammer') {
                ctx.beginPath()
                ctx.moveTo(0, 10)
                ctx.lineTo(0, 30)
                ctx.stroke()
                ctx.fillStyle = e.color
                ctx.fillRect(-5, 22, 12, 8)
            }
            ctx.globalAlpha = 1.0
        }
        ctx.restore()
        ctx.restore()
    }
    draw(ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.w / 1.1, this.w / 4, 0, 0, Math.PI * 2)
        ctx.fill()
        Entity.drawEntity(ctx, this)
    }
}
