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

        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as { id: number; member: string };

        return new Response(JSON.stringify({ 
            authenticated: true, 
            user: { member: decoded.member } 
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
