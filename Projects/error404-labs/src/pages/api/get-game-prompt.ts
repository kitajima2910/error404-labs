import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
    const isDev = import.meta.env.DEV;
    try {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const dbUrl = import.meta.env.DATABASE_URL;
        const jwtSecret = import.meta.env.JWT_SECRET;

        if (!dbUrl || !jwtSecret) {
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
            SELECT prompt_access
            FROM error404labs.members
            WHERE id = ${decoded.id}
        `)[0];

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const gameName = url.searchParams.get('gameName');
        if (!gameName) {
            return new Response(JSON.stringify({ error: 'Missing gameName' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check permission
        const hasAccess = decoded.roles === 'admin' || user.prompt_access?.includes('game_roadmap');
        if (!hasAccess) {
            return new Response(JSON.stringify({ content: 'Cần có quyền cho phép hãy liên hệ Admin' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Read file
        const filePath = join(process.cwd(), 'src', 'data', 'game-roadmap', `${gameName}.txt`);
        let content = 'chưa có prompt';
        if (existsSync(filePath)) {
            content = readFileSync(filePath, 'utf-8').trim();
            if (!content) content = 'chưa có prompt';
        }

        return new Response(JSON.stringify({ content }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Get game prompt error:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            details: isDev ? error.message : undefined
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};