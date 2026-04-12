// ENEMY CLASS
class Enemy extends Entity {
    constructor(x, y, type = 'basic', wave = 1) {
        super(x, y, 0, 40, 70)
        this.type = type
        this.atkCd = Math.random() * 1.5
        const scale = 1 + (wave - 1) * 0.12
        this.weaponType = 'sword'
        this.bodyScale = 1.0
        this.dodgeCd = 0
        this.canDodge = false
        if (type === 'basic') {
            this.color = CONFIG.colors.enemy
            this.hp = this.maxHp = Math.floor(40 * scale)
            this.speed = 110 + wave * 2.5
            this.atkR = 75
            this.bodyScale = 0.9
        } else if (type === 'ninja') {
            this.color = '#0ff'
            this.hp = this.maxHp = Math.floor(25 * scale)
            this.speed = 180 + wave * 3.5
            this.atkR = 65
            this.weaponType = 'dagger'
            this.bodyScale = 0.75
            this.w = 30
            this.h = 60
            this.canDodge = true
        } else if (type === 'shield') {
            this.color = CONFIG.colors.shield
            this.hp = this.maxHp = Math.floor(150 * scale)
            this.speed = 70 + wave * 1.5
            this.atkR = 65
            this.weaponType = 'shield'
            this.w = 55
            this.h = 80
            this.bodyScale = 1.2
        } else if (type === 'ranged') {
            this.color = CONFIG.colors.ranged
            this.hp = this.maxHp = Math.floor(30 * scale)
            this.speed = 160 + wave * 2
            this.atkR = 400
            this.weaponType = 'bow'
            this.bodyScale = 0.85
        } else if (type === 'advanced') {
            this.color = CONFIG.colors.advanced
            this.hp = this.maxHp = Math.floor(100 * scale)
            this.speed = 160 + wave * 3
            this.atkR = 110
            this.w = 55
            this.h = 85
            this.weaponType = 'hammer'
            this.bodyScale = 1.3
        } else if (type === 'boss') {
            this.color = CONFIG.colors.boss
            this.hp = this.maxHp = Math.floor(800 * scale)
            this.speed = 190 + wave * 2
            this.atkR = 140
            this.w = 80
            this.h = 140
            this.bodyScale = 2.0
            this.canDodge = true
        } else if (type === 'slime') {
            this.color = CONFIG.colors.slime
            this.hp = this.maxHp = Math.floor(50 * scale)
            this.speed = 100 + wave * 2
            this.atkR = 300
            this.weaponType = 'poison'
            this.bodyScale = 1.0
            this.jumpCd = 0
        } else if (type === 'flyer') {
            this.color = '#ff0'
            this.hp = this.maxHp = Math.floor(35 * scale)
            this.speed = 220 + wave * 4
            this.atkR = 80
            this.weaponType = 'claws'
            this.bodyScale = 0.8
            this.isFlyer = true
            this.targetZ = 250
            this.diveCd = 0
        }
        this.dmgScale = scale
        this.patrolL = null
        this.patrolR = null
    }
    _tryDodge(player) {
        if (!this.canDodge || this.dodgeCd > 0 || this.state === 'ATTACK') return false
        const d = Math.abs(player.x - this.x)
        if (player.state.startsWith('ATTACK') && d < 150) {
            const dodgeDir = this.x > player.x ? 1 : -1
            this.vx = dodgeDir * this.speed * 3
            this.dodgeCd = this.type === 'ninja' ? 1.5 : 3.0
            this.changeState('RUN')
            return true
        }
        return false
    }
    update(dt, player) {
        this.stateTime += dt
        this.y = CONFIG.floorY
        if (this.hitFlicker > 0) this.hitFlicker -= dt
        if (this.atkCd > 0) this.atkCd -= dt
        if (this.dodgeCd > 0) this.dodgeCd -= dt
        if (this.jumpCd >= 0) this.jumpCd -= dt
        if (this.diveCd > 0) this.diveCd -= dt
        if (this.state === 'DEAD') {
            this.vx *= 0.95
            this.updatePhysics(dt)
            return
        }
        if (this._tryDodge(player)) {
            this.updatePhysics(dt)
            return
        }
        if (this.state === 'HURT') {
            if (this.stateTime > (this.type === 'boss' ? 0.15 : 0.25)) this.changeState('IDLE')
        } else if (this.state === 'ATTACK') {
            const atkDur = this.type === 'ninja' ? 0.4 : this.type === 'advanced' ? 0.9 : 0.7
            if (this.stateTime > atkDur) this.changeState('IDLE')
            if ((this.type === 'ranged' || this.type === 'slime') && this.stateTime > 0.35 && !this._hasShot) {
                const game = window._gameInstance
                if (game) {
                    const dx = player.x - this.x
                    game.projectiles.push({
                        x: this.x + this.dir * 20,
                        y: this.getDrawY() - 20,
                        vx: Math.sign(dx) * 500,
                        vy: 0,
                        dmg: Math.floor((this.type === 'slime' ? 10 : 12) * (this.dmgScale || 1)),
                        color: this.type === 'slime' ? '#0f4' : '#fff',
                        life: 3,
                    })
                    this._hasShot = true
                }
            }
        } else {
            const dx = player.x - this.x,
                d = Math.abs(dx)

            // Patrol behavior if on platform and player is not on the same level
            const onSameLevel = Math.abs(player.z - this.z) < 50
            if (this.onPlatform && !onSameLevel && this.patrolL !== null) {
                this.changeState('RUN')
                if (this.x <= this.patrolL) this.dir = 1
                else if (this.x >= this.patrolR) this.dir = -1
                this.vx = this.dir * this.speed * 0.6
            } else if (this.type === 'flyer') {
                const dz = this.targetZ - this.z
                this.vz = dz * 5 // Simple P-controller for height

                const dx = player.x - this.x
                const dist = Math.abs(dx)

                if (this.state === 'ATTACK') {
                    this.vx *= 0.5
                } else if (this.targetZ < 100) {
                    // Diving
                    this.vx = Math.sign(dx) * this.speed * 1.5
                    if (dist < 40 && Math.abs(dz) < 40) {
                        this.changeState('ATTACK')
                        this.targetZ = 250 // Fly back up after strike
                        this.diveCd = 2.0
                    }
                } else {
                    // Hovering above player
                    this.dir = dx > 0 ? 1 : -1
                    if (dist > 50) this.vx = Math.sign(dx) * this.speed
                    else this.vx *= 0.8

                    if (dist < 100 && this.diveCd <= 0) {
                        this.targetZ = player.z + 20 // Start dive
                    }
                }
            } else if (this.type === 'slime') {
                if (this.z === 0 && this.jumpCd <= 0) {
                    this.vz = 400 + Math.random() * 200
                    this.vx = Math.sign(dx) * this.speed * 2
                    this.jumpCd = 1.0 + Math.random()
                    this.changeState('RUN')
                }
                if (d < this.atkR && this.atkCd <= 0 && this.z === 0) {
                    this.changeState('ATTACK')
                    this.dir = dx > 0 ? 1 : -1
                    this._hasShot = false
                    this.atkCd = 2.0 + Math.random()
                }
                if (this.z > 0) {
                    this.changeState('RUN')
                } else if (this.state !== 'ATTACK') {
                    this.vx *= 0.8
                    if (Math.abs(this.vx) < 10) this.changeState('IDLE')
                }
            } else if (this.type === 'ranged') {
                if (d < 250) {
                    this.changeState('RUN')
                    this.dir = dx > 0 ? 1 : -1
                    this.vx = -Math.sign(dx) * this.speed * 1.2
                } else if (d > 500) {
                    this.changeState('RUN')
                    this.dir = dx > 0 ? 1 : -1
                    this.vx = Math.sign(dx) * this.speed
                } else {
                    this.vx *= 0.3
                    if (this.atkCd <= 0) {
                        this.changeState('ATTACK')
                        this.dir = dx > 0 ? 1 : -1
                        this._hasShot = false
                        this.atkCd = 1.2 + Math.random() * 0.8
                    } else {
                        this.vx = Math.sin(this.stateTime * 3) * this.speed * 0.5
                        this.changeState('RUN')
                    }
                }
            } else if (this.type === 'ninja') {
                if (d > this.atkR) {
                    this.changeState('RUN')
                    this.dir = dx > 0 ? 1 : -1
                    this.vx = Math.sign(dx) * this.speed
                } else {
                    if (this.atkCd <= 0) {
                        this.changeState('ATTACK')
                        this.dir = dx > 0 ? 1 : -1
                        this.atkCd = 0.6 + Math.random() * 0.5
                    } else {
                        this.vx = Math.cos(this.stateTime * 5) * this.speed * 0.8
                        this.changeState('RUN')
                    }
                }
            } else if (this.type === 'shield') {
                if (d > this.atkR) {
                    this.changeState('RUN')
                    this.dir = dx > 0 ? 1 : -1
                    this.vx = Math.sign(dx) * this.speed
                } else {
                    this.vx *= 0.3
                    if (this.atkCd <= 0) {
                        this.changeState('ATTACK')
                        this.dir = dx > 0 ? 1 : -1
                        this.atkCd = 1.5 + Math.random()
                    } else this.changeState('IDLE')
                }
            } else {
                if (d > this.atkR) {
                    this.changeState('RUN')
                    this.dir = dx > 0 ? 1 : -1
                    this.vx = Math.sign(dx) * this.speed
                } else {
                    this.vx *= 0.5
                    if (this.atkCd <= 0) {
                        this.changeState('ATTACK')
                        this.dir = dx > 0 ? 1 : -1
                        this.atkCd = this.type === 'boss' ? 0.8 + Math.random() * 0.5 : 1.0 + Math.random()
                    } else this.changeState('IDLE')
                }
            }
        }
        this.updatePhysics(dt)
    }
    takeDamage(a, kbx, src) {
        let dmg = a
        if (this.type === 'shield' && this.state === 'IDLE') dmg = Math.floor(a * 0.5)
        return super.takeDamage(dmg, kbx, src)
    }
    getCurrentAttackBox() {
        if (this.state !== 'ATTACK') return null
        const t = this.stateTime
        if (this.type === 'ninja') {
            if (t < 0.1 || t > 0.3) return null
        } else if (this.type === 'advanced') {
            if (t < 0.3 || t > 0.7) return null
        } else if (this.type === 'ranged') {
            return null
        } else {
            if (t < 0.2 || t > 0.6) return null
        }
        let w = this.type === 'boss' ? 180 : this.type === 'advanced' ? 120 : this.type === 'ninja' ? 60 : 90,
            h = this.type === 'boss' ? 130 : this.type === 'advanced' ? 100 : 70
        return {
            x: this.x + (this.dir > 0 ? -10 : -w + 10),
            y: this.getDrawY() - h - 10,
            w,
            h,
            dmg: Math.floor(
                (this.type === 'boss'
                    ? 40
                    : this.type === 'advanced'
                      ? 25
                      : this.type === 'shield'
                        ? 20
                        : this.type === 'ninja'
                          ? 12
                          : 15) * (this.dmgScale || 1),
            ),
        }
    }
    draw(ctx) {
        super.draw(ctx)
        if (this.state === 'DEAD' || this.hp <= 0) return

        const barW = this.type === 'boss' ? 100 : 60
        const barH = 6
        const x = this.x - barW / 2
        const y = this.getDrawY() - this.h - 15

        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(x, y, barW, barH)

        const hpP = Math.max(0, this.hp / this.maxHp)
        ctx.fillStyle = this.type === 'boss' ? '#f0f' : '#f00'
        ctx.fillRect(x, y, barW * hpP, barH)

        ctx.fillStyle = '#fff'
        ctx.font = 'bold 10px "Orbitron", sans-serif'
        ctx.textAlign = 'center'
        ctx.shadowBlur = 0
        ctx.fillText(`${Math.ceil(this.hp)}/${this.maxHp}`, this.x, y - 5)
    }
}
