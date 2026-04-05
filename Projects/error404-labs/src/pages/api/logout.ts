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

    cookies.delete('auth_token', { path: '/' });
    
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
