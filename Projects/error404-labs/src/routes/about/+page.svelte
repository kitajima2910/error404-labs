<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { loadMarkdownRaw } from '../../utils/markdown';
	import ABOUT from '$lib/md/ABOUT.md?raw';
	import { onMount } from 'svelte';

	let content: string | any = $state('⏳ Đang tải dữ liệu');

	onMount(() => {
		content = loadMarkdownRaw(ABOUT);
	});
</script>

<svelte:head>
	<link
		rel="preconnect"
		as="image"
		href="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=kitajima2910&theme=github_dark"
	/>
	<link rel="preload" href="/about/imgs/computer_gif.webp" as="image" type="image/webp" />
</svelte:head>

<div class="markdown-body">
	{@html content}
</div>
