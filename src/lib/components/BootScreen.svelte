<script lang="ts">
	import { phase } from '$lib/stores/system';
	import { onMount } from 'svelte';

	let fadeOut = $state(false);

	onMount(() => {
		const timer = setTimeout(() => {
			fadeOut = true;
			setTimeout(() => phase.set('login'), 500);
		}, 2500);
		return () => clearTimeout(timer);
	});

	function skip() {
		phase.set('login');
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="boot" class:fade-out={fadeOut} onclick={skip}>
	<div class="boot-center">
		<!-- XP Logo -->
		<div class="xp-logo">
			<div class="logo-flag">
				<div class="flag-row">
					<div class="flag-piece" style="background: #ff0000;"></div>
					<div class="flag-piece" style="background: #00a2ed;"></div>
				</div>
				<div class="flag-row">
					<div class="flag-piece" style="background: #00a651;"></div>
					<div class="flag-piece" style="background: #ffb900;"></div>
				</div>
			</div>
			<div class="logo-text">
				<span class="logo-microsoft">Microsoft</span>
				<span class="logo-windows">Windows<span class="logo-xp">XP</span></span>
			</div>
		</div>

		<!-- Animated loading bars -->
		<div class="loading-track">
			<div class="loading-bars">
				<div class="bar"></div>
				<div class="bar"></div>
				<div class="bar"></div>
			</div>
		</div>
	</div>

	<div class="boot-bottom-left">
		<span class="boot-hint">Click anywhere to skip</span>
	</div>

	<div class="boot-bottom-right">
		<span class="boot-copyright">Copyright © Microsoft Corporation</span>
	</div>
</div>

<style>
	.boot {
		position: fixed;
		inset: 0;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50000;
		cursor: pointer;
		transition: opacity 0.5s ease-out;
	}

	.boot.fade-out {
		opacity: 0;
	}

	.boot-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
	}

	.xp-logo {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-flag {
		display: flex;
		flex-direction: column;
		gap: 2px;
		transform: perspective(100px) rotateY(-8deg);
	}

	.flag-row {
		display: flex;
		gap: 2px;
	}

	.flag-piece {
		width: 18px;
		height: 18px;
		border-radius: 2px;
	}

	.logo-text {
		display: flex;
		flex-direction: column;
	}

	.logo-microsoft {
		font-size: 11px;
		color: #888;
		font-family: 'Trebuchet MS', sans-serif;
		letter-spacing: 3px;
		text-transform: uppercase;
	}

	.logo-windows {
		font-size: 28px;
		color: white;
		font-family: 'Trebuchet MS', sans-serif;
		font-weight: bold;
		letter-spacing: -0.5px;
	}

	.logo-xp {
		color: #ec6c00;
		font-style: italic;
		margin-left: 2px;
	}

	/* Animated XP loading bars */
	.loading-track {
		width: 180px;
		height: 12px;
		background: #0a0a0a;
		border-radius: 6px;
		overflow: hidden;
		position: relative;
	}

	.loading-bars {
		display: flex;
		gap: 3px;
		position: absolute;
		left: -60px;
		top: 2px;
		height: 8px;
		animation: slide-bars 1.8s ease-in-out infinite;
	}

	.bar {
		width: 14px;
		height: 8px;
		background: linear-gradient(180deg, #5ea9f0 0%, #3b7dd8 40%, #2860b0 100%);
		border-radius: 2px;
		box-shadow: 0 0 4px rgba(94,169,240,0.4);
	}

	@keyframes slide-bars {
		0% { left: -60px; }
		100% { left: 180px; }
	}

	.boot-bottom-left {
		position: absolute;
		bottom: 16px;
		left: 20px;
	}

	.boot-hint {
		font-size: 10px;
		color: #444;
		font-family: 'Tahoma', sans-serif;
	}

	.boot-bottom-right {
		position: absolute;
		bottom: 16px;
		right: 20px;
	}

	.boot-copyright {
		font-size: 10px;
		color: #444;
		font-family: 'Tahoma', sans-serif;
	}
</style>
