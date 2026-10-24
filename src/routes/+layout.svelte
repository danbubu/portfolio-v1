<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AmbientStarfield from '$lib/components/AmbientStarfield.svelte';
	import { defaultMeta, notFoundMeta, type PageMeta } from '$lib/content/site';
	import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';

	let particles: Array<{ id: number; x: number; y: number }> = [];
	let particleId = 0;

	$: meta =
		($page.data.meta as PageMeta | undefined) ??
		($page.status === 404 ? notFoundMeta : defaultMeta);
	$: jsonLd = meta.jsonLd ? JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c') : '';

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		if (reduce || !fine) return;

		let last = 0;
		const handleMouseMove = (event: MouseEvent) => {
			const now = performance.now();
			if (now - last < 80) return;
			last = now;
			const particle = { id: particleId++, x: event.clientX, y: event.clientY };
			particles = [...particles, particle].slice(-8);
			setTimeout(() => {
				particles = particles.filter((item) => item.id !== particle.id);
			}, 700);
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<svelte:head>
	<link rel="preload" as="font" type="font/woff2" href={interLatin} crossorigin="anonymous" />
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.canonical} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.ogDescription ?? meta.description} />
	<meta property="og:url" content={meta.canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={meta.imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.ogDescription ?? meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta name="twitter:site" content="@thatbubuguy" />
	{#if jsonLd}
		{@html `<script type="application/ld+json">${jsonLd}</script>`}
	{/if}
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-azure focus:px-4 focus:py-2 focus:text-white focus:outline-none"
>
	Skip to main content
</a>

<div class="relative min-h-screen bg-obsidian-base">
	<div class="noise-overlay" aria-hidden="true"></div>
	<AmbientStarfield />
	<div class="aurora-bg" aria-hidden="true"></div>
	<Navigation />
	{#each particles as particle (particle.id)}
		<div class="cursor-particle" style="left: {particle.x}px; top: {particle.y}px;"></div>
	{/each}
	<main id="main-content" class="relative z-10">
		<slot />
	</main>
	<Footer />
</div>
