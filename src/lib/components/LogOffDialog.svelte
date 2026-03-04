<script lang="ts">
	import { logOffDialogOpen, phase } from '$lib/stores/system';

	function restart() {
		logOffDialogOpen.set(false);
		phase.set('boot');
	}

	function logOff() {
		logOffDialogOpen.set(false);
		phase.set('login');
	}

	function cancel() {
		logOffDialogOpen.set(false);
	}
</script>

{#if $logOffDialogOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="logoff-backdrop" onclick={cancel}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="window logoff-dialog" onclick={(e) => e.stopPropagation()}>
			<div class="title-bar">
				<div class="title-bar-text">Log Off Windows</div>
				<div class="title-bar-controls">
					<button aria-label="Close" onclick={cancel}></button>
				</div>
			</div>
			<div class="window-body" style="padding: 16px;">
				<div class="logoff-separator-top"></div>
				<div class="logoff-buttons">
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="logoff-btn" onclick={restart}>
						<div class="logoff-btn-icon">🔄</div>
						<span>Restart</span>
					</div>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="logoff-btn" onclick={logOff}>
						<div class="logoff-btn-icon">🚪</div>
						<span>Log Off</span>
					</div>
				</div>
				<div class="logoff-separator-bottom">
					<button onclick={cancel}>Cancel</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.logoff-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 90, 0.5);
		z-index: 30000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logoff-dialog {
		position: static !important;
		width: 340px;
	}

	.logoff-separator-top {
		height: 2px;
		background: linear-gradient(90deg, #fd8d19, #febd56, #fd8d19);
		margin-bottom: 20px;
	}

	.logoff-buttons {
		display: flex;
		justify-content: center;
		gap: 24px;
		margin-bottom: 20px;
	}

	.logoff-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		cursor: default;
		border-radius: 4px;
	}

	.logoff-btn:hover {
		background: #e8e8e8;
	}

	.logoff-btn-icon {
		font-size: 28px;
	}

	.logoff-btn span {
		font-size: 11px;
	}

	.logoff-separator-bottom {
		height: 2px;
		background: linear-gradient(90deg, #fd8d19, #febd56, #fd8d19);
		padding-top: 12px;
		display: flex;
		justify-content: flex-end;
	}

	.logoff-separator-bottom button {
		margin-top: 8px;
	}
</style>
