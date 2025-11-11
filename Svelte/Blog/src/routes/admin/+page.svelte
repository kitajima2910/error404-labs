<script lang="ts">
	import { enhance } from '$app/forms';

	let postToEdit = $state({
		id: 0,
		title: '',
		text: '',
		banner_path: '',
		created: new Date(),
		categories: []
	});

	let { form, data } = $props();
</script>

<div class="flex gap-3">
	<!-- Sidebar -->
	<div class="w-xs max-w-xs rounded-xl bg-zinc-200 p-3">
		<div class="font-bold uppercase">Previous Posts</div>
	</div>

	<!-- Editor -->
	<div class="w-full p-3">
		{#if form?.message}
			<div class="rounded-md bg-red-200 p-2 text-red-900">{form.message}</div>
		{/if}
		<div class="font-bold uppercase">Add/Edit Post</div>
		<form method="post" use:enhance enctype="multipart/form-data">
			<input type="hidden" name="id" bind:value={postToEdit.id} />

			<div class="mt-4 text-sm opacity-60">Title</div>
			<input type="text" name="title" class="w-full" bind:value={postToEdit.title} />

			<div class="mt-4 text-sm opacity-60">Categories</div>
			<select name="category_ids" multiple>
				{#each data.categories as category}
					<option value={category.id}>{category.text}</option>
				{/each}
			</select>

			<div class="mt-4 text-sm opacity-60">Banner Image</div>
			<input type="file" name="image" />
		</form>
	</div>
</div>
