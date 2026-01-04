<script lang="ts">
	import * as config from '$lib/config';
	import { formatDate } from '$lib/utils.js';
	import '../app.css';

	let { data } = $props();
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="list bg-base-100 rounded-box shadow-md">
		<li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Bài viết mới dành cho bạn</li>
		{#each data.posts as post}
			<li class="list-row">
				<a href={post.slug}>
					<div>
						<div class="text-3xl py-3">{post.title}</div>
						<div class="text-xs uppercase font-semibold opacity-60 py-3">
							{formatDate(post.date)}
						</div>
					</div>
					<p class="list-col-wrap text-xs">{post.description}</p>
				</a>
			</li>
		{/each}
	</ul>
</section>
