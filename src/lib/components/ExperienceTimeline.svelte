<script lang="ts">
	import { experiences } from '$lib/stores/experience';
</script>

<section id="experience" class="relative py-20">
	<div class="container mx-auto max-w-4xl px-6 md:px-8">
		<h2 class="mb-12 text-center text-4xl font-bold tracking-tight text-text-heading md:text-5xl">
			Experience
		</h2>
		<div class="relative">
			<div
				class="absolute bottom-0 left-0 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-60 md:left-[15%]"
				aria-hidden="true"
			></div>
			<div class="space-y-10 pl-10 md:pl-[22%]">
				{#each experiences as experience (experience.id)}
					{@const isLead = experience.position.includes('Lead')}
					<article class="experience-item group relative">
						<div
							class="absolute left-0 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-blue-500 bg-obsidian-base md:left-[-18%] {isLead
								? 'border-amber-500'
								: ''}"
							aria-hidden="true"
						></div>
						<div
							class="glass-card spotlight-border rounded-xl p-6 {isLead
								? 'leadership-circuit-card'
								: ''}"
						>
							<p class="mb-2 font-mono text-xs tracking-wider text-text-muted">
								{experience.startDate}{experience.endDate
									? ` to ${experience.endDate}`
									: ' to Present'}
							</p>
							<h3 class="mb-1 text-xl font-bold text-text-heading">{experience.position}</h3>
							<p class="font-medium text-azure">{experience.company}</p>
							<p class="mb-4 text-sm text-text-muted">{experience.location}</p>
							<ul class="space-y-2">
								{#each experience.description as item}
									<li class="flex items-start text-sm text-text-body">
										<span class="mr-2 text-azure" aria-hidden="true">•</span>
										<span>{item}</span>
									</li>
								{/each}
							</ul>
							<ul class="mt-4 flex flex-wrap gap-2">
								{#each experience.technologies as tech}
									<li class="pill-badge text-xs {isLead ? 'leadership-badge-circuit' : ''}">
										{tech}
									</li>
								{/each}
							</ul>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
