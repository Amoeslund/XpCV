<script lang="ts">
	import DesktopIcon from './DesktopIcon.svelte';
	import { desktopIcons } from '$lib/config';
	import { openProgramById } from '$lib/config';
	import { selectedIcons, clearSelection, iconPositions } from '$lib/stores/desktop';
	import { contextMenu, closeStartMenu } from '$lib/stores/system';
	import { get } from 'svelte/store';

	let selectRect = $state<{ x: number; y: number; w: number; h: number } | null>(null);
	let dragging = $state(false);

	function onDesktopClick() {
		clearSelection();
		closeStartMenu();
	}

	function onContextMenu(e: MouseEvent) {
		e.preventDefault();
		contextMenu.set({
			x: e.clientX,
			y: e.clientY,
			items: [
				{ label: 'Refresh', action: () => window.location.reload() },
				{ separator: true },
				{ label: 'Arrange Icons by Name', action: () => {} },
				{ separator: true },
				{ label: 'Properties', action: () => openProgramById('about') }
			]
		});
	}

	function onMouseDown(e: MouseEvent) {
		if (e.button !== 0) return;
		// Only start drag-select from the desktop background
		const target = e.target as HTMLElement;
		if (target.closest('.desktop-icon')) return;

		const startX = e.clientX;
		const startY = e.clientY;
		dragging = false;

		function onMouseMove(e: MouseEvent) {
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
			if (!dragging && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
			dragging = true;

			const x = Math.min(startX, e.clientX);
			const y = Math.min(startY, e.clientY);
			const w = Math.abs(dx);
			const h = Math.abs(dy);
			selectRect = { x, y, w, h };

			// Hit-test icons
			const desktop = document.querySelector('.desktop') as HTMLElement;
			if (!desktop) return;
			const icons = desktop.querySelectorAll('.desktop-icon');
			const hits = new Set<string>();
			icons.forEach((el) => {
				const rect = el.getBoundingClientRect();
				if (
					rect.left < x + w &&
					rect.right > x &&
					rect.top < y + h &&
					rect.bottom > y
				) {
					const iconDef = desktopIcons.find(d => el.querySelector('span')?.textContent === d.label);
					if (iconDef) hits.add(iconDef.id);
				}
			});
			selectedIcons.set(hits);
		}

		function onMouseUp() {
			selectRect = null;
			dragging = false;
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="desktop" onclick={onDesktopClick} oncontextmenu={onContextMenu} onmousedown={onMouseDown}>
	<div class="desktop-icons">
		{#each desktopIcons as icon}
			<DesktopIcon
				iconId={icon.id}
				label={icon.label}
				iconSrc={icon.icon}
				onopen={() => openProgramById(icon.programId)}
			/>
		{/each}
	</div>

	{#if selectRect}
		<div
			class="select-rect"
			style="left:{selectRect.x}px;top:{selectRect.y}px;width:{selectRect.w}px;height:{selectRect.h}px;"
		></div>
	{/if}
</div>

<style>
	.select-rect {
		position: fixed;
		border: 1px solid rgba(0, 0, 120, 0.8);
		background: rgba(0, 0, 180, 0.12);
		pointer-events: none;
		z-index: 9999;
	}
</style>