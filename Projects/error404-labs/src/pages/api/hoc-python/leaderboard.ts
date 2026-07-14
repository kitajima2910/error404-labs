import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import { verifyAuth } from '../../../utils/auth'
import { calculateLevel, getLevelBadge } from '../../../utils/level'

export const prerender = false

export const GET: APIRoute = async ({ request }) => {
    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) throw new Error('No DATABASE_URL')
        const sql = neon(dbUrl)

        // Xác thực (tuỳ chọn — leaderboard public được nhưng có auth thì biết mình đứng đâu)
        const user = await verifyAuth(request)

        // Weekly leaderboard: tổng XP của user trong 7 ngày qua
        // Dựa vào py_lesson_progress.completed_at + py_lessons.xp_reward
        const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString()

        const rows = await sql`
            WITH weekly_xp AS (
                SELECT
                    lp.user_id,
                    COALESCE(SUM(l.xp_reward), 0)::int AS week_xp
                FROM error404labs.py_lesson_progress lp
                JOIN error404labs.py_lessons l ON l.id = lp.lesson_id
                WHERE lp.status = 'completed'
                  AND lp.completed_at >= ${weekAgo}::timestamptz
                GROUP BY lp.user_id
            ),
            user_ranks AS (
                SELECT
                    wx.user_id,
                    wx.week_xp,
                    p.total_xp,
                    p.current_streak,
                    ROW_NUMBER() OVER (ORDER BY wx.week_xp DESC) AS rank
                FROM weekly_xp wx
                JOIN error404labs.py_profiles p ON p.id = wx.user_id
            )
            SELECT
                ur.rank,
                ur.user_id,
                ur.week_xp,
                ur.total_xp,
                ur.current_streak
            FROM user_ranks ur
            ORDER BY ur.rank ASC
            LIMIT 30
        `

        // Lấy thông tin member name
        const userIds = rows.map((r: any) => r.user_id)
        let memberMap: Record<number, string> = {}

        if (userIds.length > 0) {
            const members = await sql`
                SELECT id, member FROM error404labs.members
                WHERE id = ANY(${userIds}::int[])
            `
            for (const m of members as any[]) {
                memberMap[m.id] = m.member
            }
        }

        const leaderboard = rows.map((r: any) => {
            const levelInfo = calculateLevel(r.total_xp)
            const badge = getLevelBadge(levelInfo.level)
            return {
                rank: r.rank,
                userId: r.user_id,
                member: memberMap[r.user_id] || 'Unknown',
                weekXp: r.week_xp,
                totalXp: r.total_xp,
                streak: r.current_streak,
                level: levelInfo.level,
                badge: {
                    icon: badge.icon,
                    color: badge.color,
                    title: badge.title,
                },
            }
        })

        // Tìm rank của user hiện tại (nếu đã login)
        let myRank = null
        if (user) {
            const myRow = rows.find((r: any) => r.user_id === user.id)
            if (myRow) {
                myRank = myRow.rank
            } else {
                // User không có XP trong tuần này
                myRank = null
            }
        }

        return new Response(JSON.stringify({
            weekStart: weekAgo,
            leaderboard,
            myRank,
            totalParticipants: rows.length,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        })
    } catch (error: any) {
        console.error('[Leaderboard Error]:', error)
        return new Response(JSON.stringify({ error: 'Lỗi hệ thống' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
