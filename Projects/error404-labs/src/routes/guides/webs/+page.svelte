<script>
	import Breadcrumb from '../../../components/Breadcrumb.svelte';
</script>

<Breadcrumb />

<div class="webs">
	<div>
		<a href="/guides/webs/slideshare">slideshare</a>
	</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
	<div>slideshare</div>
</div>

<style>
	.webs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;

		div {
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
			}
		}
	}
</style>
