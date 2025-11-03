<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';

	type Lesson = {
		name_lesson: string;
		name: string;
		link: string;
	};

	const LESSONS: Lesson[] = [
		{
			name_lesson: 'Bài 01',
			name: 'Sử dụng các tag cơ bản',
			link: '/guides/webs/slideshare/01'
		},
		{
			name_lesson: 'Bài 02',
			name: 'Sử dụng các tag cơ bản (tt)',
			link: '/guides/webs/slideshare/02'
		}
	];
</script>

<Breadcrumb />

<div class="slideshare">
	<h2>Mục Lục Của Slide Share</h2>
	{#each LESSONS as { name_lesson, name, link }}
		<p>
			<a data-sveltekit-preload-data data-sveltekit-preload href={link}
				><b>{name_lesson}:</b> {name}</a
			>
		</p>
	{/each}
</div>

<style>
	.slideshare {
		border: 1px solid #ccc;
		padding: 1rem;
		text-align: center;
		transition: all 0.3s ease-in-out;
		width: 100%;
		border-radius: calc((5 * 1rem) / 16);
		box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

		h2 {
			text-align: center;
		}

		p {
			margin: 1rem;
			text-align: justify;
			line-height: 1.5;

			a {
				color: black;
				text-decoration: none;
				transition: all 0.3s ease-in-out;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>
