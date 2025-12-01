<script lang="ts">
	import { onMount } from 'svelte';
	import { highlightCode } from '../utils/markdown';

	const { code } = $props();

	let copied: boolean = $derived(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(code).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}

	onMount(() => {
		highlightCode();
	});
</script>

<div class="code-container">
	<pre><code>{code}</code></pre>
	<button class="copy-btn" onclick={copyToClipboard}>
		{#if copied}
			Đã sao chép!
		{:else}
			Sao chép
		{/if}
	</button>
</div>

<style>
	.code-container {
		position: relative;
		margin: 1rem 0;
	}

	.copy-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: #007acc;
		color: white;
		border: none;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.copy-btn:hover {
		background: #005a9e;
	}
</style>
