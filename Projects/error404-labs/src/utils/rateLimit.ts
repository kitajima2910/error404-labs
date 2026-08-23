import { neon } from '@neondatabase/serverless'

interface RateLimitResult {
    allowed: boolean
    remaining: number
    retryAfterSec: number
}

export async function checkRateLimit(
    ip: string,
    maxAttempts: number = 5,
    windowMs: number = 60000,
): Promise<RateLimitResult> {
    try {
        const dbUrl = import.meta.env.DATABASE_URL
        if (!dbUrl) return { allowed: false, remaining: 0, retryAfterSec: Math.ceil(windowMs / 1000) }

        const sql = neon(dbUrl)
        const windowSec = Math.ceil(windowMs / 1000)
        const expiresAt = new Date(Date.now() + windowMs).toISOString()

        // Clean old entries
        await sql`DELETE FROM error404labs.rate_limits WHERE expires_at < NOW()`

        // Count recent attempts
        const cutoff = new Date(Date.now() - windowMs).toISOString()
        const [row] = await sql`
            SELECT COUNT(*)::int as cnt
            FROM error404labs.rate_limits
            WHERE ip = ${ip} AND attempted_at > ${cutoff}
        `

        if (row.cnt >= maxAttempts) {
            return { allowed: false, remaining: 0, retryAfterSec: windowSec }
        }

        // Record attempt
        await sql`
            INSERT INTO error404labs.rate_limits (ip, attempted_at, expires_at)
            VALUES (${ip}, NOW(), ${expiresAt})
        `

        return { allowed: true, remaining: maxAttempts - row.cnt - 1, retryAfterSec: 0 }
    } catch (error) {
        console.error('Rate limit error:', error)
        // Fail closed để không vô hiệu hóa bảo vệ brute-force khi DB gặp sự cố
        return { allowed: false, remaining: 0, retryAfterSec: Math.ceil(windowMs / 1000) }
    }
}
