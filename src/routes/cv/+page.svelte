<script lang="ts">
	import { certifications, experiences } from '$lib/stores/experience';
	import { skillGroups } from '$lib/content/site';
</script>

<!-- TODO(Daniel): phone number stays off this web CV until you decide otherwise. -->

<article class="cv mx-auto max-w-3xl px-6 pb-24 pt-28">
	<header class="mb-8">
		<p class="font-mono text-xs uppercase tracking-wider text-text-muted">Tema, Ghana</p>
		<h1 class="mt-2 text-4xl font-bold text-text-heading">Daniel Bubu Mawuena</h1>
		<p class="mt-2 text-lg text-text-body">Full-Stack Developer &amp; QA Engineer</p>
		<p class="mt-4 text-text-body">
			<a class="text-azure hover:underline" href="mailto:danielmawuena75@gmail.com"
				>danielmawuena75@gmail.com</a
			>
			·
			<a
				class="text-azure hover:underline"
				href="https://www.linkedin.com/in/daniel-mawuena-833b3331b/">LinkedIn</a
			>
			·
			<a class="text-azure hover:underline" href="https://github.com/danbubu">GitHub</a>
		</p>
		<p class="mt-4">
			<a
				href="/Daniel_Mawuena_resume.pdf"
				class="inline-flex rounded-lg bg-azure px-5 py-3 text-sm font-semibold text-white"
				>Download CV</a
			>
		</p>
	</header>

	<section class="mb-8">
		<h2 class="mb-2 text-xl font-bold text-text-heading">Profile</h2>
		<p class="leading-relaxed text-text-body">
			I just graduated in Computer Science from KNUST (Second Class Upper so far, final CGPA
			pending). I do QA and frontend work at RPL Technologies on national service, and I am CTO of
			KAVD Corp with three friends. Open to remote part-time roles, about 21 hours a week until
			around November 2027.
		</p>
	</section>

	<section class="mb-8">
		<h2 class="mb-3 text-xl font-bold text-text-heading">Experience</h2>
		<ul class="space-y-5">
			{#each experiences as job}
				<li>
					<p class="font-semibold text-text-heading">
						{job.position} · {job.company}
					</p>
					<p class="font-mono text-xs text-text-muted">
						{job.startDate}{job.endDate ? ` to ${job.endDate}` : ' to present'} · {job.location}
					</p>
					<ul class="mt-1 list-disc space-y-1 pl-5 text-sm text-text-body">
						{#each job.description as line}
							<li>{line}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</section>

	<section class="mb-8">
		<h2 class="mb-2 text-xl font-bold text-text-heading">Education</h2>
		<p class="text-text-heading">BSc Computer Science, KNUST, Kumasi</p>
		<p class="text-sm text-text-muted">2023 to 2026. Final year completed September 2026.</p>
		<p class="mt-2 text-sm text-text-body">
			Final-year project: Intervue AI, with Winifred Anokye. She researched the company data. I
			designed and built the product. Supervised by Rev. (Dr.) Kwame Ofosuhene Peasah.
		</p>
	</section>

	<section class="mb-8">
		<h2 class="mb-3 text-xl font-bold text-text-heading">Skills</h2>
		<ul class="space-y-2 text-sm text-text-body">
			{#each skillGroups as group}
				<li>
					<span class="font-semibold text-text-heading">{group.name}:</span>
					{group.items.join(', ')}
				</li>
			{/each}
			<li>Learning Go for backend work.</li>
		</ul>
	</section>

	<section>
		<h2 class="mb-3 text-xl font-bold text-text-heading">Certifications</h2>
		<ul class="space-y-1 text-sm text-text-body">
			{#each certifications as cert}
				<li>
					<a class="text-azure hover:underline" href={cert.link}>{cert.title}</a>
					· {cert.issuer} · {cert.date}
				</li>
			{/each}
		</ul>
	</section>
</article>

<style>
	@media print {
		:global(nav),
		:global(footer),
		:global(.starfield),
		:global(.noise-overlay),
		:global(.aurora-bg) {
			display: none !important;
		}
	}
</style>
