<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { page } from '$app/state';
	import Breadcrumb from '../../../../../components/Breadcrumb.svelte';
	import { highlightCode, loadMarkdownRaw } from '../../../../../utils/markdown';
	import { onMount } from 'svelte';
	import { renderMath } from '../../../../../utils/katex';
	import type { PageParams } from '../../../../../data/LTCB_BTTH';

	let lesson = $derived(page.params.lesson || '01');
	let subLesson = $state('01');
	let dataFromPrev: PageParams[] = $state([]);

	let content: string = $state('⏳ Đang tải bài học');

	const nameMap = {
		// svelte-ignore state_referenced_locally
		[lesson]: `Buổi ${lesson}`
	};

	onMount(() => {
		const saved = sessionStorage.getItem('preload_link_data');
		if (saved) {
			dataFromPrev = JSON.parse(saved);
			getLesson({ lesson: dataFromPrev[0].lesson, subLesson: dataFromPrev[0].subLesson });
		}
	});

	const getLesson = async (data: { lesson: string; subLesson: string }) => {
		const dataLesson = dataFromPrev.find((item: any) => item.subLesson === data.subLesson);

		if (!dataLesson) {
			console.error('Không tìm thấy bài học');
			return;
		}

		lesson = data.lesson;
		subLesson = data.subLesson;

		const titleElement = document.querySelector('.right .title');
		if (titleElement) {
			titleElement.innerHTML = renderMath(dataLesson.content);
		}

		const lessonRaw = await import(`$lib/md/LTCB_BTTH/Buoi${lesson}/Bai${subLesson}.md?raw`);
		content = loadMarkdownRaw(lessonRaw.default);

		highlightCode();
	};
</script>

<Breadcrumb {nameMap} />

<div class="lesson">
	<div class="left">
		<ul>
			{#each dataFromPrev as item}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li
					class={subLesson === item.subLesson ? 'active' : ''}
					onclick={() => getLesson({ lesson: item.lesson, subLesson: item.subLesson })}
				>
					Bài {item.subLesson}
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
					padding: calc((10 * 1rem) / 16);
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
				}
			}
		}
	}
</style>
