<script lang="ts">
	import '$lib/assets/global.css';
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
		<a data-sveltekit-preload-data data-sveltekit-preload href="/" class="title">
			<Title />
		</a>
		<div class="links">
			<div class="link">
				<a data-sveltekit-preload-data data-sveltekit-preload href="/">Trang Chủ</a>
			</div>

			<div class="dropdown link">
				<a data-sveltekit-preload-data data-sveltekit-preload href="/guides" class="dropbtn"
					>Lập Trình</a
				>
				<div class="dropdown-content">
					<a data-sveltekit-preload-data data-sveltekit-preload href="/guides/c">Lập Trình C/C++</a>
					<a data-sveltekit-preload-data data-sveltekit-preload href="/guides/webs">Lập Trình Web</a
					>
				</div>
			</div>
			<div class="link">
				<a data-sveltekit-preload-data data-sveltekit-preload href="/about">Về Tôi</a>
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
				<a data-sveltekit-preload-data data-sveltekit-preload href="/">Trang Chủ</a>
			</div>
			<div class="link">
				<a data-sveltekit-preload-data data-sveltekit-preload href="/guides/c">Lập Trình C/C++</a>
			</div>
			<div class="link">
				<a data-sveltekit-preload-data data-sveltekit-preload href="/guides/webs">Lập Trình Web</a>
			</div>
			<div class="link">
				<a data-sveltekit-preload-data data-sveltekit-preload href="/about">Về Tôi</a>
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
		/* position: relative; */
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

			a {
				color: white;
				text-decoration: none;
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

					.dropbtn {
						color: white;
						border: none;
						cursor: pointer;
					}

					.dropdown-content {
						display: none;
						position: absolute;
						background-color: var(--bg-primary);
						box-shadow: 0px calc((8 * 1rem) / 16) calc((16 * 1rem) / 16) 0px rgba(0, 0, 0, 0.2);
						top: 100%;
						right: 0;
						width: calc((190 * 1rem) / 16);
						text-align: left;

						a {
							color: black;
							text-decoration: none;
							display: block;
							padding: calc((5 * 1rem) / 16) calc((15 * 1rem) / 16);

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

	@media (max-width: 950px) {
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
