// GAME CORE
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas')
        this.ctx = this.canvas.getContext('2d', { alpha: false })
        this.frameCount = 0
        this.lastFpsTime = performance.now()
        this.currentFps = 60
        this.input = new InputManager()
        this.camera = new Camera()
        this.particles = new ParticleSystem()
        this.resize()
        window.addEventListener('resize', () => this.resize())
        this.state = 'MENU'
        this.lastT = performance.now()
        this.timeScale = 1.0
        this.hitStop = 0
        this.player = null
        this.enemies = []
        this.combo = 0
        this.comboT = 0
        this.wave = SaveSystem.data.wave
        this.money = SaveSystem.data.money
        this.waveKills = 0
        this.waveTotal = 0
        this.spawnQueue = []
        this.spawnTimer = 0
        this.items = []
        this.damageTexts = []
        this.exitGateX = null
        this.maxWave = 1000
        this.projectiles = []
        this.platforms = []
        this.groundSegments = []
        this.traps = []
        window._gameInstance = this
        this._entitiesList = []
        this.menuIndex = 0
        this.menuCooldown = 0
        this.lastState = 'MENU'
        this._createGridPattern()
        this.bindUI()
        this._generateLevel(this.wave)
        requestAnimationFrame((t) => this.loop(t))
    }

    _generateLevel(wave) {
        this.groundSegments = []
        this.platforms = []
        this.traps = []
        this._spawnPositions = []

        const levelLength = 4000 + wave * 600
        this.exitGateX = levelLength

        // Mặt đất giới hạn từ điểm bắt đầu đến điểm dịch chuyển
        this.groundSegments.push({ x: 0, w: levelLength })

        // Platforms
        for (let i = 0; i < 10 + Math.min(wave, 10); i++) {
            const seed = wave * 200 + i
            const x = 500 + Utils.seededRandom(seed) * (levelLength - 1000)
            const z = 140 + Utils.seededRandom(seed + 1) * 120
            const w = 150 + Utils.seededRandom(seed + 2) * 100
            this.platforms.push({
                x,
                z,
                y: CONFIG.floorY - z,
                w,
                color: `hsl(${(wave * 60 + i * 30) % 360}, 100%, 70%)`,
            })
        }

        // Vị trí spawn quái cố định cho mỗi màn
        this.waveTotal = 10
        const stepX = (levelLength - 800) / this.waveTotal
        for (let i = 0; i < this.waveTotal; i++) {
            let x = 400 + i * stepX + (Math.random() * 100 - 50)
            let z = 0
            // Cho vị trí chẵn leo lên platform nếu có
            if (i % 2 === 0 && this.platforms.length > 0) {
                const plat = this.platforms[i % this.platforms.length]
                x = plat.x + (Math.random() * 80 - 40) // Phân tán các con quái trên cùng platform
                z = plat.z
            }
            this._spawnPositions.push({ x, z })
        }

        // Traps (saws)
        for (let i = 0; i < 3 + Math.floor(wave / 2); i++) {
            const seed = wave * 300 + i
            const x = 1500 + Utils.seededRandom(seed) * (levelLength - 2000)
            const z = Utils.seededRandom(seed + 1) > 0.4 ? 0 : 60 + Utils.seededRandom(seed + 2) * 120
            this.traps.push({
                x,
                z,
                r: 35,
                type: 'saw',
                angle: 0,
                speed: 6 + Utils.seededRandom(seed + 3) * 12,
            })
        }
    }

    _createGridPattern() {
        const size = 120
        const pCanvas = document.createElement('canvas')
        pCanvas.width = size
        pCanvas.height = 80
        const pCtx = pCanvas.getContext('2d')
        pCtx.strokeStyle = 'rgba(0, 255, 255, 0.08)'
        pCtx.lineWidth = 1
        pCtx.strokeRect(0, 0, size, 80)
        this.gridPattern = this.ctx.createPattern(pCanvas, 'repeat')
    }
    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        CONFIG.canvasWidth = window.innerWidth
        CONFIG.canvasHeight = window.innerHeight
    }
    bindUI() {
        document.getElementById('start-btn').addEventListener('click', () => this.startWave())
        document.getElementById('how-to-play-btn').addEventListener('click', () => {
            document.getElementById('main-menu').classList.add('hidden')
            document.getElementById('instructions-menu').classList.remove('hidden')
        })
        document.getElementById('back-to-menu-btn').addEventListener('click', () => {
            document.getElementById('instructions-menu').classList.add('hidden')
            document.getElementById('main-menu').classList.remove('hidden')
        })
        document.getElementById('reset-save-btn').addEventListener('click', () => {
            SaveSystem.reset()
            location.reload()
        })
        document.getElementById('restart-btn').addEventListener('click', () => {
            document.getElementById('game-over-menu').classList.add('hidden')
            document.getElementById('main-menu').classList.remove('hidden')
            this.state = 'MENU'
        })
        document.getElementById('victory-btn').addEventListener('click', () => {
            document.getElementById('victory-menu').classList.add('hidden')
            document.getElementById('main-menu').classList.remove('hidden')
            this.state = 'MENU'
        })
        document.getElementById('open-skills-btn').addEventListener('click', () => {
            if (this.state === 'GAME') this.openSkills()
            else if (this.state === 'SHOP') this.closeAllMenus()
        })
        document.getElementById('open-upgrades-btn').addEventListener('click', () => {
            if (this.state === 'GAME') this.openUpgrades()
            else if (this.state === 'SHOP') this.closeAllMenus()
        })
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyK') {
                if (this.state === 'GAME') this.openSkills()
                else if (this.state === 'SHOP') this.closeAllMenus()
            }
            if (e.code === 'KeyL') {
                if (this.state === 'GAME') this.openUpgrades()
                else if (this.state === 'SHOP') this.closeAllMenus()
            }
            if (e.code === 'Escape' && this.state === 'SHOP') {
                this.closeAllMenus()
            }
        })
        const shop = (id, stat, key, step, max) => {
            const btn = document.getElementById(id)
            if (btn) {
                btn.addEventListener('click', () => {
                    let c = SaveSystem.data.costs[key]
                    if (this.money >= c && SaveSystem.data.stats[stat] < max) {
                        this.money -= c
                        SaveSystem.data.money = this.money
                        SaveSystem.data.stats[stat] += step
                        SaveSystem.data.costs[key] = Math.floor(c * 1.6)
                        SaveSystem.save()
                        audio.playBuy()
                        this.updateShopUI()
                    } else audio.playError()
                })
            }
        }
        shop('upg-dmg', 'dmgMult', 'dmg', 0.25, 8)
        shop('upg-crit', 'critWindowMult', 'crit', 0.2, 5)
        shop('upg-hp', 'maxHp', 'hp', 2500, 100000)
        shop('upg-dash', 'dashCdMult', 'dash', -0.1, 0.2)
    }
    startWave() {
        audio.init()
        document.getElementById('main-menu').classList.add('hidden')
        document.getElementById('hud').classList.remove('hidden')
        document.getElementById('touch-controls').classList.remove('hidden')
        this.state = 'GAME'
        this.player = new Player(0, CONFIG.floorY)
        this.enemies = []
        this.combo = 0
        this.camera.zoom = 1
        this.timeScale = 1.0
        this.waveKills = 0
        this._generateLevel(this.wave)
        this.hasPlayerMoved = false
        this._gateVibrationTriggered = false
        this._buildSpawnQueue()
        this._spawnInitialBatch()
        document.getElementById('wave-display').innerText = `MÀN ${this.wave}/${this.maxWave}`
        this.updateHUD()
    }
    _buildSpawnQueue() {
        this.spawnQueue = []
        this.spawnIndex = 0
        const isBossWave = this.wave % 5 === 0
        const w = this.wave
        for (let i = 0; i < this.waveTotal; i++) {
            let t = 'basic'
            const r = Utils.seededRandom(this.wave * 700 + i)
            if (w >= 2 && r < 0.18) t = 'ranged'
            else if (w >= 3 && r < 0.3) t = 'shield'
            else if (w >= 4 && r < 0.42) t = 'ninja'
            else if (w >= 5 && r < 0.52) t = 'advanced'
            else if (w >= 6 && r < 0.62) t = 'slime'
            else if (w >= 7 && r < 0.72) t = 'flyer'
            if (w >= 5 && i === 0 && this.spawnQueue.filter((q) => q === 'ranged').length === 0) t = 'ranged'
            if (w >= 4 && i === 1 && this.spawnQueue.filter((q) => q === 'ninja').length === 0) t = 'ninja'
            if (w >= 6 && i === 2 && this.spawnQueue.filter((q) => q === 'slime').length === 0) t = 'slime'
            if (isBossWave && i === this.waveTotal - 1) t = 'boss'
            this.spawnQueue.push(t)
        }
        for (let i = this.spawnQueue.length - 1; i > 0; i--) {
            if (this.spawnQueue[i] === 'boss') continue
            const j = Math.floor(Utils.seededRandom(this.wave * 800 + i) * i)
            if (this.spawnQueue[j] === 'boss') continue
            ;[
                this.spawnQueue[i],
                this.spawnQueue[j],
            ] = [
                this.spawnQueue[j],
                this.spawnQueue[i],
            ]
        }
        this.spawnTimer = 0
    }
    _spawnInitialBatch() {
        while (this.spawnQueue.length > 0) {
            this._spawnOneEnemy(this.spawnQueue.shift())
        }
    }
    _spawnOneEnemy(type) {
        const pos = this._spawnPositions[this.spawnIndex] || { x: 400 + Math.random() * 2000, z: 0 }
        const spawnX = pos.x
        const spawnY = CONFIG.floorY
        const spawnZ = pos.z
        this.spawnIndex++
        const enemy = new Enemy(spawnX, spawnY, type, this.wave)
        enemy.z = type === 'flyer' ? 250 : spawnZ
        this.enemies.push(enemy)
    }
    _nextWave() {
        this.items.forEach((item) => {
            if (item.type === 'hp') {
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + this.player.maxHp * 0.2)
            } else {
                this.money += 200 + Math.floor(Math.random() * 300)
            }
        })
        this.items = []

        this.wave++
        this.exitGateX = null
        SaveSystem.data.wave = this.wave
        SaveSystem.data.money = this.money
        SaveSystem.save()
        if (this.wave > this.maxWave) {
            this.state = 'OVER'
            document.getElementById('hud').classList.add('hidden')
            document.getElementById('touch-controls').classList.add('hidden')
            document.getElementById('final-money').innerText = this.money
            document.getElementById('victory-menu').classList.remove('hidden')
            return
        }
        this.enemies = []
        this.waveKills = 0
        this.player.x = 0
        this.player.y = CONFIG.floorY
        this.player.z = 0
        this.player.vz = 0
        this._generateLevel(this.wave)
        this.hasPlayerMoved = false
        this._gateVibrationTriggered = false
        this._buildSpawnQueue()
        this._spawnInitialBatch()

        document.getElementById('wave-display').innerText = `MÀN ${this.wave}/${this.maxWave}`
        this.camera.shake(10, 0.4)
        audio.playSynth('sine', 400, 0.6, 0.3, 1200)
        this.updateHUD()
    }
    triggerHitEffect(x, y, isCrit) {
        const targetStop = isCrit ? 0.05 : 0.02
        if (this.hitStop < targetStop) this.hitStop = targetStop
        this.camera.shake(isCrit ? 12 : 5, isCrit ? 0.3 : 0.15)
        if (isCrit && this.timeScale > 0.5) {
            this.camera.targetZoom = 1.1
            setTimeout(() => (this.camera.targetZoom = 1), 150)
            this.timeScale = 0.4
            setTimeout(() => (this.timeScale = 1), 100)
            audio.playCrit()
        } else audio.playHit()
    }
    _checkPlatformCollision() {
        const p = this.player
        if (!p) return
        p.onPlatform = false
        const footY = p.y - p.z
        for (const plat of this.platforms) {
            if (p.x > plat.x - plat.w / 2 - 20 && p.x < plat.x + plat.w / 2 + 20) {
                if (p.vz <= 0 && footY >= plat.y - 40 && footY <= plat.y + 15) {
                    p.z = CONFIG.floorY - plat.y
                    p.y = CONFIG.floorY
                    p.vz = 0
                    p.onPlatform = true
                    return
                }
            }
        }
    }
    _checkEnemyPlatformCollision(enemy) {
        enemy.onPlatform = false
        const footY = enemy.y - enemy.z
        for (const plat of this.platforms) {
            if (enemy.x > plat.x - plat.w / 2 - 20 && enemy.x < plat.x + plat.w / 2 + 20) {
                if (enemy.vz <= 0 && footY >= plat.y - 15 && footY <= plat.y + 15) {
                    enemy.z = CONFIG.floorY - plat.y
                    enemy.y = CONFIG.floorY
                    enemy.vz = 0
                    enemy.onPlatform = true
                    // Set patrol area based on platform bounds
                    enemy.patrolL = plat.x - plat.w / 2 + 20
                    enemy.patrolR = plat.x + plat.w / 2 - 20
                    return
                }
            }
        }
        enemy.patrolL = null
        enemy.patrolR = null
    }
    checkCombat() {
        const pb = this.player.getCurrentAttackBox()
        if (pb && !this.hasHit) {
            let hit = false,
                crit = this.player.nextCrit
            for (let e of this.enemies)
                if (e.state !== 'DEAD' && Math.abs(this.player.z - e.z) < 50 && Utils.rectIntersect(pb, e.getHitbox())) {
                    const skillDmg = SKILLS_DATA[SaveSystem.data.skills.active]?.dmg || 0
                    let d = (pb.dmg + skillDmg) * SaveSystem.data.stats.dmgMult
                    if (crit) d *= 3.0
                    e.takeDamage(d, this.player.dir * pb.force, this.player)
                    this.spawnDamageText(e.x, e.getDrawY() - e.h / 2, Math.floor(d), crit)
                    this.particles.spawnSkillVFX(e.x, e.getDrawY() - e.h / 2, SaveSystem.data.skills.active)
                    this.triggerHitEffect(e.x, e.getDrawY() - e.h / 2, crit)
                    hit = true
                    this.combo++
                    this.comboT = 4.0
                    this.money += Math.floor(1 + this.combo * 0.2)
                    if (e.state === 'DEAD' && !e._killed) {
                        e._killed = true
                        this.waveKills++
                        this.money += e.type === 'boss' ? 200 : e.type === 'shield' ? 50 : 25
                        const roll = Math.random()
                        const spawnY = e.getDrawY()
                        if (roll < 0.12) this.items.push(new Item(e.x, spawnY, 'hp', this.player.dir))
                        else if (roll < 0.35) this.items.push(new Item(e.x, spawnY, 'star', this.player.dir))
                    }
                }
            if (hit) {
                this.hasHit = true
                this.updateHUD()
            }
        }
        if (!pb) this.hasHit = false
        for (let e of this.enemies) {
            const eb = e.getCurrentAttackBox()
            if (eb && Utils.rectIntersect(eb, this.player.getHitbox())) {
                if (this.player.takeDamage(eb.dmg, e.dir * 300, e)) {
                    this.camera.shake(20, 0.3)
                    this.particles.spawn(this.player.x, this.player.y - this.player.h / 2, '#f00', 20)
                    this.combo = 0
                    this.updateHUD()
                }
            }
        }

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i]
            item.update(0.016)
            if (item.life <= 0) {
                this.items.splice(i, 1)
                continue
            }

            const dist = Math.hypot(this.player.x - item.x, this.player.y - this.player.h / 2 - (item.y - 15))
            if (item.collectDelay <= 0 && dist < 60) {
                if (item.type === 'hp') {
                    this.player.hp = Math.min(this.player.maxHp, this.player.hp + this.player.maxHp * 0.2)
                    this.particles.spawn(this.player.x, this.player.y - 50, '#0f0', 15)
                } else {
                    const bonus = 200 + Math.floor(Math.random() * 300)
                    this.money += bonus
                    this.particles.spawn(this.player.x, this.player.y - 50, '#ff0', 15)
                }
                this.updateHUD()
                audio.playBuy()
                this.items.splice(i, 1)
            }
        }

        if (this.player.state === 'DEAD' && this.state !== 'GAMEOVER') {
            this.state = 'GAMEOVER'
            setTimeout(() => this.gameOver(), 2500)
        }
    }
    updateHUD() {
        const d = SaveSystem.data
        const hp = Math.max(0, (this.player.hp / this.player.maxHp) * 100)
        const hbar = document.getElementById('health-bar')
        if (hbar) {
            hbar.style.width = hp + '%'
            hbar.style.background =
                hp > 30 ? 'linear-gradient(90deg, #0f0, #0a0)' : 'linear-gradient(90deg, #f00, #a00)'
        }
        const htext = document.getElementById('health-text')
        if (htext) htext.innerText = `${Math.ceil(this.player.hp)} / ${this.player.maxHp}`

        if (document.getElementById('stat-atk')) {
            document.getElementById('stat-atk').innerText = Math.round(d.stats.dmgMult * 100) + '%'
            document.getElementById('stat-crit').innerText = Math.round(d.stats.critWindowMult * 100) + '%'
            document.getElementById('stat-dash').innerText = Math.round((1 / d.stats.dashCdMult) * 100) + '%'
        }

        const cur = document.getElementById('currency-display')
        if (cur) cur.innerText = this.money + ' VNĐ'
    }
    updateTimingUI() {
        const ind = document.getElementById('timing-indicator')
        if (ind) ind.style.opacity = 0
    }
    updateShopUI() {
        const d = SaveSystem.data
        document.querySelectorAll('.shop-funds').forEach((el) => (el.innerText = this.money))
        const items = [
            [
                'dmgMult',
                8,
                'dmg',
            ],
            [
                'critWindowMult',
                5,
                'crit',
            ],
            [
                'maxHp',
                1500,
                'hp',
            ],
            [
                'dashCdMult',
                0.2,
                'dash',
            ],
        ]
        items.forEach((i) => {
            const b = document.getElementById('upg-' + i[2])
            if (b) {
                b.disabled = d.stats[i[0]] >= i[1] || this.money < d.costs[i[2]]
                if (d.stats[i[0]] >= i[1]) b.innerText = 'TỐI ĐA'
                else b.innerHTML = `Giá: <span id="cost-${i[2]}">${d.costs[i[2]]}</span> VNĐ`
            }
        })

        const skillContainer = document.getElementById('skills-list')
        if (skillContainer) {
            skillContainer.innerHTML = ''
            for (let v = 1; v <= 6; v++) {
                const id = `vfx${v}`
                const isUnlocked = d.skills.unlocked.includes(id)
                const isActive = d.skills.active === id
                const cost = d.skillCosts[id] || 0

                const card = document.createElement('div')
                card.className = `skill-card ${isActive ? 'active' : ''}`
                card.innerHTML = `
                <div class="skill-preview"><canvas id="preview-${id}"></canvas></div>
                <div class="skill-name">SET BẬC ${v}</div>
                <div class="skill-dmg">ST CỘNG: +${SKILLS_DATA[id].dmg}</div>
                <div class="skill-cost">${isUnlocked ? (isActive ? 'ĐANG DÙNG' : 'ĐÃ SỞ HỮU') : cost + ' VNĐ'}</div>
                <button class="shop-btn skill-btn" id="buy-${id}">
                    ${isActive ? 'ĐANG DÙNG' : isUnlocked ? 'SỬ DỤNG' : `MUA NGAY`}
                </button>
            `
                skillContainer.appendChild(card)

                const canvas = document.getElementById(`preview-${id}`)
                const ctx = canvas.getContext('2d')
                canvas.width = 120
                canvas.height = 120

                let frame = 0
                const animate = () => {
                    if (!this.state || this.state !== 'SHOP' || !document.getElementById(`preview-${id}`)) return
                    ctx.clearRect(0, 0, 120, 120)
                    const imgs = SPRITES[id] ? SPRITES[id][0] : []
                    if (imgs && imgs.length > 0) {
                        const img = imgs[Math.floor(frame) % imgs.length]
                        if (img.complete) {
                            ctx.drawImage(img, 0, 0, 120, 120)
                        }
                    }
                    frame += 0.2
                    requestAnimationFrame(animate)
                }
                animate()

                const btn = document.getElementById(`buy-${id}`)
                btn.disabled = !isUnlocked && this.money < cost
                btn.addEventListener('click', () => {
                    if (isUnlocked) {
                        d.skills.active = id
                        SaveSystem.save()
                        audio.playBuy()
                        this.updateShopUI()
                    } else if (this.money >= cost) {
                        this.money -= cost
                        d.money = this.money
                        d.skills.unlocked.push(id)
                        d.skills.active = id
                        SaveSystem.save()
                        audio.playBuy()
                        this.updateShopUI()
                    }
                })
            }
        }
    }
    openSkills() {
        this._openAnyMenu('skills-menu')
    }
    openUpgrades() {
        this._openAnyMenu('upgrades-menu')
    }
    closeAllMenus() {
        document.getElementById('upgrades-menu').classList.add('hidden')
        document.getElementById('skills-menu').classList.add('hidden')
        this.state = 'GAME'
        document.getElementById('hud').classList.remove('hidden')
        document.getElementById('touch-controls').classList.remove('hidden')
    }
    _openAnyMenu(id) {
        this.state = 'SHOP'
        SaveSystem.data.money = this.money
        SaveSystem.data.wave = this.wave
        SaveSystem.save()
        document.getElementById('hud').classList.add('hidden')
        document.getElementById('touch-controls').classList.add('hidden')
        document.getElementById(id).classList.remove('hidden')
        this.updateShopUI()
    }
    gameOver() {
        this.state = 'OVER'
        SaveSystem.save()
        document.getElementById('hud').classList.add('hidden')
        document.getElementById('touch-controls').classList.add('hidden')
        document.getElementById('game-over-menu').classList.remove('hidden')
        document.getElementById('final-wave').innerText = this.wave - 1
    }

    spawnDamageText(x, y, text, isCrit) {
        if (this.damageTexts.length > 25) this.damageTexts.shift()
        this.damageTexts.push({
            x,
            y,
            text,
            isCrit,
            life: 1.0,
            vx: (Math.random() - 0.5) * 120,
            vy: -180 - Math.random() * 120,
        })
    }

    drawBG() {
        const ctx = this.ctx
        const skyGrad = ctx.createLinearGradient(0, 0, 0, CONFIG.canvasHeight)
        skyGrad.addColorStop(0, '#000510')
        skyGrad.addColorStop(1, '#110520')
        ctx.fillStyle = skyGrad
        ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight)
        const camX = this.camera.x
        if (this.gridPattern) {
            ctx.save()
            ctx.translate(-((camX * 1) % 120), -((this.camera.y * 1) % 80))
            ctx.fillStyle = this.gridPattern
            ctx.fillRect(-200, -200, CONFIG.canvasWidth + 400, CONFIG.canvasHeight + 400)
            ctx.restore()
        }

        ctx.save()
        this.camera.apply(ctx)
        ctx.fillStyle = '#080210'
        for (let i = -5; i < 15; i++) {
            let x = i * 300 - ((camX * 0.1) % 300)
            let h = 200 + Math.sin(i * 123) * 100
            ctx.fillRect(x, CONFIG.floorY - h, 250, h)
        }
        for (let i = -5; i < 20; i++) {
            let x = i * 200 - ((camX * 0.25) % 200)
            let h = 150 + Math.cos(i * 456) * 80
            ctx.fillStyle = '#10051a'
            ctx.fillRect(x, CONFIG.floorY - h, 150, h)
            ctx.fillStyle = i % 2 === 0 ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 0, 255, 0.1)'
            ctx.fillRect(x + 20, CONFIG.floorY - h + 30, 20, 20)
            ctx.fillRect(x + 110, CONFIG.floorY - h + 80, 20, 20)
        }

        ctx.strokeStyle = '#0ff'
        ctx.lineWidth = 4
        ctx.shadowBlur = 5
        ctx.shadowColor = '#0ff'
        // Road drawing removed, replaced by groundSegments in drawLevel()
        ctx.shadowBlur = 0

        this.drawCyberGate(ctx, 0, 'START')

        if (this.exitGateX !== null) {
            this.drawCyberGate(ctx, this.exitGateX, `NEXT: ZONE ${this.wave + 1}`)
        }

        ctx.shadowBlur = 0
        ctx.restore()
    }

    drawLevel() {
        const ctx = this.ctx
        ctx.save()
        this.camera.apply(ctx)

        ctx.fillStyle = '#050a1b'
        ctx.strokeStyle = '#0ff'
        ctx.lineWidth = 2

        const useEffects = this.currentFps > 40

        // Draw ground segments
        for (const s of this.groundSegments) {
            if (s.x + s.w < this.camera.x - 200 || s.x > this.camera.x + CONFIG.canvasWidth + 200) continue
            ctx.fillRect(s.x, CONFIG.floorY, s.w, 2000)
            ctx.strokeRect(s.x, CONFIG.floorY, s.w, 10)

            // Neon edge
            if (useEffects) {
                ctx.save()
                ctx.shadowBlur = 10
                ctx.shadowColor = '#0ff'
                ctx.strokeStyle = '#0ff'
                ctx.beginPath()
                ctx.moveTo(s.x, CONFIG.floorY)
                ctx.lineTo(s.x + s.w, CONFIG.floorY)
                ctx.stroke()
                ctx.restore()
            }
        }

        // Draw platforms
        for (const p of this.platforms) {
            if (p.x + p.w < this.camera.x - 200 || p.x > this.camera.x + CONFIG.canvasWidth + 200) continue
            ctx.fillStyle = p.color
            if (useEffects) {
                ctx.shadowBlur = 15
                ctx.shadowColor = p.color
            }
            ctx.fillRect(p.x - p.w / 2, p.y, p.w, 12)
            ctx.shadowBlur = 0

            // Support pillars
            ctx.strokeStyle = 'rgba(255,255,255,0.2)'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(p.x - p.w / 4, p.y + 12)
            ctx.lineTo(p.x - p.w / 4, CONFIG.floorY)
            ctx.moveTo(p.x + p.w / 4, p.y + 12)
            ctx.lineTo(p.x + p.w / 4, CONFIG.floorY)
            ctx.stroke()
        }

        // Draw traps
        for (const t of this.traps) {
            if (t.x + t.r < this.camera.x - 200 || t.x - t.r > this.camera.x + CONFIG.canvasWidth + 200) continue
            ctx.save()
            ctx.translate(Math.round(t.x), Math.round(CONFIG.floorY - t.z - t.r))
            ctx.rotate(t.angle)

            if (useEffects) {
                ctx.shadowBlur = 10
                ctx.shadowColor = '#f00'
            }

            ctx.fillStyle = '#666'
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 2
            ctx.beginPath()
            for (let i = 0; i < 16; i++) {
                const r = i % 2 === 0 ? t.r : t.r * 0.7
                const a = (i / 16) * Math.PI * 2
                ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
            }
            ctx.closePath()
            ctx.fill()
            ctx.stroke()

            ctx.fillStyle = '#111'
            ctx.beginPath()
            ctx.arc(0, 0, 8, 0, Math.PI * 2)
            ctx.fill()

            ctx.restore()
        }

        ctx.restore()
    }

    drawCyberGate(ctx, x, label) {
        const camX = this.camera.x
        if (x < camX - 1000 || x > camX + CONFIG.canvasWidth + 1000) return

        const alive = this.enemies.filter((e) => e.state !== 'DEAD').length
        const totalInWave = this.waveKills + alive + this.spawnQueue.length
        const isLocked = x !== 0 && (this.waveKills < totalInWave || this.spawnQueue.length > 0 || alive > 0)
        const mainColor = isLocked ? '#f00' : '#f0f'

        ctx.save()
        ctx.translate(Math.round(x), Math.round(CONFIG.floorY))

        const drawGatePillar = (side) => {
            ctx.save()
            ctx.translate(0, side * 150)

            const useEffects = this.currentFps > 45
            if (useEffects) {
                const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 100)
                glow.addColorStop(0, isLocked ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 0, 255, 0.4)')
                glow.addColorStop(1, 'transparent')
                ctx.fillStyle = glow
                ctx.fillRect(-100, -100, 200, 200)
            }

            ctx.strokeStyle = mainColor
            ctx.lineWidth = 12
            if (useEffects) {
                ctx.shadowBlur = 10
                ctx.shadowColor = '#f0f'
            }
            ctx.beginPath()
            ctx.moveTo(0, -100)
            ctx.lineTo(0, 50)
            ctx.stroke()
            ctx.shadowBlur = 0

            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 2
            ctx.strokeRect(-15, -120, 30, 20)
            ctx.strokeRect(-10, 50, 20, 10)

            ctx.fillStyle = Math.sin(performance.now() * 0.01) > 0 ? '#0ff' : '#055'
            ctx.beginPath()
            ctx.arc(0, -110, 4, 0, Math.PI * 2)
            ctx.fill()

            ctx.restore()
        }

        drawGatePillar(1)
        drawGatePillar(-1)

        ctx.strokeStyle = 'rgba(255, 0, 255, 0.6)'
        ctx.lineWidth = 2
        ctx.setLineDash([
            10,
            20,
        ])
        ctx.beginPath()
        ctx.moveTo(0, -150)
        ctx.lineTo(0, 150)
        ctx.stroke()
        ctx.setLineDash([])

        const hue = isLocked ? 0 : (performance.now() * 0.1) % 360
        ctx.fillStyle = isLocked ? '#f00' : `hsl(${hue}, 100%, 70%)`
        if (this.currentFps > 45) {
            ctx.shadowBlur = 15
            ctx.shadowColor = isLocked ? '#f00' : `hsl(${hue}, 100%, 50%)`
        }
        ctx.font = 'bold 36px "Montserrat", sans-serif'
        ctx.textAlign = 'center'

        const bounce = Math.sin(performance.now() * 0.005) * 10
        const displayLabel = isLocked ? 'PHONG ẤN - DIỆT HẾT QUÁI' : label
        ctx.fillText(displayLabel, 0, -180 + bounce)

        ctx.shadowBlur = 0
        ctx.restore()
    }

    loop(t) {
        let dtRaw = (t - this.lastT) / 1000
        if (dtRaw < 1 / (CONFIG.fps + 5)) {
            requestAnimationFrame((t) => this.loop(t))
            return
        }
        let dt = Math.min(0.05, dtRaw)
        this.lastT = t

        this.frameCount++
        if (t - this.lastFpsTime >= 1000) {
            this.currentFps = Math.min(CONFIG.fps, this.frameCount)
            this.frameCount = 0
            this.lastFpsTime = t
            const fpsEl = document.getElementById('fps-display')
            if (fpsEl) {
                fpsEl.innerText = `FPS: ${this.currentFps}`
                if (this.currentFps < 30) fpsEl.style.color = '#f00'
                else if (this.currentFps < 50) fpsEl.style.color = '#ff0'
                else fpsEl.style.color = '#0f0'
            }
        }

        this.input.update()
        if (this.state !== 'GAME') {
            this._updateMenuNavigation(dt)
        }
        if (this.state === 'GAME' || this.state === 'GAMEOVER') {
            let ldt = dt * this.timeScale
            if (this.hitStop > 0) {
                this.hitStop -= dt
                ldt = 0
            }
            if (ldt > 0 || this.state === 'GAMEOVER') {
                this._checkPlatformCollision()
                this.player.update(this.state === 'GAMEOVER' ? dt : ldt, this.input, this.particles)
                if (this.state === 'GAME') {
                    if (this.hasPlayerMoved) {
                        this.enemies.forEach((e) => {
                            e.update(ldt, this.player)
                            this._checkEnemyPlatformCollision(e)
                        })

                        // Update and check traps
                        for (const t of this.traps) {
                            t.angle += t.speed * ldt
                            if (this.player.state !== 'DEAD' && this.player.state !== 'DASH') {
                                const trapY = CONFIG.floorY - t.z - t.r
                                const dist = Math.hypot(
                                    this.player.x - t.x,
                                    this.player.getDrawY() - this.player.h / 2 - trapY,
                                )
                                if (dist < t.r + 20) {
                                    if (this.player.takeDamage(250, this.player.x > t.x ? 400 : -400)) {
                                        this.camera.shake(15, 0.2)
                                        this.particles.spawn(t.x, trapY, '#f00', 10)
                                        this.updateHUD()
                                    }
                                }
                            }
                        }
                    }
                    this.particles.update(ldt)
                    this.checkCombat()
                    if (this.combo > 0) {
                        this.comboT -= ldt
                        if (this.comboT <= 0) {
                            this.combo = 0
                            this.updateHUD()
                        }
                    }
                    const alive = this.enemies.filter((e) => e.state !== 'DEAD').length
                    const maxOnScreen = Math.min(3 + Math.floor(this.wave * 0.2), 8)
                    if (this.hasPlayerMoved && this.spawnQueue.length > 0 && alive < maxOnScreen) {
                        this.spawnTimer -= ldt
                        if (this.spawnTimer <= 0) {
                            this._spawnOneEnemy(this.spawnQueue.shift())
                            this.spawnTimer = Math.max(0.8, 3.5 - this.wave * 0.08)
                        }
                    }

                    this.projectiles.forEach((p) => {
                        p.x += p.vx * ldt
                        p.y += p.vy * ldt
                        p.life -= ldt
                        if (Utils.rectIntersect({ x: p.x - 5, y: p.y - 5, w: 10, h: 10 }, this.player.getHitbox())) {
                            if (this.player.takeDamage(p.dmg, p.vx > 0 ? 300 : -300)) {
                                p.life = 0
                                this.camera.shake(15, 0.2)
                            }
                        }
                    })
                    this.projectiles = this.projectiles.filter((p) => p.life > 0)

                    const currentAlive = this.enemies.filter((e) => e.state !== 'DEAD').length
                    const totalInWave = this.waveKills + currentAlive + this.spawnQueue.length

                    const isWaveCleared =
                        this.waveKills >= totalInWave && this.spawnQueue.length === 0 && currentAlive === 0

                    const gateHint = document.getElementById('gate-hint')
                    if (isWaveCleared && this.player.state !== 'DEAD') {
                        // Hiện chỉ dẫn nếu ở xa cổng (>400px)
                        const distToGate = Math.abs(this.player.x - this.exitGateX)
                        if (gateHint) {
                            if (distToGate > 400) gateHint.classList.remove('hidden')
                            else gateHint.classList.add('hidden')
                        }

                        if (!this._gateVibrationTriggered) {
                            this.camera.shake(10, 0.4)
                            audio.playSynth('square', 200, 0.5, 0.2, 800)
                            this._gateVibrationTriggered = true
                        }
                    } else if (gateHint) {
                        gateHint.classList.add('hidden')
                    }

                    if (isWaveCleared && this.player.x > this.exitGateX - 50) {
                        this._nextWave()
                    }
                }
                this.enemies = this.enemies.filter((e) => e.state !== 'DEAD' || e.stateTime < 1.5)
                this.camera.update(dt, this.player)
                this.updateTimingUI()
            }
        }
        this.drawBG()
        this.drawLevel()
        this.ctx.save()
        this.camera.apply(this.ctx)
        if (this.state === 'GAME' || this.state === 'GAMEOVER' || this.state === 'OVER') {
            this._entitiesList.length = 0
            for (let i = 0; i < this.enemies.length; i++) this._entitiesList.push(this.enemies[i])
            this._entitiesList.push(this.player)
            for (let i = 0; i < this.items.length; i++) this._entitiesList.push(this.items[i])

            this._entitiesList.sort((a, b) => a.y - b.y)

            const useShadow = this.currentFps > 40

            for (let i = 0; i < this._entitiesList.length; i++) {
                const ent = this._entitiesList[i]
                if (ent.x > this.camera.x - 200 && ent.x < this.camera.x + CONFIG.canvasWidth + 200) {
                    if (!useShadow) {
                        const oldSB = this.ctx.shadowBlur
                        this.ctx.shadowBlur = 0
                        ent.draw(this.ctx)
                        this.ctx.shadowBlur = oldSB
                    } else {
                        ent.draw(this.ctx)
                    }
                }
            }
            this.particles.draw(this.ctx, Entity.drawEntity)

            if (this.projectiles.length > 0) {
                this.ctx.save()
                this.ctx.shadowBlur = useShadow ? 8 : 0
                for (let i = 0; i < this.projectiles.length; i++) {
                    const p = this.projectiles[i]
                    this.ctx.fillStyle = p.color || '#fff'
                    this.ctx.shadowColor = p.color || '#fff'
                    this.ctx.beginPath()
                    this.ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
                    this.ctx.fill()
                }
                this.ctx.restore()
            }

            this.ctx.save()
            this.ctx.textAlign = 'center'
            for (let i = this.damageTexts.length - 1; i >= 0; i--) {
                const dt = this.damageTexts[i]
                const alpha = Math.min(1, dt.life * 2)
                this.ctx.globalAlpha = alpha

                if (dt.isCrit) {
                    this.ctx.fillStyle = '#ff0'
                    this.ctx.shadowBlur = 10
                    this.ctx.shadowColor = '#f0f'
                    this.ctx.font = 'bold 26px "Montserrat", sans-serif'
                } else {
                    this.ctx.fillStyle = '#fff'
                    this.ctx.shadowBlur = 0
                    this.ctx.font = 'bold 18px "Montserrat", sans-serif'
                }

                this.ctx.fillText(dt.text, Math.round(dt.x), Math.round(dt.y))

                const ldt = 0.016
                dt.x += dt.vx * ldt
                dt.y += dt.vy * ldt
                dt.vy += 450 * ldt
                dt.life -= ldt
                if (dt.life <= 0) this.damageTexts.splice(i, 1)
            }
            this.ctx.restore()

            if (this.combo > 1) {
                const ctx = this.ctx
                ctx.save()
                ctx.textAlign = 'center'
                ctx.font = '800 24px "Inter", sans-serif'
                ctx.fontStyle = 'italic'

                const floatUp = (4.0 - this.comboT) * 20
                ctx.globalAlpha = Math.min(1, this.comboT * 1.5)

                const pulse = 1 + Math.sin(performance.now() * 0.01) * 0.05
                ctx.translate(this.player.x, this.player.getDrawY() - this.player.h - 20 - floatUp)
                ctx.scale(pulse, pulse)

                ctx.shadowBlur = 5
                ctx.shadowColor = this.player.isCritWindow ? '#f0f' : '#ff0'
                ctx.fillStyle = this.player.isCritWindow ? '#f0f' : '#ff0'

                ctx.transform(1, 0, -0.2, 1, 0, 0)
                ctx.fillText('x' + this.combo + ' COMBO', 0, 0)
                ctx.restore()
            }

            // Đoạn code vẽ chữ hướng dẫn cũ đã được thay thế bằng hệ thống gate-hint trong HUD
        }
        this.ctx.restore()

        if (this.state === 'GAME') {
            this.enemies
                .filter((e) => e.state !== 'DEAD')
                .forEach((e) => {
                    const relX = e.x - this.camera.x
                    const margin = 40
                    if (relX < -20 || relX > this.canvas.width + 20) {
                        const edgeX = relX < 0 ? margin : this.canvas.width - margin
                        const edgeY = Utils.clamp(e.y - 50, margin, this.canvas.height - margin)

                        this.ctx.save()
                        this.ctx.fillStyle = e.color
                        this.ctx.shadowBlur = 5
                        this.ctx.shadowColor = e.color

                        this.ctx.beginPath()
                        if (relX < 0) {
                            this.ctx.moveTo(edgeX + 20, edgeY - 12)
                            this.ctx.lineTo(edgeX, edgeY)
                            this.ctx.lineTo(edgeX + 20, edgeY + 12)
                        } else {
                            this.ctx.moveTo(edgeX - 20, edgeY - 12)
                            this.ctx.lineTo(edgeX, edgeY)
                            this.ctx.lineTo(edgeX - 20, edgeY + 12)
                        }
                        this.ctx.fill()

                        this.ctx.globalAlpha = 0.5 + Math.sin(performance.now() * 0.01) * 0.5
                        this.ctx.strokeStyle = '#fff'
                        this.ctx.lineWidth = 2
                        this.ctx.stroke()
                        this.ctx.restore()
                    }
                })
        }

        this.projectiles.forEach((p) => {
            this.ctx.save()
            this.ctx.translate(-this.camera.x, 0)
            this.ctx.fillStyle = p.color || '#fff'
            this.ctx.shadowBlur = 5
            this.ctx.shadowColor = p.color || '#fff'
            this.ctx.fillRect(p.x - 6, p.y - 4, 12, 8)
            this.ctx.restore()
        })

        if (this.hitStop > 0) {
            this.ctx.fillStyle = 'rgba(255,255,255,0.15)'
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
        requestAnimationFrame((t) => this.loop(t))
    }

    _updateMenuNavigation(dt) {
        if (this.menuCooldown > 0) {
            this.menuCooldown -= dt
            return
        }

        let buttons = []
        let container = null
        let highlightClass = 'btn-highlight'

        if (this.state === 'MENU') {
            if (!document.getElementById('instructions-menu').classList.contains('hidden')) {
                container = document.getElementById('instructions-menu')
                buttons = Array.from(container.querySelectorAll('button:not(.hidden)'))
            } else if (!document.getElementById('main-menu').classList.contains('hidden')) {
                container = document.getElementById('main-menu')
                buttons = Array.from(container.querySelectorAll('button:not(.hidden)'))
            }
        } else if (this.state === 'SHOP') {
            if (!document.getElementById('upgrades-menu').classList.contains('hidden')) {
                container = document.getElementById('upgrades-menu')
                buttons = Array.from(container.querySelectorAll('button.shop-btn:not(.hidden)'))
            } else if (!document.getElementById('skills-menu').classList.contains('hidden')) {
                container = document.getElementById('skills-menu')
                buttons = Array.from(container.querySelectorAll('button.skill-btn:not(.hidden)'))
                highlightClass = 'card-highlight'
            }
        } else if (this.state === 'OVER') {
            if (!document.getElementById('game-over-menu').classList.contains('hidden')) {
                container = document.getElementById('game-over-menu')
                buttons = Array.from(container.querySelectorAll('button:not(.hidden)'))
            }
        } else if (this.state === 'VICTORY') {
            if (!document.getElementById('victory-menu').classList.contains('hidden')) {
                container = document.getElementById('victory-menu')
                buttons = Array.from(container.querySelectorAll('button:not(.hidden)'))
            }
        }

        if (!container || buttons.length === 0) return

        if (container.id !== this.lastMenuContainerId) {
            this.menuIndex = 0
            this.lastMenuContainerId = container.id
            
            // Dọn dẹp highlight cũ
            document.querySelectorAll('.btn-highlight, .card-highlight').forEach(el => {
                el.classList.remove('btn-highlight', 'card-highlight')
            })
        }

        const moveY = this.input.getAxisY()
        const moveX = this.input.getAxisX()

        // Handle index wrap
        if (Math.abs(moveY) > 0.5 || Math.abs(moveX) > 0.5) {
            const dir = moveY !== 0 ? Math.sign(moveY) : Math.sign(moveX)
            this.menuIndex = (this.menuIndex + dir + buttons.length) % buttons.length
            this.menuCooldown = 0.2
            audio.playClick()
        }

        // Highlight
        buttons.forEach((btn, i) => {
            const target = highlightClass === 'card-highlight' ? (btn.closest('.skill-card') || btn) : btn
            if (i === this.menuIndex) {
                target.classList.add(highlightClass)
            } else {
                target.classList.remove(highlightClass)
            }
        })

        // Select
        if (this.input.keys['Enter']) {
            this.input.keys['Enter'] = false
            buttons[this.menuIndex].click()
            this.menuCooldown = 0.3
        }
    }
}
