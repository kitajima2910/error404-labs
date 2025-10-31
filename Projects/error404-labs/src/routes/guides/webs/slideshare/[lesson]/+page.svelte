<script lang="ts">
	import 'github-markdown-css/github-markdown.css';
	import { loadMarkdown } from '../../../../../utils/markdown';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Breadcrumb from '../../../../../components/Breadcrumb.svelte';

	let lesson = $derived(page.params.lesson || '');

	let content: string | any = $state('⏳ Đang tải bài học');

	const nameMap = $derived({
		[lesson]: `Bài ${lesson}`
	});

	onMount(async () => {
		content = await loadMarkdown(`/md/HocWeb/CoBan/slideshare/Bai${lesson}/README.md`);
	});
</script>

<Breadcrumb {nameMap} />

<div class="markdown-body">
	{@html content}
</div>
