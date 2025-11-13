<script lang="ts">
	import PreloadLinkWithData from '../../components/PreloadLinkWithData.svelte';
	import Title from '../../components/Title.svelte';
	import { onMount, onDestroy } from 'svelte';

	let { children } = $props();

	let isOpenBar: boolean = $state(false);
	let menuEl: HTMLElement;

	const toggleMenu = () => {
		isOpenBar = !isOpenBar;
	};

	onMount(() => {
		const handleResize = () => {
			isOpenBar = false;
		};

		window.addEventListener('resize', handleResize);

		const handleClickOutside = (e: MouseEvent) => {
			if (isOpenBar && menuEl && !menuEl.contains(e.target as Node)) {
				isOpenBar = false;
			}
		};

		window.addEventListener('click', handleClickOutside);

		document.querySelector('header')?.addEventListener('click', () => {
			if (isOpenBar) {
				isOpenBar = false;
			}
		});

		document.querySelector('.open-bar')?.addEventListener('click', (e) => {
			e.stopPropagation(); // ⛔ chặn click nổi lên header
			isOpenBar = !isOpenBar;
		});

		onDestroy(() => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('click', handleClickOutside);
			window.addEventListener('click', handleClickOutside);
		});
	});
</script>

<header class="sticky z-99999 top-0 bg-[#1e5b66] text-white text-center p-3!">
	<nav bind:this={menuEl} class="flex items-center">
		<div>
			<PreloadLinkWithData href="/" style="color:#fff">
				<Title />
			</PreloadLinkWithData>
		</div>

		<div class="links hidden lg:flex ml-auto! text-center!">
			<div
				class="link ml-10! flex justify-center items-center p-[5px]! rounded-[5px] hover:bg-[#2a7a88]"
			>
				<PreloadLinkWithData href="/" style="color:#fff">Trang Chủ</PreloadLinkWithData>
			</div>

			<div
				class="link ml-10! flex justify-center items-center relative group p-[5px]! rounded-[5px] hover:bg-[#2a7a88]"
			>
				<PreloadLinkWithData href="/huong-dan-hoc" style="color:#fff">Lập Trình</PreloadLinkWithData
				>
				<div
					class="group-hover:block hidden absolute top-full right-0 w-[190px] bg-[#ffffff] text-left shadow[0_8px_16px_0_rgba(0,0,0,0.2)] text-[16px]"
				>
					<span class="hover:bg-[#f1f1f1] inline-block w-full">
						<PreloadLinkWithData
							href="/huong-dan-hoc/c"
							style="color:#000; padding: calc((5 * 1rem) / 16) calc((15 * 1rem) / 16);"
							>Lập Trình C/C++</PreloadLinkWithData
						>
					</span>
					<span class="hover:bg-[#f1f1f1] inline-block w-full">
						<PreloadLinkWithData
							href="/huong-dan-hoc/webs"
							style="color:#000; padding: calc((5 * 1rem) / 16) calc((15 * 1rem) / 16);"
							>Lập Trình Web</PreloadLinkWithData
						>
					</span>
				</div>
			</div>
			<div
				class="link ml-10! flex justify-center items-center p-[5px]! rounded-[5px] hover:bg-[#2a7a88]"
			>
				<PreloadLinkWithData href="/ve-toi" style="color:#fff">Về Tôi</PreloadLinkWithData>
			</div>
		</div>

		<button
			class="open-bar cursor-pointer fixed top-[2%] right-[3%] text-[2rem]! text-white border-0 bg-transparent lg:hidden"
			onclick={toggleMenu}
		>
			{#if isOpenBar}
				&#9887;
			{:else}
				&#9776;
			{/if}
		</button>

		<div class="hidden" class:open={isOpenBar}>
			<div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]">
				<PreloadLinkWithData href="/" style="color:#fff">Trang Chủ</PreloadLinkWithData>
			</div>
			<div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]">
				<PreloadLinkWithData href="/huong-dan-hoc/c" style="color:#fff"
					>Lập Trình C/C++</PreloadLinkWithData
				>
			</div>
			<div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]">
				<PreloadLinkWithData href="/huong-dan-hoc/webs" style="color:#fff"
					>Lập Trình Web</PreloadLinkWithData
				>
			</div>
			<div class="link p-2.5! cursor-pointer hover:bg-[#246D7A80]">
				<PreloadLinkWithData href="/ve-toi" style="color:#fff">Về Tôi</PreloadLinkWithData>
			</div>
		</div>
	</nav>
</header>

<main class="max-w-[1200px] mx-auto! p-5!">
	{@render children?.()}
</main>

<footer class="text-center m-5!">
	<p>Copyright &copy; {new Date().getFullYear()} - Phạm Xuân Hoài</p>
</footer>

<style>
	header {
		nav {
			.open {
				display: block !important;
				position: absolute;
				top: 100%;
				left: 0;
				right: 0;
				background-color: #2a7a88;
			}
		}
	}
</style>
