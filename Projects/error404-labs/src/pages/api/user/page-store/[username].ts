import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'

export const prerender = false

const allowedOrigins = [
    'https://www.error404-labs.info.vn',
    'https://error404-labs.info.vn',
    'http://localhost:4321',
    'http://127.0.0.1:4321',
]

function getMemberFromToken(request: Request): { id: number; member: string; roles: string; sessionToken: string } | null {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    if (!token) return null

    try {
        const jwtSecret = import.meta.env.JWT_SECRET
        if (!jwtSecret) return null
        return jwt.verify(token, jwtSecret) as { id: number; member: string; roles: string; sessionToken: string }
    } catch {
        return null
    }
}

async function verifySession(sql: any, decoded: any, userAgent: string): Promise<boolean> {
    const user = await sql`
        SELECT logined, session_token, session_fingerprint 
        FROM error404labs.members 
        WHERE id = ${decoded.id}
    `
    if (user.length === 0) return false
    return user[0].logined === 1 && user[0].session_token === decoded.sessionToken && user[0].session_fingerprint === userAgent
}

export const GET: APIRoute = async ({ request, params }) => {
    const origin = request.headers.get('origin')
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const username = params.username
    if (!username) {
        return new Response(JSON.stringify({ error: 'Username required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) {
            return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
        }

        const sql = neon(dbUrl)

        const members = await sql`
            SELECT id, member, display_name 
            FROM error404labs.members 
            WHERE member = ${username}
        `
        if (members.length === 0) {
            return new Response(JSON.stringify({ error: 'Member not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
        }

        const memberId = members[0].id
        const displayName = members[0].display_name || members[0].member

        const pages = await sql`
            SELECT id, url, title, thumbnail_url, display_mode, created_at
            FROM error404labs.page_store
            WHERE member_id = ${memberId}
            ORDER BY created_at DESC
        `

        return new Response(
            JSON.stringify({
                username,
                displayName,
                pages: pages.map(p => ({
                    id: p.id,
                    url: p.url,
                    title: p.title,
                    thumbnailUrl: p.thumbnail_url,
                    displayMode: p.display_mode || 'direct',
                    createdAt: p.created_at,
                })),
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (err) {
        console.error('Page store GET error:', err)
        return new Response(JSON.stringify({ error: 'Failed to fetch pages' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}

export const POST: APIRoute = async ({ request }) => {
    const origin = request.headers.get('origin')
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const decoded = getMemberFromToken(request)
    if (!decoded) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const { url, title, thumbnailUrl, displayMode } = await request.json()
    if (!url || !title) {
        return new Response(JSON.stringify({ error: 'URL and title are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (url.length > 2000 || title.length > 500) {
        return new Response(JSON.stringify({ error: 'Data too long' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const mode = displayMode === 'newtab' ? 'newtab' : 'direct'

    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) {
            return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
        }

        const sql = neon(dbUrl)
        const userAgent = request.headers.get('user-agent') || 'unknown'
        const isValid = await verifySession(sql, decoded, userAgent)
        if (!isValid) {
            return new Response(JSON.stringify({ error: 'Session invalid or expired' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
        }

        const result = await sql`
            INSERT INTO error404labs.page_store (member_id, url, title, thumbnail_url, display_mode)
            VALUES (${decoded.id}, ${url}, ${title}, ${thumbnailUrl || null}, ${mode})
            RETURNING id, url, title, thumbnail_url, display_mode, created_at
        `

        return new Response(
            JSON.stringify({
                success: true,
                page: {
                    id: result[0].id,
                    url: result[0].url,
                    title: result[0].title,
                    thumbnailUrl: result[0].thumbnail_url,
                    displayMode: result[0].display_mode,
                    createdAt: result[0].created_at,
                },
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (err) {
        console.error('Page store POST error:', err)
        return new Response(JSON.stringify({ error: 'Failed to add page' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}

export const DELETE: APIRoute = async ({ request }) => {
    const origin = request.headers.get('origin')
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const decoded = getMemberFromToken(request)
    if (!decoded) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const { pageId } = await request.json()
    if (!pageId) {
        return new Response(JSON.stringify({ error: 'Page ID required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) {
            return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
        }

        const sql = neon(dbUrl)
        const userAgent = request.headers.get('user-agent') || 'unknown'
        const isValid = await verifySession(sql, decoded, userAgent)
        if (!isValid) {
            return new Response(JSON.stringify({ error: 'Session invalid or expired' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
        }

        const existing = await sql`
            SELECT id FROM error404labs.page_store
            WHERE id = ${pageId} AND member_id = ${decoded.id}
        `
        if (existing.length === 0) {
            return new Response(JSON.stringify({ error: 'Page not found or access denied' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
        }

        await sql`DELETE FROM error404labs.page_store WHERE id = ${pageId}`

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    } catch (err) {
        console.error('Page store DELETE error:', err)
        return new Response(JSON.stringify({ error: 'Failed to delete page' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}