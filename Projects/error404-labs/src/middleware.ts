import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
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

    // Không áp CSP cho /api/render (preview iframe cần tự do chạy script)
    if (context.url.pathname !== '/api/render') {
        const csp = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data: https://fonts.gstatic.com",
            "connect-src 'self' ws: wss: https://*.google-analytics.com https://*.analytics.google.com https://cdn.jsdelivr.net",
            "worker-src 'self' blob: https://cdn.jsdelivr.net",
            "frame-src 'self' blob: https://www.youtube.com https://youtube.com",
            "object-src 'none'",
            "base-uri 'self'"
        ].join('; ');

        response.headers.set('Content-Security-Policy', csp);
    }

    return response;
});
