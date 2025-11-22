<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	function goHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>404 - Page Not Found</title>
	<meta name="description" content="The page you're looking for doesn't exist." />
</svelte:head>

<section class="min-h-screen flex items-center justify-center bg-dark-950 py-24 px-4">
	<div class="text-center max-w-2xl mx-auto">
		<div class="reveal mb-8">
			<h1
				class="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent mb-4"
			>
				404
			</h1>
			<h2 class="text-4xl md:text-5xl font-bold text-dark-200 mb-6">Page Not Found</h2>
			<p class="text-xl text-dark-400 mb-8">
				The page you're looking for doesn't exist or has been moved.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<button
				on:click={goHome}
				class="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-semibold hover:glow-effect transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-blue"
				aria-label="Go to homepage"
			>
				Go Home
			</button>
			<button
				on:click={() => window.history.back()}
				class="px-8 py-4 border-2 border-accent-blue rounded-lg font-semibold hover:bg-dark-800 transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue"
				aria-label="Go back"
			>
				Go Back
			</button>
		</div>

		<!-- Animated geometric shapes -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="geometric-shape absolute top-20 left-10 w-64 h-64 border-2 border-accent-blue opacity-10 transform rotate-45"
			></div>
			<div
				class="geometric-shape absolute bottom-20 right-10 w-96 h-96 border-2 border-accent-purple opacity-10 transform -rotate-12"
			></div>
		</div>
	</div>
</section>

<style>
	.geometric-shape {
		transition: transform 0.3s ease;
	}
</style>

