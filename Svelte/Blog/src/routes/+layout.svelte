<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative container mx-auto p-4">
	<!-- Header -->
	<div class="mb-6 text-center">
		<a href="/">
			<img src="/icon_pxh.png" alt="PXH Logo" class="inline-block max-h-14" />
			<div class="text-xl font-thin opacity-60">Programming Tutorials</div>
		</a>
	</div>
	{@render children()}
	<!-- Footer -->
	<div class="mt-8 text-center text-sm opacity-40">
		Copyright &copy; {new Date().getFullYear()}
	</div>
</div>
