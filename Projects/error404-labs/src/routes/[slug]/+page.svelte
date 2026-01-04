<script lang="ts">
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="mx-auto flex max-w-5xl flex-col px-[1.6rem]">
	<hgroup>
		<h1 class="font-pretendard text-[3.2rem] font-bold mt-5 capitalize">{data.meta.title}</h1>
		<p>Xuất bản: {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<span
				class="mr-3 my-3 inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-[0.8rem] py-[0.2rem] text-xs"
				>&num;{category}</span
			>
		{/each}
	</div>

	<div>
		<svelte:component this={data.content} />
	</div>
</article>
