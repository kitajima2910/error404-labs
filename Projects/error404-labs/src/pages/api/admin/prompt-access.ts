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
            SELECT roles, logined, session_token, session_fingerprint 
            FROM error404labs.members 
            WHERE id = ${decoded.id}
        `
        )[0]

        const currentFingerprint = request.headers.get('user-agent') || 'unknown'

        if (
            !dbUser ||
            dbUser.logined !== 1 ||
            dbUser.roles !== 'admin' ||
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

const checkMember = async (request: Request) => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

    if (!token) return null
    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any

        const dbUser = (
            await sql`
            SELECT id, member, roles, logined, session_token, session_fingerprint 
            FROM error404labs.members 
            WHERE id = ${decoded.id}
        `
        )[0]

        const currentFingerprint = request.headers.get('user-agent') || 'unknown'

        if (
            !dbUser ||
            dbUser.logined !== 1 ||
            dbUser.session_token !== decoded.sessionToken ||
            dbUser.session_fingerprint !== currentFingerprint
        ) {
            return null
        }

        return { ...decoded, dbUser }
    } catch {
        return null
    }
}

export const GET: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    const member = await checkMember(request)

    const action = url.searchParams.get('action')
    const memberId = url.searchParams.get('memberId')
    const promptId = url.searchParams.get('promptId')

    if (action === 'list' && admin) {
        try {
            const members =
                await sql`SELECT id, member, display_name, roles, prompt_access FROM error404labs.members ORDER BY id DESC;`

            return new Response(JSON.stringify({ members }), { status: 200 })
        } catch (error) {
            console.error('Error:', error)
            return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
        }
    }

    if (action === 'my-access' && member) {
        try {
            const memberData = (await sql`SELECT prompt_access FROM error404labs.members WHERE id = ${member.id}`)[0]
            const accessList = memberData?.prompt_access || []

            return new Response(JSON.stringify({ access: accessList }), { status: 200 })
        } catch (error) {
            console.error('Error:', error)
            return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
        }
    }

    if (action === 'check' && member) {
        if (!promptId) {
            return new Response(JSON.stringify({ error: 'Missing promptId' }), { status: 400 })
        }

        try {
            const memberData = (await sql`SELECT prompt_access FROM error404labs.members WHERE id = ${member.id}`)[0]
            const accessList = memberData?.prompt_access || []
            const hasAccess = accessList.includes(promptId)

            return new Response(JSON.stringify({ hasAccess, promptId }), { status: 200 })
        } catch (error) {
            console.error('Error:', error)
            return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
        }
    }

    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
}

export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { memberId, promptIds, action } = await request.json()

        if (!memberId || !promptIds || !Array.isArray(promptIds)) {
            return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 })
        }

        const memberData = (await sql`SELECT prompt_access FROM error404labs.members WHERE id = ${memberId}`)[0]
        let currentAccess = memberData?.prompt_access || []

        if (action === 'update') {
            await sql`UPDATE error404labs.members SET prompt_access = ${promptIds} WHERE id = ${memberId};`
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}
