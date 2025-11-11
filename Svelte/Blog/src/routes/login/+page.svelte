<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<form method="post" use:enhance>
	<div class="mx-auto flex max-w-xs flex-col gap-3">
		{#if form?.message}
			<div class="rounded-md bg-red-200 p-2 text-red-900">{form.message}</div>
		{/if}
		<div class="font-bold uppercase">Welcome!</div>
		<input type="email" name="email" placeholder="Email" />
		<input type="password" name="password" placeholder="Password" />
		<button type="submit">Sign In</button>
	</div>
</form>
