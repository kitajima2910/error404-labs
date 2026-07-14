import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import verifyAuth from '../../utils/auth'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
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

        const { courseSlug } = await request.json()
        if (!courseSlug) {
            return new Response(JSON.stringify({ error: 'Thiếu courseSlug' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
        }

        // Get course
        const course = (await sql`
            SELECT id, title, slug FROM error404labs.py_courses WHERE slug = ${courseSlug} AND published = true LIMIT 1
        `)[0]
        if (!course) {
            return new Response(JSON.stringify({ error: 'Khóa học không tồn tại' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
        }

        // Check if already enrolled
        const existing = await sql`
            SELECT COUNT(*)::int AS cnt
            FROM error404labs.py_lesson_progress lp
            JOIN error404labs.py_lessons l ON l.id = lp.lesson_id
            JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
            WHERE ch.course_id = ${course.id} AND lp.user_id = ${user.id}
        `
        if (existing[0]?.cnt > 0) {
            // Already enrolled — get first lesson slug for redirect
            const first = (await sql`
                SELECT l.slug FROM error404labs.py_lessons l
                JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
                WHERE ch.course_id = ${course.id} AND l.published = true
                ORDER BY ch.order_index ASC, l.order_index ASC LIMIT 1
            `)[0]
            return new Response(JSON.stringify({
                success: true,
                enrolled: true,
                firstLessonSlug: first?.slug || '',
            }), { status: 200, headers: { 'Content-Type': 'application/json' } })
        }

        // Get first lesson of the course
        const firstLesson = (await sql`
            SELECT l.id, l.slug FROM error404labs.py_lessons l
            JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
            WHERE ch.course_id = ${course.id} AND l.published = true
            ORDER BY ch.order_index ASC, l.order_index ASC LIMIT 1
        `)[0]

        if (!firstLesson) {
            return new Response(JSON.stringify({ error: 'Khóa học chưa có bài học' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
        }

        // Enroll: mark first lesson as in_progress
        await sql`
            INSERT INTO error404labs.py_lesson_progress (user_id, lesson_id, status, first_started_at)
            VALUES (${user.id}, ${firstLesson.id}, 'in_progress', NOW())
            ON CONFLICT (user_id, lesson_id) DO UPDATE SET status = 'in_progress', first_started_at = COALESCE(py_lesson_progress.first_started_at, NOW()), updated_at = NOW()
        `

        // Ensure profile exists
        await sql`
            INSERT INTO error404labs.py_profiles (id, total_xp, current_streak, longest_streak)
            VALUES (${user.id}, 0, 0, 0)
            ON CONFLICT (id) DO NOTHING
        `

        return new Response(JSON.stringify({
            success: true,
            enrolled: true,
            firstLessonSlug: firstLesson.slug,
            courseSlug: course.slug,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error: any) {
        console.error('[Enroll Error]:', error)
        return new Response(JSON.stringify({ error: 'Lỗi hệ thống' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}
