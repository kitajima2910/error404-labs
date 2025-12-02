<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// ✅ Nhận nameMap từ props hoặc dùng default
	let { nameMap = {} }: { nameMap?: Record<string, string> } = $props();

	// ✅ Dùng $derived để tạo reactive value từ store
	let pathParts = $derived($page.url.pathname.split('/').filter(Boolean));

	// ✅ Merge nameMap với default values
	const defaultNames: Record<string, string> = {
		'huong-dan-hoc': 'Hướng dẫn',
		'lap-trinh-web': 'Lập trình web',
		'khoa-hoc-slideshare': 'Khóa học Slide Share',
		'lap-trinh-c-cpp': 'Lập Trình C/C++',
		'lap-trinh-co-ban-bai-tap-thuc-hanh': 'Lập Trình Cơ Bản - Bài Tập Thực Hành',
		'tu-co-ban-den-nang-cao': 'Từ Cơ Bản Đến Nâng Cao',
		'tao-trang-web-tap-chi-dien-tu': 'Tạo Trang Web Tạp Chí Điện Tử'
	};

	const displayNames = $derived({ ...defaultNames, ...nameMap });

	function navigateTo(index: number) {
		const target = '/' + pathParts.slice(0, index + 1).join('/');
		goto(target);

		console.clear();
		// Dòng Logo Gradient 7 màu
		console.log(
			'%c Error404-Labs ',
			`
			font-size: 24px;
			font-weight: bold;
			padding: 12px 22px;
			color: transparent;
			background-image: linear-gradient(
			90deg,
			#0f2d33,
			#16444d,
			#1e5b66,
			#267281,
			#2f899c,
			#37a0b7,
			#40b8d2
			);
			-webkit-background-clip: text;
			`
		);

		console.log(
			'%c https://error404-labs.info.vn/ ',
			`
			font-size: 14px;
			font-weight: bold;
			padding: 6px 12px;
			color: #1e5b66;
			border: 2px solid #1e5b66;
			border-radius: 6px;
			`
		);
	}
</script>

<nav class="text-[16px] flex flex-wrap items-center gap-0.5! mb-2.5!">
	{#each pathParts as part, i}
		<button
			type="button"
			class="crumb bg-none border-none p-0 text-blue-700 cursor-pointer capitalize font-[inherit]"
			class:active={i === pathParts.length - 1}
			onclick={() => navigateTo(i)}
			disabled={i === pathParts.length - 1}
		>
			{displayNames[part] ?? part}
		</button>
		{#if i < pathParts.length - 1}
			<span class="text-[#888]"> / </span>
		{/if}
	{/each}
</nav>

<style>
	.crumb:hover:not(:disabled) {
		text-decoration: underline;
	}

	.crumb.active,
	.crumb:disabled {
		color: #333;
		cursor: default;
		font-weight: bold;
	}
</style>
