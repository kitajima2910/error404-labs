<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { page } from '$app/state';
	import Breadcrumb from '../../../../../components/Breadcrumb.svelte';
	import { loadMarkdown } from '../../../../../utils/markdown';
	import { onMount } from 'svelte';

	let lesson = $derived(page.params.lesson || '01'); // Mặc định là '01'

	let content: string | any = $state('⏳ Đang tải bài học');

	const nameMap = {
		// svelte-ignore state_referenced_locally
		[lesson]: `Buổi ${lesson}`
	};

	const DATA_LESSON = [
		{
			id: '01',
			title:
				'Viết chương trình nhập vào một ký tự, một số nguyên, một số thực. Hãy in ra màn hình ký tự có độ rộng là 3, số nguyên có độ rộng là 6, số thực có độ rộng là 8 với 3 chữ số lẻ.',
			readme: '/md/LTCB_BTTH/Buoi01/Bai01.md'
		},
		{
			id: '02',
			title: 'In ra màn hình ký tự, số nguyên, số thực với 2 chữ số lẻ.',
			readme: '/md/LTCB_BTTH/Buoi01/Bai02.md'
		}
	];

	// ✅ Chạy khi component được mount
	onMount(() => {
		getLesson('01');
	});

	const getLesson = async (data: string) => {
		const dataLesson = DATA_LESSON.find((item) => item.id === data);

		if (!dataLesson) {
			console.error('Không tìm thấy bài học');
			return;
		}

		lesson = dataLesson.id;

		const titleElement = document.querySelector('.right .title');
		if (titleElement) {
			titleElement.innerHTML = dataLesson.title;
		}

		content = await loadMarkdown(dataLesson.readme);
	};
</script>

<Breadcrumb {nameMap} />

<div class="lesson">
	<div class="left">
		<ul>
			{#each DATA_LESSON as { id }}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li class={lesson === id ? 'active' : ''} onclick={() => getLesson(id)}>Bài {id}</li>
			{/each}
		</ul>
	</div>
	<div class="right">
		<div class="title"></div>
		<div class="content markdown-body">
			{@html content}
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
			border: 1px dotted var(--primary);
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
			height: 100vh;

			display: flex;
			flex-direction: column;

			.title {
				width: 100%;
				height: 100px;
				border-bottom: 1px dotted var(--primary);
				padding-bottom: 1rem;
			}

			.content {
				width: 100%;
				/* height: 100%; */
				overflow-y: scroll;
			}
		}
	}
</style>
