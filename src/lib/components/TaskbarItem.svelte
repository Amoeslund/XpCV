<script lang="ts">
	import { toggleWindowFromTaskbar, windows } from '$lib/stores/windows';

	let { id, title, icon }: {
		id: string;
		title: string;
		icon: string;
	} = $props();

	let isActive = $derived((() => {
		const wins = $windows;
		const win = wins.find(w => w.id === id);
		if (!win || win.minimized) return false;
		const visibleWins = wins.filter(w => !w.minimized);
		const topZ = Math.max(...visibleWins.map(w => w.zIndex));
		return win.zIndex === topZ;
	})());
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="taskbar-item" class:active={isActive} onclick={() => toggleWindowFromTaskbar(id)}>
	<img src={icon} alt="" />
	<span>{title}</span>
</div>
