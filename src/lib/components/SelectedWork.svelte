<script lang="ts">
	import { alsoBuilt, featuredStudies } from '$lib/content/work';

	const studies = featuredStudies();
</script>

<section id="work" class="relative py-20">
	<div class="container mx-auto max-w-7xl px-6 md:px-8">
		<div class="mb-10 max-w-2xl">
			<h2 class="text-4xl font-bold tracking-tight text-text-heading md:text-5xl">Selected work</h2>
			<p class="mt-3 text-text-body">
				Four builds, each with the failure named first. The longer notes are on their own pages.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			{#each studies as study}
				<article
					class="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50"
					data-testid="work-card"
					data-project={study.title}
				>
					{#if study.preview}
						<img
							src={study.preview.src}
							alt={study.preview.alt}
							width={study.preview.width}
							height={study.preview.height}
							class="h-44 w-full object-cover object-top"
							loading="lazy"
							decoding="async"
						/>
					{:else}
						<div
							class="flex h-32 items-end bg-gradient-to-br from-blue-950/80 to-neutral-900 px-5 py-4 font-mono text-xs text-text-muted"
						>
							No public screenshots yet
						</div>
					{/if}
					<div class="flex flex-1 flex-col p-5">
						<div class="mb-3 flex flex-wrap items-center gap-2">
							<span class="pill-badge text-[11px] text-text-heading">{study.status}</span>
							<span class="font-mono text-[11px] text-text-muted">{study.role}</span>
						</div>
						<h3 class="text-2xl font-bold text-text-heading">{study.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-text-body">{study.summary}</p>
						{#if study.credit}
							<p class="mt-3 text-sm leading-relaxed text-text-body">{study.credit}</p>
						{/if}
						<p class="mt-3 font-mono text-xs leading-relaxed text-text-heading">{study.proof}</p>
						{#if study.report}
							<p class="test-report mt-3" data-testid="test-report">
								<span aria-hidden="true">✓</span>
								{study.report.text}
								<span class="mt-1 block text-text-muted">{study.report.detail}</span>
							</p>
						{/if}
						<ul class="mt-3 flex flex-wrap gap-1.5">
							{#each study.stack.slice(0, 5) as chip}
								<li
									class="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-text-muted"
								>
									{chip}
								</li>
							{/each}
						</ul>
						<div class="mt-4 flex flex-wrap gap-4 text-sm">
							{#each study.links as link}
								<a
									href={link.href}
									class="font-mono text-azure hover:underline"
									{...(link.href.startsWith('http')
										? { target: '_blank', rel: 'noopener noreferrer' }
										: {})}
								>
									{link.label}
								</a>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="mt-12">
			<h3 class="mb-4 text-xl font-bold text-text-heading">Also built</h3>
			<ul class="grid gap-4 md:grid-cols-2">
				{#each alsoBuilt as item}
					<li class="rounded-xl border border-white/10 bg-white/[0.03] p-4" data-testid="also-built">
						<div class="mb-1 flex flex-wrap items-baseline justify-between gap-2">
							<p class="text-lg font-semibold text-text-heading">{item.title}</p>
							<span class="font-mono text-[11px] text-text-muted">{item.status}</span>
						</div>
						<p class="font-mono text-[11px] text-azure">{item.role}</p>
						<p class="mt-2 text-sm leading-relaxed text-text-body">{item.summary}</p>
						{#if item.metric}
							<p class="mt-2 font-mono text-xs text-text-heading">{item.metric}</p>
						{/if}
						{#if item.links}
							<div class="mt-3 flex flex-wrap gap-3 text-sm">
								{#each item.links as link}
									<a
										href={link.href}
										class="font-mono text-azure hover:underline"
										target="_blank"
										rel="noopener noreferrer">{link.label}</a
									>
								{/each}
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

