import { writable } from 'svelte/store';
import type { SystemPhase, ContextMenuState } from '$lib/types';

export const phase = writable<SystemPhase>('login');
export const startMenuOpen = writable(false);
export const contextMenu = writable<ContextMenuState>(null);
export const crtEnabled = writable(false);
export const logOffDialogOpen = writable(false);

export function closeContextMenu() {
	contextMenu.set(null);
}

export function closeStartMenu() {
	startMenuOpen.set(false);
}

export function toggleFullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
}
