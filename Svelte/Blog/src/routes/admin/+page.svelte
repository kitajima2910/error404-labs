<script lang="ts">
	import { enhance } from '$app/forms';
	import TipTap from '$lib/TipTap.svelte';

	let postToEdit = $state({
		id: 0,
		title: '',
		text: '',
		branner_path: '',
		created: new Date(),
		categories: []
	});

	let { form, data } = $props();

	$effect(() => {
		if (form?.success) {
			postToEdit = {
				id: 0,
				title: '',
				text: '',
				branner_path: '',
				created: new Date(),
				categories: []
			};
		}
	});
</script>

<div class="flex gap-3">
	<!-- Sidebar -->
	<div class="w-xs max-w-xs rounded-xl bg-zinc-200 p-3">
		<div class="font-bold uppercase">Previous Posts</div>
		<div class="truncate">
			{#each data.posts as post}
				<a
					href="/admin"
					onclick={() => {
						postToEdit = post;
					}}
				>
					<span class="text-xs opacity-50"
						>{post.created.toLocaleDateString('en-us')}</span
					>
					- {post.title}
				</a><br />
			{/each}

			{#if data.posts.length === 0}
				<div class="opacity-50">No post</div>
			{/if}
		</div>
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
			<select name="category_ids" multiple bind:value={postToEdit.categories}>
				{#each data.categories as category}
					<option value={category.id}>{category.text}</option>
				{/each}
			</select>

			<div class="mt-4 text-sm opacity-60">Banner Image</div>
			{#if postToEdit.branner_path !== ''}
				<img
					src="/file/{postToEdit.branner_path}"
					alt="post banner"
					class="mb-4 max-h-48"
				/>
			{/if}
			<input type="file" name="image" />

			<div class="mt-4 text-sm opacity-60">Post Body</div>
			<input type="hidden" name="text" bind:value={postToEdit.text} />
			<TipTap bind:value={postToEdit.text} />

			<button type="submit" class="mt-4">Save Post</button>
		</form>
	</div>
</div>
