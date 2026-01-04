export function copyCode(node: HTMLElement) {
	const button = document.createElement('button');
	button.type = 'button';
	button.textContent = '⧉';
	button.className = 'code-copy-button';

	node.style.position = 'relative';
	node.appendChild(button);

	button.addEventListener('click', async () => {
		const code = node.querySelector('code');
		if (!code) return;

		// Lấy text thật, không dính line number
		const text = Array.from(code.querySelectorAll('.line'))
			.map((line) => line.textContent ?? '')
			.join('\n');

		await navigator.clipboard.writeText(text);

		button.textContent = '✓';
		setTimeout(() => (button.textContent = '⧉'), 1500);
	});

	return {
		destroy() {
			button.remove();
		}
	};
}
