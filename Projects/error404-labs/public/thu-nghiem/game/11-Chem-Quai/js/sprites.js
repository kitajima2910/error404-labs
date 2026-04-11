// SPRITES MANAGER
const SPRITES = {
    idle: [],
    run: [],
    hurt: null,
    dead: [],
    attack: [],
    vfx1: [],
    vfx2: [],
    vfx3: [],
    vfx4: [],
    vfx5: [],
    vfx6: [],
    loaded: false,
    load() {
        if (this.loaded) return
        let loadedCount = 0
        const vfxCount = 6
        const totalToLoad = 5 + 8 + 1 + 8 + 5 + vfxCount * 4
        const check = () => {
            loadedCount++
            if (loadedCount >= totalToLoad) this.loaded = true
        }

        this.idle[0] = []
        for (let c = 0; c < 5; c++) {
            const img = new Image()
            img.src = `assets/p-idle/sprite_${c}.png`
            img.onload = check
            img.onerror = check
            this.idle[0].push(img)
        }

        this.run[0] = []
        for (let c = 0; c < 8; c++) {
            const img = new Image()
            img.src = `assets/p-run/sprite_${c}.png`
            img.onload = check
            img.onerror = check
            this.run[0].push(img)
        }

        this.hurt = new Image()
        this.hurt.src = 'assets/p-hurt/sprite_0.png'
        this.hurt.onload = check
        this.hurt.onerror = check

        this.dead[0] = []
        for (let c = 0; c < 8; c++) {
            const img = new Image()
            img.src = `assets/p-dead/sprite_${c}.png`
            img.onload = check
            img.onerror = check
            this.dead[0].push(img)
        }

        this.attack[0] = []
        for (let c = 0; c < 5; c++) {
            const img = new Image()
            img.src = `assets/p-attack/sprite_${c}.png`
            img.onload = check
            img.onerror = check
            this.attack[0].push(img)
        }

        for (let v = 1; v <= 6; v++) {
            this[`vfx${v}`][0] = []
            for (let c = 1; c <= 4; c++) {
                const img = new Image()
                img.src = `assets/p-skill-vfx${v}/lightning_skill${v}_frame${c}.png`
                img.onload = check
                img.onerror = check
                this[`vfx${v}`][0].push(img)
            }
        }
    },
}
