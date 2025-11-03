<script lang="ts">
	import '$lib/assets/global.css';
	import Title from '../components/Title.svelte';

	import { page } from '$app/state';

	let { children } = $props();

	let isGuidesPage = $derived(() => /^\/guides(\/.*)?$/.test(page.url.pathname));

	const USER_GITHUB = 'kitajima2910';
	const REPO_NAME = 'error404-labs';
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/midcodekid.png" />
</svelte:head>

{#if !isGuidesPage()}
	<header>
		<Title />
	</header>

	<div class="github">
		<iframe
			src="https://ghbtns.com/github-btn.html?user={USER_GITHUB}&repo={REPO_NAME}&type=follow&count=true"
			frameborder="0"
			scrolling="0"
			width="170"
			height="20"
			title="GitHub"
		></iframe>
		<iframe
			src="https://ghbtns.com/github-btn.html?user={USER_GITHUB}&repo={REPO_NAME}&type=star&count=true"
			frameborder="0"
			scrolling="0"
			width="150"
			height="20"
			title="GitHub"
		></iframe>
	</div>

	<nav>
		<ul>
			<li>
				<a data-sveltekit-preload-data data-sveltekit-preload href="/guides">Hướng dẫn học</a>
			</li>
		</ul>
	</nav>
{/if}

<main class:main={!isGuidesPage()}>
	{@render children?.()}
</main>

{#if !isGuidesPage()}
	<footer>
		<p>Copyright &copy; {new Date().getFullYear()} - Phạm Xuân Hoài</p>
	</footer>
{/if}

<style>
	header {
		position: sticky;
		top: 0;
		background: var(--primary); /* #1E5B66 */
		color: white;
		display: flex;
		justify-content: center;
		padding: calc((20 * 1rem) / 16);
	}

	.main {
		max-width: calc((1200 * 1rem) / 16);
		margin: calc((20 * 1rem) / 16) auto;
		padding: calc((20 * 1rem) / 16);
	}

	footer {
		text-align: center;
		margin: calc((20 * 1rem) / 16);
	}

	.github {
		text-align: center;
		margin: calc((10 * 1rem) / 16);
	}

	nav {
		width: 100%;

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;

			max-width: calc((1200 * 1rem) / 16);
			margin: calc((20 * 1rem) / 16) auto;
			padding: calc((20 * 1rem) / 16);

			display: flex;
			gap: calc((50 * 1rem) / 16);
			li {
				border: calc((2 * 1rem) / 16) dotted var(--primary);
				font-weight: bold;

				a {
					display: inline-block;
					color: var(--primary);
					text-align: center;
					padding: calc((10 * 1rem) / 16);
					text-decoration: none;
					font-size: calc((14 * 1rem) / 16);
				}
			}
		}
	}
</style>
