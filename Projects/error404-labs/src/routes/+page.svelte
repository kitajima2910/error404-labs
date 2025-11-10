<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { loadMarkdownRaw } from '../utils/markdown';
	import HOME from '$lib/md/HOME.md?raw';
	import { onMount } from 'svelte';

	let content: string | any = $state('⏳ Đang tải dữ liệu');

	onMount(() => {
		content = loadMarkdownRaw(HOME);
	});
</script>

<div class="markdown-body">
	{@html content}
</div>
