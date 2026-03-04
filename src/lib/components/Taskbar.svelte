<script lang="ts">
	import TaskbarItem from './TaskbarItem.svelte';
	import SystemTray from './SystemTray.svelte';
	import StartMenu from './StartMenu.svelte';
	import { windows } from '$lib/stores/windows';
	import { startMenuOpen, closeContextMenu } from '$lib/stores/system';

	function toggleStartMenu(e: MouseEvent) {
		e.stopPropagation();
		closeContextMenu();
		startMenuOpen.update(v => !v);
	}
</script>

{#if $startMenuOpen}
	<StartMenu />
{/if}

<div class="taskbar">
	<button class="start-button" class:active={$startMenuOpen} onclick={toggleStartMenu}>
		<img src="/icons/start.png" alt="Start" class="start-img" />
	</button>

	<div class="taskbar-items">
		{#each $windows as win}
			<TaskbarItem id={win.id} title={win.title} icon={win.icon} />
		{/each}
	</div>

	<SystemTray />
</div>
