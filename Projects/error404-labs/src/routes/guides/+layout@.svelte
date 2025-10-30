<script lang="ts">
	import '$lib/assets/global.css';
	import Title from '../../components/Title.svelte';

	let { children } = $props();
</script>

<header>
	<nav>
		<Title />
		<div class="links">
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/guides">Guides</a>
		</div>
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<footer>
	<p>Copyright &copy; {new Date().getFullYear()} - Phạm Xuân Hoài</p>
</footer>

<style>
	header {
		text-align: center;
		background-color: rgba(0, 0, 0, 0.1);
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding: calc((20 * 1rem) / 16);
	}

	main {
		max-width: calc((1200 * 1rem) / 16);
		margin: calc((20 * 1rem) / 16) auto;
		padding: calc((20 * 1rem) / 16);
	}

	footer {
		text-align: center;
		margin: calc((20 * 1rem) / 16);
	}

	.links {
		margin-left: auto;
	}

	a {
		margin-left: calc((10 * 1rem) / 16);
	}

	nav {
		display: flex;
		align-items: center;
		max-width: calc((1200 * 1rem) / 16);
		margin: 0 auto;
	}
</style>
