// SAVE SYSTEM
const SaveSystem = {
    data: {
        money: 0,
        wave: 1,
        stats: { dmgMult: 1, critWindowMult: 1, maxHp: 3000, dashCdMult: 1 },
        costs: { dmg: 50, crit: 75, hp: 100, dash: 60 },
        skills: { unlocked: ['vfx1'], active: 'vfx1' },
        skillCosts: { vfx2: 500, vfx3: 1000, vfx4: 2000, vfx5: 4000, vfx6: 8000 },
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
            }
        } catch (e) {}
    },
    reset() {
        this.data = {
            money: 0,
            wave: 1,
            stats: { dmgMult: 1, critWindowMult: 1, maxHp: 3000, dashCdMult: 1 },
            costs: { dmg: 50, crit: 75, hp: 100, dash: 60 },
            skills: { unlocked: ['vfx1'], active: 'vfx1' },
            skillCosts: { vfx2: 500, vfx3: 1000, vfx4: 2000, vfx5: 4000, vfx6: 8000 },
        }
        this.save()
    },
}
