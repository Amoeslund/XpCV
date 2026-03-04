<script lang="ts">
	import { closeWindow } from '$lib/stores/windows';
	let { windowId }: { windowId: string } = $props();

	let input = $state('');
	let niceTry = $state(false);

	function handleRun() {
		if (!input.trim()) return;
		niceTry = true;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') handleRun();
	}
</script>

{#if niceTry}
	<div class="run-dialog">
		<div style="display: flex; gap: 10px; align-items: flex-start;">
			<img src="/icons/ie.png" alt="" style="width: 32px; height: 32px; flex-shrink: 0;" />
			<div>
				<p style="margin: 4px 0 0; font-size: 11px; color: #666;">nice try</p>
			</div>
		</div>
		<div style="display: flex; justify-content: flex-end; margin-top: 12px;">
			<button onclick={() => closeWindow(windowId)} style="min-width: 75px;">OK</button>
		</div>
	</div>
{:else}
	<div class="run-dialog">
		<div style="display: flex; gap: 10px; align-items: flex-start;">
			<img src="/icons/run.png" alt="" style="width: 32px; height: 32px; flex-shrink: 0;" />
			<div style="flex: 1;">
				<p style="margin: 0 0 8px;">Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p>
				<div style="display: flex; align-items: center; gap: 6px;">
					<label for="run-input" style="white-space: nowrap;">Open:</label>
					<!-- svelte-ignore a11y_autofocus -->
					<input
						id="run-input"
						type="text"
						bind:value={input}
						onkeydown={handleKeydown}
						autofocus
						style="flex: 1; font-size: 12px;"
					/>
				</div>
			</div>
		</div>
		<div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: 12px;">
			<button onclick={handleRun} style="min-width: 75px;">OK</button>
			<button onclick={() => closeWindow(windowId)} style="min-width: 75px;">Cancel</button>
		</div>
	</div>
{/if}

<style>
	.run-dialog {
		padding: 12px;
		font-size: 12px;
	}
</style>
