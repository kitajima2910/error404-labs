<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { id } = page.params;
	let data: any = $state({
		title: '',
		body: ''
	});

	onMount(async () => {
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
			if (!response.ok) {
				data = {
					title: response.status,
					body: `An error occurred with "${id}"`
				};
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			data = await response.json();
		} catch (e) {
			throw new Error(`Failed to fetch data: ${e}`);
		}
	});
</script>

<div class="guide">
	<h2>{data.title}</h2>
	<p>{data.body}</p>
</div>

<style>
	.guide {
		margin-top: calc((40 * 1rem) / 16);
		padding: calc((10 * 1rem) / 16);
		border: calc((1 * 1rem) / 16) dotted rgba(255, 255, 255, 0.2);
	}

	.guide h2 {
		margin-bottom: calc((10 * 1rem) / 16);
	}
</style>
