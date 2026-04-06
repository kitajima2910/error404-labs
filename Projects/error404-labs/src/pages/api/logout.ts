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
    
    // Bỏ qua origin check nghiêm ngặt cho logout để đảm bảo user luôn có thể đăng xuất
    const isLocal = request.url.includes('localhost') || request.url.includes('127.0.0.1');
    const isSecure = request.url.startsWith('https') || request.headers.get('x-forwarded-proto') === 'https';

    // Clear session_token in DB
    const token = cookies.get('auth_token')?.value;
    if (token) {
        try {
            const jwt = (await import('jsonwebtoken')).default;
            const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as { id: number };
            if (decoded?.id) {
                const { neon } = await import('@neondatabase/serverless');
                const sql = neon(import.meta.env.DATABASE_URL);
                await sql`UPDATE error404labs.members SET session_token = NULL WHERE id = ${decoded.id}`;
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
    const domain = isLocal ? '' : 'domain=.error404-labs.info.vn;';
    
    // Xóa auth_token (HttpOnly) cho domain chính (bao gồm các subdomains)
    headers.append('Set-Cookie', `auth_token=; ${cookieBase} ${domain} HttpOnly`);
    // Xóa auth_active cho domain chính
    headers.append('Set-Cookie', `auth_active=; ${cookieBase} ${domain}`);
    
    // Xóa thêm bản không chỉ định domain (host-only) để bao phủ mọi khả năng
    headers.append('Set-Cookie', `auth_token=; ${cookieBase} HttpOnly`);
    headers.append('Set-Cookie', `auth_active=; ${cookieBase}`);

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: headers
    });
};
