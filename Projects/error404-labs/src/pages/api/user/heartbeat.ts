import { neon } from '@neondatabase/serverless';
import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const prerender = false;

const sql = neon(import.meta.env.DATABASE_URL);

export const POST: APIRoute = async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    
    if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any;
        const userId = decoded.id;

        const user = (await sql`
            SELECT logined, session_token, session_fingerprint 
            FROM error404labs.members 
            WHERE id = ${userId}
        `)[0];
        
        const currentFingerprint = request.headers.get('user-agent') || 'unknown';

        if (
            !user || 
            user.logined !== 1 || 
            user.session_token !== decoded.sessionToken ||
            user.session_fingerprint !== currentFingerprint
        ) {
            return new Response(JSON.stringify({ error: 'Session invalid or expired' }), { status: 401 });
        }

        // Cập nhật last_heartbeat_at (GMT+7 is default in DB NOW())
        await sql`UPDATE error404labs.members SET last_heartbeat_at = NOW() WHERE id = ${userId}`;
        
        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Heartbeat alive' 
        }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Heartbeat failed' }), { status: 401 });
    }
};
