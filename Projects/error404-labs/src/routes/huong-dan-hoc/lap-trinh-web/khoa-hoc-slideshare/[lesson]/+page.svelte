<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { highlightCode, loadMarkdownRaw } from '../../../../../utils/markdown';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Breadcrumb from '../../../../../components/Breadcrumb.svelte';

	let lesson = $derived(page.params.lesson || '');

	let content: string = $state('⏳ Đang tải bài học');

	const nameMap = $derived({
		[lesson]: `Bài ${lesson}`
	});

	let { data } = $props();

	const { dataLESSONRaw } = data;

	onMount(async () => {
		content = loadMarkdownRaw(dataLESSONRaw);

		highlightCode();
	});
</script>

<Breadcrumb {nameMap} />

<div class="markdown-body">
	{@html content}
</div>
