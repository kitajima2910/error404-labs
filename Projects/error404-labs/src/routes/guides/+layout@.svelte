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

<header>
	<nav bind:this={menuEl}>
		<div>
			<PreloadLinkWithData href="/" style="color:#fff">
				<Title />
			</PreloadLinkWithData>
		</div>

		<div class="links">
			<div class="link">
				<PreloadLinkWithData href="/" style="color:#fff">Trang Chủ</PreloadLinkWithData>
			</div>

			<div class="dropdown link">
				<PreloadLinkWithData href="/guides" style="color:#fff">Lập Trình</PreloadLinkWithData>
				<div class="dropdown-content">
					<span>
						<PreloadLinkWithData
							href="/guides/c"
							style="color:#000; padding: calc((5 * 1rem) / 16) calc((15 * 1rem) / 16);"
							>Lập Trình C/C++</PreloadLinkWithData
						>
					</span>
					<span>
						<PreloadLinkWithData
							href="/guides/webs"
							style="color:#000; padding: calc((5 * 1rem) / 16) calc((15 * 1rem) / 16);"
							>Lập Trình Web</PreloadLinkWithData
						>
					</span>
				</div>
			</div>
			<div class="link">
				<PreloadLinkWithData href="/ve-toi" style="color:#fff">Về Tôi</PreloadLinkWithData>
			</div>
		</div>

		<button class="open-bar" onclick={toggleMenu}>
			{#if isOpenBar}
				&#9887;
			{:else}
				&#9776;
			{/if}
		</button>

		<div class="links-bar" class:open={isOpenBar}>
			<div class="link">
				<PreloadLinkWithData href="/" style="color:#fff">Trang Chủ</PreloadLinkWithData>
			</div>
			<div class="link">
				<PreloadLinkWithData href="/guides/c" style="color:#fff"
					>Lập Trình C/C++</PreloadLinkWithData
				>
			</div>
			<div class="link">
				<PreloadLinkWithData href="/guides/webs" style="color:#fff"
					>Lập Trình Web</PreloadLinkWithData
				>
			</div>
			<div class="link">
				<PreloadLinkWithData href="/ve-toi" style="color:#fff">Về Tôi</PreloadLinkWithData>
			</div>
		</div>
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<footer>
	<p>Copyright &copy; {new Date().getFullYear()} - Phạm Xuân Hoài</p>
</footer>

<style>
	header {
		position: sticky;
		z-index: 99999;
		top: 0;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.1);
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding: calc((20 * 1rem) / 16);
		background: var(--primary); /* #1E5B66 */
		color: white;

		nav {
			display: flex;
			align-items: center;

			.open {
				display: block !important;
				position: absolute;
				top: 100%;
				left: 0;
				right: 0;
				background-color: #2a7a88;

				.link {
					padding: calc((10 * 1rem) / 16);
					cursor: pointer;

					&:hover {
						background-color: rgba(36, 109, 122, 0.5);
					}
				}
			}

			.open-bar {
				display: none;
				cursor: pointer;
			}

			.links {
				margin-left: auto;
				display: flex;
				text-align: center;

				.link {
					margin-left: calc((40 * 1rem) / 16);
					display: flex;
					justify-content: center;
					align-items: center;
					padding: calc((5 * 1rem) / 16);
					border-radius: calc((5 * 1rem) / 16);

					&:hover {
						background-color: #2a7a88;
					}
				}

				.dropdown {
					position: relative;

					.dropdown-content {
						display: none;
						position: absolute;
						background-color: var(--bg-primary);
						box-shadow: 0px calc((8 * 1rem) / 16) calc((16 * 1rem) / 16) 0px rgba(0, 0, 0, 0.2);
						top: 100%;
						right: 0;
						width: calc((190 * 1rem) / 16);
						text-align: left;

						span {
							display: inline-block;
							width: 100%;
							height: 100%;
							&:hover {
								background-color: #f1f1f1;
							}
						}
					}

					&:hover {
						.dropdown-content {
							display: block;
						}
					}
				}
			}

			.links-bar {
				display: none;
			}
		}
	}

	main {
		max-width: calc((1200 * 1rem) / 16);
		margin: calc((20 * 1rem) / 16) auto;
		padding: calc((20 * 1rem) / 16);
	}

	footer {
		text-align: center;
		margin: calc((20 * 1rem) / 16);
	}

	@media (max-width: calc((950 * 1rem) / 16)) {
		.links {
			display: none !important;
		}

		.open-bar {
			font-size: 2rem !important;
			display: block !important;
			cursor: pointer;

			position: fixed;
			top: 3%;
			right: 3%;

			transition: all 0.3s ease-in-out;

			background: transparent;
			border: none;
			color: WHITE;
		}
	}
</style>
