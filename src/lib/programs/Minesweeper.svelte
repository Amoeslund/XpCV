<script lang="ts">
	let { windowId }: { windowId: string } = $props();

	type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';
	type CellState = 'cover' | 'flag' | 'unknown' | 'open' | 'die' | 'misflagged' | 'mine';
	type GameStatus = 'new' | 'started' | 'died' | 'won';
	type Cell = { state: CellState; minesAround: number; opening: boolean };

	const configs: Record<Difficulty, { rows: number; columns: number; mines: number }> = {
		Beginner: { rows: 9, columns: 9, mines: 10 },
		Intermediate: { rows: 16, columns: 16, mines: 40 },
		Expert: { rows: 16, columns: 30, mines: 99 }
	};

	let difficulty = $state<Difficulty>('Beginner');
	let status = $state<GameStatus>('new');
	let rows = $state(9);
	let columns = $state(9);
	let mines = $state(10);
	let ceils = $state<Cell[]>([]);
	let seconds = $state(0);
	let timerInterval: ReturnType<typeof setInterval> | null = null;
	let menuOpen = $state<string | null>(null);

	let minesRemaining = $derived(mines - ceils.filter(c => c.state === 'flag').length);

	function clearMap(diff: Difficulty) {
		difficulty = diff;
		const cfg = configs[diff];
		rows = cfg.rows;
		columns = cfg.columns;
		mines = cfg.mines;
		status = 'new';
		seconds = 0;
		if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
		ceils = Array.from({ length: cfg.rows * cfg.columns }, () => ({
			state: 'cover' as CellState,
			minesAround: 0,
			opening: false
		}));
	}

	clearMap('Beginner');

	function getNearIndexes(index: number): number[] {
		const row = Math.floor(index / columns);
		const col = index % columns;
		const result: number[] = [];
		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				const nr = row + dr;
				const nc = col + dc;
				if (nr >= 0 && nr < rows && nc >= 0 && nc < columns) {
					result.push(nr * columns + nc);
				}
			}
		}
		return result;
	}

	function startGame(index: number) {
		status = 'started';
		seconds = 0;
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = setInterval(() => {
			if (seconds < 999) seconds++;
		}, 1000);

		const available = ceils.map((_, i) => i).filter(i => i !== index);
		const mineIndexes: Set<number> = new Set();
		while (mineIndexes.size < mines) {
			const rand = available[Math.floor(Math.random() * available.length)];
			mineIndexes.add(rand);
		}

		for (const mi of mineIndexes) {
			ceils[mi].minesAround = -10;
			for (const ni of getNearIndexes(mi)) {
				ceils[ni].minesAround++;
			}
		}
	}

	function autoCeils(index: number) {
		const walked = new Set<number>();
		function walk(i: number) {
			if (walked.has(i)) return;
			walked.add(i);
			const cell = ceils[i];
			if (cell.state === 'flag' || cell.minesAround < 0) return;
			cell.state = 'open';
			if (cell.minesAround === 0) {
				for (const ni of getNearIndexes(i)) walk(ni);
			}
		}
		walk(index);
	}

	function openCeil(index: number) {
		if (status === 'died' || status === 'won') return;
		const cell = ceils[index];
		if (cell.state !== 'cover' && cell.state !== 'unknown') return;

		if (status === 'new') startGame(index);

		if (cell.minesAround < 0) {
			cell.state = 'die';
			status = 'died';
			if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
			for (let i = 0; i < ceils.length; i++) {
				if (ceils[i].minesAround < 0 && ceils[i].state !== 'die' && ceils[i].state !== 'flag') {
					ceils[i].state = 'mine';
				}
				if (ceils[i].state === 'flag' && ceils[i].minesAround >= 0) {
					ceils[i].state = 'misflagged';
				}
			}
			return;
		}

		autoCeils(index);
		checkWin();
	}

	function changeCeilState(index: number) {
		if (status === 'died' || status === 'won') return;
		const cell = ceils[index];
		if (cell.state === 'cover') cell.state = 'flag';
		else if (cell.state === 'flag') cell.state = 'unknown';
		else if (cell.state === 'unknown') cell.state = 'cover';
	}

	function openNeighbors(index: number) {
		if (status !== 'started') return;
		const cell = ceils[index];
		if (cell.state !== 'open' || cell.minesAround <= 0) return;
		const neighbors = getNearIndexes(index);
		const flagCount = neighbors.filter(i => ceils[i].state === 'flag').length;
		if (flagCount !== cell.minesAround) return;
		for (const ni of neighbors) {
			if (ceils[ni].state === 'cover' || ceils[ni].state === 'unknown') {
				openCeil(ni);
			}
		}
	}

	function checkWin() {
		const allSafeOpen = ceils.every(c => c.minesAround < 0 || c.state === 'open');
		if (allSafeOpen) {
			status = 'won';
			if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
			for (let i = 0; i < ceils.length; i++) {
				if (ceils[i].minesAround < 0) ceils[i].state = 'flag';
			}
		}
	}

	function getDigits(n: number): [number, number, number] {
		const clamped = Math.max(-99, Math.min(999, n));
		const abs = Math.abs(clamped);
		if (clamped < 0) return [-1, Math.floor(abs / 10) % 10, abs % 10];
		return [Math.floor(abs / 100), Math.floor(abs / 10) % 10, abs % 10];
	}

	function digitSrc(d: number): string {
		return d === -1 ? '/icons/minesweeper/digit-dash.png' : `/icons/minesweeper/digit${d}.png`;
	}

	const numColors: Record<number, string> = {
		1: '#0000ff', 2: '#008000', 3: '#ff0000', 4: '#000080',
		5: '#800000', 6: '#008080', 7: '#000000', 8: '#808080'
	};

	function faceSrc(): string {
		if (status === 'died') return '/icons/minesweeper/dead.png';
		if (status === 'won') return '/icons/minesweeper/win.png';
		if (pressing) return '/icons/minesweeper/ohh.png';
		return '/icons/minesweeper/smile.png';
	}

	let pressing = $state(false);

	function onCellMouseDown(e: MouseEvent, index: number) {
		if (e.button === 2) return;
		if (status === 'died' || status === 'won') return;
		if (e.buttons === 3) {
			openNeighbors(index);
			return;
		}
		pressing = true;
		const cell = ceils[index];
		if (cell.state === 'cover' || cell.state === 'unknown') {
			cell.opening = true;
		}
	}

	function onCellMouseUp(e: MouseEvent, index: number) {
		if (pressing) {
			pressing = false;
			ceils.forEach(c => c.opening = false);
			if (e.button === 0) openCeil(index);
		}
	}

	function onCellMouseEnter(index: number) {
		if (!pressing) return;
		const cell = ceils[index];
		if (cell.state === 'cover' || cell.state === 'unknown') {
			cell.opening = true;
		}
	}

	function onCellMouseLeave(index: number) {
		ceils[index].opening = false;
	}

	function onContextMenu(e: MouseEvent, index: number) {
		e.preventDefault();
		changeCeilState(index);
	}

	const mineDigits = $derived(getDigits(minesRemaining));
	const timeDigits = $derived(getDigits(seconds));
