<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { highlightCode, loadMarkdownRaw } from '../../../../../utils/markdown';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Breadcrumb from '../../../../../components/Breadcrumb.svelte';

	let lesson = $derived(page.params.lesson || '');

	let content: string | any = $state('⏳ Đang tải bài học');

	const nameMap = $derived({
		[lesson]: `Bài ${lesson}`
	});

	onMount(async () => {
		const LessonRaw = await import(`$lib/md/HocWeb/CoBan/slideshare/Bai${lesson}/README.md?raw`);
		content = loadMarkdownRaw(LessonRaw.default);

		highlightCode();
	});
</script>

<Breadcrumb {nameMap} />

<div class="markdown-body">
	{@html content}
</div>
