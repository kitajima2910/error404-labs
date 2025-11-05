<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';

	const nameMap = $derived({
		LTCB_BTTH: 'Lập Trình Cơ Bản - Bài Tập Thực Hành'
	});

	type Lesson = {
		lesson: string;
		title: string;
	};

	const LESSONS: Lesson[] = [
		{
			lesson: '01',
			title: 'Buổi 01: Kiểu dữ liệu, toán tử và biểu thức'
		},
		{
			lesson: '02',
			title: 'Buổi 02: Các cấu trúc điều kiện'
		},
		{
			lesson: '03',
			title: 'Buổi 03: Lập trình hàm'
		},
		{
			lesson: '04',
			title: 'Buổi 04: Chuỗi - Mảng 1 chiều'
		},
		{
			lesson: '05',
			title: 'Buổi 05: Mảng 1, 2 chiều'
		},
		{
			lesson: '06',
			title: 'Buổi 06: Con trỏ'
		},
		{
			lesson: '07',
			title: 'Buổi 07: Cấu trúc'
		},
		{
			lesson: '08',
			title: 'Buổi 08: Cấu trúc - Mảng'
		},
		{
			lesson: '09',
			title: 'Buổi 09: Cấu trúc - Mảng (tt)'
		},
		{
			lesson: '10',
			title: 'Buổi 10: Tập tin'
		}
	];
</script>

<Breadcrumb {nameMap} />

<div class="LTCB_BTTH">
	{#each LESSONS as { lesson, title }}
		<div>
			<a href="/guides/c/LTCB_BTTH/{lesson}" data-sveltekit-preload-data data-sveltekit-preload
				>{title}</a
			>
		</div>
	{/each}
</div>

<style>
	.LTCB_BTTH {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 20px;
		justify-items: center;

		div {
			width: 250px;
			height: 150px;
			border: 2px dotted var(--primary);
			border-radius: 5px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

			a {
				text-decoration: none;
				color: var(--primary);
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
			}

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
</style>
