<script lang="ts">
	let { windowId }: { windowId: string } = $props();

	type Route = 'home' | 'search' | 'about' | 'linkedin';
	let route = $state<Route>('home');
	let query = $state('');
	let searchInput = $state('');
	let history = $state<Route[]>(['home']);
	let historyIndex = $state(0);

	const urls: Record<Route, string> = {
		home: 'https://www.google.com',
		search: 'https://www.google.com/search?q=',
		about: 'https://amoeslund.dk',
		linkedin: 'https://linkedin.com/in/amoeslund'
	};

	let currentUrl = $derived(
		route === 'search' ? urls.search + encodeURIComponent(query) : urls[route]
	);

	function navigate(r: Route) {
		route = r;
		const newHist = history.slice(0, historyIndex + 1);
		newHist.push(r);
		history = newHist;
		historyIndex = history.length - 1;
	}

	function goBack() {
		if (historyIndex > 0) {
			historyIndex--;
			route = history[historyIndex];
		}
	}

	function goForward() {
		if (historyIndex < history.length - 1) {
			historyIndex++;
			route = history[historyIndex];
		}
	}

	function handleSearch() {
		if (searchInput.trim()) {
			query = searchInput.trim();
			navigate('search');
		}
	}

	function handleAddressKey(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			const val = (e.target as HTMLInputElement).value.trim();
			if (val.includes('amoeslund')) navigate('about');
			else if (val.includes('linkedin')) navigate('linkedin');
			else if (val.includes('google')) navigate('home');
			else { query = val; navigate('search'); }
		}
	}
</script>

