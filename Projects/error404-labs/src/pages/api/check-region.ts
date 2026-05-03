export const prerender = false

export const GET = async ({ request }: { request: Request }) => {
    // x-vercel-id format examples:
    //   "hkg1::txxwr..."        → 2 segments: Edge nhận request, thực thi ngay tại đó (ID = txxwr...)
    //   "hkg1::sin1::abc123"    → 3 segments: Edge (hkg1) → Compute (sin1) → Request ID
    //
    // Nếu chỉ có 2 segments, segment[1] là Request ID, không phải region.
    // process.env.VERCEL_REGION là nguồn đáng tin cậy nhất cho Compute region.
    const vercelId = request.headers.get('x-vercel-id') ?? ''
    const segments = vercelId.split('::')

    // edge: nơi request đi vào (PoP gần người dùng nhất)
    const edge = segments[0] || null

    // compute_region: nơi Function thực sự chạy
    // Ưu tiên segments[1] nếu có đủ 3 phần, fallback về VERCEL_REGION
    const compute_region =
        segments.length >= 3 ? segments[1] : (process.env.VERCEL_REGION || null)

    return new Response(
        JSON.stringify({
            // region: nguồn chính xác nhất — Vercel inject tự động tại runtime
            region: process.env.VERCEL_REGION || 'unknown',
            edge,
            compute_region,
            vercel_id: vercelId || null,
            timestamp: new Date().toISOString(),
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    )
}
