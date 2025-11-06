<script>
	import { page } from '$app/state';
	import PreloadLinkWithData from '../components/PreloadLinkWithData.svelte';

	let slug = `/${page.url.pathname.slice(1)}`;
</script>

<div class="error-container">
	<h1>{page.status}</h1>
	<p>{page.error?.message}: {slug}</p>
	<PreloadLinkWithData
		href="/"
		style="margin-top: 1rem; padding: 0.5rem 1rem; border: 1px dotted rgba(255, 255, 255, 0.2); color: var(--primary);"
		>Home</PreloadLinkWithData
	>
</div>

<style>
	.error-container {
		text-align: center;
		padding: 2rem;
	}
</style>
