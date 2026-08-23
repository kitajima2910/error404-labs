import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'node:crypto'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import { checkRateLimit } from '../../utils/rateLimit'

export const prerender = false

const allowedOrigins = [
    'https://www.error404-labs.info.vn',
    'https://error404-labs.info.vn',
    'http://localhost:4321',
    'http://127.0.0.1:4321',
]

export const POST: APIRoute = async ({ request }) => {
    try {
        const origin = request.headers.get('origin')
        if (!origin || !allowedOrigins.includes(origin)) {
            return new Response(JSON.stringify({ error: 'Nguồn yêu cầu không hợp lệ' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const clientIp =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            'unknown'
        const rateCheck = await checkRateLimit(`google:${clientIp}`, 10, 60_000)
        if (!rateCheck.allowed) {
            return new Response(
                JSON.stringify({ error: `Quá nhiều lần thử. Vui lòng đợi ${rateCheck.retryAfterSec} giây.` }),
                {
                    status: 429,
                    headers: { 'Content-Type': 'application/json', 'Retry-After': String(rateCheck.retryAfterSec) },
                },
            )
        }

        const { credential } = await request.json()
        if (!credential || typeof credential !== 'string' || credential.length > 5000) {
            return new Response(JSON.stringify({ error: 'Thông tin đăng nhập Google không hợp lệ' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const dbUrl = import.meta.env.DATABASE_URL
        const jwtSecret = import.meta.env.JWT_SECRET
        const googleClientId = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID
        if (!dbUrl || !jwtSecret || !googleClientId) throw new Error('Missing server configuration')

        const ticket = await new OAuth2Client(googleClientId).verifyIdToken({
            idToken: credential,
            audience: googleClientId,
        })
        const payload = ticket.getPayload()
        if (!payload?.sub || !payload.email || !payload.email_verified) {
            return new Response(JSON.stringify({ error: 'Tài khoản Google chưa xác minh email' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const sql = neon(dbUrl)
        let user = (
            await sql`
                SELECT id, member, display_name, roles, points, last_login_at::text AS last_login_at,
                    created_at, status, avatar_url
                FROM error404labs.members
                WHERE google_sub = ${payload.sub}
            `
        )[0]

        if (!user) {
            const member = `google_${payload.sub}`
            const passwordHash = await bcrypt.hash(randomBytes(32).toString('hex'), 10)
            user = (
                await sql`
                    INSERT INTO error404labs.members (member, code, roles, display_name, google_sub, email, avatar_url)
                    VALUES (
                        ${member},
                        ${passwordHash},
                        'member',
                        ${payload.name || payload.email.split('@')[0]},
                        ${payload.sub},
                        ${payload.email.toLowerCase()},
                        ${payload.picture || null}
                    )
                    ON CONFLICT (google_sub) WHERE google_sub IS NOT NULL DO UPDATE SET
                        email = EXCLUDED.email,
                        display_name = COALESCE(error404labs.members.display_name, EXCLUDED.display_name),
                        avatar_url = COALESCE(error404labs.members.avatar_url, EXCLUDED.avatar_url)
                    RETURNING id, member, display_name, roles, points, last_login_at::text AS last_login_at,
                        created_at, status, avatar_url
                `
            )[0]
        }

        if (user.status === 'inactive') {
            return new Response(JSON.stringify({ error: 'Tài khoản của bạn hiện đang bị khóa.' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const today = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
        const pointsAdded = user.last_login_at === today ? 0 : 10
        const sessionToken = randomBytes(24).toString('hex')
        const fingerprint = request.headers.get('user-agent') || 'unknown'

        const [updatedUser] = await sql`
            UPDATE error404labs.members
            SET points = points + ${pointsAdded},
                last_login_at = ${today},
                logined = 1,
                session_token = ${sessionToken},
                session_fingerprint = ${fingerprint}
            WHERE id = ${user.id}
            RETURNING points
        `

        const token = jwt.sign({ id: user.id, member: user.member, roles: user.roles, sessionToken }, jwtSecret, {
            expiresIn: '7d',
        })

        return new Response(
            JSON.stringify({
                success: true,
                token,
                user: {
                    member: user.member,
                    display_name: user.display_name || user.member,
                    roles: user.roles,
                    points: updatedUser.points,
                    created_at: user.created_at,
                    avatar_url: user.avatar_url || payload.picture || null,
                    pointsAdded,
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
            },
        )
    } catch (error: any) {
        console.error('Google login error:', error)
        return new Response(
            JSON.stringify({
                error: 'Không thể đăng nhập bằng Google',
                details: import.meta.env.DEV ? error.message : undefined,
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        )
    }
}
