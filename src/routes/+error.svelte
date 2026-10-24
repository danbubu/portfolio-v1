<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex min-h-[70vh] items-center justify-center px-6 py-28">
	<div class="max-w-xl text-center">
		<p class="font-mono text-sm text-azure">{$page.status}</p>
		<h1 class="mt-3 text-4xl font-bold text-text-heading md:text-5xl">This page isn't on the site.</h1>
		<p class="mt-4 text-lg text-text-body">The link may be old, or the address was mistyped.</p>
		<a
			href="/"
			class="mt-8 inline-flex rounded-lg bg-azure px-6 py-3 font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure"
		>
			Go home
		</a>
	</div>
</section>
