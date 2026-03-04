import { writable, get } from 'svelte/store';
import type { WindowState } from '$lib/types';

let nextZIndex = 100;
let windowCounter = 0;

export const windows = writable<WindowState[]>([]);

export function openProgram(programId: string, title: string, icon: string, width: number, height: number, minWidth: number, minHeight: number) {
	const existing = get(windows).find(w => w.programId === programId && !w.minimized);
	if (existing) {
		focusWindow(existing.id);
		return;
	}

	const existingMinimized = get(windows).find(w => w.programId === programId && w.minimized);
	if (existingMinimized) {
		restoreWindow(existingMinimized.id);
		focusWindow(existingMinimized.id);
		return;
	}

	const id = `window-${++windowCounter}`;
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const isMobile = vw < 600;

	const offset = (windowCounter % 8) * 30;
	const clampedWidth = Math.min(width, vw - 10);
	const clampedHeight = Math.min(height, vh - 40);
	const x = Math.max(0, Math.min(80 + offset, vw - clampedWidth));
	const y = Math.max(0, Math.min(40 + offset, vh - clampedHeight - 30));

	const newWindow: WindowState = {
		id,
		programId,
		title,
		icon,
		x: isMobile ? 0 : x,
		y: isMobile ? 0 : y,
		width: isMobile ? vw : clampedWidth,
		height: isMobile ? vh - 30 : clampedHeight,
		minWidth,
		minHeight,
		zIndex: ++nextZIndex,
		minimized: false,
		maximized: isMobile
	};

	windows.update(w => [...w, newWindow]);
}

export function closeWindow(id: string) {
	windows.update(w => w.filter(win => win.id !== id));
}

export function minimizeWindow(id: string) {
	windows.update(w => w.map(win =>
		win.id === id ? { ...win, minimized: true } : win
	));
}

export function maximizeWindow(id: string) {
	windows.update(w => w.map(win => {
		if (win.id !== id) return win;
		if (win.maximized) {
			return {
				...win,
				maximized: false,
				x: win.prevBounds?.x ?? 80,
				y: win.prevBounds?.y ?? 40,
				width: win.prevBounds?.width ?? win.width,
				height: win.prevBounds?.height ?? win.height,
				prevBounds: undefined
			};
		}
		return {
			...win,
			maximized: true,
			prevBounds: { x: win.x, y: win.y, width: win.width, height: win.height },
			x: 0,
			y: 0,
			width: window.innerWidth,
			height: window.innerHeight - 30
		};
	}));
}

export function restoreWindow(id: string) {
	windows.update(w => w.map(win =>
		win.id === id ? { ...win, minimized: false } : win
	));
}

export function focusWindow(id: string) {
	nextZIndex++;
	windows.update(w => w.map(win =>
		win.id === id ? { ...win, zIndex: nextZIndex } : win
	));
}

export function toggleWindowFromTaskbar(id: string) {
	const win = get(windows).find(w => w.id === id);
	if (!win) return;

	if (win.minimized) {
		restoreWindow(id);
		focusWindow(id);
	} else {
		const topZ = Math.max(...get(windows).filter(w => !w.minimized).map(w => w.zIndex));
		if (win.zIndex === topZ) {
			minimizeWindow(id);
		} else {
			focusWindow(id);
		}
	}
}

export function updatePosition(id: string, x: number, y: number) {
	windows.update(w => w.map(win =>
		win.id === id ? { ...win, x, y } : win
	));
}

export function updateSize(id: string, width: number, height: number) {
	windows.update(w => w.map(win =>
		win.id === id ? { ...win, width: Math.max(width, win.minWidth), height: Math.max(height, win.minHeight) } : win
	));
}

export function updateBounds(id: string, newX: number, newY: number, newWidth: number, newHeight: number) {
	windows.update(w => w.map(win => {
		if (win.id !== id) return win;
		const w2 = Math.max(newWidth, win.minWidth);
		const h2 = Math.max(newHeight, win.minHeight);
		// If width/height were clamped, don't move the position for that axis
		const x2 = w2 === newWidth ? newX : win.x;
		const y2 = h2 === newHeight ? newY : win.y;
		return { ...win, x: x2, y: y2, width: w2, height: h2 };
	}));
}
