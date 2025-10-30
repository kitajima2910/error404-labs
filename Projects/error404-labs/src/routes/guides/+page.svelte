<script lang="ts">
	import { onMount } from 'svelte';

	let data: any[] = $state([]);

	onMount(async () => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			data = await response.json();
		} catch (e) {
			throw new Error(`Failed to fetch data: ${e}`);
		}
	});
</script>

<div class="guides">
	<ul>
		{#each data as guide (guide.id)}
			<li><a href="/guides/{guide.id}">{guide.title}</a></li>
		{/each}
	</ul>
</div>

<style>
	.guides {
		margin-top: calc((20 * 1rem) / 16);
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		display: inline-block;
		margin-top: calc((10 * 1rem) / 16);
		padding: calc((10 * 1rem) / 16);
		border: calc((1 * 1rem) / 16) dotted rgba(255, 255, 255, 0.2);
		text-decoration: none;
	}
</style>
