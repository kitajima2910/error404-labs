<script>
	import Breadcrumb from '../../../components/Breadcrumb.svelte';

	const nameMap = $derived({
		c: 'C/C++'
	});
</script>

<div>
	<Breadcrumb {nameMap} />
	<h2>C/C++</h2>
</div>
