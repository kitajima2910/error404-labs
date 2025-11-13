<script lang="ts">
	import { goto } from '$app/navigation';

	interface PreloadLinkProps {
		href: string;
		data?: any;
		preload?: string;
		keepOnReload?: string;
		mode?: 'push' | 'replace';
		style?: string;
		children?: () => any;
	}

	const {
		href,
		data = {},
		preload = 'hover',
		keepOnReload = 'hover',
		mode = 'push',
		style = 'color:#1e5b66',
		children
	}: PreloadLinkProps = $props();

	const handleClick = (event: MouseEvent) => {
		event.preventDefault();

		if (keepOnReload && typeof window !== 'undefined') {
			sessionStorage.setItem('preload_link_data', JSON.stringify(data));
		}

		goto(href, {
			state: { data },
			replaceState: mode === 'replace'
		});
	};

	let attrs: Record<string, string> = {};
	if (preload) {
		attrs['data-sveltekit-preload-data'] = 'hover';
		attrs['data-sveltekit-preload'] = 'hover';
	}
</script>

<a
	{href}
	onclick={handleClick}
	{...attrs}
	{style}
	class="inline-block cursor-pointer decoration-0 w-full h-full transition-colors duration-75 ease-in"
>
	{@render children?.()}
</a>
