<script lang="ts">
	type TodosLeftType = number;

	const { incompleteTods }: { incompleteTods: TodosLeftType } = $props();
</script>

<span class="todo-count">{incompleteTods} nhiệm vụ</span>
