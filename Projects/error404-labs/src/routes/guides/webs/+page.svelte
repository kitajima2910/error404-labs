<script lang="ts">
	import Breadcrumb from '../../../components/Breadcrumb.svelte';

	type Web = {
		name: string;
		link: string;
		link_img: string;
	};

	const WEBS: Web[] = [
		{
			name: 'Slide Share',
			link_img: '/webs/imgs/slideshare.webp',
			link: '/guides/webs/slideshare'
		}
	];
</script>

<Breadcrumb />

<div class="webs">
	{#each WEBS as { name, link, link_img }}
		<div>
			<a href={link}>
				<p class="title">{name}</p>
				<img src={link_img} alt={name} />
			</a>
		</div>
	{/each}
	<!-- <div>
		<a href="/guides/webs/slideshare">slideshare</a>
	</div> -->
	<!-- <div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div> -->
</div>

<style>
	.webs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;

		div {
			position: relative;
			z-index: 100;
			border: 1px solid #ccc;
			padding: 1rem;
			text-align: center;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			width: 100%;
			height: calc((200 * 1rem) / 16);
			border-radius: calc((5 * 1rem) / 16);
			box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

			&:hover {
				background-color: #f5f5f5;
			}

			a {
				display: block;
				text-decoration: none;
				color: black;
				width: 100%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.title {
					font-weight: bold;
					font-size: 1.2rem;
					margin-bottom: 0.5rem;
					position: absolute;
					top: 0.5rem;
					left: 0.5rem;
					color: white;
					text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
					background-color: rgba(0, 0, 0, 0.5);
					padding: 0.25rem 0.5rem;
					border-radius: calc((5 * 1rem) / 16);
					box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

					&:hover {
						background-color: rgba(0, 0, 0, 0.7);
					}
				}
			}
		}
	}
</style>
