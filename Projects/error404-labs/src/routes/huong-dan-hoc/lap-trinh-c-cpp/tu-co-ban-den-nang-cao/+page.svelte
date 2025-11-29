<script lang="ts">
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';

	let currentContent: string = $derived('');
	let activeContent: string = $derived('');

	const onLoadLesson = async (fileName: string) => {
		activeContent = fileName;
		const res = await fetch(`/tu-co-ban-den-nang-cao/${fileName}`);
		currentContent = await res.text();
	};

	$effect(() => {
		onLoadLesson('bai01.html');
	});
</script>

<Breadcrumb />

<div class="wrapper">
	<div class="left">
		{@html currentContent}
	</div>
	<div class="right">
		<p class="title">Nội dung khóa học</p>
		<ul>
			<li class:active={activeContent === 'bai01.html'}>
				<button onclick={() => onLoadLesson('bai01.html')}>Bài 01: Tải C-Free 5.0 Pro</button>
			</li>
			<li class:active={activeContent === 'bai02.html'}>
				<button onclick={() => onLoadLesson('bai02.html')}>Bài 02: Class</button>
			</li>
		</ul>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
		grid-template-areas: 'left right';
		gap: 10px;

		.left {
			grid-area: 'left';
			border: 1px dashed #1e5b66;
			border-radius: 10px;
			height: calc(100vh - 200px);
			overflow-y: scroll;
			padding: 15px;
		}

		.right {
			grid-area: 'right';
			/* border: 1px dashed #1e5b66; */
			height: calc(100vh - 200px);
			overflow: hidden;
			position: relative;

			.title {
				position: sticky;
				top: 0;
				left: 0;
				background-color: #1e5b66;
				color: #fff;
				width: 100%;
				padding: 15px;
			}

			ul {
				width: 100%;
				height: 100%;

				overflow-y: scroll;
				padding: 15px 0 15px;

				li {
					overflow: hidden;
					display: -webkit-inline-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;

					border: 1px dashed #1e5b66;
					width: 100%;
					padding: 0 5px;

					border-radius: 10px;

					button {
						width: 100%;
						height: 100%;
						cursor: pointer;
						text-align: left;
					}

					&.active {
						color: red;
						background-color: #ccc;
					}
				}
			}
		}

		@media screen and (max-width: 1200px) {
			grid-template-columns: 1fr;
			grid-template-areas: 'left';
		}
	}
</style>
