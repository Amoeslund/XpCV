<script lang="ts">
	import { closeWindow } from '$lib/stores/windows';
	let { windowId }: { windowId: string } = $props();

	let activeTab = $state(0);
	const tabs = ['General', 'Skills', 'Achievements'];
</script>

<div style="display: flex; flex-direction: column; height: 100%; padding: 8px;">
	<section class="tabs" style="flex: 1; min-height: 0; display: flex; flex-direction: column;">
		<menu role="tablist">
			{#each tabs as tab, i}
				<button role="tab" aria-selected={activeTab === i} onclick={() => activeTab = i}>{tab}</button>
			{/each}
		</menu>

		{#if activeTab === 0}
			<article role="tabpanel" style="padding: 12px; flex: 1; overflow-y: auto; min-height: 0;">
				<div class="about-info">
					<img class="about-photo" src="/images/anders.jpg" alt="Anders" onerror={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/user.png'; }} />
					<div class="about-info-text">
						<p><strong>Anders Bøgetoft Moeslund</strong></p>
						<p>Lead Backend Developer (.NET) at IMPACT Commerce</p>
						<p>📍 Odense SØ, Denmark</p>
						<br/>
						<p style="font-style: italic;">"Outgoing developer with great passion for software architecture and clean code. I love learning about code, new technologies and how they can be used to improve workflows and automate processes."</p>
						<br/>
						<p>🎓 BSc Computer Science — University of Southern Denmark (2014–2018)</p>
						<p>🔗 <a href="https://linkedin.com/in/amoeslund" target="_blank" rel="noopener">linkedin.com/in/amoeslund</a></p>
						<p>🐙 <a href="https://github.com/Amoeslund" target="_blank" rel="noopener">github.com/Amoeslund</a></p>
					</div>
				</div>
			</article>
		{:else if activeTab === 1}
			<article role="tabpanel" style="padding: 12px; flex: 1; overflow-y: auto; min-height: 0;">
				<fieldset>
					<legend>Technical Skills</legend>
					<ul style="margin: 4px 0 4px 20px; font-size: 12px; line-height: 1.8;">
						<li>Infrastructure & DevOps</li>
						<li>Solution Architecture & Clean Code</li>
						<li>Tech Lead & Team Management</li>
						<li>.NET / ASP.NET Backend Development</li>
						<li>Event-Driven Architecture (Azure Service Bus)</li>
						<li>Performance Optimization & Caching</li>
					</ul>
				</fieldset>
				<fieldset>
					<legend>Languages</legend>
					<ul style="margin: 4px 0 4px 20px; font-size: 12px; line-height: 1.8;">
						<li>Danish — Native</li>
						<li>English — Professional proficiency</li>
					</ul>
				</fieldset>
			</article>
		{:else}
			<article role="tabpanel" style="padding: 12px; flex: 1; overflow-y: auto; min-height: 0;">
				<fieldset>
					<legend>🏆 IMPACT Commerce CTF Champion</legend>
					<p style="font-size: 12px; line-height: 1.6; padding: 4px;">
						Won the IMPACT Commerce Capture The Flag competition as a <strong>solo participant</strong>,
						demonstrating expertise across multiple security domains:
					</p>
					<ul style="margin: 4px 0 4px 20px; font-size: 12px; line-height: 1.8;">
						<li>Cross-Site Scripting (XSS)</li>
						<li>JWT Token Exploitation</li>
						<li>SQL Injection</li>
						<li>YAML Remote Code Execution</li>
						<li>Insecure Direct Object References (IDOR)</li>
						<li>Prompt Injection</li>
					</ul>
				</fieldset>
			</article>
		{/if}
	</section>

	<div style="display: flex; justify-content: flex-end; gap: 6px; padding-top: 8px;">
		<button onclick={() => closeWindow(windowId)}>OK</button>
		<button onclick={() => closeWindow(windowId)}>Cancel</button>
	</div>
</div>
