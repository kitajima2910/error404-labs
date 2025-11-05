<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { loadMarkdown } from '../../utils/markdown';

	let content: string | any = $state('⏳ Đang tải dữ liệu');

	$effect(() => {
		loadMarkdown('/md/ABOUT.md').then((data) => {
			content = data;
		});
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
