<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';
	import PreloadLinkWithData from '../../../../components/PreloadLinkWithData.svelte';
	import { DATA_LESSONS } from '../../../../data/LTCB_BTTH';

	const LESSONS = DATA_LESSONS;
</script>

<svelte:head>
	<title>Error404-Labs | Lập trình cơ bản - bài tập thực hành</title>
	<meta
		name="description"
		content="Khóa học lập trình C/C++ tại Error404-Labs. Học từ cơ bản đến nâng cao, hướng dẫn qua dự án thực tế, dễ hiểu, dễ ứng dụng."
	/>
	<meta
		name="keywords"
		content="học lập trình C++, C, error404 labs, error404-labs, erro 404 labs, học C, học C++, lập trình căn bản, hướng dẫn C++, dự án lập trình C++"
	/>
	<link
		rel="canonical"
		href="https://error404-labs.info.vn/huong-dan-hoc/lap-trinh-c-cpp/lap-trinh-co-ban-bai-tap-thuc-hanh"
	/>
</svelte:head>

<Breadcrumb />

<article class="mb-5! flex flex-col gap-2">
	<h1 class="text-2xl">Lập Trình Cơ Bản - Bài Tập Thực Hành</h1>
</article>

<div class="wrapper-box-card">
	{#each LESSONS as { lesson, title, data }}
		<div class="box-card">
			<PreloadLinkWithData
				href="/huong-dan-hoc/lap-trinh-c-cpp/lap-trinh-co-ban-bai-tap-thuc-hanh/{lesson}"
				style="color: var(--primary); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; text-align: center;"
				{data}
			>
				{title}
			</PreloadLinkWithData>
		</div>
	{/each}
</div>
