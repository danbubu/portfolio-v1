<script lang="ts">
	import { certifications } from '$lib/stores/experience';
</script>

<section id="certifications" class="relative py-16">
	<div class="container mx-auto max-w-7xl px-6 md:px-8">
		<h2 class="mb-8 text-4xl font-bold tracking-tight text-text-heading md:text-5xl">
			Certifications
		</h2>
		<ul class="grid gap-4 sm:grid-cols-2">
			{#each certifications as cert}
				<li>
					<a
						href={cert.link}
						target="_blank"
						rel="noopener noreferrer"
						class="cert-shine-container flex items-center gap-4 rounded-xl border border-white/10 bg-neutral-900/50 p-4 transition-colors hover:bg-white/5"
					>
						<img
							src={cert.image}
							alt=""
							width="64"
							height="64"
							class="h-16 w-16 object-contain"
							loading="lazy"
						/>
						<span>
							<span class="block font-semibold text-text-heading">{cert.title}</span>
							<span class="block text-sm text-text-muted">{cert.issuer}</span>
							<span class="mt-1 block font-mono text-xs text-azure">{cert.date}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
