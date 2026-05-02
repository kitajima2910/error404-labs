import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'
import { neon } from '@neondatabase/serverless'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
    try {
        // Verify authentication
        const authHeader = request.headers.get('Authorization')
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
        }

        const dbUrl = import.meta.env.DATABASE_URL
        const jwtSecret = import.meta.env.JWT_SECRET
        const privateKey = import.meta.env.IMAGEKIT_PRIVATE_KEY
        const urlEndpoint = import.meta.env.IMAGEKIT_URL_ENDPOINT

        if (!dbUrl || !jwtSecret || !privateKey || !urlEndpoint) {
            return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 })
        }

        // Decode JWT
        const decoded = jwt.verify(token, jwtSecret) as {
            id: number
            member: string
            roles: string
        }

        // Verify user is member or admin
        if (decoded.roles !== 'member' && decoded.roles !== 'admin') {
            return new Response(JSON.stringify({ error: 'Only members can upload avatars' }), { status: 403 })
        }

        // Get form data
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 })
        }

        // Validate file
        if (!file.type.startsWith('image/')) {
            return new Response(JSON.stringify({ error: 'Only image files are allowed' }), { status: 400 })
        }

        // Limit file size to 2MB for avatars
        if (file.size > 2 * 1024 * 1024) {
            return new Response(JSON.stringify({ error: 'File size must be less than 2MB' }), { status: 400 })
        }

        // Upload to ImageKit
        const uploadForm = new FormData()
        uploadForm.append('file', file)
        uploadForm.append('fileName', `avatar-${decoded.id}-${Date.now()}`)
        uploadForm.append('folder', '/avatars')
        uploadForm.append('useUniqueFileName', 'true')

        const credentials = btoa(`${privateKey}:`)
        const ikRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentials}`,
            },
            body: uploadForm,
        })

        if (!ikRes.ok) {
            const errText = await ikRes.text()
            console.error('ImageKit upload error:', errText)
            return new Response(JSON.stringify({ error: 'Failed to upload image' }), { status: 500 })
        }

        const ikData = (await ikRes.json()) as { url: string }
        const avatarUrl = ikData.url

        // Update database
        const sql = neon(dbUrl)
        await sql`
            UPDATE error404labs.members
            SET avatar_url = ${avatarUrl}
            WHERE id = ${decoded.id}
        `

        return new Response(JSON.stringify({ success: true, avatar_url: avatarUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error: any) {
        console.error('Avatar upload error:', error)
        return new Response(
            JSON.stringify({
                error: 'Upload failed',
                details: import.meta.env.DEV ? error.message : undefined,
            }),
            { status: 500 }
        )
    }
}
