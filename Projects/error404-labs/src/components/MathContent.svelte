<script>
	import { onMount } from 'svelte';
	import katex from 'katex';
	import 'katex/dist/katex.min.css';

	export let content = '';

	let container;

	function renderMath(text) {
		return (
			text
				// Inline: \(...\)
				.replace(/\\\((.*?)\\\)/g, (_, formula) => {
					try {
						return katex.renderToString(formula, {
							throwOnError: false
						});
					} catch (e) {
						return `\\(${formula}\\)`;
					}
				})
				// Display: $$...$$
				.replace(/\$\$(.*?)\$\$/gs, (_, formula) => {
					try {
						return katex.renderToString(formula, {
							throwOnError: false,
							displayMode: true
						});
					} catch (e) {
						return `$$${formula}$$`;
					}
				})
		);
	}

	$: if (container) {
		container.innerHTML = renderMath(content);
	}
</script>

<div bind:this={container}></div>
