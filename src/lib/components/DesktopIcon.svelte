<script lang="ts">
	import { selectedIcons, selectIcon, iconPositions } from '$lib/stores/desktop';
	import { get } from 'svelte/store';

	let { iconId, label, iconSrc, onopen }: {
		iconId: string;
		label: string;
		iconSrc: string;
		onopen: () => void;
	} = $props();

	let isSelected = $derived($selectedIcons.has(iconId));
	let pos = $derived($iconPositions[iconId]);

	function onClick(e: MouseEvent) {
		e.stopPropagation();
		selectIcon(iconId, e.ctrlKey);
	}

	function onDblClick() {
		onopen();
	}

	function onMouseDown(e: MouseEvent) {
		if (e.button !== 0) return;
		e.stopPropagation();
		selectIcon(iconId, e.ctrlKey);

		const el = e.currentTarget as HTMLElement;
		const startMouseX = e.clientX;
		const startMouseY = e.clientY;
		const currentPos = get(iconPositions)[iconId];
		const startX = currentPos?.x ?? el.offsetLeft;
		const startY = currentPos?.y ?? el.offsetTop;
		let moved = false;

		function onMouseMove(e: MouseEvent) {
			const dx = e.clientX - startMouseX;
			const dy = e.clientY - startMouseY;
			if (!moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
			moved = true;
			iconPositions.update(p => ({
				...p,
				[iconId]: { x: startX + dx, y: startY + dy }
			}));
		}

		function onMouseUp() {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="desktop-icon"
	class:selected={isSelected}
	class:positioned={!!pos}
	style={pos ? `position:absolute;left:${pos.x}px;top:${pos.y}px;` : ''}
	onclick={onClick}
	ondblclick={onDblClick}
	onmousedown={onMouseDown}
>
	<img src={iconSrc} alt={label} />
	<span>{label}</span>
</div>