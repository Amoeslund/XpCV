<script lang="ts">
	let { windowId }: { windowId: string } = $props();

	let iframe: HTMLIFrameElement;

	function focusIframe() {
		iframe?.focus();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="paint-wrapper" onclick={focusIframe}>
	<iframe
		bind:this={iframe}
		src="https://jspaint.app"
		title="Paint"
		allow="clipboard-read; clipboard-write"
	></iframe>
</div>

<style>
	.paint-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #c0c0c0;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
