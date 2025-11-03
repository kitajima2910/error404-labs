<script lang="ts">
	type Props = { title?: string };

	const { title = 'Error404-Labs' }: Props = $props();
</script>

<div class="title">
	<div>
		<img src="/midcodekid.webp" alt="site logo" />
	</div>
	<h1>{title}</h1>
</div>

<style>
	.title {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title div {
		width: calc((50 * 1rem) / 16);
		height: calc((50 * 1rem) / 16);
	}

	.title img {
		display: inline-block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}

	.title h1 {
		margin-left: calc((10 * 1rem) / 16);
	}

	@media (max-width: 450px) {
		.title h1 {
			font-size: 1.2em;
		}
	}
</style>
