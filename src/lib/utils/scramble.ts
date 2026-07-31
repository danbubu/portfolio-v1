const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export type ScrambleCharState = {
	target: string;
	display: string;
	locked: boolean;
	/** Tailwind classes wrapping this glyph (e.g. responsive visibility) */
	wrapper: string;
	/** Brand accent after the decode finishes */
	accent: boolean;
	isSpace: boolean;
};

export type NamePart = {
	text: string;
	wrapper?: string;
	/** Character offsets within this part that receive brand azure after lock */
	accentOffsets?: number[];
};

/**
 * Build per-character scramble state from named parts (preserves wrappers / accents).
 */
export function buildScrambleState(parts: NamePart[]): ScrambleCharState[] {
	const chars: ScrambleCharState[] = [];

	for (const part of parts) {
		const wrapper = part.wrapper ?? '';
		const accents = new Set(part.accentOffsets ?? []);

		for (let i = 0; i < part.text.length; i++) {
			const target = part.text[i];
			const isSpace = target === ' ';
			chars.push({
				target,
				display: isSpace ? ' ' : randomScrambleChar(),
				locked: false,
				wrapper,
				accent: accents.has(i),
				isSpace
			});
		}
	}

	return chars;
}

export function randomScrambleChar(): string {
	return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export type ScrambleOptions = {
	/** Delay before each next character starts resolving (ms) */
	staggerMs?: number;
	/** How long a character keeps cycling before it locks (ms) */
	cycleMs?: number;
	/** Interval between random glyph swaps while cycling (ms) */
	tickMs?: number;
	onFrame: (chars: ScrambleCharState[]) => void;
	onComplete?: () => void;
};

/**
 * Left-to-right decode: each glyph cycles random chars (caller styles unlocked as accent),
 * then locks to its target. Spaces lock immediately when their turn arrives.
 * Returns a cancel function.
 */
export function runScrambleDecode(
	initial: ScrambleCharState[],
	options: ScrambleOptions
): () => void {
	const staggerMs = options.staggerMs ?? 55;
	const cycleMs = options.cycleMs ?? 100;
	const tickMs = options.tickMs ?? 28;
	const chars = initial.map((c) => ({ ...c }));

	let cancelled = false;
	let tickTimer: ReturnType<typeof setInterval> | undefined;
	const lockTimers: ReturnType<typeof setTimeout>[] = [];

	const revealable = chars
		.map((c, index) => ({ c, index }))
		.filter(({ c }) => !c.isSpace);

	// Spaces stay spaces from frame one
	for (const c of chars) {
		if (c.isSpace) {
			c.display = ' ';
			c.locked = true;
		}
	}
	options.onFrame(chars.map((c) => ({ ...c })));

	tickTimer = setInterval(() => {
		if (cancelled) return;
		let changed = false;
		for (const c of chars) {
			if (!c.locked && !c.isSpace) {
				c.display = randomScrambleChar();
				changed = true;
			}
		}
		if (changed) {
			options.onFrame(chars.map((c) => ({ ...c })));
		}
	}, tickMs);

	revealable.forEach(({ index }, order) => {
		const lockAt = order * staggerMs + cycleMs;
		const timer = setTimeout(() => {
			if (cancelled) return;
			chars[index].display = chars[index].target;
			chars[index].locked = true;
			options.onFrame(chars.map((c) => ({ ...c })));

			if (revealable.every(({ index: i }) => chars[i].locked)) {
				if (tickTimer) clearInterval(tickTimer);
				options.onComplete?.();
			}
		}, lockAt);
		lockTimers.push(timer);
	});

	if (revealable.length === 0) {
		if (tickTimer) clearInterval(tickTimer);
		options.onComplete?.();
	}

	return () => {
		cancelled = true;
		if (tickTimer) clearInterval(tickTimer);
		for (const t of lockTimers) clearTimeout(t);
	};
}

/** Snap every character to its final glyph (reduced motion / SSR fallback). */
export function settleScrambleState(chars: ScrambleCharState[]): ScrambleCharState[] {
	return chars.map((c) => ({
		...c,
		display: c.target,
		locked: true
	}));
}

export type HoverScrambleController = {
	enter: (index: number) => void;
	leave: () => void;
	destroy: () => void;
	readonly activeIndex: number | null;
};

/**
 * Per-glyph hover scramble: active letter cycles forever; leaving snaps it
 * back to the target instantly. Only one letter active at a time.
 */
export function createHoverScramble(
	getChars: () => ScrambleCharState[],
	setChars: (chars: ScrambleCharState[]) => void,
	tickMs = 48
): HoverScrambleController {
	let activeIndex: number | null = null;
	let timer: ReturnType<typeof setInterval> | undefined;

	function snapActive() {
		if (activeIndex === null) return;
		const chars = getChars();
		const current = chars[activeIndex];
		if (!current) return;
		chars[activeIndex] = { ...current, display: current.target };
		setChars(chars.map((c) => ({ ...c })));
		activeIndex = null;
	}

	function stopTimer() {
		if (timer) clearInterval(timer);
		timer = undefined;
	}

	return {
		get activeIndex() {
			return activeIndex;
		},
		enter(index: number) {
			const chars = getChars();
			const next = chars[index];
			if (!next || next.isSpace) return;
			if (activeIndex === index) return;

			stopTimer();
			snapActive();

			activeIndex = index;
			chars[index] = { ...next, display: randomScrambleChar() };
			setChars(chars.map((c) => ({ ...c })));

			timer = setInterval(() => {
				if (activeIndex === null) return;
				const latest = getChars();
				const glyph = latest[activeIndex];
				if (!glyph) return;
				latest[activeIndex] = { ...glyph, display: randomScrambleChar() };
				setChars(latest.map((c) => ({ ...c })));
			}, tickMs);
		},
		leave() {
			stopTimer();
			snapActive();
		},
		destroy() {
			stopTimer();
			snapActive();
		}
	};
}
