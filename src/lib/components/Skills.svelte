<script lang="ts">
	import { skillGroups } from '$lib/content/skills';
</script>

<section id="skills" class="px-6 py-16 md:px-8">
	<div class="mx-auto max-w-7xl">
		<h2 class="mb-8 text-4xl font-bold tracking-tight text-text-heading md:text-5xl">Skills</h2>
		<div class="grid gap-4 md:grid-cols-2">
			{#each skillGroups as group}
				<div class="rounded-xl border border-white/10 bg-neutral-900/50 p-5">
					<h3 class="mb-3 text-lg font-semibold text-text-heading">{group.label}</h3>
					<ul class="flex flex-wrap gap-2">
						{#each group.items as item}
							<li class="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-text-body">{item}</li>
						{/each}
					</ul>
					{#if group.note}
						<p class="mt-3 font-mono text-xs text-text-muted">{group.note}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
