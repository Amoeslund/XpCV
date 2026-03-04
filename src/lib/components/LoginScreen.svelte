<script lang="ts">
	import { phase } from '$lib/stores/system';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let entering = $state(false);

	onMount(() => {
		// Fade in
		requestAnimationFrame(() => visible = true);
	});

	function login() {
		if (entering) return;
		entering = true;
		try {
			const audio = new Audio('/sounds/startup.mp3');
			audio.volume = 0.5;
			audio.play().catch(() => {});
		} catch {}
		setTimeout(() => phase.set('desktop'), 700);
	}
</script>

<div class="login" class:visible class:entering>
	<!-- Top gradient bar with Windows XP branding -->
	<div class="login-header">
		<div class="header-content">

		</div>
		<div class="header-orange-line"></div>
	</div>

	<!-- Center content -->
	<div class="login-center">
		<div class="login-left">
			<div class="welcome-text">Welcome</div>
			<div class="instruction">
				To begin, click on your name
			</div>
		</div>

		<div class="login-divider"></div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="login-right" onclick={login}>
			<div class="user-card">
				<img src="/images/anders.jpg" alt="Anders" class="user-avatar" onerror={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/user.png'; }} />
				<div class="user-info">
					<div class="user-name">Anders Moeslund</div>
					<div class="user-title">Lead Backed Developer (.NET) @ IMPACT</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom bar -->
	<div class="login-footer">
		<div class="footer-orange-line"></div>
		<div class="footer-content">
			<span class="footer-text">After you log on, the desktop is yours to explore.</span>
		</div>
	</div>
</div>

<style>
	.login {
		position: fixed;
		inset: 0;
		z-index: 40000;
		display: flex;
		flex-direction: column;
		/* Authentic XP welcome gradient */
		background: linear-gradient(
			180deg,
			#0045a0 0%,
			#0050b0 10%,
			#0860c0 25%,
			#1878d0 45%,
			#3098e0 65%,
			#60b8ec 80%,
			#98d4f4 100%
		);
		opacity: 0;
		transition: opacity 0.6s ease-out;
	}

	.login.visible {
		opacity: 1;
	}

	.login.entering {
		opacity: 0;
		transition: opacity 0.7s ease-out;
	}

	/* Header */
	.login-header {
		flex-shrink: 0;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 24px;
		background: linear-gradient(90deg, rgba(0,30,80,0.6) 0%, rgba(0,60,130,0.3) 50%, rgba(0,30,80,0.6) 100%);
	}

	.header-flag {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.hf-row {
		display: flex;
		gap: 1px;
	}

	.hf {
		width: 10px;
		height: 10px;
		border-radius: 1px;
	}

	.header-text {
		font-size: 18px;
		color: white;
		font-family: 'Trebuchet MS', sans-serif;
		font-weight: bold;
		text-shadow: 0 1px 3px rgba(0,0,0,0.4);
	}

	.header-xp {
		color: #fd8d19;
		font-style: italic;
		margin-left: 1px;
	}

	.header-orange-line {
		height: 3px;
		background: linear-gradient(90deg, transparent 0%, #fd8d19 20%, #febd56 50%, #fd8d19 80%, transparent 100%);
	}

	/* Center */
	.login-center {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0;
		padding: 0 40px;
	}

	.login-left {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-right: 40px;
	}

	.welcome-text {
		font-size: 42px;
		color: white;
		font-weight: 300;
		font-family: 'Trebuchet MS', sans-serif;
		text-shadow: 0 2px 8px rgba(0,0,0,0.2);
		letter-spacing: 2px;
	}

	.instruction {
		font-size: 12px;
		color: rgba(255,255,255,0.75);
		font-family: 'Tahoma', sans-serif;
		margin-top: 8px;
	}

	.login-divider {
		width: 2px;
		height: 120px;
		background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.4) 80%, transparent 100%);
	}

	.login-right {
		flex: 1;
		display: flex;
		align-items: center;
		padding-left: 40px;
		cursor: pointer;
	}

	.user-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px 20px;
		border-radius: 6px;
		transition: background 0.15s;
	}

	.user-card:hover {
		background: rgba(255,255,255,0.12);
	}

	.user-avatar {
		width: 64px;
		height: 64px;
		border-radius: 6px;
		border: 2px solid rgba(255,255,255,0.7);
		box-shadow: 0 2px 8px rgba(0,0,0,0.3);
	}

	.user-name {
		font-size: 16px;
		color: white;
		font-weight: bold;
		font-family: 'Trebuchet MS', sans-serif;
		text-shadow: 0 1px 3px rgba(0,0,0,0.3);
	}

	.user-title {
		font-size: 11px;
		color: rgba(255,255,255,0.7);
		font-family: 'Tahoma', sans-serif;
		margin-top: 2px;
	}

	/* Footer */
	.login-footer {
		flex-shrink: 0;
	}

	.footer-orange-line {
		height: 3px;
		background: linear-gradient(90deg, transparent 0%, #fd8d19 20%, #febd56 50%, #fd8d19 80%, transparent 100%);
	}

	.footer-content {
		padding: 12px 24px;
		background: linear-gradient(90deg, rgba(0,30,80,0.6) 0%, rgba(0,60,130,0.3) 50%, rgba(0,30,80,0.6) 100%);
		display: flex;
		justify-content: flex-end;
	}

	.footer-text {
		font-size: 11px;
		color: rgba(255,255,255,0.6);
		font-family: 'Tahoma', sans-serif;
	}

	@media (max-width: 600px) {
		.login-center {
			flex-direction: column;
			padding: 0 16px;
			gap: 20px;
		}

		.login-left {
			align-items: center;
			padding-right: 0;
		}

		.welcome-text {
			font-size: 28px;
		}

		.login-divider {
			width: 60%;
			height: 2px;
			background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.4) 80%, transparent 100%);
		}

		.login-right {
			padding-left: 0;
			justify-content: center;
		}
	}
</style>
