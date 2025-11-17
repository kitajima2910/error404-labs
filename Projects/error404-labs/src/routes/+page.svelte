<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { loadMarkdownRaw } from '../utils/markdown';
	import { onMount } from 'svelte';

	let content: string = $state('⏳ Đang tải dữ liệu');

	let { data } = $props();

	const { dataHOMERaw } = data;

	onMount(() => {
		content = loadMarkdownRaw(dataHOMERaw);
	});
</script>

<div class="markdown-body">
	{@html content}
</div>
