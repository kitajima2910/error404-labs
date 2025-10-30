<script lang="ts">
	import '$lib/assets/global.css';
	import Title from '../components/Title.svelte';

	let { children } = $props();

	const fontAwesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css';
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/midcodekid.jpg" />
	<link rel="stylesheet" href={fontAwesome} />
</svelte:head>

<header>
	<Title />
</header>

<main>
	{@render children?.()}
</main>

<footer>
	<p>Copyright &copy; {new Date().getFullYear()} - Phạm Xuân Hoài</p>
</footer>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	main {
		max-width: calc((1200 * 1rem) / 16);
		margin: calc((20 * 1rem) / 16) auto;
	}

	footer {
		text-align: center;
	}
</style>
