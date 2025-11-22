<script lang="ts">
	import { onMount } from 'svelte';

	let visible = false;

	function handleScroll() {
		if (typeof window === 'undefined') return;
		visible = window.scrollY > 300;
	}

	function scrollToTop() {
		if (typeof window === 'undefined') return;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	onMount(() => {
		if (typeof window === 'undefined') return;
		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if visible}
	<button
		on:click={scrollToTop}
		class="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full shadow-lg hover:glow-effect transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-dark-950"
		aria-label="Scroll to top"
	>
		<svg
			class="w-6 h-6 text-white"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 10l7-7m0 0l7 7m-7-7v18"
			></path>
		</svg>
	</button>
{/if}

