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

	const PROJECT_ROTATE_MS = 6500;
	const PREVIEW_ROTATE_MS = 3000;

	let list: Project[] = [];
	let index = 0;
	/** Only pauses project auto-advance — preview images keep rotating */
	let projectPaused = false;
	let reduceMotion = false;
	let projectTimer: ReturnType<typeof setInterval> | undefined;
	let previewTimer: ReturnType<typeof setInterval> | undefined;
	let previewIndex = 0;
	let mounted = false;

	const unsubProjects = projects.subscribe((value) => {
		list = value;
		if (index >= list.length) {
			index = 0;
			activeProjectIndex.set(0);
		}
	});

	const unsubIndex = activeProjectIndex.subscribe((value) => {
		index = value;
		previewIndex = 0;
		if (mounted) restartPreviewTimer();
	});

	$: current = list[index] ?? list[0];
	$: chips = current ? techChips(current).slice(0, 4) : [];
	$: previews = current ? projectPreviews(current) : [];
	$: hasDual = previews.length >= 2;
	$: activePreview = previews[Math.min(previewIndex, Math.max(previews.length - 1, 0))];

	function goTo(next: number) {
		if (!list.length) return;
		const wrapped = ((next % list.length) + list.length) % list.length;
		activeProjectIndex.set(wrapped);
		restartProjectTimer();
	}

	function next() {
		goTo(index + 1);
	}

	function prev() {
		goTo(index - 1);
	}

	function goToPreview(i: number, e?: Event) {
		e?.preventDefault();
		e?.stopPropagation();
		if (!hasDual) return;
		previewIndex = ((i % previews.length) + previews.length) % previews.length;
		restartPreviewTimer();
	}

	function restartProjectTimer() {
		if (typeof window === 'undefined') return;
		if (projectTimer) clearInterval(projectTimer);
		if (!mounted || reduceMotion || projectPaused || list.length < 2) return;
		projectTimer = setInterval(() => {
			if (!projectPaused) {
				activeProjectIndex.update((i) => (i + 1) % Math.max(list.length, 1));
			}
		}, PROJECT_ROTATE_MS);
	}

	function restartPreviewTimer() {
		if (typeof window === 'undefined') return;
		if (previewTimer) clearInterval(previewTimer);
		if (!mounted || reduceMotion || mode !== 'builder') return;
		const project = list[index] ?? list[0];
		if (!project || projectPreviews(project).length < 2) return;

		previewTimer = setInterval(() => {
			const active = list[index] ?? list[0];
			if (!active) return;
			const shots = projectPreviews(active);
			if (shots.length < 2) return;
			previewIndex = (previewIndex + 1) % shots.length;
		}, PREVIEW_ROTATE_MS);
	}

	function setProjectPaused(value: boolean) {
		projectPaused = value;
		restartProjectTimer();
	}

	onMount(() => {
		mounted = true;
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		restartProjectTimer();
		restartPreviewTimer();
		return () => {
			mounted = false;
		};
	});

	onDestroy(() => {
		if (projectTimer) clearInterval(projectTimer);
		if (previewTimer) clearInterval(previewTimer);
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
		data-preview-index={previewIndex}
		on:mouseenter={() => setProjectPaused(true)}
		on:mouseleave={() => setProjectPaused(false)}
		role="region"
		aria-roledescription="carousel"
		aria-label="Featured projects"
	>
		{#if mode === 'builder'}
			<div class="builder-main flex min-h-0 flex-1 flex-col lg:flex-row lg:items-stretch lg:gap-4">
				<div
					class="preview-frame group/preview relative mb-3 flex w-full flex-shrink-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/50 lg:mb-0 lg:h-full lg:w-[46%] lg:min-w-0"
					data-testid="project-preview-link"
				>
					<div
						class="preview-chrome flex flex-shrink-0 items-center gap-1.5 px-3 py-1.5 border-b border-white/10 bg-black/60"
					>
						<span class="h-2 w-2 rounded-full bg-red-500/80"></span>
						<span class="h-2 w-2 rounded-full bg-yellow-500/80"></span>
						<span class="h-2 w-2 rounded-full bg-green-500/80"></span>
						<span class="ml-2 truncate font-mono text-[10px] text-text-muted"
							>{current.link.replace(/^https?:\/\//, '')}</span
						>
					</div>

					<!--
					  Tall stage (previous height) + full screenshot via object-contain.
					  Blurred cover layer fills the empty bands so it doesn't look letterboxed.
					-->
					<div
						class="preview-stage preview-stage-desktop relative hidden min-h-0 flex-1 overflow-hidden md:block"
					>
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
								class="preview-shot relative block h-full w-full overflow-hidden bg-black"
								aria-label="Open {current.title} live site"
							>
								<img
									src={activePreview}
									alt=""
									aria-hidden="true"
									class="preview-backdrop absolute inset-0 h-full w-full scale-110 object-cover object-top"
									loading="lazy"
								/>
								<img
									src={activePreview}
									alt="{current.title} preview {previewIndex + 1}"
									class="preview-img absolute inset-0 h-full w-full object-contain object-center"
									loading="lazy"
								/>
								<span
									class="pointer-events-none absolute top-2 right-2 z-10 rounded-md bg-azure/90 px-2 py-1 font-mono text-[10px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100"
								>
									Open live ↗
								</span>
							</a>
							{#if hasDual}
								<div
									class="absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-1.5"
									role="tablist"
									aria-label="Preview images"
								>
									{#each previews as _, i}
										<button
											type="button"
											class="h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-azure {i ===
											previewIndex
												? 'w-4 bg-azure'
												: 'w-1.5 bg-white/35 hover:bg-white/55'}"
											aria-label="Show preview image {i + 1}"
											aria-selected={i === previewIndex}
											role="tab"
											on:click={(e) => goToPreview(i, e)}
										></button>
									{/each}
								</div>
							{/if}
						{/if}
					</div>

					<!-- Mobile -->
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
								class="preview-shot relative block h-full w-full overflow-hidden bg-black"
								aria-label="Open {current.title} live site"
							>
								<img
									src={activePreview}
									alt=""
									aria-hidden="true"
									class="preview-backdrop absolute inset-0 h-full w-full scale-110 object-cover object-top"
									loading="lazy"
								/>
								<img
									src={activePreview}
									alt="{current.title} website preview"
									class="preview-img absolute inset-0 h-full w-full object-contain object-center"
									loading="lazy"
								/>
							</a>
							{#if hasDual}
								<div
									class="absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-1.5"
									role="tablist"
									aria-label="Preview images"
								>
									{#each previews as _, i}
										<button
											type="button"
											class="h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-azure {i ===
											previewIndex
												? 'w-4 bg-azure'
												: 'w-1.5 bg-white/35 hover:bg-white/55'}"
											aria-label="Show preview image {i + 1}"
											aria-selected={i === previewIndex}
											role="tab"
											on:click={(e) => goToPreview(i, e)}
										></button>
									{/each}
								</div>
							{/if}
						{/if}
					</div>
				</div>

				<div class="showcase-body flex min-h-0 flex-1 flex-col lg:justify-between">
					<div class="showcase-copy min-h-0 flex-1">
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

						<h3 class="text-xl font-bold text-text-heading leading-tight mb-0.5">
							{current.title}
						</h3>
						<p class="text-azure text-xs lg:text-sm font-medium mb-1.5">{current.tagline}</p>

						<p
							class="mb-2 text-text-body text-xs lg:text-[13px] leading-relaxed"
							data-testid="project-description"
						>
							{current.description}
						</p>

						<div class="flex flex-wrap gap-1 mb-2" data-testid="project-tech-chips">
							{#each chips as chip}
								<span
									class="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
									>{chip}</span
								>
							{/each}
						</div>
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
		flex: none;
	}

	.preview-stage-mobile {
		height: 160px;
	}

	@media (min-width: 1024px) {
		.preview-stage-desktop {
			height: auto;
			flex: 1 1 auto;
			min-height: 0;
		}

		.showcase-copy {
			overflow-y: auto;
			padding-right: 0.15rem;
		}
	}

	.preview-frame {
		transition: box-shadow 220ms ease, border-color 220ms ease;
	}

	@media (hover: hover) and (pointer: fine) {
		.preview-frame:hover {
			border-color: rgba(37, 99, 235, 0.45);
			box-shadow: 0 0 24px rgba(37, 99, 235, 0.22);
		}
	}

	.preview-backdrop {
		filter: blur(18px) saturate(1.1);
		opacity: 0.55;
		transform: scale(1.12);
		pointer-events: none;
	}

	.preview-img {
		z-index: 1;
		transition: opacity 280ms ease;
	}
</style>
