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

    const cookieOptions = { 
        path: '/', 
        secure: isSecure && !isLocal, 
        sameSite: 'lax' as const
    };

    cookies.delete('auth_token', cookieOptions);
    cookies.delete('auth_active', cookieOptions);
    
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
};
