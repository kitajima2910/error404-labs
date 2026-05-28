import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    return new Response('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body></body></html>', {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
};

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const html = formData.get('html') || '';
    const css = formData.get('css') || '';
    const js = formData.get('js') || '';

    const fullHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' + css + '</style></head><body>' + html + '<script>' + js + '<\/script></body></html>';

    return new Response(fullHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
};
