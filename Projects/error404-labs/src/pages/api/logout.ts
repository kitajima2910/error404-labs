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
    
    if (!origin || !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden: Invalid Origin (CSRF Protection)' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const isLocal = request.url.includes('localhost') || request.url.includes('127.0.0.1');
    const isSecure = request.url.startsWith('https');

    cookies.delete('auth_token', { 
        path: '/', 
        secure: isSecure && !isLocal, 
        sameSite: 'lax' 
    });
    
    cookies.delete('auth_active', { 
        path: '/',
        secure: isSecure && !isLocal, 
        sameSite: 'lax' 
    });
    
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
