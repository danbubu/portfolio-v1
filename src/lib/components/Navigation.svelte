<script lang="ts">
	import { onMount } from 'svelte';

	let scrolled = false;
	let mobileMenuOpen = false;
	let activeSection = 'home';

	onMount(() => {
		// Force dark mode - remove any light mode class
		if (typeof window !== 'undefined') {
			document.documentElement.classList.remove('light');
			localStorage.setItem('theme', 'dark');
		}
	});

	const navLinks = [
		{ id: 'home', label: 'Home', href: '#home' },
		{ id: 'work', label: 'Work', href: '#work' },
		{ id: 'experience', label: 'Experience', href: '#experience' },
		{ id: 'contact', label: 'Contact', href: '#contact' }
	];

	function handleScroll() {
		if (typeof window === 'undefined') return;
		scrolled = window.scrollY > 50;

		// Update active section based on scroll position
		const sections = ['home', 'work', 'experience', 'contact'];
		const scrollPosition = window.scrollY + 100;

		for (const section of sections.reverse()) {
			const element = document.getElementById(section);
			if (element && element.offsetTop <= scrollPosition) {
				activeSection = section;
				break;
			}
		}
	}

	function scrollToSection(e: Event, href: string) {
		e.preventDefault();
		const targetId = href.replace('#', '');
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			mobileMenuOpen = false;
		}
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	onMount(() => {
		if (typeof window === 'undefined') return;
		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
		? 'bg-obsidian-base/95 backdrop-blur-md border-b border-zinc-800 shadow-lg'
		: 'bg-transparent'}"
	aria-label="Main navigation"
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between h-16 md:h-20">
			<!-- Logo/Brand -->
			<a
				href="#home"
				on:click={(e) => scrollToSection(e, '#home')}
				class="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight font-sans text-text-heading hover:text-azure transition-colors focus:outline-none focus:ring-2 focus:ring-azure rounded"
				aria-label="Go to home"
			>
				<span class="text-azure">D</span>aniel <span class="hidden lg:inline">B<span class="text-azure">u</span>b<span class="text-azure">u</span> </span>Mawuen<span class="text-azure">a</span>
			</a>

			<!-- Desktop Navigation -->
			<ul class="hidden md:flex items-center space-x-8" role="menubar">
				{#each navLinks as link}
					<li role="none">
						<a
							href={link.href}
							on:click={(e) => scrollToSection(e, link.href)}
							class="text-text-body hover:text-azure transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-azure rounded px-2 py-1 {activeSection ===
							link.id
								? 'text-azure border-b-2 border-azure'
								: ''}"
							role="menuitem"
							aria-current={activeSection === link.id ? 'page' : undefined}
						>
							{link.label}
						</a>
					</li>
				{/each}
				<li role="none">
					<a
						href="/Daniel_Mawuena_resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="px-4 py-2 bg-azure text-white rounded-lg font-semibold hover:shadow-spotlight transition-all focus:outline-none focus:ring-2 focus:ring-azure"
						role="menuitem"
						aria-label="Download resume"
					>
						Resume
					</a>
				</li>
			</ul>

			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="md:hidden p-2 text-text-body hover:text-azure focus:outline-none focus:ring-2 focus:ring-azure rounded"
				aria-label="Toggle mobile menu"
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
			>
				{#if mobileMenuOpen}
					<!-- Close Icon -->
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				{:else}
					<!-- Menu Icon -->
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div
				id="mobile-menu"
				class="md:hidden py-4 border-t border-zinc-800 animate-slide-down bg-black/95 backdrop-blur-xl"
				role="menu"
			>
				{#each navLinks as link}
					<a
						href={link.href}
						on:click={(e) => scrollToSection(e, link.href)}
						class="block px-4 py-3 text-text-body hover:text-azure hover:bg-obsidian-surface rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-azure {activeSection ===
						link.id
							? 'text-azure bg-obsidian-surface'
							: ''}"
						role="menuitem"
						aria-current={activeSection === link.id ? 'page' : undefined}
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/Daniel_Mawuena_resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="block mx-4 mt-4 px-4 py-3 text-center bg-azure text-white rounded-lg font-semibold hover:shadow-spotlight transition-all focus:outline-none focus:ring-2 focus:ring-azure"
					role="menuitem"
					aria-label="Download resume"
				>
					Download Resume
				</a>
			</div>
		{/if}
	</div>
</nav>

<style>
	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slide-down {
		animation: slide-down 0.3s ease-out;
	}
</style>

