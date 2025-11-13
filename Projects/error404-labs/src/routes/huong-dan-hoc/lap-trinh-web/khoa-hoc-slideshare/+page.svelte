<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';

	type Lesson = {
		icon: string;
		name_lesson: string;
		name: string;
		link: string;
	};

	const LESSONS: Lesson[] = [
		{
			icon: '🧩',
			name_lesson: 'Bài 01',
			name: 'Sử dụng các tag cơ bản',
			link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/01'
		},
		{
			icon: '🎨',
			name_lesson: 'Bài 02',
			name: 'Sử dụng các tag cơ bản (tt)',
			link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/02'
		},
		{
			icon: '🌈',
			name_lesson: 'Bài 03',
			name: 'Định dạng trang web',
			link: '/huong-dan-hoc/lap-trinh-web/khoa-hoc-slideshare/03'
		}
	];
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
