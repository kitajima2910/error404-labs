<script lang="ts" module>
	import { img } from '$lib/components/custom';
	export { img };
</script>

<script lang="ts">
	let { children } = $props();
</script>

{@render children?.()}
