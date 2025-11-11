<script lang="ts">
	import { page } from '$app/state';

	let { data } = $props();

	let category_id = $derived(page.url.searchParams.get('category'));
	let showMobileCategories = $state(false);

	$effect(() => {
		if (category_id) {
			showMobileCategories = false;
		}
	});
</script>

<!-- Categories -->
<button
	type="button"
	class="block w-full cursor-pointer bg-[#7fa2b9] p-3 text-white sm:hidden"
	onclick={() => {
		showMobileCategories = !showMobileCategories;
	}}
>
	Filter by Category
</button>

<div
	class="mb-4 flex flex-col items-center justify-center gap-6 sm:h-auto sm:flex-row {showMobileCategories
		? 'h-[340px]'
		: 'h-0'} transition-height overflow-hidden bg-zinc-200 duration-500 sm:bg-white"
>
	<a href="/" class={category_id === null ? 'font-bold' : ''}>All</a>
	{#each data.categories as category}
		<a href="/?category={category.id}" class={category_id == category.id ? 'font-bold' : ''}>
			{category.text}
		</a>
	{/each}
</div>

<!-- Header / Search -->
<div class="mb-4 flex justify-between">
	<h1 class="font-bold uppercase">Recent Posts</h1>
	<div class="relative">
		<input
			type="text"
			class="rounded-lg border border-zinc-200 px-2 py-1"
			placeholder="Search"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="absolute top-1 right-1 opacity-40"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
			/><path d="M21 21l-6 -6" /></svg
		>
	</div>
</div>

<!-- Show Posts -->
