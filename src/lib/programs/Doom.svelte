<script lang="ts">
	let { windowId }: { windowId: string } = $props();

	let iframe: HTMLIFrameElement | undefined = $state();
	let loading = $state(true);
	let error = $state('');

	$effect(() => {
		if (!iframe) return;

		const doc = iframe.contentDocument;
		if (!doc) { error = 'Cannot access iframe'; return; }

		doc.open();
		doc.write(`<!DOCTYPE html>
<html>
<head><style>
	html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
	canvas { width: 100%; height: 100%; display: block; }
	.loading { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; font-family: Tahoma, sans-serif; font-size: 14px; gap: 12px; }
</style></head>
<body>
<div class="loading" id="loader"><p id="status">Loading js-dos...</p><progress></progress></div>
<canvas id="canvas" tabindex="0"></canvas>
<script>
var status = document.getElementById('status');
var loader = document.getElementById('loader');
var canvas = document.getElementById('canvas');

var script = document.createElement('script');
script.src = 'https://js-dos.com/6.22/current/js-dos.js';
script.onload = function() {
	status.textContent = 'Downloading DOOM...';
	Dos(canvas, {
		wdosboxUrl: 'https://js-dos.com/6.22/current/wdosbox.js',
		onprogress: function(stage, total, loaded) {
			if (total > 0) status.textContent = stage + '... ' + Math.round(loaded/total*100) + '%';
		}
	}).ready(function(fs, main) {
		status.textContent = 'Extracting DOOM...';
		fs.extract('https://js-dos.com/cdn/upload/DOOM-@evilution.zip').then(function() {
			loader.style.display = 'none';
			main(['-c', 'cd DOOM', '-c', 'DOOM.EXE']).then(function(ci) {
				canvas.focus();
			});
		});
	});
};
script.onerror = function() { status.textContent = 'Failed to load DOOM.'; };
document.head.appendChild(script);
<\/script>
</body></html>`);
		doc.close();

		loading = false;

		return () => {
			// Iframe removal kills all js-dos listeners automatically
			if (iframe) iframe.src = 'about:blank';
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="doom-wrapper" onclick={() => iframe?.contentDocument?.getElementById('canvas')?.focus()}>
	<iframe
		bind:this={iframe}
		class="doom-iframe"
		title="DOOM"
		sandbox="allow-scripts allow-same-origin"
	></iframe>
</div>

<style>
	.doom-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		background: #000;
		overflow: hidden;
	}

	.doom-iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>