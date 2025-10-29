<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Siderbar from '$lib/components/Siderbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<div class="flex">
	<Siderbar />
	<main class="ml-[74px] p-6">
		{@render children?.()}
	</main>
</div>
