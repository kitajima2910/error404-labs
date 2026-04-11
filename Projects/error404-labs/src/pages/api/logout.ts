import { neon } from '@neondatabase/serverless';
import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    // CSRF Protection
    const origin = request.headers.get('origin');
    const allowedOrigins = [
        'https://www.error404-labs.info.vn',
        'https://error404-labs.info.vn',
        'http://localhost:4321',
        'http://127.0.0.1:4321'
    ];
    
    // Kiểm tra origin nếu có (một số trình duyệt hoặc mobile app có thể không gửi origin, nhưng web thì có)
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden: Invalid Origin' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let dbVerified = false;
    try {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

        if (token) {
            const jwtSecret = import.meta.env.JWT_SECRET;
            if (!jwtSecret) {
                console.error('Logout failed: JWT_SECRET missing');
                throw new Error('Server configuration error');
            }

            try {
                const decoded = jwt.verify(token, jwtSecret) as { id: number };
                if (decoded?.id) {
                    const dbUrl = import.meta.env.DATABASE_URL;
                    if (!dbUrl) {
                        console.error('Logout failed: DATABASE_URL missing');
                        throw new Error('Database configuration error');
                    }

                    const sql = neon(dbUrl);
                    // Đánh dấu logout và xóa sạch session metadata trong DB
                    await sql`
                        UPDATE error404labs.members 
                        SET logined = 0, session_token = NULL, session_fingerprint = NULL 
                        WHERE id = ${decoded.id}
                    `;

                    // Kiểm tra lại từ DB để đảm bảo đã cập nhật thành công
                    const verifyResult = await sql`
                        SELECT logined FROM error404labs.members WHERE id = ${decoded.id}
                    `;
                    const isLogoutSuccessful = verifyResult.length > 0 && verifyResult[0].logined === 0;

                    if (isLogoutSuccessful) {
                        console.log(`Logout verified for user ID: ${decoded.id}`);
                        dbVerified = true;
                    } else {
                        console.error(`Logout verification failed for user ID: ${decoded.id}. Value is still: ${verifyResult[0]?.logined}`);
                    }
                }
            } catch (jwtErr) {
                console.warn('Logout JWT verify failed (token might be expired):', jwtErr);
                // Vẫn tiếp tục để UI logout bình thường
            }
        }
    } catch (e) {
        console.error('Logout DB clear failed:', e);
    }

    return new Response(JSON.stringify({ success: true, verified: dbVerified }), {
        status: 200,
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
    });
};
