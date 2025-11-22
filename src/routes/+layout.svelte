<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Initialize GSAP plugins (client-side only)
	let gsap: any;
	let ScrollTrigger: any;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			// Force dark mode - remove light class and set dark
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');

			// Dynamically import GSAP only on client-side
			const gsapModule = await import('gsap');
			const scrollTriggerModule = await import('gsap/ScrollTrigger');
			gsap = gsapModule.gsap;
			ScrollTrigger = scrollTriggerModule.ScrollTrigger;
			gsap.registerPlugin(ScrollTrigger);
		}
	});

	// Cursor follower effect
	let particles: Array<{ id: number; x: number; y: number; opacity: number }> = [];
	let particleId = 0;

	onMount(() => {
		if (typeof window === 'undefined') return;
		
		// Create cursor follower particles
		const handleMouseMove = (e: MouseEvent) => {
			// Add new particle
			const particle = {
				id: particleId++,
				x: e.clientX,
				y: e.clientY,
				opacity: 1
			};

			particles = [...particles, particle];

			// Remove particle after animation
			setTimeout(() => {
				particles = particles.filter((p) => p.id !== particle.id);
			}, 1000);

			// Limit particles
			if (particles.length > 20) {
				particles = particles.slice(-20);
			}
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	// Fluid page transitions (removed for SSR compatibility)
	// Page transitions will be handled by SvelteKit's built-in transitions
</script>

<svelte:head>
	<title>Daniel Mawuena | Full Stack Architect</title>
	<meta name="description" content="Full Stack Developer & Architect building scalable applications with React, TypeScript, Node.js, and modern cloud technologies." />
</svelte:head>

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

