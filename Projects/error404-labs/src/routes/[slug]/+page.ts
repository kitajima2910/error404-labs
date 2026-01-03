import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../bai-dang/${params.slug}.md`);
		console.log(post.default);
		console.log(post.metadata);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
        throw error(404, `Không thể tìm thấy ${params.slug}`);
    }
}
