<script lang="ts">
	import "../app.css";
	import "@fontsource-variable/inter";
	import "@fontsource/jetbrains-mono/400.css";
	import "@fontsource/jetbrains-mono/500.css";
	import { onMount } from "svelte";
	import Navigation from "$lib/components/Navigation.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import AmbientStarfield from "$lib/components/AmbientStarfield.svelte";

	// Suppress unknown prop warning
	export let params: any = {};

	let particles: Array<{
		id: number;
		x: number;
		y: number;
		opacity: number;
	}> = [];
	let particleId = 0;

	onMount(() => {
		if (typeof window === "undefined") return;

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		if (reduceMotion || !finePointer) return;

		let last = 0;
		const handleMouseMove = (e: MouseEvent) => {
			const now = performance.now();
			if (now - last < 80) return;
			last = now;

			const particle = {
				id: particleId++,
				x: e.clientX,
				y: e.clientY,
				opacity: 1,
			};

			particles = [...particles, particle].slice(-8);

			setTimeout(() => {
				particles = particles.filter((p) => p.id !== particle.id);
			}, 700);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	});
</script>

<!-- Skip to main content link for accessibility -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
>
	Skip to main content
</a>

<div class="min-h-screen bg-obsidian-base relative">
	<!-- Global Noise Texture Overlay -->
	<div class="noise-overlay"></div>

	<!-- Ambient galaxy starfield (behind all content) -->
	<AmbientStarfield />

	<!-- Aurora Background -->
	<div class="aurora-bg"></div>

	<!-- Navigation -->
	<Navigation />

	<!-- Cursor particles -->
	{#each particles as particle (particle.id)}
		<div
			class="cursor-particle"
			style="left: {particle.x}px; top: {particle.y}px; opacity: {particle.opacity};"
		></div>
	{/each}

	<!-- Main content -->
	<main id="main-content" class="page-content relative z-10">
		<slot />
	</main>

	<!-- Footer -->
	<Footer />
</div>

<style>
	.page-content {
		opacity: 1;
	}
</style>
