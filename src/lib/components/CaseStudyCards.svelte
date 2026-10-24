<script lang="ts">
	import { caseStudies } from '$lib/content/case-studies';
	import TestReport from '$lib/components/TestReport.svelte';
</script>

<div class="mt-14">
	<h3 class="mb-6 text-2xl font-bold text-text-heading">Case studies</h3>
	<div class="grid gap-4 md:grid-cols-2">
		{#each caseStudies as study}
			<article class="flex flex-col rounded-xl border border-white/10 bg-neutral-900/50 p-5">
				<p class="font-mono text-[11px] uppercase tracking-wider text-azure">{study.status}</p>
				<h3 class="mt-2 text-xl font-bold text-text-heading">{study.title}</h3>
				<p class="mt-1 text-sm text-text-muted">{study.role}</p>
				<p class="mt-3 flex-1 text-sm leading-relaxed text-text-body">{study.summary}</p>
				{#if study.credit}
					<p class="mt-3 text-sm leading-relaxed text-text-body">{study.credit}</p>
				{/if}
				{#if study.report}
					<div class="mt-4">
						<TestReport label={study.report.label} ticks={study.report.ticks} notes={study.report.notes} />
					</div>
				{/if}
				<a
					href="/work/{study.slug}/"
					class="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-azure hover:underline focus:outline-none focus:ring-2 focus:ring-azure"
				>
					Read case study
				</a>
			</article>
		{/each}
	</div>
</div>
