import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import { verifyAuth } from '../../../utils/auth'
import { calculateLevel, getLevelBadge } from '../../../utils/level'

export const prerender = false

export const GET: APIRoute = async ({ url, request }) => {
    try {
        // Xác thực JWT
        const user = await verifyAuth(request)
        if (!user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        const userId = user.id

        const courseSlug = url.searchParams.get('courseSlug')

        if (!courseSlug) {
            return new Response(
                JSON.stringify({ error: 'Thiếu tham số courseSlug' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        }

        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) {
            return new Response(JSON.stringify({ error: 'Server configuration error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const sql = neon(dbUrl)

        // Lấy course ID
        const course = (
            await sql`
                SELECT id, title FROM error404labs.py_courses WHERE slug = ${courseSlug} AND published = true
            `
        )[0]

        if (!course) {
            return new Response(JSON.stringify({ error: 'Khóa học không tồn tại' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        // Lấy user level
        const profile = (
            await sql`
                SELECT total_xp, current_streak
                FROM error404labs.py_profiles
                WHERE id = ${userId}
            `
        )[0]

        const totalXp = profile?.total_xp ?? 0
        const currentStreak = profile?.current_streak ?? 0
        const levelInfo = calculateLevel(totalXp)
        const userLevel = levelInfo.level
        const badge = getLevelBadge(userLevel)

        // Lấy chapters có min_level
        const chapters = await sql`
            SELECT id, order_index, min_level
            FROM error404labs.py_chapters
            WHERE course_id = ${course.id}
            ORDER BY order_index ASC
        `

        // Map chapter_id → min_level
        const chapterMinLevel: Record<string, number> = {}
        for (const ch of chapters as any[]) {
            chapterMinLevel[ch.id] = ch.min_level ?? 0
        }

        // Lấy tất cả lessons trong course kèm progress + chapter min_level
        const lessons = await sql`
            SELECT
                l.slug,
                l.order_index,
                l.lesson_type,
                ch.id AS chapter_id,
                ch.order_index AS chapter_order,
                COALESCE(p.status, 'locked') AS status
            FROM error404labs.py_lessons l
            JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
            LEFT JOIN error404labs.py_lesson_progress p
                ON p.lesson_id = l.id AND p.user_id = ${userId}
            WHERE ch.course_id = ${course.id}
            AND l.published = true
            ORDER BY ch.order_index ASC, l.order_index ASC
        `

        // Build progress map: { [lessonSlug]: status }
        const progress: Record<string, string> = {}
        let previousCompleted = true

        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i]
            const dbStatus = lesson.status
            const chapterId = lesson.chapter_id
            const minLevel = chapterMinLevel[chapterId] ?? 0

            // Gating: chapter yêu cầu level > user level → locked
            if (minLevel > userLevel) {
                progress[lesson.slug] = 'level_locked'
                previousCompleted = false
                continue
            }

            // Logic locking: lesson bị locked nếu lesson trước chưa completed
            if (dbStatus === 'locked' && !previousCompleted && i > 0) {
                progress[lesson.slug] = 'locked'
            } else {
                progress[lesson.slug] = dbStatus
            }

            // Cập nhật previousCompleted cho lesson kế tiếp
            if (progress[lesson.slug] === 'completed') {
                previousCompleted = true
            } else if (i === 0) {
                previousCompleted = true
            } else {
                previousCompleted = false
            }
        }

        // Lesson đầu tiên luôn unlocked (nếu không bị level lock)
        if (lessons.length > 0 && progress[lessons[0].slug] === 'locked') {
            progress[lessons[0].slug] = 'in_progress'
        }

        return new Response(
            JSON.stringify({
                course: {
                    slug: courseSlug,
                    title: course.title,
                },
                progress,
                level: {
                    level: userLevel,
                    badge: {
                        icon: badge.icon,
                        color: badge.color,
                        title: badge.title,
                    },
                },
                totalXp,
                streak: currentStreak,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            },
        )
    } catch (error: any) {
        console.error('[Python Progress Error]:', error)
        return new Response(
            JSON.stringify({
                error: 'Lỗi hệ thống',
                details: import.meta.env.DEV ? error.message : undefined,
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    }
}
