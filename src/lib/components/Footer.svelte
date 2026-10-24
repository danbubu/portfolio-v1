<script lang="ts">
	import report from '../../../static/test-report.json';

	const quickLinks = [
		{ label: 'Home', href: '/#home' },
		{ label: 'Work', href: '/#work' },
		{ label: 'Experience', href: '/#experience' },
		{ label: 'CV', href: '/cv/' },
		{ label: 'Contact', href: '/#contact' }
	];

	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/danbubu' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/daniel-mawuena-833b3331b/' },
		{ name: 'X', url: 'https://x.com/thatbubuguy' },
		{ name: 'Substack', url: 'https://thatbubuguy.substack.com/' },
		{ name: 'Email', url: 'mailto:danielmawuena75@gmail.com' }
	];

	$: recorded = typeof report.total === 'number' && report.total > 0 && !!report.ranAt;
	$: ranLabel = report.ranAt
		? new Date(report.ranAt).toLocaleDateString('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				timeZone: 'UTC'
			})
		: '';

	function scrollToSection(event: MouseEvent, href: string) {
		const id = href.split('#')[1];
		if (!id) return;
		const element = document.getElementById(id);
		if (!element) return;
		event.preventDefault();
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		element.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
	}
</script>

<footer class="border-t border-zinc-800 bg-obsidian-base py-12">
	<div class="container mx-auto px-4">
		<div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
			<div>
				<p class="mb-3 text-2xl font-bold text-text-heading">Daniel Bubu Mawuena</p>
				<p class="mb-4 text-text-body">Full-stack developer and QA engineer in Tema, Ghana.</p>
				<ul class="flex flex-wrap gap-3">
					{#each socialLinks as social}
						<li>
							<a
								href={social.url}
								class="text-sm text-text-body hover:text-azure"
								{...(social.url.startsWith('http')
									? { target: '_blank', rel: 'noopener noreferrer' }
									: {})}
							>
								{social.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<p class="mb-3 text-lg font-semibold text-text-heading">Quick links</p>
				<ul class="space-y-2">
					{#each quickLinks as link}
						<li>
							<a
								href={link.href}
								class="text-text-body hover:text-azure"
								on:click={(event) => scrollToSection(event, link.href)}
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<p class="mb-3 text-lg font-semibold text-text-heading">Get in touch</p>
				<ul class="space-y-2 text-text-body">
					<li>
						<a class="hover:text-azure" href="mailto:danielmawuena75@gmail.com"
							>danielmawuena75@gmail.com</a
						>
					</li>
					<li>
						<a class="hover:text-azure" href="/Daniel_Mawuena_resume.pdf">Download CV</a>
					</li>
					<li>
						<a class="hover:text-azure" href="/cv/">Read the CV on this site</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="border-t border-zinc-800 pt-6 text-center">
			<p class="mb-2 font-mono text-xs" data-testid="site-test-report">
				{#if recorded}
					This site: {report.passed} passed, {report.failed} failed{#if report.skipped}, {report.skipped} skipped{/if} · {ranLabel}
				{:else}
					This site: Playwright checks not recorded for this build.
				{/if}
			</p>
			<p class="text-sm text-text-heading">Designed and built by Daniel Mawuena © {new Date().getFullYear()}.</p>
			<p class="mt-1 text-xs text-text-muted">Built with SvelteKit, Tailwind and Firebase.</p>
		</div>
	</div>
</footer>
