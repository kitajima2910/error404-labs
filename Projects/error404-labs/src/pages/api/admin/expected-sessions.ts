import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'

export const prerender = false

const sql = neon(import.meta.env.DATABASE_URL)

const checkAdmin = async (request: Request) => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    if (!token) return null
    try {
        const jwt = await import('jsonwebtoken').then((m) => m.default)
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

export const GET: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    try {
        const result = await sql`
            SELECT expected_sessions FROM error404labs.members WHERE id = ${admin.id}
        `
        const value = result && result.length > 0 ? result[0].expected_sessions : 8
        return new Response(JSON.stringify({ expected_sessions: value }), { status: 200 })
    } catch (error) {
        console.error('Error fetching expected_sessions:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    try {
        const { expected_sessions } = await request.json()
        const value = parseInt(expected_sessions)
        if (isNaN(value) || value < 1 || value > 31) {
            return new Response(JSON.stringify({ error: 'Invalid value (1-31)' }), { status: 400 })
        }
        await sql`
            UPDATE error404labs.members SET expected_sessions = ${value} WHERE id = ${admin.id}
        `
        return new Response(JSON.stringify({ expected_sessions: value }), { status: 200 })
    } catch (error) {
        console.error('Error saving expected_sessions:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}
