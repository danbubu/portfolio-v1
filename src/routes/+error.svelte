<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Page not found · Daniel Mawuena</title>
	<meta name="description" content="That page is not on danielmawuena.me." />
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="flex min-h-screen items-center justify-center px-6 py-28">
	<div class="max-w-xl text-center">
		<p class="font-mono text-sm text-azure">{$page.status}</p>
		<h1 class="mt-3 text-4xl font-bold text-text-heading md:text-5xl">This page is not here</h1>
		<p class="mt-4 text-lg text-text-body">The link may be old, or the address may be mistyped.</p>
		<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
			<a
				href="/"
				class="inline-flex min-h-11 items-center justify-center rounded-lg bg-azure px-6 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-azure"
			>
				Back home
			</a>
			<a
				href="/#work"
				class="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-text-heading focus:outline-none focus:ring-2 focus:ring-azure"
			>
				See the work
			</a>
		</div>
	</div>
</section>