</script>

<div class="ms-container">
	<div class="menu-bar">
		<div style="position:relative;">
			<button class:active={menuOpen === 'game'} onclick={() => menuOpen = menuOpen === 'game' ? null : 'game'}>Game</button>
			{#if menuOpen === 'game'}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="ms-dropdown" onclick={() => menuOpen = null}>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="ms-dropdown-item" onclick={() => clearMap(difficulty)}>New</div>
					<div class="ms-dropdown-sep"></div>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="ms-dropdown-item" class:ms-checked={difficulty === 'Beginner'} onclick={() => clearMap('Beginner')}>Beginner</div>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="ms-dropdown-item" class:ms-checked={difficulty === 'Intermediate'} onclick={() => clearMap('Intermediate')}>Intermediate</div>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="ms-dropdown-item" class:ms-checked={difficulty === 'Expert'} onclick={() => clearMap('Expert')}>Expert</div>
				</div>
			{/if}
		</div>
		<button>Help</button>
	</div>

	<div class="ms-game-area">
		<div class="ms-score-bar" style="width:{columns * 16 + 10}px;">
			<div class="ms-counter">
				{#each mineDigits as d}<img src={digitSrc(d)} alt="" class="ms-digit" />{/each}
			</div>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="ms-face" onclick={() => clearMap(difficulty)}>
				<img src={faceSrc()} alt="" class="ms-face-img" />
			</div>
			<div class="ms-counter">
				{#each timeDigits as d}<img src={digitSrc(d)} alt="" class="ms-digit" />{/each}
			</div>
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="ms-grid"
			style="grid-template-columns:repeat({columns},16px);grid-template-rows:repeat({rows},16px);"
			onmouseup={() => { pressing = false; ceils.forEach(c => c.opening = false); }}
		>
			{#each ceils as cell, i}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="ms-cell"
					class:ms-covered={cell.state === 'cover' && !cell.opening}
					class:ms-pressed={cell.opening}
					class:ms-open={cell.state === 'open'}
					class:ms-flagged={cell.state === 'flag'}
					class:ms-question={cell.state === 'unknown' && !cell.opening}
					class:ms-die={cell.state === 'die'}
					class:ms-mine={cell.state === 'mine'}
					class:ms-misflagged={cell.state === 'misflagged'}
					onmousedown={(e) => onCellMouseDown(e, i)}
					onmouseup={(e) => onCellMouseUp(e, i)}
					onmouseenter={() => onCellMouseEnter(i)}
					onmouseleave={() => onCellMouseLeave(i)}
					oncontextmenu={(e) => onContextMenu(e, i)}
				>
					{#if cell.state === 'flag'}
						<img src="/icons/minesweeper/flag.png" alt="" class="ms-cell-img" />
					{:else if cell.state === 'unknown' && !cell.opening}
						<img src="/icons/minesweeper/unknown.png" alt="" class="ms-cell-img" />
					{:else if cell.state === 'open' && cell.minesAround > 0}
						<span class="ms-num" style="color:{numColors[cell.minesAround]}">{cell.minesAround}</span>
					{:else if cell.state === 'die'}
						<img src="/icons/minesweeper/mine-death.png" alt="" class="ms-cell-img" />
					{:else if cell.state === 'mine'}
						<img src="/icons/minesweeper/mine-ceil.png" alt="" class="ms-cell-img" />
					{:else if cell.state === 'misflagged'}
						<img src="/icons/minesweeper/mine-misflagged.png" alt="" class="ms-cell-img" />
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.ms-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #c0c0c0;
	}

	.ms-game-area {
		padding: 6px;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.ms-score-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 5px;
		border: 2px inset #808080;
		background: #c0c0c0;
		margin-bottom: 6px;
	}

	.ms-counter {
		display: flex;
		background: #000;
		padding: 1px;
		border: 1px inset #808080;
	}

	.ms-digit {
		width: 13px;
		height: 23px;
		display: block;
	}

	.ms-face {
		cursor: default;
		border: 2px outset #fff;
		background: #c0c0c0;
		padding: 1px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ms-face:active {
		border-style: inset;
	}

	.ms-face-img {
		width: 24px;
		height: 24px;
		display: block;
	}

	.ms-grid {
		display: inline-grid;
		gap: 0;
		border: 3px inset #808080;
	}

	.ms-cell {
		width: 16px;
		height: 16px;
		cursor: default;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		background: #c0c0c0;
	}

	/* Covered / unrevealed cell - raised 3D button */
	.ms-covered {
		border: 2px outset #fff;
		border-top-color: #fff;
		border-left-color: #fff;
		border-right-color: #808080;
		border-bottom-color: #808080;
	}

	/* Flagged cell - also raised */
	.ms-flagged {
		border: 2px outset #fff;
		border-top-color: #fff;
		border-left-color: #fff;
		border-right-color: #808080;
		border-bottom-color: #808080;
	}

	/* Question mark cell - also raised */
	.ms-question {
		border: 2px outset #fff;
		border-top-color: #fff;
		border-left-color: #fff;
		border-right-color: #808080;
		border-bottom-color: #808080;
	}

	/* Pressed/opening cell - flat */
	.ms-pressed {
		border: 1px solid #808080;
		border-right-color: #c0c0c0;
		border-bottom-color: #c0c0c0;
	}

	/* Open/revealed cell - flat with border */
	.ms-open {
		border: 1px solid #c0c0c0;
		border-top-color: #808080;
		border-left-color: #808080;
	}

	/* Mine that was clicked (death) - red background */
	.ms-die {
		border: 1px solid #808080;
		border-right-color: #c0c0c0;
		border-bottom-color: #c0c0c0;
		background: #ff0000;
	}

	/* Revealed mine (game over) */
	.ms-mine {
		border: 1px solid #c0c0c0;
		border-top-color: #808080;
		border-left-color: #808080;
	}

	/* Misflagged - wrong flag */
	.ms-misflagged {
		border: 1px solid #c0c0c0;
		border-top-color: #808080;
		border-left-color: #808080;
	}

	.ms-cell-img {
		width: 16px;
		height: 16px;
		display: block;
		/* Sprites have their own borders so compensate for cell border */
		margin: -1px;
	}

	.ms-num {
		font-size: 11px;
		font-weight: bold;
		font-family: 'Arial', sans-serif;
		line-height: 1;
	}

	/* Dropdown menu */
	.ms-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		background: #fff;
		border: 1px solid #808080;
		box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
		z-index: 100;
		min-width: 160px;
		padding: 2px 0;
	}

	.ms-dropdown-item {
		padding: 4px 24px;
		font-size: 11px;
		font-family: 'Tahoma', sans-serif;
		cursor: default;
		position: relative;
	}

	.ms-dropdown-item:hover {
		background: #2f71cd;
		color: white;
	}

	.ms-dropdown-item.ms-checked::before {
		content: '\2022';
		position: absolute;
		left: 8px;
		font-size: 14px;
	}

	.ms-dropdown-sep {
		height: 1px;
		margin: 3px 4px;
		background: #c8c8c8;
	}
</style>
