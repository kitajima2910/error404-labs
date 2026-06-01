import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'

export const prerender = false

const sql = neon(import.meta.env.DATABASE_URL)

// Helpers to verify admin role
const checkAdmin = async (request: Request) => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

    if (!token) return null
    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any

        const dbUser = (
            await sql`
            SELECT roles, logined, session_token, session_fingerprint, status
            FROM error404labs.members
            WHERE id = ${decoded.id}
        `
        )[0]

        const currentFingerprint = request.headers.get('user-agent') || 'unknown'

        if (
            !dbUser ||
            dbUser.logined !== 1 ||
            dbUser.roles !== 'admin' ||
            dbUser.status !== 'active' ||
            dbUser.session_token !== decoded.sessionToken ||
            dbUser.session_fingerprint !== currentFingerprint
        ) {
            return null
        }

        return decoded
    } catch {
        return null
    }
}

// GET: List attendance records
// Query params: member_id (optional), year, month, summary (boolean)
export const GET: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const memberId = url.searchParams.get('member_id')
    const year = parseInt(url.searchParams.get('year') || String(new Date().getFullYear()))
    const month = parseInt(url.searchParams.get('month') || String(new Date().getMonth() + 1))
    const summary = url.searchParams.get('summary') === 'true'

    try {
        if (summary) {
            // Get attendance summary for all members in a given month/year
            const firstDay = `${year}-${String(month).padStart(2, '0')}-01`
            // Calculate last day of month
            const lastDayDate = new Date(year, month, 0)
            const lastDay = `${year}-${String(month).padStart(2, '0')}-${String(lastDayDate.getDate()).padStart(2, '0')}`

            const memberFilter = memberId ? sql`AND m.id = ${parseInt(memberId)}` : sql``

            const attendanceSummary = await sql`
                SELECT
                    m.id,
                    m.member,
                    m.display_name,
                    COUNT(a.id)::int as total_days,
                    COALESCE(
                        array_agg(a.check_in_date ORDER BY a.check_in_date) FILTER (WHERE a.id IS NOT NULL),
                        ARRAY[]::date[]
                    ) as dates
                FROM error404labs.members m
                LEFT JOIN error404labs.attendance a ON a.member_id = m.id
                    AND a.check_in_date >= ${firstDay}::date
                    AND a.check_in_date <= ${lastDay}::date
                WHERE m.roles = 'member' ${memberFilter}
                GROUP BY m.id, m.member, m.display_name
                ORDER BY m.display_name ASC
            `

            return new Response(JSON.stringify({ attendance: attendanceSummary }), { status: 200 })
        }

        if (memberId) {
            // Get attendance records for a specific member in a month
            const firstDay = `${year}-${String(month).padStart(2, '0')}-01`
            const lastDayDate = new Date(year, month, 0)
            const lastDay = `${year}-${String(month).padStart(2, '0')}-${String(lastDayDate.getDate()).padStart(2, '0')}`

            const records = await sql`
                SELECT id, check_in_date, check_in_time, created_at
                FROM error404labs.attendance
                WHERE member_id = ${parseInt(memberId)}
                    AND check_in_date >= ${firstDay}::date
                    AND check_in_date <= ${lastDay}::date
                ORDER BY check_in_date DESC
            `

            return new Response(JSON.stringify({ records }), { status: 200 })
        }

        // Default: get today's attendance
        const todayAttendance = await sql`
            SELECT a.id, a.member_id, a.check_in_time, m.member, m.display_name
            FROM error404labs.attendance a
            JOIN error404labs.members m ON m.id = a.member_id
            WHERE a.check_in_date = CURRENT_DATE
            ORDER BY a.check_in_time ASC
        `

        return new Response(JSON.stringify({ attendance: todayAttendance }), { status: 200 })
    } catch (error) {
        console.error('Attendance API Error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// POST: Check in a student (attendance)
// Body: { member_id, check_in_date? (default: CURRENT_DATE), check_in_time? (default: CURRENT_TIME) }
export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { member_id, check_in_date, check_in_time } = await request.json()
        if (!member_id) {
            return new Response(JSON.stringify({ error: 'Missing member_id' }), { status: 400 })
        }

        const dateStr = check_in_date || 'CURRENT_DATE'
        const timeStr = check_in_time || 'CURRENT_TIME'

        // Check if already checked in on that date
        const existing = await sql`
            SELECT id FROM error404labs.attendance
            WHERE member_id = ${member_id} AND check_in_date = ${dateStr === 'CURRENT_DATE' ? sql`CURRENT_DATE` : dateStr}::date
        `

        if (existing.length > 0) {
            return new Response(JSON.stringify({ error: 'Học viên đã được điểm danh ngày này' }), { status: 409 })
        }

        await sql`
            INSERT INTO error404labs.attendance (member_id, check_in_date, check_in_time)
            VALUES (${member_id}, ${dateStr === 'CURRENT_DATE' ? sql`CURRENT_DATE` : dateStr}::date, ${timeStr === 'CURRENT_TIME' ? sql`CURRENT_TIME` : timeStr}::time)
        `

        return new Response(JSON.stringify({ success: true }), { status: 201 })
    } catch (error) {
        console.error('Attendance Check-in Error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// DELETE: Remove an attendance record (admin only)
// Body: { member_id, check_in_date } - deletes by member + date
export const DELETE: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { member_id, check_in_date } = await request.json()
        if (!member_id || !check_in_date) {
            return new Response(JSON.stringify({ error: 'Missing member_id or check_in_date' }), { status: 400 })
        }

        await sql`
            DELETE FROM error404labs.attendance
            WHERE member_id = ${member_id} AND check_in_date = ${check_in_date}::date
        `
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        console.error('Attendance Delete Error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}
