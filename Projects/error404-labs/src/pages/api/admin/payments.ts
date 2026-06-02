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

// GET: /api/admin/payments?year=...&month=...
// Returns payments for the month with member info + total income
export const GET: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const year = parseInt(url.searchParams.get('year') || String(new Date().getFullYear()))
    const month = parseInt(url.searchParams.get('month') || String(new Date().getMonth() + 1))

    try {
        const payments = await sql`
            SELECT p.id, p.member_id, p.amount, p.paid_at, p.month, p.year, p.note,
                   m.display_name, m.member
            FROM error404labs.payments p
            JOIN error404labs.members m ON m.id = p.member_id
            WHERE p.month = ${month} AND p.year = ${year}
            ORDER BY m.display_name ASC
        `

        const total = payments.reduce((sum, p) => sum + p.amount, 0)

        // Also return active members for the payment form
        const members = await sql`
            SELECT id, display_name, member
            FROM error404labs.members
            WHERE roles = 'member' AND status = 'active'
            ORDER BY display_name ASC
        `

        return new Response(JSON.stringify({ payments, total, members }), {
            status: 200,
            headers: { 'Cache-Control': 'no-store' },
        })
    } catch (error) {
        console.error('Payments GET error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// POST: add/update a payment
// Body: { member_id, amount, month, year, note?, paid_at? }
// If payment exists for this member+month+year, update it. Otherwise insert.
export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { member_id, amount, month, year, note, paid_at } = await request.json()
        if (!member_id || !amount || !month || !year) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
        }

        if (amount <= 0) {
            return new Response(JSON.stringify({ error: 'Amount must be positive' }), { status: 400 })
        }

        // Upsert: if payment exists for this member+month+year, update it
        const existing = await sql`
            SELECT id FROM error404labs.payments
            WHERE member_id = ${member_id} AND month = ${month} AND year = ${year}
        `

        if (existing.length > 0) {
            await sql`
                UPDATE error404labs.payments
                SET amount = ${amount}, note = ${note || ''}, paid_at = ${(paid_at || 'CURRENT_DATE')}::date
                WHERE id = ${existing[0].id}
            `
            return new Response(JSON.stringify({ success: true, id: existing[0].id, updated: true }), { status: 200 })
        }

        const result = await sql`
            INSERT INTO error404labs.payments (member_id, amount, paid_at, month, year, note)
            VALUES (${member_id}, ${amount}, ${(paid_at || 'CURRENT_DATE')}::date, ${month}, ${year}, ${note || ''})
            RETURNING id
        `
        const newId = result && result.length > 0 ? result[0].id : null
        return new Response(JSON.stringify({ success: true, id: newId, updated: false }), { status: 201 })
    } catch (error) {
        console.error('Payments POST error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// DELETE: /api/admin/payments?id=...
export const DELETE: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const id = parseInt(url.searchParams.get('id') || '')
    if (!id) {
        return new Response(JSON.stringify({ error: 'Missing payment id' }), { status: 400 })
    }

    try {
        const result = await sql`
            DELETE FROM error404labs.payments WHERE id = ${id} RETURNING id
        `
        const deleted = result && result.length > 0
        return new Response(JSON.stringify({ success: true, deleted }), { status: 200 })
    } catch (error) {
        console.error('Payments DELETE error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}
