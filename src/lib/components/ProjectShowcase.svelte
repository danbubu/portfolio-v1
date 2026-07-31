<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		activeProjectIndex,
		projectPreviews,
		projects,
		techChips,
		type Project
	} from '$lib/stores/projects';

	export let mode: 'builder' | 'thinker' = 'builder';

	const ROTATE_MS = 6500;

	let list: Project[] = [];
	let index = 0;
	let paused = false;
	let reduceMotion = false;
	let timer: ReturnType<typeof setInterval> | undefined;
	let descExpanded = false;
	/** Mobile-only index when a project has 2 previews */
	let mobilePreviewIndex = 0;

	const unsubProjects = projects.subscribe((value) => {
		list = value;
		if (index >= list.length) {
			index = 0;
			activeProjectIndex.set(0);
		}
	});

	const unsubIndex = activeProjectIndex.subscribe((value) => {
		index = value;
		descExpanded = false;
		mobilePreviewIndex = 0;
	});

	$: current = list[index] ?? list[0];
	$: chips = current ? techChips(current).slice(0, 4) : [];
	$: previews = current ? projectPreviews(current) : [];
	$: hasDual = previews.length >= 2;
	$: mobilePreview = previews[Math.min(mobilePreviewIndex, Math.max(previews.length - 1, 0))];

	function goTo(next: number) {
		if (!list.length) return;
		const wrapped = ((next % list.length) + list.length) % list.length;
		activeProjectIndex.set(wrapped);
		restartTimer();
	}

	function next() {
		goTo(index + 1);
	}

	function prev() {
		goTo(index - 1);
	}

	function nextMobilePreview(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		if (!hasDual) return;
		mobilePreviewIndex = (mobilePreviewIndex + 1) % previews.length;
	}

	function prevMobilePreview(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		if (!hasDual) return;
		mobilePreviewIndex = (mobilePreviewIndex - 1 + previews.length) % previews.length;
	}

	function restartTimer() {
		if (timer) clearInterval(timer);
		if (reduceMotion || paused || list.length < 2) return;
		timer = setInterval(() => {
			if (!paused) {
				activeProjectIndex.update((i) => (i + 1) % Math.max(list.length, 1));
			}
		}, ROTATE_MS);
	}

	function setPaused(value: boolean) {
		paused = value;
		restartTimer();
	}

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		restartTimer();
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
		unsubProjects();
		unsubIndex();
	});
</script>

