// PLAYER CLASS
class Player extends Entity {
    constructor(x, y) {
        super(x, y, 0, 40, 80)
        this.color = CONFIG.colors.player
        this.maxHp = SaveSystem.data.stats.maxHp
        this.hp = this.maxHp
        this.armor = SaveSystem.data.stats.armor || 0
        this.speed = 400
        this.dashSpeed = 1200
        this.dashCd = 0
        this.attackStep = 0
        this.ghostTimer = 0
        this.hasSpawnedSkillVFX = false
        this.attacks = [
            { startup: 0.05, active: 0.08, recover: 0.12, dmg: 10, w: 85, h: 60, offset: 60, force: 180 },
            { startup: 0.05, active: 0.08, recover: 0.12, dmg: 15, w: 95, h: 70, offset: 70, force: 250 },
            { startup: 0.08, active: 0.12, recover: 0.25, dmg: 35, w: 120, h: 100, offset: 80, force: 600 },
        ]
    }
    update(dt, input, particles) {
        this.stateTime += dt
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
                const game = window._gameInstance
                if (game) game.hasPlayerMoved = true
            } else {
                this.vx *= 0.5
                this.changeState('IDLE')
            }

            // Jump logic
            if ((input.consume('KeyW') || input.consume('ArrowUp')) && (this.z === 0 || this.onPlatform)) {
                this.vz = 850
                this.onPlatform = false
                const game = window._gameInstance
                if (game) game.hasPlayerMoved = true
                audio.playJump()
            }
        }
        if (canM || (this.state.startsWith('ATTACK') && this.isCritWindow)) {
            if (input.consume('KeyJ')) {
                const game = window._gameInstance
                if (game) game.hasPlayerMoved = true
                this.nextCrit = this.isCritWindow
                this.changeState(`ATTACK_${this.attackStep}`)
                this.vx = this.dir * 250
                audio.playSwing()
                this.hasSpawnedSkillVFX = false
            }
        }

        if (this.state.startsWith('ATTACK_')) {
            const step = parseInt(this.state.split('_')[1])
            const atk = this.attacks[step]
            const total = atk.startup + atk.active + atk.recover
            // Trigger VFX when reaching the last frame (frame 4 of 5 total frames)
            if (!this.hasSpawnedSkillVFX && (this.stateTime / total) * 5 >= 4) {
                this.hasSpawnedSkillVFX = true
                if (particles.particles.length < 150) {
                    particles.spawnSkillVFX(
                        this.x + this.dir * 70,
                        this.getDrawY() - this.h / 2,
                        SaveSystem.data.skills.active,
                    )
                }
            }
        }
        if (canM && this.dashCd <= 0) {
            if (input.keys['Space']) {
                this.dashCharge = (this.dashCharge || 0) + dt
                if (this.dashCharge > 0.8) this.dashCharge = 0.8
                // Hiệu ứng vận sức (tụ năng lượng)
                if (Math.random() < this.dashCharge * 0.8) {
                    particles.spawn(this.x + (Math.random() - 0.5) * 40, this.getDrawY() - Math.random() * this.h, '#0ff', 1, 0.2, 0.3)
                }
            } else if (this.dashCharge > 0) {
                const game = window._gameInstance
                if (game) game.hasPlayerMoved = true
                this.changeState('DASH')
                const chargeRatio = Math.min(1, this.dashCharge / 0.5)
                this.currentDashDuration = 0.2 + 0.3 * chargeRatio
                this.vx = this.dir * this.dashSpeed * (0.5 + 0.7 * chargeRatio)
                this.dashCd = 0.7 * SaveSystem.data.stats.dashCdMult
                audio.playDash()
                particles.spawnGhost(this)
                this.ghostTimer = 0.02
                this.dashCharge = 0
            }
        } else if (!input.keys['Space']) {
            this.dashCharge = 0
        }

        if (this.state === 'DASH') {
            this.ghostTimer -= dt
            if (this.ghostTimer <= 0) {
                particles.spawnGhost(this)
                this.ghostTimer = 0.02
            }
        }

        this._handleStates()
        this.updatePhysics(dt)
        if (this.x < 0) this.x = 0
        const game = window._gameInstance
        const maxX = game ? game.exitGateX : 5000
        if (this.x > maxX) this.x = maxX
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
        } else if (this.state === 'DASH' && this.stateTime > (this.currentDashDuration || 0.45)) this.changeState('IDLE')
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
