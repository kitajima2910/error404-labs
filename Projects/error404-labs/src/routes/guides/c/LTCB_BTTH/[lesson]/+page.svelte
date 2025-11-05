<script lang="ts">
	import { page } from '$app/state';
	import Breadcrumb from '../../../../../components/Breadcrumb.svelte';

	let lesson = $derived(page.params.lesson || '');

	const nameMap = $derived({
		[lesson]: `Buổi ${lesson}`
	});

	const getLesson = async (data: string) => {
		console.log(data);
	};
</script>

<Breadcrumb {nameMap} />

<div class="lesson">
	<div class="left">
		<ul>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<li onclick={() => getLesson('01')}>Bài 01</li>
			<li>Bài 02</li>
			<li>Bài 03</li>
		</ul>
	</div>
	<div class="right"></div>
</div>

<style>
	.lesson {
		display: grid;
		grid-template-columns: 0.1fr 1fr;
		grid-template-areas: 'left right';
		gap: 20px;
		justify-items: center;
		width: 100%;
		height: 100vh;

		.left {
			grid-area: 'left';
			width: 100%;
			border: 1px dotted var(--primary);
			border-radius: 5px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

			ul {
				list-style: none;
				padding: 10px;
				margin: 10px;

				li {
					margin: 5px;
					padding: 5px;
					cursor: pointer;
					color: var(--primary);
				}
			}
		}

		.right {
			grid-area: 'right';
			width: 100%;
			border: 1px dotted var(--primary);
			border-radius: 5px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}
	}
</style>
