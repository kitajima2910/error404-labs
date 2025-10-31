<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// ✅ Nhận nameMap từ props hoặc dùng default
	let { nameMap = {} }: { nameMap?: Record<string, string> } = $props();

	// ✅ Dùng $derived để tạo reactive value từ store
	let pathParts = $derived($page.url.pathname.split('/').filter(Boolean));

	// ✅ Merge nameMap với default values
	const defaultNames: Record<string, string> = {
		guides: 'Hướng dẫn',
		webs: 'Website',
		slideshare: 'Slide Share'
	};

	const displayNames = $derived({ ...defaultNames, ...nameMap });

	function navigateTo(index: number) {
		const target = '/' + pathParts.slice(0, index + 1).join('/');
		goto(target);
	}
</script>

<nav class="breadcrumb">
	{#each pathParts as part, i}
		<button
			type="button"
			class="crumb"
			class:active={i === pathParts.length - 1}
			onclick={() => navigateTo(i)}
			disabled={i === pathParts.length - 1}
		>
			{displayNames[part] ?? part}
		</button>
		{#if i < pathParts.length - 1}
			<span class="sep"> / </span>
		{/if}
	{/each}
</nav>

<style>
	.breadcrumb {
		font-size: 1rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.crumb {
		background: none;
		border: none;
		padding: 0;
		color: #007bff;
		cursor: pointer;
		text-transform: capitalize;
		font-size: inherit;
		font-family: inherit;
	}

	.crumb:hover:not(:disabled) {
		text-decoration: underline;
	}

	.crumb.active,
	.crumb:disabled {
		color: #333;
		cursor: default;
		font-weight: bold;
	}

	.sep {
		color: #888;
	}
</style>
