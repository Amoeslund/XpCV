<script lang="ts">
	import { crtEnabled } from '$lib/stores/system';
</script>

{#if $crtEnabled}
	<div class="crt-overlay" aria-hidden="true">
		<div class="crt-scanlines"></div>
		<div class="crt-vignette"></div>
		<div class="crt-flicker"></div>
	</div>
{/if}

<style>
	.crt-overlay {
		position: fixed;
		inset: 0;
		z-index: 99999;
		pointer-events: none;
	}

	.crt-scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.15) 0px,
			rgba(0, 0, 0, 0.15) 1px,
			transparent 1px,
			transparent 3px
		);
	}

	.crt-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at center,
			transparent 60%,
			rgba(0, 0, 0, 0.4) 100%
		);
	}

	.crt-flicker {
		position: absolute;
		inset: 0;
		background: rgba(18, 16, 16, 0);
		animation: crt-flicker 0.15s infinite;
		opacity: 0.04;
	}

	@keyframes crt-flicker {
		0% { opacity: 0.028; }
		5% { opacity: 0.035; }
		10% { opacity: 0.024; }
		15% { opacity: 0.04; }
		20% { opacity: 0.03; }
		25% { opacity: 0.036; }
		30% { opacity: 0.028; }
		35% { opacity: 0.032; }
		40% { opacity: 0.038; }
		45% { opacity: 0.025; }
		50% { opacity: 0.03; }
		55% { opacity: 0.035; }
		60% { opacity: 0.028; }
		65% { opacity: 0.04; }
		70% { opacity: 0.03; }
		75% { opacity: 0.025; }
		80% { opacity: 0.035; }
		85% { opacity: 0.032; }
		90% { opacity: 0.028; }
		95% { opacity: 0.038; }
		100% { opacity: 0.028; }
	}
</style>
