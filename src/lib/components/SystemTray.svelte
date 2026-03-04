<script lang="ts">
	import { onMount } from 'svelte';
	import { crtEnabled, toggleFullscreen, phase } from '$lib/stores/system';

	let time = $state('');

	function updateTime() {
		const now = new Date();
		time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
	}

	function toggleCrt() {
		crtEnabled.update(v => !v);
	}

	function showWelcome() {
		phase.set('login');
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 10000);
		return () => clearInterval(interval);
	});
</script>

<div class="system-tray">
	<div class="tray-icons">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="tray-icon" onclick={toggleCrt} title="Toggle CRT Effect" class:active={$crtEnabled}>
			<svg viewBox="0 0 16 16" width="16" height="16">
				<rect x="1" y="3" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
				<rect x="5" y="13" width="6" height="1.5" rx="0.3" fill="currentColor"/>
				<line x1="3" y1="6" x2="13" y2="6" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>
				<line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>
				<line x1="3" y1="10" x2="13" y2="10" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>
			</svg>
		</div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="tray-icon desktop-only" onclick={toggleFullscreen} title="Toggle Fullscreen (F11)">
			<svg viewBox="0 0 16 16" width="16" height="16">
				<path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</div>
	<div class="tray-divider"></div>
	<span class="tray-time">{time}</span>
</div>

<style>
	.system-tray {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 8px;
		background: linear-gradient(
			180deg,
			#0e87e2 0%,
			#1580d5 20%,
			#1a78ca 40%,
			#1a6fbd 60%,
			#1866ae 80%,
			#1660a5 100%
		);
		border-left: 1px solid rgba(0,0,0,0.15);
		box-shadow: inset 1px 0 0 rgba(255,255,255,0.08);
		font-size: 11px;
		font-family: 'Tahoma', sans-serif;
		color: white;
		text-shadow: 0 1px 1px rgba(0,0,0,0.4);
		gap: 4px;
	}

	.tray-icons {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.tray-icon {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
		border-radius: 2px;
		color: rgba(255,255,255,0.8);
		transition: background 0.1s;
	}

	.tray-icon:hover {
		background: rgba(255,255,255,0.15);
		color: white;
	}

	.tray-icon.active {
		background: rgba(255,255,255,0.2);
		color: #7fff7f;
	}

	.tray-divider {
		width: 1px;
		height: 16px;
		background: rgba(255,255,255,0.15);
		margin: 0 4px;
	}

	.tray-time {
		min-width: 56px;
		text-align: center;
	}
</style>
