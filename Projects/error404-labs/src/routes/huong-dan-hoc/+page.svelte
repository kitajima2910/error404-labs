<script lang="ts">
	import PreloadLinkWithData from '../../components/PreloadLinkWithData.svelte';

	type Course = {
		title: string;
		link: string;
	};

	const DATA_COURSE: Course[] = [
		{
			title: 'Lập trình Web',
			link: '/huong-dan-hoc/lap-trinh-web'
		},
		{
			title: 'Lập trình C/C++',
			link: '/huong-dan-hoc/lap-trinh-c-cpp'
		}
	];
</script>

<svelte:head>
	<link rel="canonical" href="https://error404-labs.info.vn/huong-dan-hoc" />
</svelte:head>

<article class="mb-5! flex flex-col gap-2">
	<h1 class="text-2xl">Học lập trình cùng Error404-Labs</h1>
	<p>Các khóa học lập trình tại Error404-Labs giúp bạn training tốt hơn.</p>
</article>

<div class="guides">
	<!-- List card course have title Web, C/C++, Java,... -->
	<ul class="wrapper-box-card">
		{#each DATA_COURSE as course (course.title)}
			<li data-sveltekit-preload-data data-sveltekit-preload class="box-card">
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
