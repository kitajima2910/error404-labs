<script lang="ts">
	let count = $state(0);
</script>

<div class="wrapper">
	<input type="number" bind:value={count} disabled />
	<button onclick={() => count++}>Count</button>
</div>

<style>
	.wrapper {
		width: 100vw;
		height: 100vh;

		background-color: #15171b;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	input {
		line-height: 42px;

		background-color: #1f2427;
		color: #fff;

		border: none;

		padding: 0 10px;
	}

	button {
		line-height: 40px;
		width: 100px;
		margin-left: 10px;

		background-color: #464d54;
		color: #fff;

		cursor: pointer;

		border: none;

		font-weight: bold;
	}
</style>
