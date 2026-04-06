import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
    const isDev = import.meta.env.DEV;
    try {
        const token = cookies.get('auth_token')?.value;

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

        const decoded = jwt.verify(token, jwtSecret) as { id: number; member: string; roles: string };
        
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(dbUrl);
        const user = (await sql`SELECT points, created_at, display_name FROM error404labs.members WHERE id = ${decoded.id}`)[0];

        return new Response(JSON.stringify({ 
            authenticated: true, 
            user: { 
                member: decoded.member, 
                roles: decoded.roles,
                display_name: user?.display_name || decoded.member,
                points: user?.points || 0,
                created_at: user?.created_at
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
