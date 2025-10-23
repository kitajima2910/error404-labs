<script lang="ts">
	import type { FiltersType } from '$root/types/todo';

	type SetFilterType = (filter: FiltersType) => void;
	type SelectedFilterType = FiltersType;

	const {
		setFilter,
		selectedFilter
	}: { setFilter: SetFilterType; selectedFilter: SelectedFilterType } = $props();

	let filters: FiltersType[] = ['all', 'active', 'completed'];
</script>

<div class="filters">
	{#each filters as filter}
		<button
			onclick={() => setFilter(filter)}
			class:selected={selectedFilter === filter}
			class="filter"
		>
			{filter === 'all' ? 'Tất cả' : filter === 'active' ? 'Chưa hoàn thành' : 'Hoàn thành'}
		</button>
	{/each}
</div>

<style>
	.filters {
		display: flex;
		gap: var(--spacing-4);
	}

	.filter {
		text-transform: capitalize;
		padding: var(--spacing-4) var(--spacing-8);
		border: 1px solid transparent;
		border-radius: var(--radius-base);
	}

	.filter:hover {
		border: 1px solid var(--color-highlight);
	}

	.selected {
		border-color: var(--color-highlight);
	}
</style>
