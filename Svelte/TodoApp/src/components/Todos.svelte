<script lang="ts">
	import type { ITodo, FiltersType } from '$root/types/todo';

	import AddTodo from './AddTodo.svelte';
	import Todo from './Todo.svelte';
	import TodosLeft from './TodosLeft.svelte';
	import FilterTodos from './FilterTodos.svelte';

	// state
	let todos = $state<ITodo[]>([
		{ id: '53ae48bf605cc', text: 'Tìm hiểu C/C++', completed: false },
		{ id: '1e4a59703af84', text: 'Tìm hiểu HTML', completed: true },
		{ id: '9e09bcd7b9349', text: 'Tìm hiểu CSS', completed: false },
		{ id: '9e4273a51a37c', text: 'Tìm hiểu JavaScript', completed: false }
	]);

	let selectedFilter = $state<FiltersType>('all');

	// computed với Runes API
	let todosAmount = $derived(todos.length);
	let incompleteTods = $derived(todos.filter((todo) => !todo.completed).length);
	let filteredTodos = $derived(filterTodos(todos, selectedFilter));

	// debug - reactive
	$effect(() => {
		console.log(
			'$state.snapshot(todos): ',
			$state.snapshot(todos),
			' - todosAmount: ',
			todosAmount
		);
	});

	// methods
	function generateRandomId(): string {
		return Math.random().toString(16).slice(2);
	}

	function addTodo(todo: string): void {
		let newTodo: ITodo = {
			id: generateRandomId(),
			text: todo,
			completed: false
		};
		todos = [newTodo, ...todos];
	}

	function toggeCompleted(event: MouseEvent): void {
		let { checked } = event.target as HTMLInputElement;

		todos = todos.map((todo) => ({
			...todo,
			completed: checked
		}));
	}

	function completeTodo(id: string): void {
		todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
	}

	function removeTodo(id: string): void {
		todos = todos.filter((todo) => todo.id !== id);
	}

	function editTodo(id: string, text: string): void {
		let currentTodo = todos.findIndex((todo) => todo.id === id);
		todos[currentTodo].text = text;
	}

	function setFilter(newFilter: FiltersType): void {
		console.log('newFilter: ', newFilter);
		selectedFilter = newFilter;
	}

	function filterTodos(todos: ITodo[], filter: FiltersType): ITodo[] {
		switch (filter) {
			case 'active':
				return todos.filter((todo) => !todo.completed);
			case 'completed':
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	}
</script>

<main>
	<h1 class="title">NHIỆM VỤ</h1>

	<section class="todos">
		<AddTodo {addTodo} {toggeCompleted} {todosAmount} />

		{#if todosAmount}
			<ul class="todo-list">
				{#each filteredTodos as todo (todo.id)}
					<Todo {todo} {completeTodo} {removeTodo} {editTodo} />
				{/each}
			</ul>

			<div class="actions">
				<TodosLeft {incompleteTods} />
				<FilterTodos {setFilter} {selectedFilter} />
				<button class="clear-completed">Xóa nhiệm vụ hoàn thành</button>
			</div>
		{/if}
	</section>
</main>

<style>
	.title {
		font-size: var(--font-80);
		font-weight: inherit;
		text-align: center;
		color: var(--color-title);
	}

	.todos {
		--width: 700px;
		--todos-bg: hsl(0 0% 98%);
		--todos-text: hsl(220 20% 14%);

		width: var(--width);
		color: var(--todos-text);
		background-color: var(--todos-bg);
		border-radius: var(--radius-base);
		border: 1px solid var(--color-gray-90);
		box-shadow: 0 0 4px var(--shadow-1);
	}

	.todo-list {
		list-style: none;
	}

	.actions {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-8) var(--spacing-16);
		font-size: 0.9rem;
		border-top: 1px solid var(--color-gray-90);
	}

	.actions:before {
		content: '';
		height: 40px;
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		box-shadow:
			0 1px 1px hsla(0, 0%, 0%, 0.2),
			0 8px 0 -3px hsl(0, 0%, 96%),
			0 9px 1px -3px hsla(0, 0%, 0%, 0.2),
			0 16px 0 -6px hsl(0, 0%, 96%),
			0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
		z-index: -1;
	}
</style>
