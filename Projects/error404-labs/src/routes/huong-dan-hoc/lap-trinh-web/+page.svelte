<script lang="ts">
	import Breadcrumb from '../../../components/Breadcrumb.svelte';
	import PreloadLinkWithData from '../../../components/PreloadLinkWithData.svelte';
	import { DATA_WEBS } from '../../../data/WEBS';

	const WEBS = DATA_WEBS;
</script>

<svelte:head>
	<title>Error404-Labs | Học lập trình Web hiện đại</title>
	<meta
		name="description"
		content="Các khóa học lập trình Web với HTML, CSS, JavaScript. Học qua thực hành cùng Error404-Labs."
	/>
	<meta
		name="keywords"
		content="học lập trình web, error404 labs, error404-labs, erro 404 labs, html, css, javascript, lập trình frontend"
	/>
	<link rel="canonical" href="https://error404-labs.info.vn/huong-dan-hoc/lap-trinh-web" />
</svelte:head>

<Breadcrumb />

<article class="mb-5! flex flex-col gap-2">
	<h1 class="text-2xl">Học lập trình Web cùng Error404-Labs</h1>
	<p>Các khóa học lập trình Web tại Error404-Labs giúp bạn xây dựng website thực tế.</p>
	<ul>
		<li>Hiểu rõ cách hoạt động của Web.</li>
		<li>Làm chủ HTML, CSS, và JavaScript hiện đại.</li>
	</ul>
</article>

<div class="wrapper-box-card">
	{#each WEBS as { name, link, title }}
		<div {title} class="box-card">
			<PreloadLinkWithData
				href={link}
				style="color: var(--primary); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; text-align: center;"
			>
				<p class="title">{name}</p>
			</PreloadLinkWithData>
		</div>
	{/each}
</div>
