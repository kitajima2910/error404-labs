<script lang="ts">
	import Breadcrumb from '../../../components/Breadcrumb.svelte';
	import PreloadLinkWithData from '../../../components/PreloadLinkWithData.svelte';

	const nameMap = $derived({
		c: 'C/C++'
	});

	type Course = {
		title: string;
		tooltip: string;
		link: string;
	};

	const DATA_COURSE: Course[] = [
		{
			title: 'Lập Trình Cơ Bản - Bài Tập Thực Hành',
			tooltip: 'Khóa học: lập trình cơ bản - bài tập thực hành',
			link: '/guides/c/LTCB_BTTH'
		}
	];
</script>

<Breadcrumb {nameMap} />

<div class="c">
	{#each DATA_COURSE as { title, tooltip, link }}
		<div title={tooltip}>
			<PreloadLinkWithData
				href={link}
				style="color: var(--primary); text-align: center; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
			>
				<span>{title}</span>
			</PreloadLinkWithData>
		</div>
	{/each}
</div>

<style>
	.c {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc((250 * 1rem) / 16), 1fr));
		gap: calc((20 * 1rem) / 16);
		justify-items: center;

		div {
			width: calc((250 * 1rem) / 16);
			height: calc((150 * 1rem) / 16);
			border: 1px dotted var(--primary);
			border-radius: calc((5 * 1rem) / 16);
			box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			padding: calc((10 * 1rem) / 16);

			transition: all 0.3s ease-in-out;

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
