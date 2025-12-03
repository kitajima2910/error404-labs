<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { highlightCode, loadMarkdownRaw } from '../../../../../utils/markdown';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Breadcrumb from '../../../../../components/Breadcrumb.svelte';
	import { DATA_SLIDESHARE_LESSONS, type Lesson } from '../../../../../data/WEBS';

	let lesson = $derived(page.params.lesson || '');

	let content: string = $state('⏳ Đang tải bài học');

	const nameMap = $derived({
		[lesson]: `Bài ${lesson}`
	});

	let { data } = $props();

	const { dataLESSONRaw } = data;

	const CLONE_DATA_SLIDESHARE_LESSONS = DATA_SLIDESHARE_LESSONS;
	const SEOLesson: Lesson = $derived(
		CLONE_DATA_SLIDESHARE_LESSONS.filter((item) => item.link.includes(lesson))[0]
	);

	onMount(async () => {
		// console.log('SEOLesson: ', SEOLesson);
		content = loadMarkdownRaw(dataLESSONRaw);

		// highlightCode();
	});
</script>

<svelte:head>
	<title>Error404-Labs | {`${SEOLesson.name_lesson} ${SEOLesson.name}`}</title>
	<meta name="description" content={`${SEOLesson.name_lesson} ${SEOLesson.name}`} />
	<meta name="keywords" content={`${SEOLesson.name_lesson} ${SEOLesson.name}`} />
	<link rel="canonical" href="https://error404-labs.info.vn/{SEOLesson.link}" />
</svelte:head>

<Breadcrumb {nameMap} />

<div class="markdown-body">
	{@html content}
</div>
