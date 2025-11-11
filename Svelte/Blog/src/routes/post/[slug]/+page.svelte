<script lang="ts">
	let { data } = $props();
</script>

<h1 class="text-xl font-bold uppercase">{data.post.title}</h1>
<div class="opacity-50">{data.post.created.toLocaleDateString('en-us')}</div>
<p class="mb-4">
	<a href="/">Back to posts</a>
</p>
<div
	class="mb-4 h-64 w-full bg-cover"
	style="background-image: url('/file/{data.post.branner_path}')"
></div>
{@html data.post.text}
