<script lang="ts">
	import '$lib/assets/global.css';
	import Header from '../components/Header.svelte';

	let { children } = $props();

	const fontAwesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css';
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/imgs/icon_pxh.png" />
	<link rel="stylesheet" href={fontAwesome} />
</svelte:head>

<Header />
<div class="wrapper">
	{@render children?.()}
</div>

<style>
	.wrapper {
		width: 1200px;
		margin: 0 auto;
	}
</style>
