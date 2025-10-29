<script>
	import SearchBar from './SearchBar.svelte';
</script>

<header
	class="sticky top-0 left-0 z-10 flex h-16 items-center justify-between overflow-clip bg-white px-4 py-2"
>
	<a href="/">
		<img src="/icons/ytLogo.svg" class="mr-5 md:hidden" alt="" />
	</a>
	<div class="hidden items-center gap-4 md:flex">
		<img
			src="/icons/bugerIcon.svg"
			class="cursor-pointer rounded-full p-3 hover:bg-gray-200"
			alt=""
		/>
		<a href="/">
			<img src="/icons/ytLogo.svg" alt="" />
		</a>
	</div>
	<SearchBar />
	<div class="hidden items-center gap-3 md:flex">
		<img
			src="/icons/createIcon.svg"
			class="cursor-pointer rounded-full p-3 hover:bg-gray-200"
			alt=""
		/>
		<img
			src="/icons/notIcon.svg"
			class="cursor-pointer rounded-full p-3 hover:bg-gray-200"
			alt=""
		/>
		<img src="/midcodekid.jpg" class="h-8 w-8 cursor-pointer rounded-full bg-gray-200" alt="" />
	</div>
</header>
