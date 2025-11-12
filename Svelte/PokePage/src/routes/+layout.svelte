<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { goto } from '$app/navigation';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Navbar -->
<div class="fixed top-0 right-0 left-0 flex items-center justify-between bg-base-100">
	<div class="navbar mx-auto max-w-3xl">
		<!-- Left side of navbar -->
		<a href="/" class="btn text-xl btn-ghost">PokePage</a>
		<a href="/user" class="btn btn-ghost">My Page</a>
	</div>
	<div class="mx-auto max-w-3xl">
		<!-- Right side of navbar -->
		<ThemeSwitcher />
		<button onclick={() => goto('/login')} class="cursor-pointer">Login</button>
		<span class="ml-2 text-lg text-white">kitajima2910@gmail.com</span>
		<button onclick={() => console.log('logging out')} class="cursor-pointer">Logout</button>
	</div>
</div>

{@render children()}
