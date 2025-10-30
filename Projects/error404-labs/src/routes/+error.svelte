<script>
	import { page } from '$app/state';
</script>

<div class="error-container">
	<h1>{page.status}</h1>
	<p>{page.error?.message}</p>
	<a href="/">Home</a>
</div>

<style>
	.error-container {
		text-align: center;
		padding: 2rem;
	}

	a {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		border: 1px dotted rgba(255, 255, 255, 0.2);
		text-decoration: none;
	}
</style>
