<script lang="ts">
	import { closeWindow } from '$lib/stores/windows';
	let { windowId }: { windowId: string } = $props();
</script>

<div style="padding: 12px; font-size: 12px;">
	<fieldset>
		<legend>Contact Information</legend>
		<div style="padding: 8px;">
			<div class="contact-row">
				<img src="/icons/linkedin.svg" alt="" style="width:16px;height:16px;" onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
				<strong>LinkedIn:</strong>
				<a href="https://linkedin.com/in/amoeslund" target="_blank" rel="noopener">linkedin.com/in/amoeslund</a>
			</div>
			<div class="contact-row">
				<img src="/icons/github.png" alt="" onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
				<strong>GitHub:</strong>
				<a href="https://github.com/Amoeslund" target="_blank" rel="noopener">github.com/Amoeslund</a>
			</div>
			<div class="contact-row">
				<img src="/icons/earth.png" alt="" onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
				<strong>Website:</strong>
				<a href="https://amoeslund.dk" target="_blank" rel="noopener">amoeslund.dk</a>
			</div>
			<div class="contact-row">
				<img src="/icons/location.png" alt="" onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
				<strong>Location:</strong>
				<span>Odense, Denmark</span>
			</div>
		</div>
	</fieldset>
</div>
