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
			title: 'Bài 01: Tải C-Free 5.0 Pro'
		},
		{
			fileName: 'bai02',
			title: 'Bài 02: Lập Trình Hướng Đối Tượng Trong C++'
		},
		{
			fileName: 'bai03',
			title: 'Bài 03: Data Types trong C++'
		},
		{
			fileName: 'bai04',
			title: 'Bài 04: Arrays trong C++'
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
		const module = await import(`$lib/tu-co-ban-den-nang-cao/${fileName}.svelte`);
		CurrentLesson = module.default;

		// console.log("currentLesson: ", LESSONS.filter(item => item.fileName === activeContent)[0]);
		const currentLesson = LESSONS.filter((item) => item.fileName === activeContent)[0];
		localStorage.setItem('tu-co-ban-den-nang-cao', JSON.stringify(currentLesson));

		scrollToTop();
	};

	onMount(() => {
		if (localStorage.getItem('tu-co-ban-den-nang-cao')) {
			const currentLesson: LESSON = JSON.parse(
				JSON.parse(JSON.stringify(localStorage.getItem('tu-co-ban-den-nang-cao')))
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
				height: calc(30rem - 200px);
			}
		}
	}
</style>
