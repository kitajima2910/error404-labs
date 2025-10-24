<script lang="ts">
	class Temperature {
		#c = $state(0);
		#f = $state(0);

		get C() {
			return this.#c;
		}

		set C(value: number) {
			this.#c = value;
			this.#f = value * 1.8 + 32;
		}

		get F() {
			return this.#f;
		}

		set F(value: number) {
			this.#f = value;
			this.#c = (value - 32) / 1.8;
		}
	}

	const temperature = new Temperature();
</script>

<div class="wrapper">
	<input type="number" bind:value={temperature.C} />
	<span> Celsius = </span>
	<input type="number" bind:value={temperature.F} />
	<span> Fahrenheit</span>
</div>

<style>
	.wrapper {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		align-items: center;

		height: 100vh;

		background-color: #15171b;
		color: #fff;
	}
	input[type='number'] {
		width: 10ch;

		background-color: #455058;
		color: #fff;

		border: none;
		border-radius: 0.5rem;
	}
</style>
