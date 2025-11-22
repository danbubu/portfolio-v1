<script lang="ts">
	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/danbubu',
			icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/daniel-bubu-mawuena-833b3331b/',
			icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
		},
		{
			name: 'X',
			url: 'https://x.com/its_bubuu_?s=11',
			icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/its_bubuu_/',
			icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
		},
		{
			name: 'Email',
			url: 'mailto:danielmawuena75@gmail.com',
			icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
		}
	];

	const quickLinks = [
		{ label: 'Home', href: '#home' },
		{ label: 'Work', href: '#work' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Contact', href: '#contact' }
	];

	function scrollToSection(e: Event, href: string) {
		e.preventDefault();
		const targetId = href.replace('#', '');
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function getCurrentYear() {
		return new Date().getFullYear();
	}
</script>

<footer class="bg-obsidian-base border-t border-zinc-800 py-12">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
			<!-- Brand Section -->
			<div>
				<h3 class="text-2xl font-bold mb-4 text-text-heading">
					Daniel Bubu Mawuena
				</h3>
				<p class="text-text-body mb-4">
					AWS Certified Full Stack Developer building scalable, performant applications with modern
					technologies.
				</p>
				<div class="flex space-x-4">
					{#each socialLinks as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="text-text-body hover:text-azure transition-colors focus:outline-none focus:ring-2 focus:ring-azure rounded p-2 cursor-pointer"
							style="pointer-events: auto; position: relative; z-index: 1;"
							aria-label="Visit {social.name} profile"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path d={social.icon} />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="text-lg font-semibold mb-4 text-text-heading">Quick Links</h4>
				<ul class="space-y-2">
					{#each quickLinks as link}
						<li>
							<a
								href={link.href}
								on:click={(e) => scrollToSection(e, link.href)}
								class="text-text-body hover:text-azure transition-colors focus:outline-none focus:ring-2 focus:ring-azure rounded px-1 cursor-pointer"
								style="pointer-events: auto; position: relative; z-index: 1;"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h4 class="text-lg font-semibold mb-4 text-text-heading">Get In Touch</h4>
				<ul class="space-y-2 text-text-body">
					<li>
						<a
							href="mailto:danielmawuena75@gmail.com"
							class="hover:text-azure transition-colors focus:outline-none focus:ring-2 focus:ring-azure rounded px-1 cursor-pointer"
							style="pointer-events: auto; position: relative; z-index: 1;"
						>
							danielmawuena75@gmail.com
						</a>
					</li>
					<li>
						<a
							href="/Daniel_Mawuena_resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-azure transition-colors focus:outline-none focus:ring-2 focus:ring-azure rounded px-1 inline-flex items-center gap-2 cursor-pointer"
							style="pointer-events: auto; position: relative; z-index: 1;"
						>
							<svg
								class="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								></path>
							</svg>
							Download Resume
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Copyright -->
		<div class="border-t border-zinc-800 pt-8 text-center text-text-muted text-sm">
			<p>
				Designed & Built by Daniel Mawuena © {getCurrentYear()}. All rights reserved.
			</p>
		</div>
	</div>
</footer>
