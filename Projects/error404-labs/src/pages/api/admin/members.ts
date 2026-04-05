import { neon } from '@neondatabase/serverless';
import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const prerender = false;

// Helper to verify admin role
const checkAdmin = (cookies: any) => {
    const token = cookies.get('auth_token')?.value;
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any;
        if (decoded.roles === 'admin') return decoded;
        return null;
    } catch {
        return null;
    }
};

const sql = neon(import.meta.env.DATABASE_URL);

// GET: List members
export const GET: APIRoute = async ({ cookies }) => {
    if (!checkAdmin(cookies)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const members = await sql`SELECT id, member, roles, created_at FROM error404labs.members ORDER BY id ASC`;
        return new Response(JSON.stringify(members), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
};

// POST: Create member
export const POST: APIRoute = async ({ cookies, request }) => {
    if (!checkAdmin(cookies)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { username, password, roles } = await request.json();
        if (!username || !password) return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });

        const hashed = await bcrypt.hash(password, 10);
        await sql`
            INSERT INTO error404labs.members (member, code, roles) 
            VALUES (${username}, ${hashed}, ${roles || 'member'})
        `;
        return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Username already exists or database error' }), { status: 500 });
    }
};

// PUT: Update member (password update optional)
export const PUT: APIRoute = async ({ cookies, request }) => {
    if (!checkAdmin(cookies)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { id, username, password, roles } = await request.json();
        if (!id || !username) return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });

        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            await sql`
                UPDATE error404labs.members 
                SET member = ${username}, code = ${hashed}, roles = ${roles || 'member'} 
                WHERE id = ${id}
            `;
        } else {
            await sql`
                UPDATE error404labs.members 
                SET member = ${username}, roles = ${roles || 'member'} 
                WHERE id = ${id}
            `;
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
};

// DELETE: Remove member
export const DELETE: APIRoute = async ({ cookies, request }) => {
    if (!checkAdmin(cookies)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { id } = await request.json();
        if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });

        await sql`DELETE FROM error404labs.members WHERE id = ${id}`;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
};
