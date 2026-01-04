<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Moon, Sun } from 'lucide-svelte';
	import { theme, toggleTheme } from '$lib/theme';
</script>

<button on:click={toggleTheme} aria-label="Toggle theme">
	{#if $theme === 'luxury'}
		<div in:fly={{ y: 10 }}>
			<Sun />
		</div>
	{:else}
		<div in:fly={{ y: -10 }}>
			<Moon />
		</div>
	{/if}
</button>
