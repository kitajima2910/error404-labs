<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';
	import PreloadLinkWithData from '../../../../components/PreloadLinkWithData.svelte';
	import { DATA_LESSONS } from '../../../../data/LTCB_BTTH';

	const nameMap = $derived({
		LTCB_BTTH: 'Lập Trình Cơ Bản - Bài Tập Thực Hành'
	});

	const LESSONS = DATA_LESSONS;
</script>

<Breadcrumb {nameMap} />

<div class="LTCB_BTTH">
	{#each LESSONS as { lesson, title, data }}
		<div>
			<PreloadLinkWithData
				href="/huong-dan-hoc/c/LTCB_BTTH/{lesson}"
				style="color: var(--primary); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; text-align: center;"
				{data}
			>
				{title}
			</PreloadLinkWithData>
		</div>
	{/each}
</div>

<style>
	.LTCB_BTTH {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc((250 * 1rem) / 16), 1fr));
		gap: calc((20 * 1rem) / 16);
		justify-items: center;

		div {
			width: calc((250 * 1rem) / 16);
			height: calc((150 * 1rem) / 16);
			border: 1px dotted var(--primary);
			border-radius: 5px;
			box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);
			padding: calc((10 * 1rem) / 16);

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
