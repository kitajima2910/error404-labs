<script lang="ts">
	import Breadcrumb from '../../../components/Breadcrumb.svelte';
	import PreloadLinkWithData from '../../../components/PreloadLinkWithData.svelte';

	type Course = {
		title: string;
		tooltip: string;
		link: string;
	};

	const DATA_COURSE: Course[] = [
		{
			title: 'Lập Trình Cơ Bản - Bài Tập Thực Hành',
			tooltip: 'Khóa học: lập trình cơ bản - bài tập thực hành',
			link: '/huong-dan-hoc/lap-trinh-c-cpp/LTCB_BTTH'
		}
	];
</script>

<svelte:head>
	<title>Error404-Labs | Học lập trình C/C++ từ cơ bản đến nâng cao</title>
	<meta
		name="description"
		content="Các khóa học lập trình C/C++ tại Error404-Labs. Học từ cơ bản đến nâng cao, hướng dẫn qua thực hành, dễ hiểu, dễ ứng dụng."
	/>
	<meta
		name="keywords"
		content="học lập trình C, C++, error404 labs, error404-labs, erro 404 labs, học C, học C++, lập trình căn bản, hướng dẫn C++, dự án lập trình C++"
	/>
	<link rel="canonical" href="https://error404-labs.info.vn/huong-dan-hoc/lap-trinh-c-cpp" />
</svelte:head>

<Breadcrumb />

<article class="mb-5! flex flex-col gap-2">
	<h1 class="text-2xl">Học lập trình C/C++ cùng Error404-Labs</h1>
	<ul>
		<li>Tổng quan C/C++</li>
		<li>Kiến thức cơ bản và nâng cao</li>
	</ul>
</article>

<div class="wrapper-box-card">
	{#each DATA_COURSE as { title, tooltip, link }}
		<div title={tooltip} class="box-card">
			<PreloadLinkWithData
				href={link}
				style="color: var(--primary); text-align: center; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
			>
				<span>{title}</span>
			</PreloadLinkWithData>
		</div>
	{/each}
</div>
