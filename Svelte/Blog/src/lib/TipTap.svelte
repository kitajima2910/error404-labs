<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Underline from '@tiptap/extension-underline';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import { Image as TipTapImage } from '@tiptap/extension-image';
	import { FileHandler } from '@tiptap/extension-file-handler';

	let { value = $bindable() } = $props();

	let element: HTMLDivElement;
	let editor: Editor | undefined = $state();

	$effect(() => {
		if (editor) {
			editor.commands.setContent(value);
		}
	});

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Underline,

				Link.configure({
					openOnClick: false
				}),
				TipTapImage.configure({
					allowBase64: true
				}),
				FileHandler.configure({
					allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
					onDrop: (currentEditor, files, pos) => {
						files.forEach((file) => {
							const fileReader = new FileReader();

							fileReader.readAsDataURL(file);
							fileReader.onload = () => {
								currentEditor
									.chain()
									.insertContentAt(pos, {
										type: 'image',
										attrs: {
											src: fileReader.result
										}
									})
									.focus()
									.run();
							};
						});
					},
					onPaste: (currentEditor, files, htmlContent) => {
						files.forEach((file) => {
							if (htmlContent) {
								// if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
								// you could extract the pasted file from this url string and upload it to a server for example
								return false;
							}

							const fileReader = new FileReader();

							fileReader.readAsDataURL(file);
							fileReader.onload = () => {
								currentEditor
									.chain()
									.insertContentAt(currentEditor.state.selection.anchor, {
										type: 'image',
										attrs: {
											src: fileReader.result
										}
									})
									.focus()
									.run();
							};
						});
					}
				})
			],
			parseOptions: { preserveWhitespace: true },
			content: value,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate({ editor }) {
				value = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	const setLink = () => {
		if (editor) {
			const previousUrl = editor.getAttributes('link').href;
			const url = window.prompt('URL', previousUrl);

			// cancelled
			if (url === null) {
				return;
			}

			// empty
			if (url === '') {
				editor.chain().focus().extendMarkRange('link').unsetLink().run();
				return;
			}

			// update link
			editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
		}
	};
</script>

<!-- Buttons -->
<div>
	{#if editor}
		<button
			aria-label="Bold"
			tabindex="-1"
			type="button"
			class="!p-1"
			onclick={() => editor.chain().focus().toggleBold().run()}
			class:bg-buttons-primary={editor.isActive('bold')}
			class:text-white={editor.isActive('bold')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				tabindex="-1"
				stroke-linejoin="round"
				class="icon-tabler-bold"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
				<path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
			</svg>
		</button>
		<button
			aria-label="italic"
			tabindex="-1"
			type="button"
			class="!p-1"
			onclick={() => editor.chain().focus().toggleItalic().run()}
			class:bg-buttons-primary={editor.isActive('italic')}
			class:text-white={editor.isActive('italic')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				tabindex="-1"
				stroke-linejoin="round"
				class="icon-tabler-italic"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M11 5l6 0" />
				<path d="M7 19l6 0" />
				<path d="M14 5l-4 14" />
			</svg>
		</button>
		<button
			aria-label="underline"
			tabindex="-1"
			type="button"
			class="!p-1"
			onclick={() => editor.chain().focus().toggleUnderline().run()}
			class:bg-buttons-primary={editor.isActive('underline')}
			class:text-white={editor.isActive('underline')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				tabindex="-1"
				stroke-linejoin="round"
				class="icon-tabler-underline"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M7 5v5a5 5 0 0 0 10 0v-5" />
				<path d="M5 19h14" />
			</svg>
		</button>
		<button
			aria-label="strike"
			tabindex="-1"
			type="button"
			class="!p-1"
			onclick={() => editor.chain().focus().toggleStrike().run()}
			class:bg-buttons-primary={editor.isActive('strike')}
			class:text-white={editor.isActive('strike')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				tabindex="-1"
				stroke-linejoin="round"
				class="icon-tabler-strikethrough"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M5 12l14 0" />
				<path
					d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5"
				/>
			</svg>
		</button>
		<button
			aria-label="link"
			tabindex="-1"
			type="button"
			class="!p-1"
			onclick={() => setLink()}
			class:bg-buttons-primary={editor.isActive('link')}
			class:text-white={editor.isActive('link')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				tabindex="-1"
				stroke-linejoin="round"
				class="icon-tabler-link"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M9 15l6 -6" />
				<path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
				<path
					d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
				/>
			</svg>
		</button>
	{/if}
</div>

<div
	class="editorContainer overflow-hidden rounded-lg border border-zinc-200 p-2"
	bind:this={element}
></div>

<style>
	/* TipTap editor, makes the box you start typing in a bit bigger so it's easier to click on it */
	:global(.editorContainer > div) {
		min-height: 43px;
	}
	:global(.ProseMirror:focus) {
		outline-width: 0;
	}
</style>
