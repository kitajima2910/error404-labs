<script lang="ts">
	import icon_pxh from '$lib/assets/icon_pxh.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href={icon_pxh} />
</svelte:head>

{@render children?.()}
