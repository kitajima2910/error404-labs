<script lang="ts">
	import 'github-markdown-css/github-markdown.css';
	import { loadMarkdown } from '../../../utils/markdown';

	let content: string | any = $state('⏳ Đang tải README.md');

	$effect(() => {
		loadMarkdown('/md/HocWeb/CoBan/slideshare/Bai01/README.md').then((data) => {
			content = data;
		});
	});
</script>

<div class="markdown-body">
	{@html content}
</div>
