<script lang="ts">
	import { onMount } from 'svelte';

	type TechBadge = {
		name: string;
		color: string;
		phase: number;
	};

	const badges: TechBadge[] = [
		{ name: 'React', color: '#61DAFB', phase: 0 },
		{ name: 'AWS', color: '#FF9900', phase: 0.25 },
		{ name: 'Tailwind', color: '#38BDF8', phase: 0.5 },
		{ name: 'Firebase', color: '#FFCA28', phase: 0.75 }
	];

	const ORBIT_PERIOD_S = 34;
	const RING_BUILD_S = 22;

	let stageEl: HTMLDivElement;
	let planetEl: HTMLDivElement;
	let canvasEl: HTMLCanvasElement;
	let ringEl: SVGSVGElement;
	let ringA: SVGEllipseElement;
	let ringB: SVGEllipseElement;
	let ringC: SVGEllipseElement;
	let badgeEls: (HTMLButtonElement | undefined)[] = [];
	let reducedMotion = false;
	let orbitReady = false;
	let canHoverPause = false;
	let paused = badges.map(() => false);

	const angles = badges.map((b) => b.phase * Math.PI * 2);

	function registerBadge(node: HTMLButtonElement, index: number) {
		badgeEls[index] = node;
		return {
			destroy() {
				if (badgeEls[index] === node) badgeEls[index] = undefined;
			}
		};
	}

	const staticSlots = [
		'top-[10%] left-[5%] lg:top-8 lg:-left-6',
		'top-[15%] right-[5%] lg:top-1/4 lg:-right-6',
		'bottom-[20%] left-[5%] lg:top-1/3 lg:-left-6',
		'bottom-[25%] right-[5%] lg:bottom-1/4 lg:-right-6'
	];

	function setPaused(index: number, value: boolean) {
		paused[index] = value;
		paused = paused;
	}

	function togglePause(index: number) {
		// Tap-to-pause on touch; hover handles fine pointers.
		if (canHoverPause) return;
		setPaused(index, !paused[index]);
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		canHoverPause = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		if (reducedMotion) return;

		const canvasCtx = canvasEl?.getContext('2d', { alpha: true });
		if (!canvasCtx || !stageEl || !planetEl) return;
		const ctx: CanvasRenderingContext2D = canvasCtx;

		orbitReady = true;
		let raf = 0;
		let last = performance.now();
		let width = 0;
		let height = 0;
		let cx = 0;
		let cy = 0;
		let rx = 0;
		let ry = 0;
		let trailRadius = 2;
		let trailAlpha = 0.28;
		let trailBlur = 10;
		let fadeStrength = 0.028;
		const started = performance.now();
		let lastRingPaint = 0;

		function measure() {
			const stageRect = stageEl.getBoundingClientRect();
			const planetRect = planetEl.getBoundingClientRect();
			const viewport = window.innerWidth;

			// Radius from the *rendered* photo (accounts for lg:scale-[1.4]).
			const planetMin = Math.min(planetRect.width, planetRect.height);
			let radiusScale = 0.48;
			if (viewport >= 1440) radiusScale = 0.52;
			else if (viewport >= 1024) radiusScale = 0.5;
			else if (viewport < 640) radiusScale = 0.46;

			rx = planetMin * radiusScale;
			ry = rx * 0.4;

			// Desktop needs denser/brighter trails so the ring still reads against a large photo.
			if (viewport >= 1280) {
				trailRadius = 3.2;
				trailAlpha = 0.42;
				trailBlur = 16;
				fadeStrength = 0.018;
			} else if (viewport >= 1024) {
				trailRadius = 2.6;
				trailAlpha = 0.36;
				trailBlur = 13;
				fadeStrength = 0.022;
			} else if (viewport >= 768) {
				trailRadius = 2.2;
				trailAlpha = 0.32;
				trailBlur = 11;
				fadeStrength = 0.025;
			} else {
				trailRadius = 1.8;
				trailAlpha = 0.3;
				trailBlur = 8;
				fadeStrength = 0.03;
			}

			// Pad so the full ellipse + badge pills + glow aren't clipped at hard edges.
			const edgePad = viewport >= 1280 ? 120 : viewport >= 1024 ? 100 : viewport >= 768 ? 72 : 56;

			const planetCenterX = planetRect.left - stageRect.left + planetRect.width / 2;
			const planetCenterY = planetRect.top - stageRect.top + planetRect.height * 0.5;

			width = Math.max(stageRect.width, planetRect.width + edgePad * 2, rx * 2 + edgePad * 2);
			height = Math.max(stageRect.height, planetRect.height + edgePad, ry * 2 + edgePad * 2);

			const canvasOriginX = (stageRect.width - width) / 2;
			const canvasOriginY = (stageRect.height - height) / 2;

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvasEl.width = Math.max(1, Math.floor(width * dpr));
			canvasEl.height = Math.max(1, Math.floor(height * dpr));
			canvasEl.style.width = `${width}px`;
			canvasEl.style.height = `${height}px`;
			canvasEl.style.left = `${canvasOriginX}px`;
			canvasEl.style.top = `${canvasOriginY}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			cx = planetCenterX - canvasOriginX;
			cy = planetCenterY - canvasOriginY - planetRect.height * 0.02;

			// SVG shares the same expanded paint box as the canvas (fixes desktop side-clip).
			if (ringEl) {
				ringEl.style.width = `${width}px`;
				ringEl.style.height = `${height}px`;
				ringEl.style.left = `${canvasOriginX}px`;
				ringEl.style.top = `${canvasOriginY}px`;
			}

			if (ringA && ringB && ringC) {
				const svgCx = (cx / width) * 100;
				const svgCy = (cy / height) * 100;
				const svgRx = (rx / width) * 100;
				const svgRy = (ry / height) * 100;
				const strokeBoost = viewport >= 1280 ? 1.55 : viewport >= 1024 ? 1.35 : 1;

				ringA.setAttribute('cx', String(svgCx));
				ringA.setAttribute('cy', String(svgCy));
				ringA.setAttribute('rx', String(svgRx));
				ringA.setAttribute('ry', String(svgRy));
				ringA.setAttribute('stroke-width', String(0.45 * strokeBoost));

				ringB.setAttribute('cx', String(svgCx));
				ringB.setAttribute('cy', String(svgCy));
				ringB.setAttribute('rx', String(svgRx + 1.5));
				ringB.setAttribute('ry', String(svgRy + 0.7));
				ringB.setAttribute('stroke-width', String(0.32 * strokeBoost));

				ringC.setAttribute('cx', String(svgCx));
				ringC.setAttribute('cy', String(svgCy));
				ringC.setAttribute('rx', String(Math.max(1, svgRx - 1.5)));
				ringC.setAttribute('ry', String(Math.max(1, svgRy - 0.7)));
				ringC.setAttribute('stroke-width', String(0.28 * strokeBoost));
			}
		}

		function drawTrailPoint(x: number, y: number, color: string, depth: number) {
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.globalAlpha = trailAlpha + Math.max(0, depth) * 0.18;
			ctx.shadowBlur = trailBlur;
			ctx.shadowColor = color;
			ctx.arc(x, y, trailRadius, 0, Math.PI * 2);
			ctx.fill();

			// Soft outer bloom for the “electric ring” read
			ctx.beginPath();
			ctx.globalAlpha = (trailAlpha + Math.max(0, depth) * 0.12) * 0.35;
			ctx.shadowBlur = trailBlur * 1.6;
			ctx.arc(x, y, trailRadius * 1.8, 0, Math.PI * 2);
			ctx.fill();

			ctx.globalAlpha = 1;
			ctx.shadowBlur = 0;
		}

		function tick(now: number) {
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;

			const omega = (Math.PI * 2) / ORBIT_PERIOD_S;
			const stageRect = stageEl.getBoundingClientRect();
			const canvasOriginX = (stageRect.width - width) / 2;
			const canvasOriginY = (stageRect.height - height) / 2;

			if (now - lastRingPaint > 120 && ringEl) {
				const buildT = Math.min(1, (now - started) / (RING_BUILD_S * 1000));
				const base = window.innerWidth >= 1280 ? 0.28 : 0.18;
				const ringOpacity = base + buildT * (window.innerWidth >= 1280 ? 0.55 : 0.48);
				ringEl.style.setProperty('--ring-opacity', String(ringOpacity));
				lastRingPaint = now;
			}

			ctx.globalCompositeOperation = 'destination-out';
			ctx.fillStyle = `rgba(0,0,0,${fadeStrength})`;
			ctx.fillRect(0, 0, width, height);
			ctx.globalCompositeOperation = 'lighter';

			for (let i = 0; i < badges.length; i++) {
				if (!paused[i]) {
					angles[i] = (angles[i] + omega * dt) % (Math.PI * 2);
				}

				const angle = angles[i];
				const x = cx + rx * Math.cos(angle);
				const y = cy + ry * Math.sin(angle);
				const depth = Math.sin(angle);
				const inFront = depth >= 0;
				const el = badgeEls[i];

				if (el) {
					// Position in stage percentage space (canvas may be larger / offset)
					const stageX = x + canvasOriginX;
					const stageY = y + canvasOriginY;
					el.style.left = `${(stageX / stageRect.width) * 100}%`;
					el.style.top = `${(stageY / stageRect.height) * 100}%`;
					el.style.zIndex = String(
						inFront ? 30 + Math.round(depth * 8) : 5 + Math.round((depth + 1) * 3)
					);
					el.style.opacity = String(0.62 + Math.max(0, depth) * 0.38);
					el.style.transform = `translate(-50%, -50%) scale(${0.9 + Math.max(0, depth) * 0.14})`;
					el.classList.toggle('is-front', inFront);
					el.classList.toggle('is-back', !inFront);
				}

				drawTrailPoint(x, y, badges[i].color, depth);
			}

			raf = requestAnimationFrame(tick);
		}

		measure();
		const ro = new ResizeObserver(() => measure());
		ro.observe(stageEl);
		ro.observe(planetEl);
		window.addEventListener('resize', measure);
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			window.removeEventListener('resize', measure);
		};
	});
</script>

{#if reducedMotion}
	<div class="relative w-full">
		<slot />
		{#each badges as badge, i}
			<div
				class="absolute floating-badge scale-75 lg:scale-100 {staticSlots[i]}"
				data-testid="orbit-badge"
				data-orbit-mode="static"
			>
				<div class="hero-badge-glass px-4 py-3 rounded-lg flex items-center gap-2">
					<div class="w-2 h-2 rounded-full" style="background:{badge.color}"></div>
					<span class="text-text-heading font-mono text-sm font-semibold">{badge.name}</span>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="orbit-stage relative w-full"
		bind:this={stageEl}
		data-testid="tech-orbit"
		data-orbit-ready={orbitReady}
	>
		<svg
			class="orbit-ring-svg"
			bind:this={ringEl}
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			aria-hidden="true"
			style="--ring-opacity: 0.22"
		>
			<defs>
				<filter id="orbit-ring-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="1.6" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
			<ellipse
				bind:this={ringA}
				class="ring-a"
				cx="50"
				cy="50"
				rx="42"
				ry="16"
				fill="none"
				stroke="rgba(96,165,250,0.55)"
				stroke-width="0.45"
				filter="url(#orbit-ring-glow)"
			/>
			<ellipse
				bind:this={ringB}
				class="ring-b"
				cx="50"
				cy="50"
				rx="44"
				ry="16.8"
				fill="none"
				stroke="rgba(251,191,36,0.35)"
				stroke-width="0.32"
			/>
			<ellipse
				bind:this={ringC}
				class="ring-c"
				cx="50"
				cy="50"
				rx="40"
				ry="15.2"
				fill="none"
				stroke="rgba(56,189,248,0.45)"
				stroke-width="0.28"
			/>
		</svg>

		<canvas class="orbit-trail-canvas" bind:this={canvasEl} aria-hidden="true"></canvas>

		<div class="orbit-planet" bind:this={planetEl}>
			<slot />
		</div>

		{#each badges as badge, i}
			<button
				type="button"
				class="orbit-badge"
				class:is-paused={paused[i]}
				use:registerBadge={i}
				data-testid="orbit-badge"
				data-tech={badge.name}
				style="--badge-glow: {badge.color}; left: {50 + 42 * Math.cos(angles[i])}%; top: {48 + 16 * Math.sin(angles[i])}%;"
				on:mouseenter={() => canHoverPause && setPaused(i, true)}
				on:mouseleave={() => canHoverPause && setPaused(i, false)}
				on:focus={() => setPaused(i, true)}
				on:blur={() => setPaused(i, false)}
				on:click={() => togglePause(i)}
				aria-label="{badge.name} tech badge"
			>
				<span class="orbit-badge-core hero-badge-glass">
					<span class="orbit-badge-dot" style="background:{badge.color}"></span>
					<span class="orbit-badge-label">{badge.name}</span>
				</span>
			</button>
		{/each}
	</div>
{/if}

<style>
	.orbit-stage {
		overflow: visible;
	}

	.orbit-ring-svg,
	.orbit-trail-canvas {
		position: absolute;
		pointer-events: none;
		z-index: 8;
		overflow: visible;
	}

	.orbit-ring-svg .ring-a {
		opacity: calc(var(--ring-opacity) * 0.7);
	}
	.orbit-ring-svg .ring-b {
		opacity: calc(var(--ring-opacity) * 0.5);
	}
	.orbit-ring-svg .ring-c {
		opacity: calc(var(--ring-opacity) * 0.6);
	}

	.orbit-planet {
		position: relative;
		z-index: 20;
		pointer-events: none;
	}

	.orbit-badge {
		position: absolute;
		pointer-events: auto;
		border: 0;
		padding: 0;
		background: transparent;
		cursor: default;
		will-change: transform, opacity, left, top;
		transform: translate(-50%, -50%);
		z-index: 30;
	}

	.orbit-badge.is-back {
		filter: brightness(0.78) saturate(0.85);
	}

	.orbit-badge.is-paused .orbit-badge-core {
		background: rgba(255, 255, 255, 0.12);
		box-shadow:
			0 0 18px color-mix(in srgb, var(--badge-glow) 45%, transparent),
			0 8px 28px rgba(0, 0, 0, 0.45);
	}

	.orbit-badge-core {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.8rem;
		border-radius: 0.6rem;
		transform: translateZ(0);
	}

	.orbit-badge-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 9999px;
		flex-shrink: 0;
		box-shadow: 0 0 10px var(--badge-glow);
	}

	.orbit-badge-label {
		color: #ededed;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		white-space: nowrap;
	}

	:global(.hero-badge-glass) {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
	}

	/* Compact pills on narrow viewports — labels stay visible (touch has no hover). */
	@media (max-width: 639px) {
		.orbit-badge-core {
			padding: 0.4rem 0.65rem;
			gap: 0.35rem;
		}

		.orbit-badge-label {
			font-size: 0.65rem;
		}

		.orbit-badge-dot {
			width: 0.4rem;
			height: 0.4rem;
		}
	}
</style>
