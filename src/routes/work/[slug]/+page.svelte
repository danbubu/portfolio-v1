<script lang="ts">
	import TestReport from '$lib/components/TestReport.svelte';
	import type { CaseStudy } from '$lib/content/case-studies';

	export let data: { study: CaseStudy };

	$: study = data.study;

	$: linkedData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: study.title,
		description: study.summary,
		applicationCategory: 'WebApplication',
		author: {
			'@type': 'Person',
			name: 'Daniel Bubu Mawuena',
			url: 'https://danielmawuena.me'
		},
		...(study.links[0] ? { url: study.links[0].href } : {})
	};

	$: jsonLd = JSON.stringify(linkedData).replace(/</g, '\\u003c');
</script>

<svelte:head>
	<title>{study.title} · Daniel Mawuena</title>
	<meta name="description" content={study.summary} />
	<link rel="canonical" href="https://danielmawuena.me/work/{study.slug}/" />
	<meta property="og:title" content="{study.title} · Daniel Mawuena" />
	<meta property="og:description" content={study.summary} />
	<meta property="og:url" content="https://danielmawuena.me/work/{study.slug}/" />
	<meta property="og:image" content="https://danielmawuena.me/og.png" />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<article class="px-6 pb-24 pt-28 md:px-8">
	<div class="mx-auto max-w-3xl">
		<p class="mb-6 font-mono text-xs text-text-muted">
			<a href="/#work" class="text-azure hover:underline focus:outline-none focus:ring-2 focus:ring-azure">Selected work</a>
		</p>
		<p class="mb-3 font-mono text-xs uppercase tracking-wider text-azure">{study.status}</p>
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-text-heading md:text-5xl">{study.title}</h1>
		<p class="mb-8 text-lg leading-relaxed text-text-body">{study.summary}</p>

		{#if study.report}
			<div class="mb-8 rounded-lg border border-white/10 bg-neutral-900/50 px-4 py-3">
				<TestReport label={study.report.label} ticks={study.report.ticks} notes={study.report.notes} />
			</div>
		{/if}

		<dl class="mb-10 grid gap-4 text-sm sm:grid-cols-2">
			<div>
				<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Role</dt>
				<dd class="mt-1 text-text-heading">{study.role}</dd>
			</div>
			<div>
				<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Team</dt>
				<dd class="mt-1 text-text-heading">{study.team}</dd>
			</div>
			<div>
				<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Dates</dt>
				<dd class="mt-1 text-text-heading">{study.dates}</dd>
			</div>
			<div>
				<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Stack</dt>
				<dd class="mt-1 text-text-heading">{study.stack.join(', ')}</dd>
			</div>
		</dl>

		{#if study.links.length}
			<div class="mb-10 flex flex-wrap gap-3">
				{#each study.links as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex min-h-11 items-center rounded-lg bg-azure px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-azure"
					>
						{link.label}
					</a>
				{/each}
			</div>
		{/if}

		<section class="space-y-8">
			<div>
				<h2 class="mb-2 text-xl font-bold text-text-heading">The person it's for</h2>
				<p class="leading-relaxed text-text-body">{study.person}</p>
			</div>
			<div>
				<h2 class="mb-2 text-xl font-bold text-text-heading">What broke</h2>
				<p class="leading-relaxed text-text-body">{study.failure}</p>
			</div>
			<div>
				<h2 class="mb-2 text-xl font-bold text-text-heading">Decisions</h2>
				<ul class="space-y-2">
					{#each study.decisions as item}
						<li class="flex gap-2 text-text-body"><span class="text-azure">•</span><span>{item}</span></li>
					{/each}
				</ul>
			</div>
			<div>
				<h2 class="mb-2 text-xl font-bold text-text-heading">Proof</h2>
				<ul class="space-y-2">
					{#each study.proof as item}
						<li class="flex gap-2 text-text-body"><span class="text-azure">•</span><span>{item}</span></li>
					{/each}
				</ul>
			</div>
			{#if study.credit}
				<div>
					<h2 class="mb-2 text-xl font-bold text-text-heading">Credit</h2>
					<p class="leading-relaxed text-text-body">{study.credit}</p>
				</div>
			{/if}
			<div>
				<h2 class="mb-2 text-xl font-bold text-text-heading">Honest limits</h2>
				<ul class="space-y-2">
					{#each study.limits as item}
						<li class="flex gap-2 text-text-body"><span class="text-azure">•</span><span>{item}</span></li>
					{/each}
				</ul>
			</div>
			<div>
				<h2 class="mb-2 text-xl font-bold text-text-heading">What's next</h2>
				<p class="leading-relaxed text-text-body">{study.next}</p>
			</div>
		</section>
	</div>
</article>
