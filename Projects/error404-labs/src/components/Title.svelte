<script lang="ts">
	type Props = { title?: string };

	const { title = 'Error404-Labs' }: Props = $props();
</script>

<div class="title flex justify-center items-center">
	<div class="w-[70px] h-[70px]">
		<img
			class="inline-block w-full h-full object-cover rounded-full"
			src="/midcodekid.webp"
			alt="site logo"
		/>
	</div>
	<h1 class="ml-3! text-2xl">{title}</h1>
</div>
