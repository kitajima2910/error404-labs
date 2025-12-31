<script lang="ts">
	import { page } from '$app/state';

	console.log('page: ', page.params);

	let { lesson } = page.params;
</script>

Bài {lesson}
