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

const toBool = (value: unknown) => value === true || value === 'true' || value === 1 || value === '1'

export const GET: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    const search = url.searchParams.get('search') || ''
    const sortBy = url.searchParams.get('sortBy') || 'sort_order'
    const sortOrder = (url.searchParams.get('sortOrder') || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const searchQuery = `%${search}%`
    const allowedSortColumns = [
        'id',
        'month',
        'week',
        'name',
        'genre',
        'sort_order',
        'is_verified',
    ]
    const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'sort_order'

    try {
        let games
        if (sortOrder === 'DESC') {
            switch (finalSortBy) {
                case 'month':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY month DESC, week DESC, sort_order DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'week':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY week DESC, month DESC, sort_order DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'name':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY name DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'genre':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY genre DESC, month DESC, week DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'is_verified':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY is_verified DESC, month DESC, week DESC, sort_order DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'id':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                default:
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY sort_order DESC, month DESC, week DESC LIMIT ${limit} OFFSET ${offset}`
            }
        } else {
            switch (finalSortBy) {
                case 'month':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY month ASC, week ASC, sort_order ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'week':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY week ASC, month ASC, sort_order ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'name':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY name ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'genre':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY genre ASC, month ASC, week ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'is_verified':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY is_verified ASC, month ASC, week ASC, sort_order ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'id':
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                default:
                    games =
                        await sql`SELECT * FROM error404labs.roadmap_games WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery}) ORDER BY sort_order ASC, month ASC, week ASC LIMIT ${limit} OFFSET ${offset}`
            }
        }

        const totalResult = await sql`
            SELECT COUNT(*)::int
            FROM error404labs.roadmap_games
            WHERE (name ILIKE ${searchQuery} OR genre ILIKE ${searchQuery})
        `

        return new Response(JSON.stringify({ games, total: totalResult[0].count }), { status: 200 })
    } catch (error) {
        console.error('Roadmap games GET error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    try {
        const body = await request.json()
        const {
            month,
            week,
            name,
            genre,
        } = body
        const promptContent = body.promptContent ?? body.prompt_content ?? ''
        const imageUrl = body.imageUrl || body.image_url || null
        const sortOrder = body.sortOrder ?? body.sort_order ?? 0
        const isVerified = body.isVerified ?? body.is_verified ?? false
        if (!name || !genre) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
        }

        await sql`
            INSERT INTO error404labs.roadmap_games
                (month, week, name, genre, prompt_content, image_url, sort_order, is_verified)
            VALUES
                (${Number(month || 0)}, ${Number(week || 0)}, ${name}, ${genre}, ${promptContent}, ${imageUrl}, ${Number(sortOrder)}, ${toBool(isVerified)})
        `

        return new Response(JSON.stringify({ success: true }), { status: 201 })
    } catch (error) {
        console.error('Roadmap games POST error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

export const PUT: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    try {
        const body = await request.json()
        const {
            id,
            month,
            week,
            name,
            genre,
        } = body
        const promptContent = body.promptContent ?? body.prompt_content ?? ''
        const imageUrl = body.imageUrl || body.image_url || null
        const sortOrder = body.sortOrder ?? body.sort_order ?? 0
        const isVerified = body.isVerified ?? body.is_verified ?? false
        if (!id || !name || !genre) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
        }

        await sql`
            UPDATE error404labs.roadmap_games
            SET
                month = ${Number(month || 0)},
                week = ${Number(week || 0)},
                name = ${name},
                genre = ${genre},
                prompt_content = ${promptContent},
                image_url = ${imageUrl},
                sort_order = ${Number(sortOrder)},
                is_verified = ${toBool(isVerified)},
                updated_at = NOW()
            WHERE id = ${Number(id)}
        `

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        console.error('Roadmap games PUT error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

export const DELETE: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    try {
        const { id } = await request.json()
        if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 })

        await sql`DELETE FROM error404labs.roadmap_games WHERE id = ${Number(id)}`
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        console.error('Roadmap games DELETE error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}
