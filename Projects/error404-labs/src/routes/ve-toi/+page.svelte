<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { loadMarkdownRaw } from '../../utils/markdown';
	import { onMount } from 'svelte';

	let content: string = $state('⏳ Đang tải dữ liệu');

	let { data } = $props();

	const { dataABOUTRaw } = data;

	onMount(() => {
		content = loadMarkdownRaw(dataABOUTRaw);
	});
</script>

<svelte:head>
	<link
		rel="preconnect"
		as="image"
		href="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=kitajima2910&theme=github_dark"
	/>
	<link rel="preload" href="/about/imgs/computer_gif.webp" as="image" type="image/webp" />

	<link rel="canonical" href="https://error404-labs.info.vn/ve-toi" />
</svelte:head>

<div class="markdown-body">
	{@html content}
</div>
