<script lang="ts">
	type ClearCompletedType = () => void;
	type CompleteTodosType = number;

	const {
		clearCompleted,
		completeTodos
	}: { clearCompleted: ClearCompletedType; completeTodos: CompleteTodosType } = $props();
</script>

<button onclick={clearCompleted} class:hidden={!completeTodos} class="clear-completed"
	>Xóa nhiệm vụ hoàn thành</button
>
