import type { Post } from '$lib/types';

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob('/src/bai-dang/*.md', { eager: true });

	return Object.entries(modules).map(([path, mod]: any) => ({
		...mod.metadata,
		slug: path.split('/').pop().replace('.md', '')
	}));
}
