<script lang="ts">
	import Breadcrumb from '../../../components/Breadcrumb.svelte';
	import PreloadLinkWithData from '../../../components/PreloadLinkWithData.svelte';
	import { DATA_WEBS } from '../../../data/WEBS';

	const WEBS = DATA_WEBS;
</script>

<Breadcrumb />

<div class="webs">
	{#each WEBS as { name, link, title }}
		<div {title}>
			<PreloadLinkWithData
				href={link}
				style="color: var(--primary); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; text-align: center;"
			>
				<p class="title">{name}</p>
			</PreloadLinkWithData>
		</div>
	{/each}
</div>

<style>
	.webs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc((250 * 1rem) / 16), 1fr));
		gap: calc((20 * 1rem) / 16);
		justify-items: center;

		div {
			position: relative;
			z-index: 100;
			border: 1px solid #ccc;
			padding: calc((10 * 1rem) / 16);
			text-align: center;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			width: calc((250 * 1rem) / 16);
			height: calc((150 * 1rem) / 16);
			border-radius: calc((5 * 1rem) / 16);
			box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

			&:hover {
				background: linear-gradient(
					45deg,
					rgba(255, 0, 0, 0.1),
					rgba(0, 255, 0, 0.1),
					rgba(0, 0, 255, 0.1)
				);
			}
		}
	}
</style>
