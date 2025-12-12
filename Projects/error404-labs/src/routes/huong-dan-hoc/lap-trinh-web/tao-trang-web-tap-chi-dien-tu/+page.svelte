<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';
	import { onMount } from 'svelte';
	import 'github-markdown-css/github-markdown-light.css';

	let activeContent: string = $derived('');

	let CurrentLesson: any = $derived(null);

	let contentEl: HTMLElement | null = $derived(null);

	interface LESSON {
		fileName?: string;
		title?: string;
	}

	const LESSONS: LESSON[] = [
		{
			fileName: 'bai01',
			title: 'Bài 01: Sử dụng các tag cơ bản'
		},
		{
			fileName: 'bai02',
			title: 'Bài 02: Sử dụng các tag cơ bản (tt)'
		},
		{
			fileName: 'bai03',
			title: 'Bài 03: Định dạng trang web'
		},
		{
			fileName: 'bai04',
			title: 'Bài 04: Định dạng trang web (tt)'
		},
		{
			fileName: 'bai05',
			title: 'Bài 05: Định dạng văn bản'
		},
		{
			fileName: 'bai06',
			title: 'Bài 06: Định dạng văn bản (tt)'
		},
		{
			fileName: 'bai07',
			title: 'Bài 07: Ký tự đặc biệt, chèn hình ảnh, tạo danh sách và liên kết'
		},
		{
			fileName: 'bai08',
			title: 'Bài 08: Tạo bảng'
		},
		{
			fileName: 'bai09',
			title: 'Bài 09: Tạo bảng, Trộn dòng và Trộn cột trong HTML'
		}
	];

	const scrollToTop = () => {
		if (contentEl) {
			// contentEl.scrollTop = 0;
			// Hoặc smooth scroll (tuỳ chọn):
			contentEl.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const onLoadLessonV2 = async (fileName?: string) => {
		activeContent = fileName ?? 'bai01.svelte';
		const module = await import(`$lib/tao-trang-web-tap-chi-dien-tu/${fileName}.svelte`);
		CurrentLesson = module.default;

		// console.log("currentLesson: ", LESSONS.filter(item => item.fileName === activeContent)[0]);
		const currentLesson = LESSONS.filter((item) => item.fileName === activeContent)[0];
		localStorage.setItem('tao-trang-web-tap-chi-dien-tu', JSON.stringify(currentLesson));

		scrollToTop();
	};

	onMount(() => {
		if (localStorage.getItem('tao-trang-web-tap-chi-dien-tu')) {
			const currentLesson: LESSON = JSON.parse(
				JSON.parse(JSON.stringify(localStorage.getItem('tao-trang-web-tap-chi-dien-tu')))
			);
			onLoadLessonV2(currentLesson.fileName);
		} else {
			onLoadLessonV2('bai01');
		}
	});
</script>

<Breadcrumb />

<div class="container">
	<div bind:this={contentEl} class="left markdown-body">
		{#if CurrentLesson}
			<CurrentLesson />
		{/if}
	</div>
	<div class="right">
		<p class="title">Nội dung khóa học</p>
		<ul>
			{#each LESSONS as { fileName, title }}
				<li class:active={activeContent === fileName} {title}>
					<button onclick={() => onLoadLessonV2(fileName)}>{title}</button>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
		grid-template-areas: 'left right';
		gap: 10px;

		.left {
			grid-area: 'left';
			/* border: 1px dashed #1e5b66; */
			/* border-radius: 10px; */
			height: calc(45rem - 200px);
			overflow-y: scroll;
			padding: 0 15px;
			padding-bottom: 50px;
		}

		.right {
			grid-area: 'right';
			/* border: 1px dashed #1e5b66; */
			height: calc(45rem - 200px);
			overflow: hidden;
			position: relative;

			.title {
				position: sticky;
				top: 0;
				left: 0;
				background-color: #1e5b66;
				color: #fff;
				width: 100%;
				padding: 15px;
			}

			ul {
				width: 100%;
				height: 100%;

				overflow-y: scroll;
				padding: 15px 0 15px;

				li {
					/* overflow: hidden;
					display: -webkit-inline-box;
					-webkit-box-orient: vertical;
					line-clamp: 2;
					-webkit-line-clamp: 2; */

					border: 1px dashed #1e5b66;
					width: 100%;
					padding: 0 5px;

					border-radius: 10px;
					margin: 10px 0;

					button {
						width: 100%;
						height: 100%;
						cursor: pointer;
						text-align: left;

						overflow: hidden;
						display: -webkit-inline-box;
						-webkit-box-orient: vertical;
						line-clamp: 2;
						-webkit-line-clamp: 2;
					}

					&.active {
						/* color: red;
						background-color: #ccc; */
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
	}

	@media screen and (max-width: 1200px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-areas: 'left';

			.right {
				height: fit-content;
				ul {
					height: calc(20rem - 200px);
				}
			}
		}
	}
</style>
