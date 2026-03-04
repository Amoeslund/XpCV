<script lang="ts">
	import { openProgramById, startMenuLeft, startMenuRight } from '$lib/config';
	import { closeStartMenu, logOffDialogOpen } from '$lib/stores/system';
	import { phase } from '$lib/stores/system';
	import { onMount } from 'svelte';

	function handleItemClick(item: { programId?: string; href?: string }) {
		if (item.href) {
			window.open(item.href, '_blank');
		} else if (item.programId) {
			openProgramById(item.programId);
		}
		closeStartMenu();
	}

	function handleLogOff() {
		closeStartMenu();
		logOffDialogOpen.set(true);
	}

	function handleShutdown() {
		closeStartMenu();
		phase.set('shutdown');
	}

	onMount(() => {
		function onClickOutside(e: MouseEvent) {
			const target = e.target as HTMLElement;
			if (!target.closest('.start-menu') && !target.closest('.start-button')) {
				closeStartMenu();
			}
		}
		setTimeout(() => document.addEventListener('click', onClickOutside), 10);
		return () => document.removeEventListener('click', onClickOutside);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="start-menu" onclick={(e) => e.stopPropagation()}>
	<div class="start-menu-header">
		<img src="/images/anders.jpg" alt="Anders" onerror={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/user.png'; }} />
		<span class="user-name">Anders Moeslund</span>
	</div>

	<div class="start-menu-body">
		<div class="start-menu-left">
			{#each startMenuLeft as item}
				{#if item.separator}
					<div class="start-menu-separator"></div>
				{:else}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="start-menu-item"
						class:bold={item.bold}
						onclick={() => handleItemClick(item)}
					>
						<img src={item.icon} alt="" />
						<div class="start-menu-item-text">
							<span>{item.label}</span>
							{#if item.bold && item.label === 'Internet Explorer'}
								<span class="start-menu-item-sub">Internet</span>
							{:else if item.bold && item.label === 'Contact Me'}
								<span class="start-menu-item-sub">Outlook Express</span>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class="start-menu-right">
			{#each startMenuRight as item}
				{#if item.separator}
					<div class="start-menu-separator"></div>
				{:else}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="start-menu-item"
						class:bold={item.bold}
						onclick={() => handleItemClick(item)}
					>
						<img src={item.icon} alt="" />
						{item.label}
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<div class="start-menu-footer">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="footer-btn" onclick={handleLogOff}>
			<img src="/icons/logoff.svg" alt="" style="width:24px;height:24px;" />
			Log Off
		</div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="footer-btn" onclick={handleShutdown}>
			<img src="/icons/shutdown.svg" alt="" style="width:24px;height:24px;" />
			Turn Off Computer
		</div>
	</div>
</div>

<style>
	.start-menu-item-text {
		display: flex;
		flex-direction: column;
	}

	.start-menu-item-sub {
		font-size: 9px;
		color: #888;
		font-weight: normal;
	}

	.start-menu-item:hover .start-menu-item-sub {
		color: rgba(255,255,255,0.7);
	}
</style>
