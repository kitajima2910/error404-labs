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
    
    // Xác định môi trường dựa trên header host (quan trọng cho serverless như Vercel)
    const host = request.headers.get('host') || '';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
    const isSecure = request.headers.get('x-forwarded-proto') === 'https' || (!isLocal && request.url.startsWith('https'));

    // Clear session_token in DB
    const token = cookies.get('auth_token')?.value;
    if (token) {
        try {
            const jwt = (await import('jsonwebtoken')).default;
            const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as { id: number };
            if (decoded?.id) {
                const { neon } = await import('@neondatabase/serverless');
                const sql = neon(import.meta.env.DATABASE_URL);
                // Đánh dấu logout trong DB (logined = 0) và xóa session_token
                await sql`UPDATE error404labs.members SET session_token = NULL, logined = 0 WHERE id = ${decoded.id}`;
            }
        } catch (e) {
            console.error('Logout DB clear failed:', e);
        }
    }

    // Headers để xóa sạch dấu vết và chặn cache
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    const cookieBase = `path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; ${isSecure && !isLocal ? 'Secure;' : ''}`;
    
    // Xóa auth_token (HttpOnly) cho tất cả các biến thể domain
    headers.append('Set-Cookie', `auth_token=; ${cookieBase} HttpOnly`); // Host-only
    
    if (!isLocal) {
        headers.append('Set-Cookie', `auth_token=; ${cookieBase} domain=.error404-labs.info.vn; HttpOnly`);
        headers.append('Set-Cookie', `auth_token=; ${cookieBase} domain=error404-labs.info.vn; HttpOnly`);
        headers.append('Set-Cookie', `auth_token=; ${cookieBase} domain=www.error404-labs.info.vn; HttpOnly`);
    }

    // Xóa auth_active (Non-HttpOnly)
    headers.append('Set-Cookie', `auth_active=; ${cookieBase}`); // Host-only
    if (!isLocal) {
        headers.append('Set-Cookie', `auth_active=; ${cookieBase} domain=.error404-labs.info.vn;`);
        headers.append('Set-Cookie', `auth_active=; ${cookieBase} domain=error404-labs.info.vn;`);
        headers.append('Set-Cookie', `auth_active=; ${cookieBase} domain=www.error404-labs.info.vn;`);
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: headers
    });
};
