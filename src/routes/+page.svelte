<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';
	import SelectedWork from '$lib/components/SelectedWork.svelte';
	import ExperienceTimeline from '$lib/components/ExperienceTimeline.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Certifications from '$lib/components/Certifications.svelte';
	import About from '$lib/components/About.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';

	let scrollProgress = 0;
	let showBackToTop = false;
	let reduceMotion = false;

	function handleScroll() {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
		showBackToTop = scrollTop > 400;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
	}

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div
	class="fixed left-0 right-0 top-0 z-50 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400"
	style="width: {scrollProgress}%"
	aria-hidden="true"
></div>

<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
	<div class="absolute left-1/4 top-1/4 h-[520px] w-[520px] rounded-full bg-azure/20 blur-3xl"></div>
</div>

<Hero />
<SelectedWork />
<ExperienceTimeline />
<Skills />
<Certifications />
<About />
<ContactForm />

{#if showBackToTop}
	<button
		type="button"
		on:click={scrollToTop}
		class="glass-button fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full"
		aria-label="Return to top"
	>
		<span aria-hidden="true">↑</span>
	</button>
{/if}
