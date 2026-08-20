import type { NeonQueryFunction } from '@neondatabase/serverless'

/**
 * Kiểm tra và unlock achievements cho user sau khi hoàn thành bài học.
 * Gọi sau khi đã award XP + update streak.
 */
export async function checkAchievements(userId: number, sql: NeonQueryFunction<false, false>): Promise<string[]> {
    const unlocked: string[] = []

    // Lấy profile + tổng số bài đã hoàn thành
    const [profile] = await sql`
        SELECT total_xp, current_streak FROM error404labs.py_profiles WHERE id = ${userId}
    `
    if (!profile) return unlocked

    const totalXp = profile.total_xp ?? 0
    const streak = profile.current_streak ?? 0

    const [completedCount] = await sql`
        SELECT COUNT(*)::int AS cnt FROM error404labs.py_lesson_progress
        WHERE user_id = ${userId} AND status = 'completed'
    `
    const lessonsDone = completedCount?.cnt ?? 0

    // Tìm achievements chưa đạt mà đã thoả mãn điều kiện
    const newAchievements = await sql`
        SELECT a.id, a.code, a.title, a.criteria_type, a.criteria_value
        FROM error404labs.py_achievements a
        WHERE NOT EXISTS (
            SELECT 1 FROM error404labs.py_user_achievements ua
            WHERE ua.user_id = ${userId} AND ua.achievement_id = a.id
        )
        AND (
            (a.criteria_type = 'xp_total' AND ${totalXp} >= a.criteria_value)
            OR (a.criteria_type = 'streak' AND ${streak} >= a.criteria_value)
            OR (a.criteria_type = 'lessons_completed' AND ${lessonsDone} >= a.criteria_value)
        )
    `

    for (const ach of newAchievements as any[]) {
        await sql`
            INSERT INTO error404labs.py_user_achievements (user_id, achievement_id)
            VALUES (${userId}, ${ach.id})
            ON CONFLICT (user_id, achievement_id) DO NOTHING
        `
        unlocked.push(ach.code)
    }

    return unlocked
}
