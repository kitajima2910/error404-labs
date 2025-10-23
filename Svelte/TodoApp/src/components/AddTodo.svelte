<script lang="ts">
	type AddTodoType = (todo: string) => void;
	type ToggleCompletedType = (event: MouseEvent) => void;
	type TodosAmountType = number;

	const {
		addTodo,
		toggeCompleted,
		todosAmount
	}: { addTodo: AddTodoType; toggeCompleted: ToggleCompletedType; todosAmount: TodosAmountType } =
		$props();

	let todo = $state('');

	function handleSubmit(): void {
		addTodo(todo);
		todo = '';
	}
</script>

<form onsubmit={handleSubmit} autocomplete="off">
	{#if todosAmount > 0}
		<input onclick={toggeCompleted} type="checkbox" id="toggle-all" class="toggle-all" />
		<label for="toggle-all" aria-label="Đánh dấu tất cả là hoàn tất">
			Đánh dấu tất cả là hoàn tất
		</label>
	{/if}

	<!-- svelte-ignore a11y_autofocus -->
	<input
		bind:value={todo}
		type="text"
		id="new-todo"
		class="new-todo"
		placeholder="Bạn cần thêm nhiệm vụ gì?"
		autofocus
	/>
</form>

<style>
	.toggle-all {
		width: 1px;
		height: 1px;
		position: absolute;
		opacity: 0;
	}

	.toggle-all + label {
		position: absolute;
		font-size: 0;
	}

	.toggle-all + label:before {
		content: '❯';
		display: block;
		padding: var(--spacing-16);
		font-size: var(--font-24);
		color: var(--color-gray-58);
		transform: rotate(90deg);
	}

	.toggle-all:checked + label:before {
		color: var(--color-gray-28);
	}

	.new-todo {
		width: 100%;
		padding: var(--spacing-16);
		padding-left: 60px;
		font-size: var(--font-24);
		border: none;
		border-bottom: 1px solid var(--shadow-1);
	}
</style>
