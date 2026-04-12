// SAVE SYSTEM
const SaveSystem = {
    data: {
        money: 0,
        wave: 1,
        stats: { dmgMult: 1, critWindowMult: 1, maxHp: 3000, dashCdMult: 1 },
        costs: { dmg: 500, crit: 750, hp: 1000, dash: 600 },
        skills: { unlocked: ['vfx1'], active: 'vfx1' },
        skillCosts: { vfx2: 5000, vfx3: 10000, vfx4: 20000, vfx5: 40000, vfx6: 80000 },
    },
    save() {
        localStorage.setItem('neonStrikerSave', JSON.stringify(this.data))
    },
    load() {
        try {
            const s = localStorage.getItem('neonStrikerSave')
            if (s) {
                const parsed = JSON.parse(s)
                this.data = { ...this.data, ...parsed }
                if (this.data.stats.maxHp < 3000) this.data.stats.maxHp = 3000
                // Force update costs for existing players
                if (this.data.costs.dmg < 500) this.data.costs.dmg = 500
                if (this.data.costs.crit < 750) this.data.costs.crit = 750
                if (this.data.costs.hp < 1000) this.data.costs.hp = 1000
                if (this.data.costs.dash < 600) this.data.costs.dash = 600
                if (this.data.skillCosts.vfx2 < 5000) {
                    this.data.skillCosts = { vfx2: 5000, vfx3: 10000, vfx4: 20000, vfx5: 40000, vfx6: 80000 }
                }
            }
        } catch (e) {}
    },
    reset() {
        this.data = {
            money: 0,
            wave: 1,
            stats: { dmgMult: 1, critWindowMult: 1, maxHp: 3000, dashCdMult: 1 },
            costs: { dmg: 500, crit: 750, hp: 1000, dash: 600 },
            skills: { unlocked: ['vfx1'], active: 'vfx1' },
            skillCosts: { vfx2: 5000, vfx3: 10000, vfx4: 20000, vfx5: 40000, vfx6: 80000 },
        }
        this.save()
    },
}
