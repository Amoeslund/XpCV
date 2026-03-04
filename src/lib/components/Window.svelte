<script lang="ts">
	import { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize, updateBounds } from '$lib/stores/windows';
	import type { Snippet } from 'svelte';

	let {
		id,
		title,
		icon,
		x,
		y,
		width,
		height,
		minWidth,
		minHeight,
		zIndex,
		minimized,
		maximized,
		children
	}: {
		id: string;
		title: string;
		icon: string;
		x: number;
		y: number;
		width: number;
		height: number;
		minWidth: number;
		minHeight: number;
		zIndex: number;
		minimized: boolean;
		maximized: boolean;
		children: Snippet;
	} = $props();

	let windowEl: HTMLDivElement | undefined = $state();
	const RESIZE_THRESHOLD = 6;

	type ResizeDir = '' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

	function getResizeDirection(e: MouseEvent): ResizeDir {
		if (!windowEl || maximized) return '';
		const rect = windowEl.getBoundingClientRect();
		const mx = e.clientX - rect.left;
		const my = e.clientY - rect.top;
		const w = rect.width;
		const h = rect.height;

		const top = my < RESIZE_THRESHOLD;
		const bottom = my > h - RESIZE_THRESHOLD;
		const left = mx < RESIZE_THRESHOLD;
		const right = mx > w - RESIZE_THRESHOLD;

		if (top && left) return 'nw';
		if (top && right) return 'ne';
		if (bottom && left) return 'sw';
		if (bottom && right) return 'se';
		if (top) return 'n';
		if (bottom) return 's';
		if (left) return 'w';
		if (right) return 'e';
		return '';
	}

	const cursorMap: Record<ResizeDir, string> = {
		'': '',
		'n': 'n-resize',
		'ne': 'ne-resize',
		'e': 'e-resize',
		'se': 'se-resize',
		's': 's-resize',
		'sw': 'sw-resize',
		'w': 'w-resize',
		'nw': 'nw-resize'
	};

	function onWindowMouseMove(e: MouseEvent) {
		if (maximized) return;
		const dir = getResizeDirection(e);
		if (windowEl) {
			windowEl.style.cursor = cursorMap[dir] || '';
		}
	}

	function onWindowMouseDown(e: MouseEvent) {
		focusWindow(id);
		if (maximized) return;

		const dir = getResizeDirection(e);
		if (!dir) return;

		e.preventDefault();
		e.stopPropagation();

		const startX = e.clientX;
		const startY = e.clientY;
		const startLeft = x;
		const startTop = y;
		const startW = width;
		const startH = height;

		// Create a cover to prevent iframes from stealing mouse events
		const cover = document.createElement('div');
		cover.style.cssText = 'position:fixed;inset:0;z-index:99999;cursor:' + cursorMap[dir];
		document.body.appendChild(cover);

		function onMouseMove(e: MouseEvent) {
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;

			let newX = startLeft;
			let newY = startTop;
			let newW = startW;
			let newH = startH;

			if (dir.includes('e')) newW = startW + dx;
			if (dir.includes('s')) newH = startH + dy;
			if (dir.includes('w')) { newW = startW - dx; newX = startLeft + dx; }
			if (dir.includes('n')) { newH = startH - dy; newY = startTop + dy; }

			if (newX !== startLeft || newY !== startTop) {
				updateBounds(id, newX, newY, newW, newH);
			} else {
				updateSize(id, newW, newH);
			}
		}

		function onMouseUp() {
			cover.remove();
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	function onTitleMouseDown(e: MouseEvent) {
		if (maximized) return;
		if ((e.target as HTMLElement).closest('.title-bar-controls')) return;
		e.preventDefault();
		const startX = e.clientX - x;
		const startY = e.clientY - y;
		focusWindow(id);

		// Cover to prevent iframes from stealing events
		const cover = document.createElement('div');
		cover.style.cssText = 'position:fixed;inset:0;z-index:99999;cursor:move';
		document.body.appendChild(cover);

		function onMouseMove(e: MouseEvent) {
			updatePosition(id, e.clientX - startX, e.clientY - startY);
		}

		function onMouseUp() {
			cover.remove();
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}
</script>

{#if !minimized}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="window"
		bind:this={windowEl}
		style="left: {x}px; top: {y}px; width: {width}px; height: {height}px; z-index: {zIndex};"
		onmousedown={onWindowMouseDown}
		onmousemove={onWindowMouseMove}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="title-bar" onmousedown={onTitleMouseDown} ondblclick={() => maximizeWindow(id)}>
			<div class="title-bar-text" style="display: flex; align-items: center; gap: 4px;">
				<img src={icon} alt="" style="width: 16px; height: 16px;" />
				{title}
			</div>
			<div class="title-bar-controls">
				<button aria-label="Minimize" onclick={() => minimizeWindow(id)}></button>
				<button aria-label="Maximize" onclick={() => maximizeWindow(id)}></button>
				<button aria-label="Close" onclick={() => closeWindow(id)}></button>
			</div>
		</div>
		<div class="window-body" style="flex: 1; overflow: auto;">
			{@render children()}
		</div>
	</div>
{/if}
