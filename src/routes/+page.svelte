<script lang="ts">
	import '../app.css';
	import { phase } from '$lib/stores/system';
	import LoginScreen from '$lib/components/LoginScreen.svelte';
	import Desktop from '$lib/components/Desktop.svelte';
	import Taskbar from '$lib/components/Taskbar.svelte';
	import WindowManager from '$lib/components/WindowManager.svelte';
	import ContextMenu from '$lib/components/ContextMenu.svelte';
	import CrtEffect from '$lib/components/CrtEffect.svelte';
	import LogOffDialog from '$lib/components/LogOffDialog.svelte';
	import { onMount } from 'svelte';
	import { toggleFullscreen } from '$lib/stores/system';

	// F11 fullscreen shortcut
	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === 'F11') {
				e.preventDefault();
				toggleFullscreen();
			}
		}
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	});
</script>

<svelte:head>
	<title>Anders Moeslund | Portfolio</title>
	<meta name="description" content="Portfolio of Anders Bøgetoft Moeslund - Software Developer at IMPACT Commerce" />
</svelte:head>

{#if $phase === 'login'}
	<LoginScreen />
{:else if $phase === 'desktop'}
	<Desktop />
	<WindowManager />
	<ContextMenu />
	<Taskbar />
	<LogOffDialog />
	<CrtEffect />
{:else if $phase === 'shutdown'}
	<div class="shutdown-screen">
		<p style="font-weight: 300;">Windows is shutting down...</p>
		<p style="margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.5); font-family: Tahoma, sans-serif;">
			Thanks for visiting! Refresh to restart.
		</p>
	</div>
{/if}
