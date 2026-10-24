<script lang="ts">
	import { certifications, experiences } from '$lib/stores/experience';
	import { skillGroups } from '$lib/content/skills';

	const pageTitle = 'CV · Daniel Mawuena';
	const description =
		'Daniel Mawuena, full-stack developer and QA engineer in Tema, Ghana. QA and frontend at RPL Technologies. Open to remote part-time roles.';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="https://danielmawuena.me/cv/" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="https://danielmawuena.me/og.png" />
</svelte:head>

<!-- TODO(Daniel): decide whether a web copy of the CV should include a phone number. It stays off this page. -->
<!-- The PDF at /Daniel_Mawuena_resume.pdf is unchanged. A revised file can replace it later at the same path. -->

<article class="cv-page px-6 pb-24 pt-28 md:px-8">
	<div class="mx-auto max-w-3xl">
		<p class="font-mono text-xs uppercase tracking-wider text-azure">Full-Stack Developer & QA Engineer</p>
		<h1 class="mt-2 text-4xl font-bold text-text-heading md:text-5xl">Daniel Bubu Mawuena</h1>
		<p class="mt-3 text-text-body">Tema, Ghana · Open to remote part-time roles, about 21 hours a week until around November 2027.</p>
		<p class="mt-2 text-sm text-text-muted">
			<a class="text-azure hover:underline" href="mailto:danielmawuena75@gmail.com">danielmawuena75@gmail.com</a>
			·
			<a class="text-azure hover:underline" href="https://www.linkedin.com/in/daniel-mawuena-833b3331b/">LinkedIn</a>
			·
			<a class="text-azure hover:underline" href="https://github.com/danbubu">GitHub</a>
		</p>
		<p class="mt-6">
			<a
				href="/Daniel_Mawuena_resume.pdf"
				class="inline-flex min-h-11 items-center rounded-lg bg-azure px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-azure"
			>
				Download CV
			</a>
		</p>

		<p class="mt-8 leading-relaxed text-text-body">
			I just graduated in Computer Science from KNUST. I do QA and frontend work at RPL Technologies, I am CTO at KAVD Corp with three friends, and I am building a booking site for a neighbourhood barber. I care about things actually working, not just looking like they do.
		</p>

		<h2 class="mt-12 mb-4 text-2xl font-bold text-text-heading">Experience</h2>
		<div class="space-y-6">
			{#each experiences as job}
				<section>
					<h3 class="text-lg font-semibold text-text-heading">{job.position}</h3>
					<p class="text-sm text-azure">{job.company}</p>
					<p class="font-mono text-xs text-text-muted">{job.startDate} to {job.endDate || 'Present'} · {job.location}</p>
					<ul class="mt-2 space-y-1">
						{#each job.description as line}
							<li class="text-sm leading-relaxed text-text-body">{line}</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>

		<h2 class="mt-12 mb-4 text-2xl font-bold text-text-heading">Education</h2>
		<p class="text-text-heading">BSc Computer Science, Kwame Nkrumah University of Science and Technology</p>
		<p class="text-sm text-text-muted">2023 to 2026. Final year completed September 2026.</p>
		<p class="mt-2 text-sm text-text-body">Second Class Upper so far. Final CGPA is still pending.</p>

		<h2 class="mt-12 mb-4 text-2xl font-bold text-text-heading">Skills</h2>
		<div class="space-y-3">
			{#each skillGroups as group}
				<p class="text-sm text-text-body"><span class="text-text-heading">{group.label}.</span> {group.items.join(', ')}{group.note ? ` ${group.note}` : ''}</p>
			{/each}
		</div>

		<h2 class="mt-12 mb-4 text-2xl font-bold text-text-heading">Certifications</h2>
		<ul class="space-y-2">
			{#each certifications as cert}
				<li class="text-sm text-text-body">
					<a href={cert.link} class="text-text-heading hover:text-azure">{cert.title}</a>
					<span class="text-text-muted"> · {cert.issuer} · {cert.date}</span>
				</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	@media print {
		:global(nav),
		:global(footer),
		:global(.noise-overlay),
		:global(.aurora-bg) {
			display: none !important;
		}

		.cv-page {
			padding-top: 0;
		}
	}
</style>
