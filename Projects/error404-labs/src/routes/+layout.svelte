<script lang="ts">
	import '../app.css';
	import '$lib/assets/global.css';
	import Title from '../components/Title.svelte';

	import { page } from '$app/state';
	import PreloadLinkWithData from '../components/PreloadLinkWithData.svelte';

	let { children } = $props();

	let isGuidesPage = $derived(() => /^\/huong-dan-hoc(\/.*)?$/.test(page.url.pathname));

	const USER_GITHUB = 'kitajima2910';
	const REPO_NAME = 'error404-labs';
</script>

{#if !isGuidesPage()}
	<header class="sticky top-0 bg-[#1e5b66] text-white p-3!">
		<Title />
	</header>

	<nav class="w-full">
		<ul>
			<li
				class="hover-rgb border border-dashed border-[#1e5b66] rounded-[5px] text-[#1e5b66] text-center decoration-0 text-[18px]"
			>
				<PreloadLinkWithData
					href="/huong-dan-hoc"
					style="color: var(--primary); padding: calc((10 * 1rem) / 16);"
					>Hướng dẫn học
				</PreloadLinkWithData>
			</li>
		</ul>
	</nav>
{/if}

<main class:main={!isGuidesPage()}>
	{@render children?.()}
</main>

{#if !isGuidesPage()}
	<footer class="text-center m-5!">
		<p>Copyright &copy; {new Date().getFullYear()} - Phạm Xuân Hoài</p>
	</footer>
{/if}

<style>
	.main {
		max-width: calc((1200 * 1rem) / 16);
		margin: calc((20 * 1rem) / 16) auto;
		padding: calc((20 * 1rem) / 16);
	}

	nav {
		/* width: 100%; */

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
		}
	}
</style>
