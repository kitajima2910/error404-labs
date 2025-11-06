import * as katex from 'katex';

export const renderMath = (text: string) => {
	return (
		text
			// Inline: \(...\)
			.replace(/\\\((.*?)\\\)/g, (_, formula) => {
				try {
					return katex.renderToString(formula, {
						throwOnError: false
					});
				} catch {
					return `\\(${formula}\\)`;
				}
			})
			// Display: $$...$$
			.replace(/\$\$(.*?)\$\$/gs, (_, formula) => {
				try {
					return katex.renderToString(formula, {
						throwOnError: false,
						displayMode: true
					});
				} catch {
					return `$$${formula}$$`;
				}
			})
	);
};