<div class="ie-container">
	<!-- Menu bar -->
	<div class="menu-bar">
		<button>File</button>
		<button>Edit</button>
		<button>View</button>
		<button>Favorites</button>
		<button>Tools</button>
		<button>Help</button>
	</div>

	<!-- Toolbar -->
	<div class="ie-toolbar">
		<button class="ie-nav-btn" onclick={goBack} disabled={historyIndex <= 0}>
			<img src="/icons/ie-back.png" alt="" style="width:24px;height:24px;" />
			<span>Back</span>
		</button>
		<button class="ie-nav-btn" onclick={goForward} disabled={historyIndex >= history.length - 1}>
			<img src="/icons/ie-forward.png" alt="" style="width:24px;height:24px;" />
		</button>
		<div class="ie-toolbar-sep"></div>
		<button class="ie-nav-btn" onclick={() => navigate('home')}>
			<img src="/icons/ie-home.png" alt="" style="width:24px;height:24px;" />
		</button>
		<button class="ie-nav-btn">
			<img src="/icons/ie-refresh.png" alt="" style="width:24px;height:24px;" />
		</button>
	</div>

	<!-- Address bar -->
	<div class="ie-address-bar">
		<span class="ie-addr-label">Address</span>
		<div class="ie-addr-input-wrap">
			<img src="/icons/ie-16.png" alt="" style="width:16px;height:16px;" />
			<input type="text" class="ie-addr-input" value={currentUrl} onkeydown={handleAddressKey} />
		</div>
		<button class="ie-go-btn" onclick={() => {}}>Go</button>
	</div>

	<!-- Links bar -->
	<div class="ie-links-bar">
		<span class="ie-bar-label">Links</span>
		<span class="ie-bar-link">Customize Links</span>
		<span class="ie-bar-link">Free Hotmail</span>
		<span class="ie-bar-link">Windows Media</span>
		<span class="ie-bar-link">Windows</span>
	</div>

	<!-- Google Toolbar -->
	<div class="ie-addon-toolbar google-toolbar">
		<img src="/icons/earth.png" alt="" style="width:16px;height:16px;" />
		<span style="font-weight:bold;color:#4285f4;">G</span><span style="font-weight:bold;color:#ea4335;">o</span><span style="font-weight:bold;color:#fbbc05;">o</span><span style="font-weight:bold;color:#4285f4;">g</span><span style="font-weight:bold;color:#34a853;">l</span><span style="font-weight:bold;color:#ea4335;">e</span>
		<input type="text" class="addon-search" placeholder="Google Search" style="width:120px;" />
		<button class="addon-btn">Search Web</button>
		<span class="ie-toolbar-sep-v"></span>
		<button class="addon-btn">I'm Feeling Lucky</button>
		<span class="ie-toolbar-sep-v"></span>
		<button class="addon-btn">PageRank</button>
		<button class="addon-btn">Pop-up Blocker</button>
	</div>

	<!-- Yahoo! Toolbar -->
	<div class="ie-addon-toolbar yahoo-toolbar">
		<span style="font-weight:bold;color:#720e9e;">Yahoo!</span>
		<input type="text" class="addon-search" placeholder="Yahoo! Search" style="width:100px;" />
		<button class="addon-btn">Search</button>
		<span class="ie-toolbar-sep-v"></span>
		<button class="addon-btn">Mail</button>
		<button class="addon-btn">Answers</button>
		<button class="addon-btn">Anti-Spy</button>
		<button class="addon-btn">Anti-Pop</button>
	</div>

	<!-- Ask Toolbar -->
	<div class="ie-addon-toolbar ask-toolbar">
		<span style="font-weight:bold;color:#d4212b;">Ask</span>
		<input type="text" class="addon-search" placeholder="Ask.com" style="width:100px;" />
		<button class="addon-btn">Search</button>
		<span class="ie-toolbar-sep-v"></span>
		<button class="addon-btn">Weather</button>
		<button class="addon-btn">Maps</button>
	</div>

	<!-- Norton Toolbar -->
	<div class="ie-addon-toolbar norton-toolbar">
		<span style="font-weight:bold;color:#ffc800;background:#000;padding:0 4px;font-size:10px;">Norton</span>
		<button class="addon-btn" style="color:green;">Safe</button>
		<button class="addon-btn">Norton Safe Web</button>
		<button class="addon-btn">Identity Safe</button>
		<span class="ie-toolbar-sep-v"></span>
		<span style="font-size:9px;color:green;">Site is Safe</span>
	</div>

	<!-- McAfee SiteAdvisor -->
	<div class="ie-addon-toolbar mcafee-toolbar">
		<span style="font-weight:bold;color:#c00;font-size:10px;">McAfee</span>
		<span style="font-size:10px;">SiteAdvisor</span>
		<span class="ie-toolbar-sep-v"></span>
		<button class="addon-btn" style="color:green;">&#10003; Safe</button>
		<button class="addon-btn">Search</button>
	</div>

	<!-- Coupon Toolbar -->
	<div class="ie-addon-toolbar coupon-toolbar">
		<span style="font-weight:bold;color:#e67300;font-size:10px;">CouponBar</span>
		<button class="addon-btn">Find Coupons</button>
		<button class="addon-btn">Compare Prices</button>
		<button class="addon-btn">Cash Back</button>
		<span class="ie-toolbar-sep-v"></span>
		<span style="font-size:9px;color:#888;">2 coupons available!</span>
	</div>

	<!-- Bing Bar -->
	<div class="ie-addon-toolbar bing-toolbar">
		<span style="font-weight:bold;color:#008373;font-size:11px;">Bing</span>
		<input type="text" class="addon-search" placeholder="Bing" style="width:100px;" />
		<button class="addon-btn">Search</button>
		<span class="ie-toolbar-sep-v"></span>
		<button class="addon-btn">Maps</button>
		<button class="addon-btn">MSN</button>
		<button class="addon-btn">Hotmail</button>
	</div>

	<!-- Content area -->
	<div class="ie-content">
		{#if route === 'home'}
			<div class="ie-google">
				<div style="text-align:center;padding-top:80px;">
					<div style="font-size:60px;font-weight:bold;margin-bottom:20px;">
						<span style="color:#4285f4">G</span><span style="color:#ea4335">o</span><span style="color:#fbbc05">o</span><span style="color:#4285f4">g</span><span style="color:#34a853">l</span><span style="color:#ea4335">e</span>
					</div>
					<div style="display:flex;justify-content:center;gap:4px;">
						<input
							type="text"
							class="ie-search-input"
							bind:value={searchInput}
							onkeydown={(e) => { if (e.key === 'Enter') handleSearch(); }}
						/>
					</div>
					<div style="margin-top:16px;display:flex;justify-content:center;gap:8px;">
						<button class="ie-search-btn" onclick={handleSearch}>Google Search</button>
						<button class="ie-search-btn" onclick={() => { window.open('https://amoeslund.dk', '_blank'); }}>I'm Feeling Lucky</button>
					</div>
				</div>
			</div>
		{:else if route === 'search'}
			<div class="ie-search-results">
				<div style="padding:20px;">
					<div style="font-size:20px;font-weight:bold;margin-bottom:16px;">
						<span style="color:#4285f4">G</span><span style="color:#ea4335">o</span><span style="color:#fbbc05">o</span><span style="color:#4285f4">g</span><span style="color:#34a853">l</span><span style="color:#ea4335">e</span>
					</div>
					<p style="font-size:12px;color:#666;margin-bottom:16px;">Results for: <b>{query}</b></p>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="ie-result" onclick={() => navigate('about')}>
						<div class="ie-result-title">Anders Moeslund - Portfolio</div>
						<div class="ie-result-url">https://amoeslund.dk</div>
						<div class="ie-result-desc">Lead Backend Developer at IMPACT Commerce. Passionate about software architecture and clean code. Based in Odense, Denmark.</div>
					</div>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="ie-result" onclick={() => navigate('linkedin')}>
						<div class="ie-result-title">Anders Moeslund - LinkedIn</div>
						<div class="ie-result-url">https://linkedin.com/in/amoeslund</div>
						<div class="ie-result-desc">Lead Backend Developer (.NET) at IMPACT Commerce. University of Southern Denmark graduate.</div>
					</div>
				</div>
			</div>
		{:else if route === 'about'}
			<div style="padding:20px;font-family:'Tahoma',sans-serif;font-size:12px;">
				<h2 style="color:#003399;margin:0 0 12px 0;">Anders Moeslund</h2>
				<p><b>Lead Backend Developer (.NET)</b> at IMPACT Commerce</p>
				<p>Odense, Denmark</p>
				<hr style="border:none;border-top:1px solid #c8c8c8;margin:12px 0;" />
				<p>Outgoing developer with great passion for software architecture and clean code.</p>
				<p>Education: University of Southern Denmark (2014-2018)</p>
				<hr style="border:none;border-top:1px solid #c8c8c8;margin:12px 0;" />
				<p>Won IMPACT Commerce CTF competition solo — XSS, JWT exploitation, SQL injection, YAML RCE, IDOR, prompt injection.</p>
			</div>
		{:else if route === 'linkedin'}
			<div style="padding:20px;font-family:'Tahoma',sans-serif;font-size:12px;">
				<div style="background:#0a66c2;padding:16px;color:white;font-weight:bold;font-size:16px;margin-bottom:16px;">LinkedIn</div>
				<h3 style="margin:0 0 8px 0;">Anders Bogetoft Moeslund</h3>
				<p>Lead Backend Developer (.NET) at IMPACT Commerce</p>
				<p style="color:#666;">Odense, Region of Southern Denmark, Denmark</p>
				<hr style="border:none;border-top:1px solid #e0e0e0;margin:12px 0;" />
				<p><b>Experience:</b> IMPACT Commerce</p>
				<p><b>Education:</b> University of Southern Denmark</p>
				<p style="margin-top:12px;"><a href="https://linkedin.com/in/amoeslund" target="_blank" style="color:#0a66c2;">Open real LinkedIn profile</a></p>
			</div>
		{/if}
	</div>

	<!-- Status bar -->
	<div class="ie-status-bar">
		<span>Done</span>
		<span class="ie-status-sep"></span>
		<span><img src="/icons/earth.png" alt="" style="width:14px;height:14px;vertical-align:middle;" /> Internet</span>
	</div>
</div>

<style>
	.ie-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: white;
		font-family: 'Tahoma', sans-serif;
		font-size: 11px;
	}

	.ie-toolbar {
		display: flex;
		align-items: center;
		padding: 2px 4px;
		background: #f0ede3;
		border-bottom: 1px solid #c8c8c8;
		gap: 2px;
	}

	.ie-nav-btn {
		background: none;
		border: 1px solid transparent;
		padding: 2px 6px;
		cursor: default;
		display: flex;
		align-items: center;
		gap: 3px;
		font-size: 11px;
		font-family: 'Tahoma', sans-serif;
		color: #000;
	}

	.ie-nav-btn:hover:not(:disabled) {
		background: #c1d2ee;
		border-color: #316ac5;
	}

	.ie-nav-btn:disabled {
		opacity: 0.4;
		filter: grayscale(1);
	}

	.ie-nav-btn img {
		display: block;
	}

	.ie-toolbar-sep {
		width: 1px;
		height: 24px;
		background: #c8c8c8;
		margin: 0 4px;
	}

	.ie-address-bar {
		display: flex;
		align-items: center;
		padding: 2px 4px;
		background: #f0ede3;
		border-bottom: 1px solid #c8c8c8;
		gap: 4px;
	}

	.ie-addr-label {
		font-size: 11px;
		color: #000;
		padding: 0 4px;
	}

	.ie-addr-input-wrap {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 4px;
		background: white;
		border: 1px solid #7f9db9;
		padding: 1px 4px;
	}

	.ie-addr-input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 11px;
		font-family: 'Tahoma', sans-serif;
		padding: 1px;
	}

	.ie-go-btn {
		background: #ece9d8;
		border: 1px solid #aca899;
		font-size: 11px;
		font-family: 'Tahoma', sans-serif;
		padding: 1px 8px;
		cursor: default;
	}

	.ie-go-btn:hover {
		background: #c1d2ee;
		border-color: #316ac5;
	}

	.ie-content {
		flex: 1;
		overflow: auto;
		background: white;
	}

	.ie-search-input {
		width: 400px;
		max-width: 80%;
		padding: 6px 10px;
		font-size: 14px;
		border: 1px solid #c8c8c8;
		outline: none;
		font-family: 'Tahoma', sans-serif;
	}

	.ie-search-input:focus {
		border-color: #4285f4;
	}

	.ie-search-btn {
		padding: 6px 16px;
		font-size: 12px;
		font-family: 'Tahoma', sans-serif;
		background: #f2f2f2;
		border: 1px solid #d4d4d4;
		cursor: default;
	}

	.ie-search-btn:hover {
		background: #e8e8e8;
		border-color: #c0c0c0;
	}

	.ie-result {
		margin-bottom: 16px;
		cursor: default;
	}

	.ie-result-title {
		font-size: 14px;
		color: #1a0dab;
		cursor: pointer;
	}

	.ie-result-title:hover {
		text-decoration: underline;
	}

	.ie-result-url {
		font-size: 12px;
		color: #006621;
		margin: 2px 0;
	}

	.ie-result-desc {
		font-size: 12px;
		color: #545454;
	}

	.ie-status-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 2px 8px;
		background: #ece9d8;
		border-top: 1px solid #c8c8c8;
		font-size: 11px;
		color: #000;
	}

	.ie-status-sep {
		width: 1px;
		height: 14px;
		background: #c8c8c8;
	}

	.ie-links-bar {
		display: flex;
		align-items: center;
		padding: 1px 4px;
		background: #f0ede3;
		border-bottom: 1px solid #c8c8c8;
		gap: 8px;
		font-size: 11px;
	}

	.ie-bar-label {
		color: #000;
		padding-right: 4px;
	}

	.ie-bar-link {
		color: #00c;
		cursor: pointer;
	}

	.ie-bar-link:hover {
		text-decoration: underline;
	}

	.ie-addon-toolbar {
		display: flex;
		align-items: center;
		padding: 2px 4px;
		background: #ece9d8;
		border-bottom: 1px solid #c8c8c8;
		gap: 4px;
		font-size: 11px;
		flex-shrink: 0;
		overflow: hidden;
	}

	.addon-search {
		border: 1px solid #7f9db9;
		font-size: 10px;
		font-family: 'Tahoma', sans-serif;
		padding: 1px 4px;
		height: 18px;
	}

	.addon-btn {
		background: #ece9d8;
		border: 1px solid transparent;
		font-size: 10px;
		font-family: 'Tahoma', sans-serif;
		padding: 1px 6px;
		cursor: default;
		white-space: nowrap;
	}

	.addon-btn:hover {
		background: #c1d2ee;
		border-color: #316ac5;
	}

	.ie-toolbar-sep-v {
		width: 1px;
		height: 16px;
		background: #c8c8c8;
		flex-shrink: 0;
	}
</style>
