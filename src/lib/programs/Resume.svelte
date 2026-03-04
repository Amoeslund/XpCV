<script lang="ts">
	let { windowId }: { windowId: string } = $props();
</script>

<div style="overflow-y: auto; height: 100%; font-size: 12px;">
	<h3 style="margin-bottom: 10px; font-size: 14px;">📄 Curriculum Vitae — Anders Bøgetoft Moeslund</h3>

	<fieldset>
		<legend>Experience</legend>
		<div style="padding: 4px;">
			<p><strong>Lead Dotnet Developer</strong> — IMPACT Commerce</p>
			<p style="color: #666; margin-bottom: 6px;">May 2024 – Present</p>
			<p>Responsible for the design and architecture of a new IAM solution for Solar Group's B2B e-commerce platform based on Azure Entra External ID. Leading migration from a legacy Salesforce-based user structure to a modern CIAM architecture with JIT password migration. Close collaboration with the client on solution design across Salesforce, commercetools, and SAP. Author of technical design documents and responsible for migration strategy from pilot to full rollout.</p>
			<p style="margin-top: 6px;">Previously responsible for the technical direction of FTZ's e-commerce site with 200,000 daily sessions. Optimization of flows using Azure Service Bus for event-driven architecture. Close collaboration with the client's PO for scoping and estimation. Mentoring other developers on user flows in Azure AD B2C and the authentication flow in the frontend.</p>
		</div>
		<hr style="margin: 8px 0; border: none; border-top: 1px solid #ccc;" />
		<div style="padding: 4px;">
			<p><strong>Senior Backend Developer</strong> — IMPACT Commerce</p>
			<p style="color: #666; margin-bottom: 6px;">May 2022 – May 2024</p>
			<p>Responsible for the technical direction of FTZ's e-commerce site with 200,000 daily sessions. Optimization of flows using Azure Service Bus for event-driven architecture. Close collaboration with the client's PO for scoping and estimation. Mentoring other developers on user flows in Azure AD B2C and the authentication flow in the frontend.</p>
		</div>
		<hr style="margin: 8px 0; border: none; border-top: 1px solid #ccc;" />
		<div style="padding: 4px;">
			<p><strong>Head of Software Development</strong> — BlueKey</p>
			<p style="color: #666; margin-bottom: 6px;">Sep 2021 – May 2022</p>
			<p>Responsible for the software development team of three developers, as well as participating as technical sparring partner in client meetings for both new development and maintenance. Set up Jira automation using triggers based on GitHub workflow.</p>
		</div>
		<hr style="margin: 8px 0; border: none; border-top: 1px solid #ccc;" />
		<div style="padding: 4px;">
			<p><strong>Software Developer</strong> — BlueKey</p>
			<p style="color: #666; margin-bottom: 6px;">Oct 2020 – Sep 2021</p>
			<p>Backend development of a microservice-based data search engine hosted in Azure. Performance optimization using distributed caching and auto-scaling of individual services. Set up DevOps pipeline with GitHub Actions for automated testing and deployment. Built a framework for easier unit test writing and set up code coverage monitoring tools.</p>
		</div>
		<hr style="margin: 8px 0; border: none; border-top: 1px solid #ccc;" />
		<div style="padding: 4px;">
			<p><strong>.NET Developer</strong> — Hesehus A/S</p>
			<p style="color: #666; margin-bottom: 6px;">May 2019 – Oct 2020</p>
			<p>Support and development of e-commerce solutions, including Davidsenshop and Billigarbejdstøj. Development of backend APIs with .NET Core MVC and ASP.NET. Performance optimization with Redis caching and SQL query improvements.</p>
		</div>
		<hr style="margin: 8px 0; border: none; border-top: 1px solid #ccc;" />
		<div style="padding: 4px;">
			<p><strong>Consultant</strong> — ESDHKonsulenterne</p>
			<p style="color: #666; margin-bottom: 6px;">Jan 2018 – Apr 2019</p>
			<p>Consulting for municipalities on case migration from ESDH systems to SBSYS. Development and maintenance of a TIFF rendering engine for file archival. Built a distributed queue system with RabbitMQ for improved file conversion performance. Speed optimization of the conversion engine. Operations, maintenance, and provisioning of new servers.</p>
		</div>
		<hr style="margin: 8px 0; border: none; border-top: 1px solid #ccc;" />
		<div style="padding: 4px;">
			<p><strong>Teaching Assistant</strong> — University of Southern Denmark</p>
			<p style="color: #666; margin-bottom: 6px;">Feb 2016 – Jan 2018</p>
			<p>TA for DM505: Database Design & Programming and DM550: Introduction to Programming.</p>
		</div>
	</fieldset>

	<fieldset>
		<legend>Education</legend>
		<div style="padding: 4px;">
			<p><strong>BSc Computer Science</strong> — University of Southern Denmark (SDU)</p>
			<p style="color: #666;">2014 – 2018</p>
		</div>
	</fieldset>

	<fieldset>
		<legend>Core Competencies</legend>
		<div style="padding: 4px; display: flex; flex-wrap: wrap; gap: 4px;">
			{#each ['Salesforce', 'commercetools', 'Azure Entra External ID', '.NET / ASP.NET', 'Solution Architecture', 'Tech Lead', 'Azure Service Bus', 'DevOps', 'Microservices', 'Redis Caching', 'Clean Code'] as skill}
				<span style="background: #e0e8f0; padding: 2px 8px; border-radius: 2px; font-size: 11px; border: 1px solid #b0c0d0;">{skill}</span>
			{/each}
		</div>
	</fieldset>

	<fieldset>
		<legend>Security Expertise</legend>
		<div style="padding: 4px;">
			<p style="margin-bottom: 4px;">Demonstrated through IMPACT Commerce CTF (solo winner):</p>
			<div style="display: flex; flex-wrap: wrap; gap: 4px;">
				{#each ['XSS', 'JWT Exploitation', 'SQL Injection', 'YAML RCE', 'IDOR', 'Prompt Injection'] as skill}
					<span style="background: #f0e0e0; padding: 2px 8px; border-radius: 2px; font-size: 11px; border: 1px solid #d0b0b0;">{skill}</span>
				{/each}
			</div>
		</div>
	</fieldset>

	<fieldset>
		<legend>Languages</legend>
		<div style="padding: 4px;">
			<p>🇩🇰 Danish — Native</p>
			<p>🇬🇧 English — Professional proficiency</p>
		</div>
	</fieldset>

	<div style="margin-top: 8px;">
		<a href="/Anders_Moeslund_CV.pdf" download="Anders_Moeslund_CV.pdf" style="text-decoration: none;"><button type="button">🖨️ Print</button></a>
	</div>
</div>
