<script lang="ts">
	import { closeWindow } from '$lib/stores/windows';
	let { windowId }: { windowId: string } = $props();

	let text = $state(`Welcome to Anders Moeslund's XP Portfolio!
===============================================

Thanks for visiting my Windows XP-themed portfolio site.

This site was built with:
  - SvelteKit 5
  - XP.css (for authentic Windows XP styling)
  - TypeScript
  - Lots of nostalgia

Feel free to explore:
  About Me - Learn who I am
  My Resume - Professional background
  My Projects - Things I've built
  Contact Me - Get in touch
  Minesweeper - Take a break!

Built by Anders Bogetoft Moeslund
Lead Backend Developer at IMPACT Commerce
Odense, Denmark

-----------------------------------------
linkedin.com/in/amoeslund
amoeslund.dk
`);

	let wordWrap = $state(true);
	let menuOpen = $state<string | null>(null);

	let lines = $derived(text.split('\n').length);
	let cursorLine = $state(1);
	let cursorCol = $state(1);

	function updateCursor(e: Event) {
		const ta = e.target as HTMLTextAreaElement;
		const pos = ta.selectionStart;
		const before = text.substring(0, pos);
		cursorLine = before.split('\n').length;
		cursorCol = pos - before.lastIndexOf('\n');
	}

	function handleNew() {
		text = '';
		menuOpen = null;
	}

	function handleSelectAll() {
		menuOpen = null;
		const ta = document.querySelector('.notepad-textarea') as HTMLTextAreaElement;
		if (ta) ta.select();
	}

	function handleClose() {
		menuOpen = null;
		closeWindow(windowId);
	}
</script>

<div class="np-container">
	<div class="menu-bar">
		<div style="position:relative;">
			<button class:active={menuOpen === 'file'} onclick={() => menuOpen = menuOpen === 'file' ? null : 'file'}>File</button>
			{#if menuOpen === 'file'}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="np-dropdown" onclick={() => menuOpen = null}>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="np-dropdown-item" onclick={handleNew}>New<span class="np-hotkey">Ctrl+N</span></div>
					<div class="np-dropdown-sep"></div>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="np-dropdown-item" onclick={handleClose}>Exit</div>
				</div>
			{/if}
		</div>
		<div style="position:relative;">
			<button class:active={menuOpen === 'edit'} onclick={() => menuOpen = menuOpen === 'edit' ? null : 'edit'}>Edit</button>
			{#if menuOpen === 'edit'}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="np-dropdown" onclick={() => menuOpen = null}>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="np-dropdown-item" onclick={handleSelectAll}>Select All<span class="np-hotkey">Ctrl+A</span></div>
				</div>
			{/if}
		</div>
		<div style="position:relative;">
			<button class:active={menuOpen === 'format'} onclick={() => menuOpen = menuOpen === 'format' ? null : 'format'}>Format</button>
			{#if menuOpen === 'format'}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="np-dropdown" onclick={() => menuOpen = null}>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="np-dropdown-item" class:ms-checked={wordWrap} onclick={() => { wordWrap = !wordWrap; menuOpen = null; }}>Word Wrap</div>
				</div>
			{/if}
		</div>
		<button>View</button>
		<button>Help</button>
	</div>
	<div class="notepad-body" style="flex: 1;">
		<textarea
			class="notepad-textarea"
			bind:value={text}
			oninput={updateCursor}
			onclick={updateCursor}
			onkeyup={updateCursor}
			style="white-space:{wordWrap ? 'pre-wrap' : 'pre'};word-wrap:{wordWrap ? 'break-word' : 'normal'};overflow-x:{wordWrap ? 'hidden' : 'auto'};"
		></textarea>
	</div>
	<div class="np-status-bar">
		<span>Ln {cursorLine}, Col {cursorCol}</span>
	</div>
</div>

<style>
	.np-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.np-status-bar {
		border-top: 1px solid #c0c0c0;
		padding: 2px 8px;
		font-size: 10px;
		color: #666;
		background: #ece9d8;
		font-family: 'Tahoma', sans-serif;
	}

	.np-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		background: #fff;
		border: 1px solid #808080;
		box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
		z-index: 100;
		min-width: 180px;
		padding: 2px 0;
	}

	.np-dropdown-item {
		padding: 4px 24px;
		font-size: 11px;
		font-family: 'Tahoma', sans-serif;
		cursor: default;
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.np-dropdown-item:hover {
		background: #2f71cd;
		color: white;
	}

	:global(.np-dropdown-item.ms-checked::before) {
		content: '\2713';
		position: absolute;
		left: 8px;
	}

	.np-hotkey {
		color: #888;
		margin-left: 20px;
	}

	.np-dropdown-item:hover .np-hotkey {
		color: rgba(255,255,255,0.7);
	}

	.np-dropdown-sep {
		height: 1px;
		margin: 3px 4px;
		background: #c8c8c8;
	}
</style>
