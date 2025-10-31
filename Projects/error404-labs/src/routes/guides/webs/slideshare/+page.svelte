<script>
	import Breadcrumb from '../../../../components/Breadcrumb.svelte';
</script>

<Breadcrumb />

<div class="slideshare">
	<h2>Mục Lục Của SlideShare</h2>
	<p>
		<a href="/guides/webs/slideshare/01"><b>Bài 01:</b> Sử dụng các tag cơ bản</a>
	</p>
	<p>
		<a href="/guides/webs/slideshare/02"
			><b>Bài 02:</b> Sử dụng các tag cơ bản, có tô màu cho các đoạn văn bản</a
		>
	</p>
</div>

<style>
	.slideshare {
		border: 1px solid #ccc;
		padding: 1rem;
		text-align: center;
		transition: all 0.3s ease-in-out;
		width: 100%;
		border-radius: calc((5 * 1rem) / 16);
		box-shadow: 0 calc((2 * 1rem) / 16) calc((5 * 1rem) / 16) rgba(0, 0, 0, 0.1);

		h2 {
			text-align: center;
		}

		p {
			margin: 1rem;
			text-align: justify;
			line-height: 1.5;

			a {
				color: black;
				text-decoration: none;
				transition: all 0.3s ease-in-out;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>
