<script>
	import { onMount } from 'svelte';

	// Danh sách theme bạn muốn dùng (phải trùng trong tailwind.config.cjs)
	const themes = ['light', 'dark', 'cupcake', 'forest', 'night', 'mytheme'];

	let currentTheme = 'light';

	// Khi khởi động, lấy theme từ localStorage (nếu có)
	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme && themes.includes(savedTheme)) {
			currentTheme = savedTheme;
			document.documentElement.setAttribute('data-theme', savedTheme);
		} else {
			document.documentElement.setAttribute('data-theme', currentTheme);
		}
	});

	// Hàm đổi theme khi user chọn
	// @ts-ignore
	function setTheme(theme) {
		currentTheme = theme;
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<!-- Dropdown chọn theme -->
<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="btn m-1">
		🎨 Theme: <span class="ml-2 capitalize">{currentTheme}</span>
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul
		tabindex="0"
		class="dropdown-content menu z-1 max-h-60 w-52 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
	>
		{#each themes as theme}
			<li>
				<button on:click={() => setTheme(theme)} class:selected={currentTheme === theme}>
					{theme}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	button.selected {
		font-weight: bold;
		color: hsl(var(--p));
	}
</style>
