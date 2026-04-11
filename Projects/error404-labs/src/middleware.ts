import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, cookies } = context;

    // Chặn truy cập trực tiếp file tĩnh /tools/... nếu chưa login
    // Không chặn /tools (trang .astro đã có auth guard riêng)
    if (url.pathname.startsWith('/tools/')) {
        const token = cookies.get('auth_token')?.value;
        if (!token) {
            return context.redirect('/?auth=required');
        }
    }

    const response = await next();

    // Security Headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
    );

    // Xây dựng Content-Security-Policy (CSP)
    // - Cho phép script nội bộ, inline script của Astro tĩnh, Analytics (GTM)
    // - ws: wss: quan trọng ở connect để tránh bị break Web Socket của Vite/Astro Dev Server
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' ws: wss: https://*.google-analytics.com https://*.analytics.google.com",
        "frame-src 'self' https://www.youtube.com https://youtube.com",
        "object-src 'none'",
        "base-uri 'self'"
    ].join('; ');

    response.headers.set('Content-Security-Policy', csp);

    return response;
});
