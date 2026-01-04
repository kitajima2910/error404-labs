<script lang="ts" module>
	import { img } from '$lib/components/custom';
	import { onMount } from 'svelte';
	export { img };
</script>

<script lang="ts">
	import { copyCode } from '$lib/actions/copyCode';

	let { children } = $props();

	onMount(() => {
		const codes = document.querySelectorAll('.shiki.poimandres');
		console.log(codes);
		codes.forEach((pre) => copyCode(pre as HTMLElement));
	});
</script>

{@render children?.()}
