// PLAYER CLASS
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 0, 40, 80)
        this.color = CONFIG.colors.player
        this.maxHp = SaveSystem.data.stats.maxHp
        this.hp = this.maxHp
        this.speed = 400
        this.dashSpeed = 1200
        this.dashCd = 0
        this.attackStep = 0
        this.ghostTimer = 0
        this.attacks = [
            { startup: 0.05, active: 0.08, recover: 0.12, dmg: 10, w: 85, h: 60, offset: 60, force: 180 },
            { startup: 0.05, active: 0.08, recover: 0.12, dmg: 15, w: 95, h: 70, offset: 70, force: 250 },
            { startup: 0.08, active: 0.12, recover: 0.25, dmg: 35, w: 120, h: 100, offset: 80, force: 600 },
        ]
    }
    update(dt, input, particles) {
        this.stateTime += dt
        this.y = CONFIG.floorY
        if (this.hitFlicker > 0) this.hitFlicker -= dt
        if (this.dashCd > 0) this.dashCd -= dt
        if (this.state === 'DEAD') {
            this.updatePhysics(dt)
            return
        }
        const canM =
            [
                'IDLE',
                'RUN',
            ].includes(this.state) || !this.state.startsWith('ATTACK')
        if (canM) {
            const ax = input.getAxisX()
            if (ax !== 0) {
                this.vx = Utils.lerp(this.vx, ax * this.speed, 20 * dt)
                this.dir = ax > 0 ? 1 : -1
                this.changeState('RUN')
            } else {
                this.vx *= 0.5
                this.changeState('IDLE')
            }
        }
        if (canM || (this.state.startsWith('ATTACK') && this.isCritWindow)) {
            if (input.consume('KeyJ')) {
                this.nextCrit = this.isCritWindow
                this.changeState(`ATTACK_${this.attackStep}`)
                this.vx = this.dir * 250
                audio.playSwing()
                if (particles.particles.length < 150) {
                    particles.spawnSkillVFX(
                        this.x + this.dir * 70,
                        this.getDrawY() - this.h / 2,
                        SaveSystem.data.skills.active,
                    )
                }
            }
        }
        if (canM && input.consume('Space') && this.dashCd <= 0) {
            this.changeState('DASH')
            this.vx = this.dir * this.dashSpeed
            this.dashCd = 0.7 * SaveSystem.data.stats.dashCdMult
            audio.playDash()
            particles.spawnGhost(this)
            this.ghostTimer = 0.04
        }

        if (this.state === 'DASH') {
            this.ghostTimer -= dt
            if (this.ghostTimer <= 0) {
                particles.spawnGhost(this)
                this.ghostTimer = 0.04
            }
        }

        this._handleStates()
        this.updatePhysics(dt)
        if (this.x < 0) this.x = 0
    }
    _handleStates() {
        if (this.state.startsWith('ATTACK_')) {
            const atk = this.attacks[parseInt(this.state.split('_')[1])],
                total = atk.startup + atk.active + atk.recover
            const critStart = atk.startup + atk.active + atk.recover * 0.1,
                critW = 0.2 * SaveSystem.data.stats.critWindowMult
            this.isCritWindow = this.stateTime >= critStart && this.stateTime <= critStart + critW
            if (this.stateTime > total) {
                this.attackStep = (this.attackStep + 1) % 3
                this.changeState('IDLE')
                this.isCritWindow = false
            }
        } else if (this.state === 'DASH' && this.stateTime > 0.2) this.changeState('IDLE')
        else if (this.state === 'HURT' && this.stateTime > 0.3) {
            this.changeState('IDLE')
            this.attackStep = 0
        }
    }
    getCurrentAttackBox() {
        let atk
        if (this.state.startsWith('ATTACK_')) atk = this.attacks[parseInt(this.state.split('_')[1])]
        if (!atk || this.stateTime < atk.startup || this.stateTime > atk.startup + atk.active) return null
        return {
            x: this.x + (this.dir > 0 ? 0 : -atk.w) + (this.dir * atk.offset) / 2,
            y: this.getDrawY() - this.h / 2 - atk.h / 2,
            w: atk.w,
            h: atk.h,
            dmg: atk.dmg,
            force: atk.force,
        }
    }
}
