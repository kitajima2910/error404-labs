<script lang="ts">
	import '$lib/assets/global.css';
	import Title from '../../components/Title.svelte';

	let { children } = $props();
</script>

<header>
	<nav>
		<a href="/" class="title">
			<Title />
		</a>
		<div class="links">
			<a href="/">Trang Chủ</a>
			<a href="/guides/htmlcssjs">Học HTML/CSS</a>
			<a href="/about">Về Tôi</a>
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
		background: var(--primary); /* #1E5B66 */
		color: white;

		nav {
			display: flex;
			align-items: center;
			max-width: calc((1200 * 1rem) / 16);
			margin: 0 auto;

			a {
				margin-left: calc((40 * 1rem) / 16);
				color: white;
				text-decoration: none;
			}

			.links {
				margin-left: auto;
			}
		}
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
</style>
