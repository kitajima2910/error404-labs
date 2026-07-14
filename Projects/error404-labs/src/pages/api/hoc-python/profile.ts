import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import { verifyAuth } from '../../../utils/auth'
import { calculateLevel, getLevelBadge } from '../../../utils/level'

export const prerender = false

export const GET: APIRoute = async ({ request }) => {
    const origin = request.headers.get('origin')
    const allowed = ['https://www.error404-labs.info.vn', 'https://error404-labs.info.vn', 'http://localhost:4321', 'http://127.0.0.1:4321']
    if (origin && !allowed.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const user = await verifyAuth(request)
    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) throw new Error('No DATABASE_URL')
        const sql = neon(dbUrl)

        // Lấy profile
        const profile = (
            await sql`
                SELECT total_xp, current_streak, longest_streak, last_learning_date
                FROM error404labs.py_profiles
                WHERE id = ${user.id}
            `
        )[0]

        const totalXp = profile?.total_xp ?? 0
        const currentStreak = profile?.current_streak ?? 0
        const longestStreak = profile?.longest_streak ?? 0
        const lastLearningDate = profile?.last_learning_date ?? null

        // Level info
        const levelInfo = calculateLevel(totalXp)
        const badge = getLevelBadge(levelInfo.level)

        // Đếm số bài đã hoàn thành
        const completedLessons = await sql`
            SELECT COUNT(*)::int AS cnt
            FROM error404labs.py_lesson_progress
            WHERE user_id = ${user.id} AND status = 'completed'
        `

        // Tổng số bài trong tất cả khoá học published
        const totalAvailable = await sql`
            SELECT COUNT(*)::int AS cnt
            FROM error404labs.py_lessons l
            JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
            JOIN error404labs.py_courses c ON c.id = ch.course_id
            WHERE l.published = true AND c.published = true
        `

        // Lấy thành tích đã đạt được
        const earnedAchievements = await sql`
            SELECT a.code, a.title, a.description, a.icon, ua.earned_at
            FROM error404labs.py_user_achievements ua
            JOIN error404labs.py_achievements a ON a.id = ua.achievement_id
            WHERE ua.user_id = ${user.id}
            ORDER BY ua.earned_at ASC
        `

        // Lấy tất cả achievements (kể cả chưa đạt) để FE có thể show "gợi ý"
        const allAchievements = await sql`
            SELECT code, title, description, icon, criteria_type, criteria_value
            FROM error404labs.py_achievements
            ORDER BY criteria_value ASC
        `

        // Map achievements: đánh dấu cái nào đã đạt
        const earnedCodes = new Set(earnedAchievements.map((a: any) => a.code))
        const achievements = allAchievements.map((a: any) => ({
            ...a,
            earned: earnedCodes.has(a.code),
            earnedAt: earnedAchievements.find((e: any) => e.code === a.code)?.earned_at ?? null,
        }))

        return new Response(JSON.stringify({
            userId: user.id,
            member: user.member,
            level: levelInfo.level,
            badge: {
                color: badge.color,
                icon: badge.icon,
                title: badge.title,
            },
            xp: {
                total: totalXp,
                currentLevelXp: levelInfo.xpInLevel,
                xpForNextLevel: levelInfo.xpForNext,
                progress: levelInfo.progress,
            },
            streak: {
                current: currentStreak,
                longest: longestStreak,
                lastDate: lastLearningDate,
            },
            lessons: {
                completed: completedLessons[0]?.cnt ?? 0,
                total: totalAvailable[0]?.cnt ?? 0,
            },
            achievements,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        })
    } catch (error: any) {
        console.error('[Profile Error]:', error)
        return new Response(JSON.stringify({ error: 'Lỗi hệ thống' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
