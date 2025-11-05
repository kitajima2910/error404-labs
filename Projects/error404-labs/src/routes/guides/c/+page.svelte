<script lang="ts">
	import Breadcrumb from '../../../components/Breadcrumb.svelte';

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
			<a href={link} data-sveltekit-preload-data data-sveltekit-preload>
				<span>{title}</span>
			</a>
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
			border: calc((2 * 1rem) / 16) dotted var(--primary);
			border-radius: calc((5 * 1rem) / 16);
			box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			padding: calc((5 * 1rem) / 16);

			transition: all 0.3s ease-in-out;

			&:hover {
				background: linear-gradient(
					45deg,
					rgba(255, 0, 0, 0.1),
					rgba(0, 255, 0, 0.1),
					rgba(0, 0, 255, 0.1)
				);
			}

			a {
				text-decoration: none;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: var(--primary);
				flex-direction: column;
				text-align: center;
			}
		}
	}
</style>
