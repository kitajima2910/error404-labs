<script lang="ts">
	let content = 'Học Web Cơ Bản - Slideshare - Bài 01';
	let path = '/md/HocWeb/CoBan/slideshare/Bai01/index.html';
</script>

<div class="frame-card">
	<header class="frame-header">
		<div class="title">{content}</div>
	</header>

	<iframe class="frame-body" src={path} title={content} frameborder="0" aria-label={content}
	></iframe>

	<footer class="frame-footer">
		<div>📄 <a href={path} target="_blank" rel="noopener">Mở file</a></div>
	</footer>
</div>

<style>
	:root {
		--card-bg: #0f1724; /* deep slate */
		--panel: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
		--accent-1: #6ee7b7;
		--accent-2: #60a5fa;
		--glass: rgba(255, 255, 255, 0.04);
		--radius: 14px;
		--max-w: 1200px;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
	}

	/* Layout */
	.frame-card {
		max-width: var(--max-w);
		margin: calc((28 * 1rem) / 16) auto;
		border-radius: calc(var(--radius) + calc((4 * 1rem) / 16));
		overflow: hidden;
		background:
			radial-gradient(
				calc((1200 * 1rem) / 16) calc((400 * 1rem) / 16) at 10% 10%,
				rgba(96, 165, 250, 0.04),
				transparent 10%
			),
			radial-gradient(
				calc((800 * 1rem) / 16) calc((300 * 1rem) / 16) at 90% 90%,
				rgba(110, 231, 183, 0.03),
				transparent 10%
			),
			var(--card-bg);
		box-shadow:
			0 calc((10 * 1rem) / 16) calc((30 * 1rem) / 16) rgba(2, 6, 23, 0.6),
			0 calc((2 * 1rem) / 16) calc((6 * 1rem) / 16) rgba(2, 6, 23, 0.5);
		border: calc((1 * 1rem) / 16) solid rgba(255, 255, 255, 0.03);
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* Header */
	.frame-header {
		display: flex;
		flex-direction: column;
		padding: calc((16 * 1rem) / 16) calc((22 * 1rem) / 16);
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
		backdrop-filter: blur(calc((6 * 1rem) / 16));
		border-bottom: calc((1 * 1rem) / 16) solid rgba(255, 255, 255, 0.02);
	}
	.frame-header .title {
		font-size: 1.05rem;
		font-weight: 600;
		color: #e6eef8;
		letter-spacing: calc((-0.2 * 1rem) / 16);
	}

	/* Iframe */
	.frame-body {
		width: 100%;
		/* make height responsive — desktop big, mobile comfortable */
		height: 64vh;
		min-height: calc((420 * 1rem) / 16);
		border: none;
		display: block;
		/* small inner border effect */
		box-shadow: inset 0 calc((1 * 1rem) / 16) 0 rgba(255, 255, 255, 0.02);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease;
		outline: none;
		/* rounded only visually — header/footer cropped by parent overflow:hidden */
	}
	.frame-body:focus {
		transform: translateY(-3px);
		box-shadow: 0 calc((18 * 1rem) / 16) calc((40 * 1rem) / 16) rgba(2, 6, 23, 0.55);
	}

	/* Footer */
	.frame-footer {
		padding: calc((10 * 1rem) / 16) calc((18 * 1rem) / 16);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: calc((12 * 1rem) / 16);
		border-top: calc((1 * 1rem) / 16) solid rgba(255, 255, 255, 0.02);
		background: var(--panel);
	}
	.frame-footer a {
		color: var(--accent-2);
		text-decoration: none;
		font-weight: 600;
	}
	.frame-footer a:hover {
		text-decoration: underline;
	}

	/* Small screens */
	@media (max-width: calc((720 * 1rem) / 16)) {
		.frame-card {
			margin: calc((14 * 1rem) / 16);
			border-radius: calc((12 * 1rem) / 16);
		}
		.frame-header {
			padding: calc((12 * 1rem) / 16) calc((14 * 1rem) / 16);
		}
		.frame-header .title {
			font-size: 0.98rem;
		}
		.frame-body {
			height: 56vh;
			min-height: calc((320 * 1rem) / 16);
		}
		.frame-footer {
			padding: calc((8 * 1rem) / 16) calc((12 * 1rem) / 16);
			font-size: 0.9rem;
		}
	}
</style>
