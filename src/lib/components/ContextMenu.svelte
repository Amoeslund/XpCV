<script lang="ts">
	import { contextMenu, closeContextMenu } from '$lib/stores/system';
	import type { ContextMenuItem } from '$lib/types';
	import { onMount } from 'svelte';

	let menu = $derived($contextMenu);

	function handleClick(item: ContextMenuItem) {
		if (item.action) item.action();
		closeContextMenu();
	}

	onMount(() => {
		function onClickOutside() {
			closeContextMenu();
		}
		document.addEventListener('click', onClickOutside);
		return () => document.removeEventListener('click', onClickOutside);
	});
</script>

{#if menu}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="context-menu" style="left: {menu.x}px; top: {menu.y}px;" onclick={(e) => e.stopPropagation()}>
		{#each menu.items as item}
			{#if item.separator}
				<div class="context-menu-separator"></div>
			{:else}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="context-menu-item" onclick={() => handleClick(item)}>
					{item.label}
				</div>
			{/if}
		{/each}
	</div>
{/if}
