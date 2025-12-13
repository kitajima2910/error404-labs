<script lang="ts">
	const DATA_GAME = [
		{
			title: 'Quần Vợt Kiểu Cổ Điển',
			link: '/tro-choi/TestPhaserGame/index.html',
			image: '/tro-choi/TestPhaserGame/demo.png'
		}
	];
</script>

<svelte:head>
	<title>Error404-Labs | Giải Trí - Trải Nghiệm Game Từ Project Mini</title>
	<meta
		name="description"
		content="Khám phá các game và project mini tại Error404-Labs. Học lập trình qua trải nghiệm thực tế, demo game web và sản phẩm sáng tạo."
	/>
	<meta
		name="keywords"
		content="Error404-Labs, error404 labs, game html5, game web, mini game, project mini, học lập trình qua game, demo game, trải nghiệm game, lập trình game web, game giải trí"
	/>
	<link rel="canonical" href="https://error404-labs.info.vn/tro-choi" />
</svelte:head>

<article class="mb-5! flex flex-col gap-3">
	<h1 class="text-2xl font-semibold">Game & Trò Chơi tại Error404-Labs</h1>

	<p>
		Khu vực game và trò chơi tại <strong>Error404-Labs</strong> mang đến những mini game thú vị được
		xây dựng từ các project nhỏ, vừa giải trí vừa trải nghiệm sản phẩm thực tế.
	</p>

	<ul
		class="list-disc pl-5 text-sm text-gray-500"
		style="list-style-position: inside; list-style-type: none; list-style-position: inside;"
	>
		<li>Mini game HTML5 chơi trực tiếp trên trình duyệt.</li>
		<li>Trải nghiệm game từ các project demo, học và chơi song song.</li>
		<li>Nội dung nhẹ nhàng, sáng tạo, phù hợp mọi lứa tuổi.</li>
	</ul>
</article>

<div class="wrapper-box-card">
	{#each DATA_GAME as { title, link, image }}
		<div {title} class="box-card box-card-v2">
			<a href={link} target="_blank">
				<img src={image} alt={title} />
			</a>
		</div>
	{/each}
</div>

<style>
	.box-card-v2 {
		overflow: hidden;
		padding: 10px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;

		&:hover {
			transition: all 0.5s ease-in-out;
			transform: scale(1.2);
		}
	}
</style>
