<script lang="ts">
	import ChannelInfo from '$lib/components/ChannelInfo.svelte';

	let videoId = '';
</script>

<!-- <iframe
	class="h-[480px] w-full"
	style="height: 480px"
	title="youtube video player"
	src={`https://www.youtube.com/embed/${videoId}`}
	frameborder="0"
	allowfullscreen
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
></iframe> -->

<div class="mx-auto w-full max-w-[1150px] px-2">
	<h1 class="text-xl font-semibold capitalize">svelte rules</h1>
	<div class="flex flex-col items-start gap-5 md:flex-row">
		<ChannelInfo />
	</div>
</div>
