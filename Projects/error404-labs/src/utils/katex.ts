import * as katex from 'katex';

export const renderMath = (text: string) => {
	return (
		text
			// Display: $$...$$
			.replace(/\$\$([\s\S]*?)\$\$/g, (_, formula) => {
				try {
					const trimmed = formula.trim();
					return katex.renderToString(trimmed, {
						throwOnError: false,
						displayMode: true,
						trust: true,
						output: 'html',
						strict: 'ignore' // 👈 thêm dòng này
					});
				} catch (e) {
					console.error('KaTeX error:', e);
					return `$$${formula}$$`;
				}
			})
			// Inline: \(...\)
			.replace(/\\\((.*?)\\\)/g, (_, formula) => {
				try {
					return katex.renderToString(formula, {
						throwOnError: false,
						displayMode: true,
						trust: true,
						output: 'html',
						strict: 'ignore' // 👈 thêm dòng này
					});
				} catch {
					return `\\(${formula}\\)`;
				}
			})
			// Inline: $...$
			.replace(/(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)/g, (_, formula) => {
				try {
					return katex.renderToString(formula, {
						throwOnError: false,
						displayMode: true,
						trust: true,
						output: 'html',
						strict: 'ignore' // 👈 thêm dòng này
					});
				} catch {
					return `$${formula}$`;
				}
			})
	);
};
