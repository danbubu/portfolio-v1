<script lang="ts">
	import { onMount } from 'svelte';

	type Star = {
		x: number;
		y: number;
		r: number;
		base: number;
		amp: number;
		phase: number;
		speed: number;
		tint: number; // 0 white → 1 pale azure
	};

	type Meteor = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		life: number;
		maxLife: number;
		len: number;
	};

	let canvasEl: HTMLCanvasElement;
	let reducedMotion = false;
	let ready = false;

	onMount(() => {
		if (typeof window === 'undefined' || !canvasEl) return;

		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const ctxMaybe = canvasEl.getContext('2d', { alpha: true });
		if (!ctxMaybe) return;
		const ctx: CanvasRenderingContext2D = ctxMaybe;

		ready = true;

		let width = 0;
		let height = 0;
		let dpr = 1;
		let stars: Star[] = [];
		let meteor: Meteor | null = null;
		let raf = 0;
		let last = performance.now();
		let nextMeteorAt = performance.now() + 8000 + Math.random() * 10000;
		let running = true;

		function starCountForViewport(w: number): number {
			if (w < 640) return 70;
			if (w < 1024) return 120;
			if (w < 1440) return 170;
			return 220;
		}

		function spawnStars() {
			const count = starCountForViewport(width);
			stars = Array.from({ length: count }, () => {
				const bright = Math.random() > 0.72;
				return {
					x: Math.random() * width,
					y: Math.random() * height,
					r: bright ? 1.1 + Math.random() * 1.1 : 0.45 + Math.random() * 0.7,
					base: bright ? 0.35 + Math.random() * 0.25 : 0.12 + Math.random() * 0.18,
					amp: bright ? 0.25 + Math.random() * 0.35 : 0.06 + Math.random() * 0.14,
					phase: Math.random() * Math.PI * 2,
					speed: bright ? 0.6 + Math.random() * 1.1 : 0.25 + Math.random() * 0.7,
					tint: Math.random()
				};
			});
		}

		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			dpr = Math.min(window.devicePixelRatio || 1, width < 640 ? 1.25 : 1.75);
			canvasEl.width = Math.max(1, Math.floor(width * dpr));
			canvasEl.height = Math.max(1, Math.floor(height * dpr));
			canvasEl.style.width = `${width}px`;
			canvasEl.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			spawnStars();
			if (reducedMotion) paintStatic();
		}

		function starColor(tint: number, alpha: number): string {
			// Mostly white → pale azure (stays on-brand, avoids purple haze)
			const r = Math.round(235 - tint * 40);
			const g = Math.round(242 - tint * 20);
			const b = Math.round(255);
			return `rgba(${r},${g},${b},${alpha})`;
		}

		function paintStatic() {
			ctx.clearRect(0, 0, width, height);
			for (const s of stars) {
				ctx.beginPath();
				ctx.fillStyle = starColor(s.tint, s.base + s.amp * 0.35);
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		function spawnMeteor() {
			const fromLeft = Math.random() > 0.5;
			meteor = {
				x: fromLeft ? -20 : width + 20,
				y: Math.random() * height * 0.45,
				vx: (fromLeft ? 1 : -1) * (420 + Math.random() * 220),
				vy: 180 + Math.random() * 160,
				life: 0,
				maxLife: 0.85 + Math.random() * 0.45,
				len: 55 + Math.random() * 45
			};
		}

		function tick(now: number) {
			if (!running) return;
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;

			ctx.clearRect(0, 0, width, height);

			for (const s of stars) {
				s.phase += dt * s.speed;
				const twinkle = 0.5 + 0.5 * Math.sin(s.phase);
				const alpha = Math.min(0.95, Math.max(0.04, s.base + s.amp * twinkle));

				ctx.beginPath();
				ctx.fillStyle = starColor(s.tint, alpha);
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();

				// Tiny bloom on brighter stars only
				if (s.r > 1.15 && alpha > 0.45) {
					ctx.beginPath();
					ctx.fillStyle = starColor(s.tint, alpha * 0.18);
					ctx.arc(s.x, s.y, s.r * 2.4, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			if (!meteor && now >= nextMeteorAt) {
				spawnMeteor();
			}

			if (meteor) {
				meteor.life += dt;
				meteor.x += meteor.vx * dt;
				meteor.y += meteor.vy * dt;
				const t = meteor.life / meteor.maxLife;
				const alpha = (1 - t) * 0.55;

				if (alpha > 0.02) {
					const tx = meteor.x - (meteor.vx / Math.hypot(meteor.vx, meteor.vy)) * meteor.len;
					const ty = meteor.y - (meteor.vy / Math.hypot(meteor.vx, meteor.vy)) * meteor.len;
					const grad = ctx.createLinearGradient(tx, ty, meteor.x, meteor.y);
					grad.addColorStop(0, 'rgba(186,230,253,0)');
					grad.addColorStop(1, `rgba(219,234,254,${alpha})`);
					ctx.strokeStyle = grad;
					ctx.lineWidth = 1.25;
					ctx.beginPath();
					ctx.moveTo(tx, ty);
					ctx.lineTo(meteor.x, meteor.y);
					ctx.stroke();

					ctx.beginPath();
					ctx.fillStyle = `rgba(255,255,255,${alpha})`;
					ctx.arc(meteor.x, meteor.y, 1.4, 0, Math.PI * 2);
					ctx.fill();
				}

				if (meteor.life >= meteor.maxLife) {
					meteor = null;
					nextMeteorAt = now + 12000 + Math.random() * 16000;
				}
			}

			raf = requestAnimationFrame(tick);
		}

		function onVisibility() {
			if (document.hidden) {
				running = false;
				cancelAnimationFrame(raf);
			} else if (!reducedMotion) {
				running = true;
				last = performance.now();
				raf = requestAnimationFrame(tick);
			}
		}

		resize();
		window.addEventListener('resize', resize);
		document.addEventListener('visibilitychange', onVisibility);

		if (!reducedMotion) {
			raf = requestAnimationFrame(tick);
		}

		return () => {
			running = false;
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<div
	class="starfield"
	data-testid="ambient-starfield"
	data-starfield-ready={ready}
	data-starfield-motion={reducedMotion ? 'static' : 'live'}
	aria-hidden="true"
>
	<!-- Soft azure nebula haze — atmosphere without competing with content -->
	<div class="starfield-nebula"></div>
	<canvas class="starfield-canvas" bind:this={canvasEl}></canvas>
</div>

<style>
	.starfield {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.starfield-nebula {
		position: absolute;
		inset: -10%;
		background:
			radial-gradient(ellipse 55% 40% at 20% 25%, rgba(37, 99, 235, 0.14), transparent 70%),
			radial-gradient(ellipse 45% 35% at 80% 70%, rgba(56, 189, 248, 0.08), transparent 65%),
			radial-gradient(ellipse 40% 30% at 60% 15%, rgba(96, 165, 250, 0.07), transparent 60%),
			radial-gradient(ellipse 70% 50% at 50% 100%, rgba(15, 23, 42, 0.55), transparent 70%);
		filter: blur(8px);
		opacity: 0.85;
	}

	.starfield-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 639px) {
		.starfield-nebula {
			opacity: 0.65;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.starfield-nebula {
			filter: blur(10px);
		}
	}
</style>
