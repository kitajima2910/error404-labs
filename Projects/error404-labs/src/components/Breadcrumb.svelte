<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// ✅ Nhận nameMap từ props hoặc dùng default
	let { nameMap = {} }: { nameMap?: Record<string, string> } = $props();

	// ✅ Dùng $derived để tạo reactive value từ store
	let pathParts = $derived($page.url.pathname.split('/').filter(Boolean));

	// ✅ Merge nameMap với default values
	const defaultNames: Record<string, string> = {
		'huong-dan-hoc': 'Hướng dẫn',
		'lap-trinh-web': 'Lập trình web',
		slideshare: 'Slide Share'
	};

	const displayNames = $derived({ ...defaultNames, ...nameMap });

	function navigateTo(index: number) {
		const target = '/' + pathParts.slice(0, index + 1).join('/');
		goto(target);
	}
</script>

<nav class="text-[16px] flex flex-wrap items-center gap-0.5! mb-2.5!">
	{#each pathParts as part, i}
		<button
			type="button"
			class="crumb bg-none border-none p-0 text-[#007bff] cursor-pointer capitalize font-[inherit]"
			class:active={i === pathParts.length - 1}
			onclick={() => navigateTo(i)}
			disabled={i === pathParts.length - 1}
		>
			{displayNames[part] ?? part}
		</button>
		{#if i < pathParts.length - 1}
			<span class="text-[#888]"> / </span>
		{/if}
	{/each}
</nav>

<style>
	.crumb:hover:not(:disabled) {
		text-decoration: underline;
	}

	.crumb.active,
	.crumb:disabled {
		color: #333;
		cursor: default;
		font-weight: bold;
	}
</style>
