<script lang="ts">
	import { marqueeTech, skillGroups } from '$lib/content/site';
</script>

<section id="skills" class="relative py-16">
	<div class="container mx-auto max-w-7xl px-6 md:px-8">
		<h2 class="mb-8 text-4xl font-bold tracking-tight text-text-heading md:text-5xl">Skills</h2>
		<div class="tech-marquee-container mb-8 overflow-hidden" aria-hidden="true">
			<div class="tech-marquee-left flex gap-3">
				{#each [0, 1] as copy}
					<ul class="flex gap-3">
						{#each marqueeTech as tech}
							<li class="tech-item flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
								{#if tech.icon}
									<img src={tech.icon} alt="" class="tech-icon h-4 w-4" width="16" height="16" />
								{/if}
								<span class="font-mono text-xs text-text-body">{tech.name}</span>
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each skillGroups as group}
				<div class="rounded-xl border border-white/10 bg-neutral-900/50 p-5">
					<h3 class="mb-3 text-lg font-semibold text-text-heading">{group.name}</h3>
					<ul class="flex flex-wrap gap-2">
						{#each group.items as item}
							<li class="pill-badge text-xs">{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
			<div class="rounded-xl border border-white/10 bg-neutral-900/50 p-5">
				<h3 class="mb-3 text-lg font-semibold text-text-heading">Also</h3>
				<p class="text-sm leading-relaxed text-text-body">
					Web3.js, from Airdrop Tracker. Learning Go for backend work. Not listed as a skill yet.
				</p>
			</div>
		</div>
	</div>
</section>
