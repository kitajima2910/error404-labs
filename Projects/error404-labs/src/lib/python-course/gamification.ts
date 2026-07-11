// Gamification logic — XP, streak, rewards

// ─── XP ───────────────────────────────────────────────────────────────────

const XP_TABLE: Record<string, number> = {
    easy: 10,
    medium: 20,
    hard: 30,
}

/**
 * Tính số XP thưởng dựa trên độ khó của lesson
 *
 * @param difficulty  'easy' | 'medium' | 'hard'
 * @param overrideXp  Nếu có, dùng giá trị này thay vì tra bảng
 */
export function calculateXp(difficulty: 'easy' | 'medium' | 'hard', overrideXp?: number): number {
    if (overrideXp !== undefined && overrideXp > 0) {
        return overrideXp
    }
    return XP_TABLE[difficulty] ?? 10
}

// ─── Streak ───────────────────────────────────────────────────────────────

export interface StreakResult {
    /** Streak hiện tại sau khi tính */
    current: number
    /** Streak dài nhất từ trước đến nay */
    longest: number
    /** Streak mới sau khi áp dụng logic */
    newStreak: number
}

/**
 * Tính streak dựa trên ngày học cuối cùng
 *
 * Quy tắc:
 *   - Nếu lastDate là hôm qua: streak ++
 *   - Nếu lastDate là hôm nay: giữ nguyên
 *   - Khác (null hoặc xa hơn): reset về 1
 *
 * @param lastDate Ngày học cuối cùng (YYYY-MM-DD) hoặc null
 * @param currentStreak  Streak hiện tại (mặc định 0)
 * @param longestStreak  Streak dài nhất (mặc định 0)
 */
export function calculateStreak(
    lastDate: string | null,
    currentStreak: number = 0,
    longestStreak: number = 0
): StreakResult {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    let newStreak: number

    if (!lastDate) {
        // Chưa từng học — bắt đầu streak mới
        newStreak = 1
    } else if (lastDate === todayStr) {
        // Đã học hôm nay — giữ nguyên
        newStreak = currentStreak || 1
    } else if (lastDate === yesterdayStr) {
        // Học hôm qua — nối tiếp
        newStreak = (currentStreak || 0) + 1
    } else {
        // Ngắt quãng — reset
        newStreak = 1
    }

    const longest = Math.max(newStreak, longestStreak)

    return {
        current: newStreak,
        longest,
        newStreak,
    }
}
