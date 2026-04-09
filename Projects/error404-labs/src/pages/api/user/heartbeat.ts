import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
    // CSRF Protection
    const origin = request.headers.get('origin')
    const allowedOrigins = [
        'https://www.error404-labs.info.vn',
        'https://error404-labs.info.vn',
        'http://localhost:4321',
        'http://127.0.0.1:4321',
    ]

    // Kiểm tra origin nếu có (một số trình duyệt hoặc mobile app có thể không gửi origin, nhưng web thì có)
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden: Invalid Origin' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const jwtSecret = import.meta.env.JWT_SECRET
        const dbUrl = import.meta.env.DATABASE_URL

        if (!jwtSecret || !dbUrl) {
            console.error('Heartbeat failed: Missing environment variables')
            return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 })
        }

        const decoded = jwt.verify(token, jwtSecret) as any
        const userId = decoded.id

        const sql = neon(dbUrl)
        const user = (
            await sql`
            SELECT logined, session_token, session_fingerprint, last_heartbeat_at 
            FROM error404labs.members 
            WHERE id = ${userId}
        `
        )[0]

        const currentFingerprint = request.headers.get('user-agent') || 'unknown'

        if (
            !user ||
            user.logined !== 1 ||
            user.session_token !== decoded.sessionToken ||
            user.session_fingerprint !== currentFingerprint
        ) {
            return new Response(JSON.stringify({ error: 'Session invalid or expired' }), { status: 401 })
        }

        // Kiểm tra đã đủ 1 phút kể từ lần heartbeat cuối chưa
        const lastHeartbeat = user.last_heartbeat_at ? new Date(user.last_heartbeat_at) : null
        const now = new Date()
        const oneMinuteAgo = new Date(now.getTime() - 60000)
        let pointsEarned = 0

        // Chỉ cộng điểm nếu đã >= 1 phút
        if (!lastHeartbeat || lastHeartbeat <= oneMinuteAgo) {
            await sql`UPDATE error404labs.members SET last_heartbeat_at = NOW(), points = points + 10 WHERE id = ${userId}`
            pointsEarned = 10
        } else {
            await sql`UPDATE error404labs.members SET last_heartbeat_at = NOW() WHERE id = ${userId}`
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Heartbeat alive',
                pointsEarned,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            },
        )
    } catch (err) {
        console.error('Heartbeat error:', err)
        return new Response(JSON.stringify({ error: 'Heartbeat failed' }), { status: 401 })
    }
}
