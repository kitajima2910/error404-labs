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

    // Headers để xóa sạch dấu vết và chặn cache
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    const cookieBase = `path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; ${isSecure && !isLocal ? 'Secure;' : ''}`;
    
    // Xóa auth_token (HttpOnly)
    headers.append('Set-Cookie', `auth_token=; ${cookieBase} HttpOnly`);
    // Xóa auth_active (biến phụ ở UI)
    headers.append('Set-Cookie', `auth_active=; ${cookieBase}`);

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: headers
    });
};
