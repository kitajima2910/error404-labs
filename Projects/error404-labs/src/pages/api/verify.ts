import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
    try {
        const token = cookies.get('auth_token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ authenticated: false }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as { id: number; member: string; roles: string };
        
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(import.meta.env.DATABASE_URL);
        const user = (await sql`SELECT points, created_at FROM error404labs.members WHERE id = ${decoded.id}`)[0];

        return new Response(JSON.stringify({ 
            authenticated: true, 
            user: { 
                member: decoded.member, 
                roles: decoded.roles,
                points: user?.points || 0,
                created_at: user?.created_at
            } 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ authenticated: false }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
