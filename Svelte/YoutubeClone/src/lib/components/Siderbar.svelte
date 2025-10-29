<script lang="ts">
	const nav = [
		{
			icon: 'homeIcon',
			title: 'home'
		},
		{
			icon: 'shortsIcon',
			title: 'shorts'
		},
		{
			icon: 'libraryIcon',
			title: 'library'
		},
		{
			icon: 'subIcon',
			title: 'subscription'
		}
	];
</script>

<div class="fixed top-[60px] flex flex-col bg-white px-1 py-2">
	{#each nav as item}
		<a
			href="/"
			class="flex flex-col items-center justify-center gap-1 rounded-lg py-4 hover:bg-gray-100"
		>
			<img src="icons/{item.icon}.svg" alt="" />
			<p>{item.title}</p>
		</a>
	{/each}
</div>
