<script lang="ts">
	let { children } = $props();

	const fontAwesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css';
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/imgs/icon_pxh.png" />
	<link rel="stylesheet" href={fontAwesome} />
</svelte:head>

{@render children?.()}
