import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
    try {
        const courseSlug = url.searchParams.get('courseSlug')
        const userIdParam = url.searchParams.get('userId')

        if (!courseSlug || !userIdParam) {
            return new Response(
                JSON.stringify({ error: 'Thiếu tham số courseSlug và userId' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        }

        const userId = parseInt(userIdParam, 10)
        if (isNaN(userId)) {
            return new Response(JSON.stringify({ error: 'userId phải là số' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
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

        // Lấy tất cả lessons trong course kèm progress của user
        const lessons = await sql`
            SELECT
                l.slug,
                l.order_index,
                l.lesson_type,
                ch.order_index AS chapter_order,
                COALESCE(p.status, 'locked') AS status
            FROM error404labs.py_lessons l
            JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
            LEFT JOIN error404labs.py_lesson_progress p
                ON p.lesson_id = l.id AND p.user_id = ${userId}
            WHERE ch.course_id = ${course.id}
            ORDER BY ch.order_index ASC, l.order_index ASC
        `

        // Build progress map: { [lessonSlug]: status }
        const progress: Record<string, string> = {}
        let previousCompleted = true // Lesson đầu tiên luôn unlocked

        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i]
            const dbStatus = lesson.status

            // Logic locking: lesson bị locked nếu lesson trước chưa completed
            // Trừ khi đã có status từ DB
            if (dbStatus === 'locked' && !previousCompleted && i > 0) {
                progress[lesson.slug] = 'locked'
            } else {
                progress[lesson.slug] = dbStatus
            }

            // Cập nhật previousCompleted cho lesson kế tiếp
            if (progress[lesson.slug] === 'completed') {
                previousCompleted = true
            } else if (i === 0) {
                // Lesson đầu tiên luôn unlocked
                previousCompleted = true
            } else {
                previousCompleted = false
            }
        }

        // Lesson đầu tiên luôn là unlocked (in_progress hoặc locked -> in_progress)
        if (lessons.length > 0 && progress[lessons[0].slug] === 'locked') {
            progress[lessons[0].slug] = 'in_progress'
        }

        // Lấy profile XP và streak
        const profile = (
            await sql`
                SELECT total_xp, current_streak
                FROM error404labs.py_profiles
                WHERE id = ${userId}
            `
        )[0]

        return new Response(
            JSON.stringify({
                course: {
                    slug: courseSlug,
                    title: course.title,
                },
                progress,
                totalXp: profile?.total_xp || 0,
                streak: profile?.current_streak || 0,
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
