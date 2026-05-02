export const prerender = false

export const GET = async ({ request }: { request: Request }) => {
    // x-vercel-id format: "sin1::iad1::abc123" — region is the first segment
    const vercelId = request.headers.get('x-vercel-id') ?? ''
    const regionFromHeader = vercelId.split('::')[0] || null

    const region = import.meta.env.VERCEL_REGION || regionFromHeader || 'unknown'

    return new Response(
        JSON.stringify({
            region,
            vercel_id: vercelId || null,
            timestamp: new Date().toISOString(),
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    )
}
