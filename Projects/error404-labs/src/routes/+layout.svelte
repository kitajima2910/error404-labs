<script lang="ts">
	import '$lib/assets/global.css';
	import Title from '../components/Title.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let isGuidesPage = $derived(page.url.pathname.startsWith('/guides'));
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/midcodekid.jpg" />
</svelte:head>

{#if !isGuidesPage}
	<header>
		<Title />
	</header>
{/if}

<main class:main={!isGuidesPage}>
	{@render children?.()}
</main>

{#if !isGuidesPage}
	<footer>
		<p>Copyright &copy; {new Date().getFullYear()} - Phạm Xuân Hoài</p>
	</footer>
{/if}

<style>
	header {
		display: flex;
		justify-content: center;
		margin-top: calc((20 * 1rem) / 16);
	}

	.main {
		max-width: calc((1200 * 1rem) / 16);
		margin: calc((20 * 1rem) / 16) auto;
	}

	footer {
		text-align: center;
		margin: calc((20 * 1rem) / 16);
	}
</style>
