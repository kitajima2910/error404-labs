import { neon } from '@neondatabase/serverless'
import jwt from 'jsonwebtoken'

/**
 * Xác thực user qua JWT Bearer token + session & fingerprint check.
 * Trả về decoded payload `{ id, member, sessionToken }` nếu hợp lệ, `null` nếu không.
 */
export const verifyAuth = async (
    request: Request,
): Promise<{ id: number; member: string; sessionToken: string } | null> => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    if (!token) return null

    try {
        const jwtSecret = import.meta.env.JWT_SECRET
        const dbUrl = import.meta.env.DATABASE_URL
        if (!jwtSecret || !dbUrl) return null

        const decoded = jwt.verify(token, jwtSecret) as {
            id: number
            member: string
            sessionToken: string
        }

        const sql = neon(dbUrl)
        const user = (
            await sql`
                SELECT id, logined, session_token, session_fingerprint, status
                FROM error404labs.members
                WHERE id = ${decoded.id}
            `
        )[0]

        const fingerprint = request.headers.get('user-agent') || 'unknown'

        if (
            !user ||
            user.logined !== 1 ||
            user.status !== 'active' ||
            user.session_token !== decoded.sessionToken ||
            user.session_fingerprint !== fingerprint
        ) {
            return null
        }

        return decoded
    } catch {
        return null
    }
}

export default verifyAuth
