import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'

export const prerender = false

const sql = neon(import.meta.env.DATABASE_URL)

// Helpers to verify admin role and permissions
const checkAdmin = async (request: Request) => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

    if (!token) return null
    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any

        // Kiểm tra logined, roles, session_token và fingerprint từ DB (Authority)
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

// GET: List lessons with Search, Sort, Pagination
export const GET: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const search = url.searchParams.get('search') || ''
    const sortBy = url.searchParams.get('sortBy') || 'id'
    const sortOrder = (url.searchParams.get('sortOrder') || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    // Chống SQL Injection bằng whitelist
    const allowedSortColumns = [
        'id',
        'title',
        'url',
        'description',
        'created_at',
    ]
    const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'id'

    try {
        await sql`ALTER TABLE error404labs.lessons ADD COLUMN IF NOT EXISTS title VARCHAR(255);`
        await sql`ALTER TABLE error404labs.lessons ADD COLUMN IF NOT EXISTS url VARCHAR(500);`
        await sql`ALTER TABLE error404labs.lessons ADD COLUMN IF NOT EXISTS description TEXT;`
        await sql`ALTER TABLE error404labs.lessons ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();`
        await sql`ALTER TABLE error404labs.lessons ADD COLUMN IF NOT EXISTS author VARCHAR(100);`

        const searchQuery = `%${search}%`

        // Sử dụng switch case để hỗ trợ ORDER BY an toàn
        let lessons
        if (sortOrder === 'DESC') {
            switch (finalSortBy) {
                case 'title':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY title DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'url':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY url DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'description':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY description DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'created_at':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                default:
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`
            }
        } else {
            switch (finalSortBy) {
                case 'title':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY title ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'url':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY url ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'description':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY description ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'created_at':
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY created_at ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                default:
                    lessons =
                        await sql`SELECT id, title, url, description, created_at, author FROM error404labs.lessons WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery}) ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`
            }
        }

        const totalResult = await sql`
            SELECT COUNT(*)::int FROM error404labs.lessons
            WHERE (title ILIKE ${searchQuery} OR description ILIKE ${searchQuery})
        `

        return new Response(
            JSON.stringify({
                lessons,
                total: totalResult[0].count,
            }),
            { status: 200 },
        )
    } catch (error) {
        console.error('API Error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// POST: Create lesson
export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { title, url, description, author } = await request.json()
        if (!title || !url) return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })

        await sql`
            INSERT INTO error404labs.lessons (title, url, description, author)
            VALUES (${title}, ${url}, ${description || ''}, ${author || ''})
        `
        return new Response(JSON.stringify({ success: true }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error or duplicate' }), { status: 500 })
    }
}

// PUT: Update lesson
export const PUT: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { id, title, url, description, author } = await request.json()
        if (!id || !title || !url) return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 })

        await sql`
            UPDATE error404labs.lessons
            SET title = ${title}, url = ${url}, description = ${description}, author = ${author || ''}
            WHERE id = ${id}
        `
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// DELETE: Remove lesson
export const DELETE: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { id } = await request.json()
        if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 })

        await sql`DELETE FROM error404labs.lessons WHERE id = ${id}`
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}