<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { page } from '$app/state';
	import { DATA_LESSONS, type PageParams } from '../../../../../../data/LTCB_BTTH';
	import Breadcrumb from '../../../../../../components/Breadcrumb.svelte';
	import { highlightCode, loadMarkdownRaw } from '../../../../../../utils/markdown';
	import { renderMath } from '../../../../../../utils/katex';
	import { goto } from '$app/navigation';

	let lesson = $derived(page.params.lesson || 'b-01');
	let subLesson = $derived(page.params.subLesson || '01');
	let dataFromPrev: PageParams[] = $state([]);

	let content: string = $derived('⏳ Đang tải bài học');

	let nameMap = $derived({});

	const CLONE_DATA_LESSONS = DATA_LESSONS;

	$effect(() => {
		nameMap = {
			// svelte-ignore state_referenced_locally
			[lesson]: `Buổi ${lesson.split('-')[1]}`,
			// svelte-ignore state_referenced_locally
			[subLesson]: `Bài ${subLesson}`
		};
		(async () => {
			// console.log(lesson, subLesson);
			const saved = sessionStorage.getItem('preload_link_data');

			if (saved) {
				dataFromPrev = JSON.parse(saved);

				const res = await fetch(
					`/huong-dan-hoc/lap-trinh-c-cpp/lap-trinh-co-ban-bai-tap-thuc-hanh/${lesson}/${subLesson}`
				);
				const dataLESSONRaw = await res.text();
				content = loadMarkdownRaw(dataLESSONRaw);

				const title = document.querySelector('.right > .title');
				if (title) {
					const titleRaw = CLONE_DATA_LESSONS.filter(
						(item) => item.lesson === lesson
					)[0].data.filter((item) => item.lesson === lesson && item.subLesson === subLesson)[0]
						.content;
					title.innerHTML = titleRaw;
					// console.log('title: ', title);
				}

				highlightCode();
			}
		})();
	});

	const gotoURL = async (data: { lesson: string; subLesson: string }) => {
		await goto(
			`/huong-dan-hoc/lap-trinh-c-cpp/lap-trinh-co-ban-bai-tap-thuc-hanh/${data.lesson}/${data.subLesson}`
		);
	};
</script>

<Breadcrumb {nameMap} />

<div class="lesson">
	<div class="left">
		<ul>
			{#each dataFromPrev as item}
				<li class:active={item.subLesson === subLesson}>
					<button onclick={() => gotoURL(item)}>
						Bài {item.subLesson}
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="right">
		<div class="title"></div>
		<div class="content markdown-body">
			{@html renderMath(content)}
		</div>
	</div>
</div>

<style>
	.lesson {
		display: grid;
		grid-template-columns: 0.1fr 1fr;
		grid-template-areas: 'left right';
		gap: calc((20 * 1rem) / 16);
		justify-items: center;
		width: 100%;

		.left {
			grid-area: 'left';
			width: 100%;
			border-radius: calc((5 * 1rem) / 16);
			box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

			ul {
				list-style: none;

				li {
					cursor: pointer;
					color: var(--primary);

					&.active {
						background: linear-gradient(
							45deg,
							rgba(255, 0, 0, 0.1),
							rgba(0, 255, 0, 0.1),
							rgba(0, 0, 255, 0.1)
						);
					}

					button {
						border: none;
						background: none;
						cursor: pointer;
						font-size: calc((16 * 1rem) / 16);
						color: var(--primary);
						width: 100%;
						padding: calc((10 * 1rem) / 16);
					}
				}
			}
		}

		.right {
			grid-area: 'right';
			width: 100%;
			overflow-x: auto;
			/* height: 100vh; */

			display: flex;
			flex-direction: column;

			.title {
				width: 100%;
				border-bottom: 1px dotted var(--primary);
				padding-bottom: 1rem;
				margin-bottom: 1rem;
				color: var(--primary);
			}

			.content {
				width: 100%;
				/* overflow-y: scroll; */
			}
		}
	}

	@media screen and (max-width: 1200px) {
		ul {
			li {
				button {
					font-size: calc((13 * 1rem) / 16) !important;
				}
			}
		}
	}

	@media screen and (max-width: 950px) {
		.lesson {
			grid-template-columns: 1fr;
			grid-template-areas:
				'left'
				'right';

			.left {
				max-width: 100%;

				ul {
					display: flex;
					flex-wrap: wrap;
					li {
						button {
							font-size: calc((16 * 1rem) / 16) !important;
						}
					}
				}
			}
		}
	}
</style>
