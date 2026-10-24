<script lang="ts">
	import OrbitingTechBadges from '$lib/components/OrbitingTechBadges.svelte';
</script>

<section id="home" class="relative flex min-h-[85vh] items-center overflow-x-clip pt-24 md:pt-28">
	<div class="container mx-auto max-w-7xl px-6 md:px-12">
		<div
			class="flex min-h-[70vh] flex-col items-center gap-12 lg:grid lg:grid-cols-2 lg:gap-16"
		>
			<div class="hero-copy space-y-6 text-center lg:text-left">
				<p class="font-mono text-sm text-text-body">Tema, Ghana · Open to remote part-time roles</p>
				<p class="text-sm font-semibold uppercase tracking-[0.14em] text-azure">
					Full-Stack Developer &amp; QA Engineer
				</p>
				<h1
					class="text-balance text-4xl font-bold leading-tight tracking-tight text-text-heading md:text-5xl lg:text-6xl"
				>
					I build web products end to end, and I
					<span class="hero-gradient-text font-serif italic">test how they break.</span>
				</h1>
				<p class="mx-auto max-w-xl text-lg leading-relaxed text-text-body lg:mx-0">
					Full-stack developer and QA engineer. I just graduated in Computer Science from KNUST,
					and I do QA and frontend work at RPL Technologies. I care about things actually working,
					not just looking like they do.
				</p>
				<p
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-text-body"
				>
					<span class="status-dot" aria-hidden="true"></span>
					About 21 hrs/week until Nov 2027 (national service) · Remote
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
					<a
						href="#work"
						class="rounded-lg bg-azure px-8 py-4 text-center font-semibold text-white transition-shadow hover:shadow-spotlight focus:outline-none focus-visible:ring-2 focus-visible:ring-azure"
					>
						See my work
					</a>
					<a
						href="/Daniel_Mawuena_resume.pdf"
						class="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-8 py-4 text-center font-semibold text-text-heading transition-colors hover:border-azure focus:outline-none focus-visible:ring-2 focus-visible:ring-azure"
					>
						Download CV
					</a>
				</div>
			</div>

			<div class="hero-visual relative order-first flex w-full items-center justify-center lg:order-none">
				<div class="relative mx-auto w-full max-w-[520px]">
					<OrbitingTechBadges>
						<div
							class="relative mx-auto aspect-square w-full max-w-[520px]"
							style="mask-image: linear-gradient(to bottom, black 55%, transparent 96%); -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 96%);"
						>
							<picture>
								<source
									type="image/avif"
									srcset="/images/profile-cutout-480.avif 480w, /images/profile-cutout-960.avif 960w"
									sizes="(min-width: 1024px) 520px, 90vw"
								/>
								<source
									type="image/webp"
									srcset="/images/profile-cutout-480.webp 480w, /images/profile-cutout-960.webp 960w"
									sizes="(min-width: 1024px) 520px, 90vw"
								/>
								<img
									src="/images/profile-cutout-960.webp"
									alt="Daniel Mawuena"
									width="960"
									height="1162"
									class="relative z-0 h-full w-full object-contain"
									fetchpriority="high"
									decoding="sync"
								/>
							</picture>
						</div>
					</OrbitingTechBadges>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-gradient-text {
		color: #7dd3fc;
	}

	:global(html.light) .hero-gradient-text {
		color: #1e40af;
	}
</style>
