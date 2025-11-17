<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';
	import { DATA_SLIDESHARE_LESSONS } from '../../../../data/WEBS';

	const LESSONS = DATA_SLIDESHARE_LESSONS;
</script>

<Breadcrumb />

<div class="slideshare">
	<h3>✧･ﾟ: *✧･ﾟ:* 💎 BÀI HỌC 💎 *:･ﾟ✧*:･ﾟ✧</h3>
	{#each LESSONS as { icon, name_lesson, name, link }}
		<p>
			<a data-sveltekit-preload-data data-sveltekit-preload href={link}>
				<span class="icon">{icon}</span>
				<strong>{name_lesson}:</strong>
				{name}</a
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

		h3 {
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
