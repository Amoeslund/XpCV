<script lang="ts">
	import Window from './Window.svelte';
	import { windows } from '$lib/stores/windows';
	import { programRegistry } from '$lib/config';

	function getComponent(programId: string) {
		return programRegistry[programId]?.component;
	}
</script>

{#each $windows as win (win.id)}
	{@const ProgramComponent = getComponent(win.programId)}
	{#if ProgramComponent}
		<Window
			id={win.id}
			title={win.title}
			icon={win.icon}
			x={win.x}
			y={win.y}
			width={win.width}
			height={win.height}
			minWidth={win.minWidth}
			minHeight={win.minHeight}
			zIndex={win.zIndex}
			minimized={win.minimized}
			maximized={win.maximized}
		>
			<ProgramComponent windowId={win.id} />
		</Window>
	{/if}
{/each}
