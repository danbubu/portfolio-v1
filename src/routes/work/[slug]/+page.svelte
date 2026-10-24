<script lang="ts">
	export let data;

	$: study = data.study;
	$: sections = [
		{ title: 'The person it is for', body: [study.forWhom] },
		{ title: 'What broke', body: [study.whatBroke] },
		{ title: 'Decisions', body: study.decisions },
		{ title: 'Proof', body: study.proofPoints },
		{ title: 'Honest limits', body: study.limits },
		{ title: "What's next", body: [study.next] }
	];
</script>

<article class="mx-auto max-w-3xl px-6 pb-24 pt-28">
	<p class="mb-6">
		<a href="/#work" class="font-mono text-sm text-azure hover:underline">← Selected work</a>
	</p>
	<p class="font-mono text-xs uppercase tracking-wider text-text-muted">{study.status}</p>
	<h1 class="mt-2 text-4xl font-bold tracking-tight text-text-heading md:text-5xl">{study.title}</h1>
	<p class="mt-4 text-lg leading-relaxed text-text-body">{study.summary}</p>
	{#if study.credit}
		<p class="mt-4 text-text-body">{study.credit}</p>
	{/if}

	<dl class="mt-8 grid gap-4 text-sm sm:grid-cols-2">
		<div>
			<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Role</dt>
			<dd class="text-text-heading">{study.role}</dd>
		</div>
		<div>
			<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Team</dt>
			<dd class="text-text-heading">{study.team}</dd>
		</div>
		<div>
			<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Dates</dt>
			<dd class="text-text-heading">{study.dates}</dd>
		</div>
		<div>
			<dt class="font-mono text-[11px] uppercase tracking-wider text-text-muted">Stack</dt>
			<dd class="text-text-heading">{study.stack.join(', ')}</dd>
		</div>
	</dl>

	{#if study.report}
		<p class="test-report mt-6">
			<span aria-hidden="true">✓</span>
			{study.report.text}
			<span class="mt-1 block text-text-muted">{study.report.detail}</span>
		</p>
	{/if}

	{#if study.preview}
		<img
			src={study.preview.src}
			alt={study.preview.alt}
			width={study.preview.width}
			height={study.preview.height}
			class="mt-8 w-full rounded-xl border border-white/10"
			loading="lazy"
		/>
	{/if}

	<ol class="mt-10 space-y-8">
		{#each sections as section, index}
			<li>
				<h2 class="text-xl font-bold text-text-heading">
					{index + 1}. {section.title}
				</h2>
				<ul class="mt-2 space-y-2">
					{#each section.body as paragraph}
						<li class="leading-relaxed text-text-body">{paragraph}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ol>

	{#if study.closing}
		<p class="mt-10 text-lg text-text-heading">{study.closing}</p>
	{/if}

	{#if study.links.length}
		<div class="mt-8 flex flex-wrap gap-4">
			{#each study.links as link}
				{#if link.href.startsWith('http')}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-lg bg-azure px-5 py-3 text-sm font-semibold text-white">{link.label}</a
					>
				{/if}
			{/each}
		</div>
	{/if}
</article>