{#if current}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="showcase h-full min-h-0 flex flex-col"
		data-testid="project-showcase"
		data-showcase-mode={mode}
		data-project={current.title}
		data-preview-count={previews.length}
		on:mouseenter={() => setPaused(true)}
		on:mouseleave={() => setPaused(false)}
		role="region"
		aria-roledescription="carousel"
		aria-label="Featured projects"
	>
		{#if mode === 'builder'}
			<!-- Preview window: fills container; dual on lg+, carousel on mobile -->
			<div
				class="preview-frame group/preview relative mb-3 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/50"
				data-testid="project-preview-link"
			>
				<div
					class="preview-chrome flex items-center gap-1.5 px-3 py-1.5 border-b border-white/10 bg-black/60"
				>
					<span class="h-2 w-2 rounded-full bg-red-500/80"></span>
					<span class="h-2 w-2 rounded-full bg-yellow-500/80"></span>
					<span class="h-2 w-2 rounded-full bg-green-500/80"></span>
					<span class="ml-2 truncate font-mono text-[10px] text-text-muted"
						>{current.link.replace(/^https?:\/\//, '')}</span
					>
				</div>

				<!-- Desktop / tablet landscape: one or two images filling the frame -->
				<a
					href={current.link}
					target="_blank"
					rel="noopener noreferrer"
					class="preview-stage preview-stage-desktop relative hidden md:block overflow-hidden"
					aria-label="Open {current.title} live site"
				>
					{#if previews.length === 0}
						<div
							class="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600/30 via-cyan-600/20 to-transparent"
						>
							<span class="font-mono text-xs text-text-muted">Preview unavailable</span>
						</div>
					{:else if hasDual}
						<div class="preview-dual grid h-full grid-cols-2 gap-px bg-white/10">
							{#each previews.slice(0, 2) as src, i}
								<div class="preview-shot relative overflow-hidden bg-black">
									<img
										src={src}
										alt="{current.title} preview {i + 1}"
										class="preview-img h-full w-full object-cover object-top"
										loading="lazy"
									/>
								</div>
							{/each}
						</div>
					{:else}
						<div class="preview-shot relative h-full overflow-hidden bg-black">
							<img
								src={previews[0]}
								alt="{current.title} website preview"
								class="preview-img h-full w-full object-cover object-top"
								loading="lazy"
							/>
						</div>
					{/if}
					<div
						class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
					></div>
					<span
						class="absolute bottom-2 right-2 rounded-md bg-azure/90 px-2 py-1 font-mono text-[10px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100"
					>
						Open live ↗
					</span>
				</a>

				<!-- Mobile: full-bleed single image + tap carousel when dual -->
				<div class="preview-stage preview-stage-mobile relative md:hidden overflow-hidden">
					{#if previews.length === 0}
						<div
							class="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600/30 via-cyan-600/20 to-transparent"
						>
							<span class="font-mono text-xs text-text-muted">Preview unavailable</span>
						</div>
					{:else}
						<a
							href={current.link}
							target="_blank"
							rel="noopener noreferrer"
							class="block h-full w-full"
							aria-label="Open {current.title} live site"
						>
							<img
								src={mobilePreview}
								alt="{current.title} website preview"
								class="preview-img h-full w-full object-cover object-top"
								loading="lazy"
							/>
						</a>
						{#if hasDual}
							<div class="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
								<button
									type="button"
									class="rounded-md border border-white/20 bg-black/55 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm"
									aria-label="Previous preview image"
									on:click={prevMobilePreview}
								>
									←
								</button>
								<div class="flex gap-1">
									{#each previews as _, i}
										<span
											class="h-1.5 w-1.5 rounded-full {i === mobilePreviewIndex
												? 'bg-azure'
												: 'bg-white/35'}"
										></span>
									{/each}
								</div>
								<button
									type="button"
									class="rounded-md border border-white/20 bg-black/55 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm"
									aria-label="Next preview image"
									on:click={nextMobilePreview}
								>
									→
								</button>
							</div>
						{/if}
					{/if}
				</div>
			</div>

			<div class="showcase-body flex min-h-0 flex-1 flex-col">
				<div class="min-h-0 flex-1 overflow-hidden">
					<div class="mb-1.5 flex flex-wrap items-center gap-1.5">
						<span
							class="pill-badge bg-green-500/20 text-green-400 border-green-500/50 text-[10px] px-2 py-0.5"
							>{current.status}</span
						>
						<span class="pill-badge text-azure border-azure/30 text-[10px] px-2 py-0.5"
							>{current.category}</span
						>
						{#if current.metrics}
							<span class="pill-badge text-[10px] px-2 py-0.5">{current.metrics}</span>
						{/if}
					</div>

					<h3 class="text-xl lg:text-2xl font-bold text-text-heading leading-tight mb-0.5">
						{current.title}
					</h3>
					<p class="text-azure text-xs lg:text-sm font-medium mb-1.5">{current.tagline}</p>

					<div class="desc-block mb-1.5" class:is-expanded={descExpanded}>
						<p class="desc-text text-text-body text-xs lg:text-[13px] leading-relaxed">
							{current.description}
						</p>
						<button
							type="button"
							class="mt-1 font-mono text-[11px] text-azure hover:underline focus:outline-none focus:ring-2 focus:ring-azure rounded"
							aria-expanded={descExpanded}
							data-testid="project-desc-toggle"
							on:click={() => (descExpanded = !descExpanded)}
						>
							{descExpanded ? 'Show less' : 'Read more'}
						</button>
					</div>

					<!-- Collapse tags while reading full copy so nothing clips out of the fixed card -->
					{#if !descExpanded}
						<div class="flex flex-wrap gap-1 mb-2">
							{#each chips as chip}
								<span
									class="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
									>{chip}</span
								>
							{/each}
						</div>
					{/if}
				</div>

				<a
					href={current.link}
					target="_blank"
					rel="noopener noreferrer"
					class="text-azure hover:underline text-sm font-mono inline-flex items-center gap-1 flex-shrink-0"
					data-testid="project-live-link"
				>
					View Live Project →
				</a>
			</div>
		{:else}
			<div class="relative z-10 flex h-full min-h-0 flex-col">
				<div class="mb-3 flex flex-wrap items-center gap-2">
					<span class="pill-badge text-azure border-azure/30 text-xs px-2 py-1">Journal</span>
					<span class="pill-badge text-xs px-2 py-1">{current.title}</span>
				</div>

				<div class="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
					<div>
						<h3 class="text-lg font-bold text-text-heading mb-1.5">Inspiration</h3>
						<p class="text-text-body text-sm leading-relaxed">{current.inspiration}</p>
					</div>
					<div>
						<h3 class="text-lg font-bold text-text-heading mb-1.5">Engineering approach</h3>
						<p class="text-text-body text-sm leading-relaxed">
							{current.engineeringApproach}
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Project controls -->
		<div class="mt-3 flex flex-shrink-0 items-center justify-between gap-3">
			<div class="flex items-center gap-1.5" role="tablist" aria-label="Project slides">
				{#each list as project, i}
					<button
						type="button"
						class="h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-azure {i ===
						index
							? 'w-6 bg-azure'
							: 'w-1.5 bg-white/25 hover:bg-white/40'}"
						aria-label="Show {project.title}"
						aria-selected={i === index}
						role="tab"
						on:click={() => goTo(i)}
					></button>
				{/each}
			</div>

			<div class="flex items-center gap-1">
				<button
					type="button"
					class="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-text-body hover:border-azure/50 hover:text-text-heading focus:outline-none focus:ring-2 focus:ring-azure"
					aria-label="Previous project"
					on:click={prev}
				>
					←
				</button>
				<button
					type="button"
					class="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-text-body hover:border-azure/50 hover:text-text-heading focus:outline-none focus:ring-2 focus:ring-azure"
					aria-label="Next project"
					on:click={next}
				>
					→
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.preview-stage-desktop {
		height: 148px;
	}

	@media (min-width: 1024px) {
		.preview-stage-desktop {
			height: 158px;
		}
	}

	.preview-stage-mobile {
		height: 150px;
	}

	.preview-frame {
		/* Hover expand stays inside the frame — no layout shift */
		transition: box-shadow 220ms ease, border-color 220ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.preview-frame:hover {
			border-color: rgba(37, 99, 235, 0.45);
			box-shadow: 0 0 24px rgba(37, 99, 235, 0.22);
		}

		.preview-frame:hover .preview-img {
			transform: scale(1.045);
		}
	}

	.preview-img {
		transition: transform 280ms ease;
		transform-origin: center top;
	}

	.desc-text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
	}

	.desc-block.is-expanded .desc-text {
		display: block;
		-webkit-line-clamp: unset;
		line-clamp: unset;
		max-height: 4.8rem;
		overflow-y: auto;
		padding-right: 0.25rem;
	}

	@media (min-width: 1024px) {
		.desc-text {
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}

		.desc-block.is-expanded .desc-text {
			max-height: 5.5rem;
		}
	}
</style>
