<script lang="ts">
	let { windowId }: { windowId: string } = $props();

	const projects = [
		{
			id: 'xp-portfolio',
			name: 'XP Portfolio',
			description: 'This website! A Windows XP-themed portfolio built with SvelteKit and XP.css. Features a full desktop experience with draggable windows, start menu, taskbar, and classic programs.',
			tech: ['SvelteKit', 'TypeScript', 'XP.css', 'Cloudflare Pages'],
			url: 'https://amoeslund.dk'
		}
	];

	let selectedProject = $state(projects[0]);
</script>

<div class="projects-layout" style="height: 100%;">
	<div class="projects-tree">
		<ul class="tree-view" style="height: 100%;">
			{#each projects as project}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li onclick={() => selectedProject = project}
					style="cursor: pointer; padding: 2px 4px; {selectedProject.id === project.id ? 'background: #316ac5; color: white;' : ''}">
					{project.name}
				</li>
			{/each}
		</ul>
	</div>

	<div class="projects-detail">
		{#if selectedProject}
			<h3 style="font-size: 14px; margin-bottom: 8px;">{selectedProject.name}</h3>
			<p style="font-size: 12px; line-height: 1.6; margin-bottom: 10px;">{selectedProject.description}</p>

			<fieldset>
				<legend>Tech Stack</legend>
				<div style="padding: 4px; display: flex; flex-wrap: wrap; gap: 4px;">
					{#each selectedProject.tech as tech}
						<span style="background: #e0e8f0; padding: 2px 8px; border-radius: 2px; font-size: 11px; border: 1px solid #b0c0d0;">{tech}</span>
					{/each}
				</div>
			</fieldset>

			{#if selectedProject.url}
				<div style="margin-top: 8px;">
					<button onclick={() => selectedProject.url && window.open(selectedProject.url, '_blank')}>
						🔗 Visit Project
					</button>
				</div>
			{/if}
		{/if}
	</div>
</div>
