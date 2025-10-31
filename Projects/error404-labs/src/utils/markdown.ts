import { marked } from 'marked';

const fixRelativePaths = (markdownText: string, basePath: string) => {
	return (
		markdownText
			// Fix images: ![alt](image.png) -> ![alt](/base/path/image.png)
			.replace(/!\[([^\]]*)\]\((?!http|\/)(.*?)\)/g, `![$1](${basePath}/$2)`)
			// Fix links: [text](file.md) -> [text](/base/path/file.md)
			.replace(/\[([^\]]+)\]\((?!http|\/|#)(.*?)\)/g, `[$1](${basePath}/$2)`)
	);
};

export const loadMarkdown = async (path: string) => {
	try {
		const res = await fetch(path);
		if (!res.ok) return '⚠️ Không thể tải file Markdown';
		let text = await res.text();

		// Lấy base path (bỏ tên file)
		const basePath = path.substring(0, path.lastIndexOf('/'));

		// Fix đường dẫn tương đối
		text = fixRelativePaths(text, basePath);

		return marked.parse(text) as string;
	} catch {
		return '⚠️ Lỗi tải tải file Markdown';
	}
};
