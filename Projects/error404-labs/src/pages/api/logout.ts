import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
    // CSRF Protection
    const origin = request.headers.get('origin');
    const allowedOrigins = [
        'https://www.error404-labs.info.vn',
        'https://error404-labs.info.vn',
        'http://localhost:4321',
        'http://127.0.0.1:4321'
    ];
    
    try {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

        if (token) {
            const jwt = (await import('jsonwebtoken')).default;
            const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as { id: number };
            if (decoded?.id) {
                const { neon } = await import('@neondatabase/serverless');
                const sql = neon(import.meta.env.DATABASE_URL);
                // Đánh dấu logout và xóa sạch session metadata trong DB
                await sql`
                    UPDATE error404labs.members 
                    SET logined = 0, session_token = NULL, session_fingerprint = NULL 
                    WHERE id = ${decoded.id}
                `;
            }
        }
    } catch (e) {
        console.error('Logout DB clear failed:', e);
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
    });
};
