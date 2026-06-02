import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'

export const prerender = false

const sql = neon(import.meta.env.DATABASE_URL)

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

// GET: get notes for a month → { notes: { "YYYY-MM-DD": "note_text" } }
export const GET: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const year = parseInt(url.searchParams.get('year') || String(new Date().getFullYear()))
    const month = parseInt(url.searchParams.get('month') || String(new Date().getMonth() + 1))
    const firstDay = `${year}-${String(month).padStart(2, '0')}-01`
    const lastDayDate = new Date(year, month, 0)
    const lastDay = `${year}-${String(month).padStart(2, '0')}-${String(lastDayDate.getDate()).padStart(2, '0')}`

    try {
        const rows = await sql`
            SELECT note_date, note
            FROM error404labs.date_notes
            WHERE note_date >= ${firstDay}::date
              AND note_date <= ${lastDay}::date
            ORDER BY note_date ASC
        `
        const notes: Record<string, string> = {}
        for (const row of rows) {
            const d = row.note_date instanceof Date ? row.note_date.toISOString().split('T')[0] : String(row.note_date)
            notes[d] = row.note
        }
        return new Response(JSON.stringify({ notes }), {
            status: 200,
            headers: { 'Cache-Control': 'no-store' },
        })
    } catch (error) {
        console.error('Date-notes GET error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// POST: upsert a note for a date
// Body: { note_date: "YYYY-MM-DD", note: "text" }
export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { note_date, note } = await request.json()
        if (!note_date || note === undefined) {
            return new Response(JSON.stringify({ error: 'Missing note_date or note' }), { status: 400 })
        }

        if (note === '' || note === null) {
            // Empty note = delete
            await sql`
                DELETE FROM error404labs.date_notes WHERE note_date = ${note_date}::date
            `
            return new Response(JSON.stringify({ success: true, deleted: true }), { status: 200 })
        }

        await sql`
            INSERT INTO error404labs.date_notes (note_date, note)
            VALUES (${note_date}::date, ${note})
            ON CONFLICT (note_date) DO UPDATE SET note = ${note}, updated_at = CURRENT_TIMESTAMP
        `
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        console.error('Date-notes POST error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// DELETE: remove a note by date
// Query: ?date=YYYY-MM-DD
export const DELETE: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const noteDate = url.searchParams.get('date')
    if (!noteDate) {
        return new Response(JSON.stringify({ error: 'Missing date query param' }), { status: 400 })
    }

    try {
        const result = await sql`
            DELETE FROM error404labs.date_notes WHERE note_date = ${noteDate}::date RETURNING id
        `
        const deleted = result && result.length > 0
        return new Response(JSON.stringify({ success: true, deleted }), { status: 200 })
    } catch (error) {
        console.error('Date-notes DELETE error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}
