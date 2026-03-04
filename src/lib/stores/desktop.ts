import { writable } from 'svelte/store';

export const selectedIcons = writable<Set<string>>(new Set());

export function selectIcon(id: string, add = false) {
	selectedIcons.update(s => {
		if (add) {
			const next = new Set(s);
			next.add(id);
			return next;
		}
		return new Set([id]);
	});
}

export function clearSelection() {
	selectedIcons.set(new Set());
}

// Store icon positions for draggable desktop icons
export const iconPositions = writable<Record<string, { x: number; y: number }>>({})