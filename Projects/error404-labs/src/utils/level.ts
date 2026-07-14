// Level system — tính level từ XP, badge config
// Công thức: level = floor(sqrt(totalXp / 100)) + 1
// Level 1: 0 XP | Level 2: 100 XP | Level 3: 400 XP | Level 4: 900 XP | Level 5: 1600 XP ...

export interface LevelInfo {
    level: number
    currentXp: number
    xpForNext: number
    xpInLevel: number      // XP đã đạt được trong level hiện tại
    xpRequiredForLevel: number // Tổng XP cần để đạt level này
    progress: number       // 0–1, tiến trình trong level
}

/**
 * Tính level từ total XP.
 * Công thức: level = floor(sqrt(xp / 100)) + 1
 * Đảo ngược: xpRequiredForLevel(level) = 100 * (level - 1)^2
 */
export function calculateLevel(totalXp: number): LevelInfo {
    const level = Math.floor(Math.sqrt(totalXp / 100)) + 1
    const xpRequiredForLevel = 100 * (level - 1) * (level - 1)
    const xpForNext = 100 * level * level
    const xpInLevel = totalXp - xpRequiredForLevel
    const xpNeeded = xpForNext - xpRequiredForLevel

    return {
        level,
        currentXp: totalXp,
        xpForNext,
        xpInLevel,
        xpRequiredForLevel,
        progress: xpNeeded > 0 ? Math.min(xpInLevel / xpNeeded, 1) : 1,
    }
}

/** Level badge config — màu sắc + icon theo level */
export interface LevelBadge {
    color: string       // Tailwind gradient classes
    icon: string        // Emoji
    title: string       // Danh hiệu
}

export const LEVEL_BADGES: Record<number, LevelBadge> = {
    1:  { color: 'from-slate-400 to-slate-500',        icon: '🥚', title: 'Python Beginner' },
    2:  { color: 'from-green-400 to-emerald-500',      icon: '🐣', title: 'Python Coder' },
    3:  { color: 'from-cyan-400 to-blue-500',          icon: '🐤', title: 'Python Developer' },
    4:  { color: 'from-blue-500 to-indigo-600',        icon: '🐦', title: 'Python Programmer' },
    5:  { color: 'from-indigo-500 to-purple-600',      icon: '🦅', title: 'Python Ninja' },
    6:  { color: 'from-purple-500 to-pink-600',        icon: '🦉', title: 'Python Master' },
    7:  { color: 'from-pink-500 to-rose-600',          icon: '🐉', title: 'Python Guru' },
    8:  { color: 'from-rose-500 to-red-600',           icon: '🦄', title: 'Python Legend' },
    9:  { color: 'from-amber-500 to-orange-600',       icon: '👑', title: 'Python King' },
    10: { color: 'from-yellow-400 to-amber-500',       icon: '🌟', title: 'Python God' },
}

export function getLevelBadge(level: number): LevelBadge {
    if (level >= 10) return LEVEL_BADGES[10]
    return LEVEL_BADGES[level] || LEVEL_BADGES[1]
}
