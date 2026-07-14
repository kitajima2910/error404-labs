import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import verifyAuth from '../../utils/auth'

export const prerender = false

export const GET: APIRoute = async ({ request, url }) => {
    const origin = request.headers.get('origin')
    const allowed = ['https://www.error404-labs.info.vn', 'https://error404-labs.info.vn', 'http://localhost:4321', 'http://127.0.0.1:4321']
    if (origin && !allowed.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const user = await verifyAuth(request)
    if (!user) {
        return new Response(JSON.stringify({ enrolled: false, error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const courseSlug = url.searchParams.get('courseSlug')
    if (!courseSlug) {
        return new Response(JSON.stringify({ error: 'Thiếu courseSlug' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) throw new Error('No DATABASE_URL')
        const sql = neon(dbUrl)

        // Get course ID
        const course = (await sql`
            SELECT id, title FROM error404labs.py_courses WHERE slug = ${courseSlug} AND published = true LIMIT 1
        `)[0]
        if (!course) {
            return new Response(JSON.stringify({ error: 'Khóa học không tồn tại' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
        }

        // Check if user has any lesson progress in this course
        const enrollment = await sql`
            SELECT COUNT(*)::int AS cnt
            FROM error404labs.py_lesson_progress lp
            JOIN error404labs.py_lessons l ON l.id = lp.lesson_id
            JOIN error404labs.py_chapters ch ON ch.id = l.chapter_id
            WHERE ch.course_id = ${course.id} AND lp.user_id = ${user.id}
        `

        return new Response(JSON.stringify({
            enrolled: enrollment[0]?.cnt > 0,
            courseTitle: course.title,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        })
    } catch (error: any) {
        console.error('[Enrollment Check Error]:', error)
        return new Response(JSON.stringify({ enrolled: false, error: 'Lỗi hệ thống' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}
