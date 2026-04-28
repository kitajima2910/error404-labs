import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const isDev = import.meta.env.DEV;
    try {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

        if (!token) {
            return new Response(JSON.stringify({ authenticated: false }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const dbUrl = import.meta.env.DATABASE_URL;
        const jwtSecret = import.meta.env.JWT_SECRET;

        if (!dbUrl || !jwtSecret) {
            if (isDev) {
              console.warn('[VERIFY] Missing env variables on localhost');
              return new Response(JSON.stringify({ 
                  authenticated: false, 
                  error: 'Thiếu cấu hình DATABASE_URL hoặc JWT_SECRET' 
              }), { status: 200 });
            }
            throw new Error('Missing environment variables');
        }

        const decoded = jwt.verify(token, jwtSecret) as { 
            id: number; 
            member: string; 
            roles: string;
            sessionToken: string;
        };
        
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(dbUrl);
        const user = (await sql`
            SELECT points, created_at, display_name, logined, session_token, session_fingerprint, prompt_access
            FROM error404labs.members
            WHERE id = ${decoded.id}
        `)[0];

        // 1. Kiểm tra trạng thái logined
        // 2. Kiểm tra session_token (Single Session)
        // 3. Kiểm tra fingerprint (Browser identity)
        const currentFingerprint = request.headers.get('user-agent') || 'unknown';
        
        if (
            !user || 
            user.logined !== 1 || 
            user.session_token !== decoded.sessionToken ||
            user.session_fingerprint !== currentFingerprint
        ) {
            return new Response(JSON.stringify({ authenticated: false, error: 'Session invalid or expired' }), {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate'
                }
            });
        }

        return new Response(JSON.stringify({
            authenticated: true,
            user: {
                member: decoded.member,
                roles: decoded.roles,
                display_name: user?.display_name || decoded.member,
                points: user?.points || 0,
                created_at: user?.created_at,
                prompt_access: user?.prompt_access || []
            }
        }), { 
            status: 200, 
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            } 
        });
    } catch (error: any) {
        console.error('Verify error:', error);
        return new Response(JSON.stringify({ 
            authenticated: false,
            details: isDev ? error.message : undefined
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            }
        });
    }
};
