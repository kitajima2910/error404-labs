<script lang="ts">
	import PreloadLinkWithData from '../../components/PreloadLinkWithData.svelte';

	type Course = {
		title: string;
		link: string;
	};

	const DATA_COURSE: Course[] = [
		{
			title: 'Lập trình Web',
			link: '/guides/webs'
		},
		{
			title: 'Lập trình C/C++',
			link: '/guides/c'
		}
	];
</script>

<div class="guides">
	<!-- List card course have title Web, C/C++, Java,... -->
	<ul>
		{#each DATA_COURSE as course (course.title)}
			<li data-sveltekit-preload-data data-sveltekit-preload>
				<PreloadLinkWithData
					href={course.link}
					style="display: flex; align-items: center; justify-content: center; color: var(--primary);"
				>
					{course.title}
				</PreloadLinkWithData>
			</li>
		{/each}
	</ul>
</div>

<style>
	.guides {
		ul {
			list-style: none;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 1rem;

			li {
				cursor: pointer;
				width: calc((250 1rem) / 16);
				height: calc((150 * 1rem) / 16);
				border: 1px dotted var(--primary);
				border-radius: calc((5 * 1rem) / 16);
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
	}
</style>
