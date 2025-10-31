<script lang="ts">
	import 'github-markdown-css/github-markdown-light.css';
	import { loadMarkdown } from '../../utils/markdown';

	let content: string | any = $state('⏳ Đang tải dữ liệu');

	$effect(() => {
		loadMarkdown('/md/ABOUT.md').then((data) => {
			content = data;
		});
	});
</script>

<div class="markdown-body">
	{@html content}
</div>
