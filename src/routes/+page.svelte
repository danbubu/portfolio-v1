<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/stores/projects';
	import type { Project } from '$lib/stores/projects';
	import { experiences, certifications } from '$lib/stores/experience';
	import type { WorkExperience, Certification } from '$lib/stores/experience';

	// Mode toggle: 'builder' or 'thinker'
	let mode: 'builder' | 'thinker' = 'builder';

	// Contact form state
	let name = '';
	let email = '';
	let message = '';
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let emailCopied = false;

	// Mouse spotlight tracking
	let mouseX = 0;
	let mouseY = 0;
	let isTouchDevice = false;

	// Scroll progress
	let scrollProgress = 0;
	let showBackToTop = false;

	// Active Users count-up animation
	let activeUsersCount = 0;
	const targetUsers = 140;
	const animationDuration = 1500; // 1.5 seconds

	// Ensure proper typing
	$: typedProjects = $projects as Project[];

	// GSAP and ScrollTrigger
	let gsap: any;
	let ScrollTrigger: any;
	let Flip: any;

	// Spotlight border tracking
	let spotlightCards: HTMLElement[] = [];
	let cardRefs: Map<HTMLElement, (e: MouseEvent) => void> = new Map();
	let setupTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleCardMouseMove(e: MouseEvent, card: HTMLElement) {
		const rect = card.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		card.style.setProperty('--mouse-x', `${x}%`);
		card.style.setProperty('--mouse-y', `${y}%`);
	}

	function cleanupSpotlightCards() {
		// Remove all event listeners
		cardRefs.forEach((handler, card) => {
			card.removeEventListener('mousemove', handler);
		});
		cardRefs.clear();
		spotlightCards = [];
		
		// Clear any pending timeout
		if (setupTimeout) {
			clearTimeout(setupTimeout);
			setupTimeout = null;
		}
	}

	function setupSpotlightCards() {
		if (typeof window === 'undefined') return;
		
		// Clean up existing listeners
		cleanupSpotlightCards();

		// Add new listeners
		spotlightCards = Array.from(document.querySelectorAll('.spotlight-border')) as HTMLElement[];
		spotlightCards.forEach(card => {
			const handler = (e: MouseEvent) => handleCardMouseMove(e, card);
			card.addEventListener('mousemove', handler);
			cardRefs.set(card, handler);
		});
	}

	// Handle contact form submission
	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, message })
			});

			if (response.ok) {
				submitStatus = 'success';
				name = '';
				email = '';
				message = '';
				setTimeout(() => {
					submitStatus = 'idle';
				}, 3000);
			} else {
				submitStatus = 'error';
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
		}
	}

	// Copy email to clipboard
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText('danielmawuena75@gmail.com');
			emailCopied = true;
			setTimeout(() => {
				emailCopied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy email:', error);
		}
	}

	// Core tech stack for floating badges
	const coreTech = [
		{ name: 'React', color: '#61DAFB' },
		{ name: 'AWS', color: '#FF9900' },
		{ name: 'Tailwind', color: '#38BDF8' }
	];

	// Mouse tracking for spotlight
	function handleMouseMove(e: MouseEvent) {
		if (isTouchDevice) return;
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	// Scroll progress tracking
	function handleScroll() {
		if (typeof window === 'undefined') return;
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
		showBackToTop = scrollTop > 300;
	}

	// Scroll to top
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		// Detect touch device
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		// Mouse tracking
		if (!isTouchDevice) {
			window.addEventListener('mousemove', handleMouseMove);
		}

		// Scroll tracking
		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial call

		// Active Users count-up animation
		const startTime = Date.now();
		const animateCount = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / animationDuration, 1);
			// Easing function for smooth animation
			const easeOutCubic = 1 - Math.pow(1 - progress, 3);
			activeUsersCount = easeOutCubic * targetUsers;
			
			if (progress < 1) {
				requestAnimationFrame(animateCount);
			} else {
				activeUsersCount = targetUsers;
			}
		};
		
		// Start animation after a short delay for better UX
		setTimeout(() => {
			requestAnimationFrame(animateCount);
		}, 300);

		// Initialize GSAP asynchronously
			(async () => {
			const gsapModule = await import('gsap');
			const scrollTriggerModule = await import('gsap/ScrollTrigger');
			const flipModule = await import('gsap/Flip');
			gsap = gsapModule.gsap;
			ScrollTrigger = scrollTriggerModule.ScrollTrigger;
			Flip = flipModule.Flip;
			gsap.registerPlugin(ScrollTrigger, Flip);

			// Hero animations
			gsap.from('.hero-content', {
				opacity: 0,
				x: -50,
				duration: 1,
				ease: 'power3.out',
				delay: 0.2
			});

			gsap.from('.hero-visual', {
				opacity: 0,
				x: 50,
				duration: 1,
				ease: 'power3.out',
				delay: 0.4
			});

			// Floating badges animation - Smooth 60fps performance
			gsap.to('.badge-float-1', {
				y: '+=12',
				duration: 2.5,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				force3D: true,
				smoothOrigin: true
			});

			gsap.to('.badge-float-2', {
				y: '+=12',
				duration: 3,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: 0.3,
				force3D: true,
				smoothOrigin: true
			});

			gsap.to('.badge-float-3', {
				y: '+=12',
				duration: 3.5,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: 0.6,
				force3D: true,
				smoothOrigin: true
			});

			gsap.to('.badge-float-4', {
				y: '+=12',
				duration: 2.8,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: 0.45,
				force3D: true,
				smoothOrigin: true
			});

			// Scroll reveal animations
			gsap.utils.toArray('.reveal').forEach((element: any) => {
				gsap.from(element, {
					opacity: 0,
					y: 60,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				});
			});

			// Setup spotlight cards
			setupTimeout = setTimeout(setupSpotlightCards, 100);
			})();

		// Cleanup on component destroy
		return () => {
			cleanupSpotlightCards();
			if (ScrollTrigger) {
				ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
			}
			if (!isTouchDevice) {
				window.removeEventListener('mousemove', handleMouseMove);
			}
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// No grid animation needed - containers stay fixed, only content changes
</script>

<svelte:head>
	<title>Daniel Bubu Mawuena - Digital Artisan | Full Stack Developer</title>
	<meta name="description" content="Crafting digital experiences with focus and precision. Full Stack Developer with AWS & IBM certifications, building scalable applications." />
	<meta name="keywords" content="full stack developer, web developer, react developer, aws certified, blockchain, Ghana developer" />
	<meta name="author" content="Daniel Bubu Mawuena" />
	<meta name="theme-color" content="#050505" />
</svelte:head>

<!-- Scroll Progress Indicator -->
<div class="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 z-50 transition-all duration-150" style="width: {scrollProgress}%"></div>

<!-- Global Mouse Spotlight -->
{#if !isTouchDevice}
	<div 
		class="fixed pointer-events-none z-[-1] mouse-spotlight"
		style="
			left: {mouseX}px;
			top: {mouseY}px;
			width: 800px;
			height: 800px;
			transform: translate(-50%, -50%);
			background: radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, transparent 80%);
		"
	></div>
{/if}

<!-- Massive Glowing Orb Background -->
<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
	<div class="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-azure/20 rounded-full blur-[120px] animate-pulse-slow"></div>
	<div class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slower"></div>
	</div>

<!-- Hero Section - Split Layout -->
<section id="home" class="min-h-screen flex items-center relative overflow-hidden pt-24 md:pt-32">
	<div class="container mx-auto px-6 md:px-8 max-w-7xl">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
			<!-- Left Side - Copy -->
			<div class="hero-content space-y-8">
				<!-- Status Indicator -->
				<div class="flex items-center gap-3">
					<div class="status-dot"></div>
					<span class="text-text-body text-sm font-mono">Available for work</span>
				</div>

				<!-- Main Headline with Glowing Stroke -->
				<h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
					<span class="block text-text-heading mb-2">Crafting digital</span>
					<span class="block text-text-heading mb-2">experiences with</span>
					<span class="block">
						<span class="font-serif italic hero-gradient-text" style="animation-delay: 0s;">focus</span>
						<span class="text-text-heading"> and </span>
						<span class="font-serif italic hero-gradient-text" style="animation-delay: 0.5s;">precision</span>
					</span>
			</h1>

				<!-- Subtext -->
				<p class="text-xl md:text-2xl text-text-body max-w-2xl leading-relaxed">
					AWS Certified Full Stack Developer building scalable applications with modern technologies and innovative solutions.
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4">
				<button
					on:click={() => {
							const el = document.getElementById('work');
						el?.scrollIntoView({ behavior: 'smooth' });
					}}
						class="px-8 py-4 bg-azure text-white rounded-lg font-semibold hover:shadow-spotlight transition-all focus:outline-none focus:ring-2 focus:ring-azure"
				>
					View Work
				</button>
				<a
						href="/Daniel_Mawuena_resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
						class="px-8 py-4 border border-zinc-800 rounded-lg font-semibold hover:border-azure hover:shadow-spotlight transition-all text-center focus:outline-none focus:ring-2 focus:ring-azure inline-flex items-center justify-center gap-2"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Download Resume
				</a>
				</div>
			</div>

			<!-- Right Side - Visual with Floating Badges -->
			<div class="hero-visual relative flex items-center justify-center">
				<!-- Profile Image Container -->
				<div class="relative">
					<!-- Depth Lighting - Rim Light -->
					<div class="absolute w-[600px] h-[600px] bg-gradient-radial-blue blur-[100px] -z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

					<!-- Profile Image with Gradient Mask -->
					<div class="relative w-full aspect-square max-w-[560px] mx-auto" style="transform: scale(1.4); mask-image: linear-gradient(to bottom, black 50%, transparent 95%); -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 95%);">
						<img 
							src="/images/profile-cutout.png" 
							alt="Daniel Bubu Mawuena - AWS Certified Full Stack Developer"
							class="w-full h-full object-contain relative z-0"
							loading="eager"
							decoding="async"
						/>
					</div>

					<!-- Floating Tech Badges - Glassmorphic, Tightened Positions -->
					<div class="absolute top-8 -left-6 floating-badge badge-float-1">
						<div class="hero-badge-glass px-4 py-3 rounded-lg flex items-center gap-2">
							<div class="w-2 h-2 rounded-full bg-[#61DAFB]"></div>
							<span class="text-text-heading font-mono text-sm font-semibold">React</span>
						</div>
					</div>

					<div class="absolute top-1/4 -right-6 floating-badge badge-float-2">
						<div class="hero-badge-glass px-4 py-3 rounded-lg flex items-center gap-2">
							<div class="w-2 h-2 rounded-full bg-[#FF9900]"></div>
							<span class="text-text-heading font-mono text-sm font-semibold">AWS</span>
						</div>
					</div>

					<div class="absolute top-1/3 -left-6 floating-badge badge-float-3">
						<div class="hero-badge-glass px-4 py-3 rounded-lg flex items-center gap-2">
							<div class="w-2 h-2 rounded-full bg-[#38BDF8]"></div>
							<span class="text-text-heading font-mono text-sm font-semibold">Tailwind</span>
						</div>
					</div>

					<div class="absolute bottom-1/4 -right-6 floating-badge badge-float-4">
						<div class="hero-badge-glass px-4 py-3 rounded-lg flex items-center gap-2">
							<div class="w-2 h-2 rounded-full bg-[#FFCA28]"></div>
							<span class="text-text-heading font-mono text-sm font-semibold">Firebase</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Work Section - Bento Grid -->
<section id="work" class="py-20 relative">
	<div class="container mx-auto px-6 md:px-8 max-w-7xl">
		<!-- Section Header with Toggle -->
		<div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 reveal">
			<h2 class="text-4xl md:text-5xl font-bold text-text-heading tracking-tight">
				Work & Credentials
		</h2>

			<!-- Thinker vs Builder Toggle -->
			<div class="flex items-center gap-4">
				<span class="text-text-body text-sm font-mono transition-colors {mode === 'builder' ? 'text-text-heading font-bold' : 'text-text-muted'}">Builder</span>
				<button
					on:click={() => mode = mode === 'builder' ? 'thinker' : 'builder'}
					class="relative w-14 h-7 bg-obsidian-surface border border-zinc-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-azure hover:border-azure"
					aria-label="Toggle between builder and thinker mode"
				>
					<span
						class="absolute top-1 left-1 w-5 h-5 bg-azure rounded-full transition-transform duration-300 ease-out shadow-spotlight {mode === 'thinker' ? 'translate-x-7' : ''}"
					></span>
				</button>
				<span class="text-text-body text-sm font-mono transition-colors {mode === 'thinker' ? 'text-text-heading font-bold' : 'text-text-muted'}">Thinker</span>
				</div>
			</div>

		<!-- Bento Grid - Fixed CSS Grid Layout (Aceternity UI Style) -->
		<div class="bento-grid-fixed h-[600px] w-full grid grid-cols-4 grid-rows-3 gap-4">
			<!-- Slot 1: UX Architect (Large Square - col-span-2 row-span-2) -->
			<div class="col-span-2 row-span-2 bg-neutral-900/50 border border-white/10 rounded-xl p-6 overflow-hidden relative group">
				{#key mode}
					{#if mode === 'builder'}
						<!-- Builder Mode: UX Architect with Background Image -->
						<div class="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity">
							<div class="w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
						</div>
						<div class="relative z-10 h-full flex flex-col justify-between">
							<div>
								<div class="flex items-center gap-2 mb-3 flex-wrap">
									<span class="pill-badge text-azure border-azure/30 font-bold text-xs px-2 py-1">Featured</span>
									<span class="pill-badge text-xs px-2 py-1">DeFi</span>
									<span class="pill-badge bg-green-500/20 text-green-400 border-green-500/50 animate-pulse text-xs px-2 py-1">
										{typedProjects[0]?.metrics || '100+ Users'}
									</span>
								</div>
								<h3 class="text-2xl font-bold text-text-heading mb-2">The UX Architect</h3>
								<p class="text-text-body text-sm leading-relaxed mb-4">
									{typedProjects[0]?.description || 'Abstracting DeFi complexity into stress-free UX. The Airdrop Tracker Payment System handles multiple crypto protocols seamlessly.'}
								</p>
								
								<!-- Code Snippet on Hover (Builder Mode Only) -->
								<div class="code-snippet-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div class="flex items-center gap-2 mb-2">
										<div class="w-2 h-2 rounded-full bg-red-500"></div>
										<div class="w-2 h-2 rounded-full bg-yellow-500"></div>
										<div class="w-2 h-2 rounded-full bg-green-500"></div>
										<span class="text-text-muted text-xs ml-2 font-mono">payment-handler.ts</span>
									</div>
									<pre class="text-text-body text-xs font-mono overflow-x-auto"><code>{`async function handleMultiProtocolPayment(
  protocols: Protocol[]
): Promise<TransactionResult> {
  // Abstracting complexity...
  return unifiedResult;
}`}</code></pre>
								</div>
							</div>
							<a
								href={typedProjects[0]?.link || 'https://airdroptracker.app'}
								target="_blank"
								rel="noopener noreferrer"
								class="text-azure hover:underline text-sm font-mono mt-4 inline-block"
							>
								View Live Project →
							</a>
						</div>
					{:else}
						<!-- Thinker Mode: Engineering Approach -->
						<div class="relative z-10 h-full flex flex-col">
							<h3 class="text-2xl font-bold text-text-heading mb-3">Engineering Approach</h3>
							<p class="text-text-body text-sm leading-relaxed mb-4">
								Building solutions that prioritize user experience, performance, and maintainability.
							</p>
							<div class="space-y-2">
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full bg-azure"></div>
									<span class="text-text-body text-sm">User-Centric Architecture</span>
								</div>
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full bg-azure"></div>
									<span class="text-text-body text-sm">Performance Optimization</span>
								</div>
								<div class="flex items-center gap-2">
									<div class="w-2 h-2 rounded-full bg-azure"></div>
									<span class="text-text-body text-sm">Scalable Component Systems</span>
								</div>
							</div>
						</div>
					{/if}
				{/key}
			</div>

			<!-- Slot 2: Certifications (Tall Vertical - col-span-1 row-span-2) -->
			<div class="col-span-1 row-span-2 bg-neutral-900/50 border border-white/10 rounded-xl p-4 overflow-hidden">
				<h3 class="text-lg font-bold text-text-heading mb-3">Certifications</h3>
				<div class="space-y-2 overflow-y-auto h-full pr-2">
					{#each certifications as cert}
						<a
							href={cert.link}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group cert-shine-container"
						>
							<div class="w-12 h-12 rounded bg-zinc-800/50 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
								<img 
									src={cert.image} 
									alt={cert.title}
									class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
								/>
								<!-- Shiny Polish Effect -->
								<div class="cert-shine"></div>
							</div>
							<div class="flex-1 min-w-0">
								<p class="text-text-heading text-xs font-semibold truncate">{cert.title}</p>
								<p class="text-text-muted text-[10px] truncate">{cert.issuer}</p>
								<p class="text-azure text-[10px]">{cert.date}</p>
							</div>
						</a>
					{/each}
				</div>
			</div>

			<!-- Slot 3: Status Map + Vibe Check Container (col-span-1 row-span-2, matches Certifications height) -->
			<div class="col-span-1 row-span-2 flex flex-col gap-4">
				<!-- Status Map (Top) -->
				<div class="flex-1 bg-neutral-900/50 border border-white/10 rounded-xl p-4 overflow-hidden relative group">
					<div class="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
						<img 
							src="/images/tema-map.png" 
							alt="Tema, Ghana Map"
							class="w-full h-full object-cover map-tactical-filter"
						/>
					</div>
					<!-- Status Indicator Overlay -->
					<div class="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-2">
						<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
						<span class="text-text-heading text-xs font-medium">Open to Remote</span>
					</div>
					<div class="relative z-10 h-full flex flex-col justify-center">
						<div class="flex items-center gap-2 mb-2">
							<div class="status-dot"></div>
							<span class="text-text-heading font-semibold text-sm">Status</span>
						</div>
						<p class="text-text-body text-xs font-mono font-semibold">Tema, Ghana</p>
						<p class="text-text-muted text-[10px]">West Africa</p>
					</div>
				</div>
				
				<!-- Vibe Check (Bottom - Extends to match Beyond Code baseline) -->
				<div class="flex-[1.2] bg-neutral-900/50 border border-white/10 rounded-xl p-4 overflow-hidden relative group">
					<!-- Blurred Album Art Background -->
					<div class="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-purple-800/30 blur-xl"></div>
					<div class="relative z-10 h-full flex flex-col justify-between">
						<div>
							<div class="flex items-center gap-2 mb-2">
								<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.08.599-1.559.3z"/>
								</svg>
								<span class="text-text-heading font-semibold text-sm">Vibe Check</span>
							</div>
							<p class="text-text-body text-xs font-mono mb-3">Focus Playlist</p>
							<!-- Waveform Animation -->
							<div class="flex items-end gap-1 h-8 mb-3">
								<div class="w-1 bg-green-500/60 rounded-full waveform-bar" style="height: 20%; animation-delay: 0s;"></div>
								<div class="w-1 bg-green-500/60 rounded-full waveform-bar" style="height: 60%; animation-delay: 0.1s;"></div>
								<div class="w-1 bg-green-500/60 rounded-full waveform-bar" style="height: 100%; animation-delay: 0.2s;"></div>
								<div class="w-1 bg-green-500/60 rounded-full waveform-bar" style="height: 40%; animation-delay: 0.3s;"></div>
								<div class="w-1 bg-green-500/60 rounded-full waveform-bar" style="height: 80%; animation-delay: 0.4s;"></div>
							</div>
						</div>
						
						<!-- Song List with Vertical Marquee -->
						<div class="playlist-marquee-container relative h-24 overflow-hidden">
							<!-- Gradient Masks -->
							<div class="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-purple-600/30 to-transparent z-10 pointer-events-none"></div>
							<div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-purple-600/30 to-transparent z-10 pointer-events-none"></div>
							
							<!-- Scrolling Song List -->
							<div class="playlist-marquee space-y-1.5">
								<!-- First set -->
								{#each [
									{ title: 'Frens', artist: 'Obongjayar' },
									{ title: 'History', artist: 'Dave, James Blake' },
									{ title: 'For You', artist: 'Kadjha Bonet' },
									{ title: 'I wish it was me', artist: 'Obongjayar' },
									{ title: 'Queen Tings', artist: 'Masego, Tiffany Gouché' },
									{ title: 'Free Mind', artist: 'Tems' },
									{ title: 'Chapter 16', artist: 'Dave, Kano' },
									{ title: 'First in Class', artist: 'Omar Sterling' },
									{ title: 'We dey manage', artist: 'M.anifest' },
									{ title: 'Disco', artist: 'Surf Curse' }
								] as song}
									<div class="playlist-item">
										<div class="flex items-start gap-2">
											<div class="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
											<div class="flex-1 min-w-0">
												<p class="text-text-heading text-[10px] font-medium truncate leading-tight">{song.title}</p>
												<p class="text-text-muted text-[9px] truncate leading-tight">{song.artist}</p>
											</div>
										</div>
									</div>
								{/each}
								<!-- Duplicate for seamless loop -->
								{#each [
									{ title: 'Frens', artist: 'Obongjayar' },
									{ title: 'History', artist: 'Dave, James Blake' },
									{ title: 'For You', artist: 'Kadjha Bonet' },
									{ title: 'I wish it was me', artist: 'Obongjayar' },
									{ title: 'Queen Tings', artist: 'Masego, Tiffany Gouché' },
									{ title: 'Free Mind', artist: 'Tems' },
									{ title: 'Chapter 16', artist: 'Dave, Kano' },
									{ title: 'First in Class', artist: 'Omar Sterling' },
									{ title: 'We dey manage', artist: 'M.anifest' },
									{ title: 'Disco', artist: 'Surf Curse' }
								] as song}
									<div class="playlist-item">
										<div class="flex items-start gap-2">
											<div class="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
											<div class="flex-1 min-w-0">
												<p class="text-text-heading text-[10px] font-medium truncate leading-tight">{song.title}</p>
												<p class="text-text-muted text-[9px] truncate leading-tight">{song.artist}</p>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Slot 4: Tech Stack / Philosophy (Wide Rectangle - col-span-2 row-span-1) -->
			<div class="col-span-2 row-span-1 bg-neutral-900/50 border border-white/10 rounded-xl p-4 overflow-hidden">
				{#key mode}
					{#if mode === 'builder'}
						<!-- Builder Mode: Tech Stack Double Marquee -->
						<div class="flex items-center justify-between mb-3">
							<h3 class="text-lg font-bold text-text-heading">Tech Stack</h3>
							<span class="pill-badge bg-azure/20 text-azure border-azure/50 animate-pulse text-xs px-2 py-0.5">Active</span>
						</div>
						<div class="space-y-3">
							<!-- Row 1: Scrolls Left -->
							<div class="tech-marquee-container overflow-hidden">
								<div class="tech-marquee-left flex gap-6">
									<!-- First set -->
									{#each [
										{ name: 'React', icon: '/images/tech/react.svg' },
										{ name: 'TypeScript', icon: '/images/tech/typescript.svg' },
										{ name: 'Node.js', icon: '/images/tech/nodejs.svg' },
										{ name: 'SvelteKit', icon: '/images/tech/svelte.svg' }
									] as tech}
										<div class="flex items-center gap-2 flex-shrink-0 tech-item">
											<div class="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
												<img src={tech.icon} alt={tech.name} class="w-5 h-5 tech-icon" />
											</div>
											<span class="text-text-body text-sm font-mono">{tech.name}</span>
										</div>
									{/each}
									<!-- Duplicate for seamless loop -->
									{#each [
										{ name: 'React', icon: '/images/tech/react.svg' },
										{ name: 'TypeScript', icon: '/images/tech/typescript.svg' },
										{ name: 'Node.js', icon: '/images/tech/nodejs.svg' },
										{ name: 'SvelteKit', icon: '/images/tech/svelte.svg' }
									] as tech}
										<div class="flex items-center gap-2 flex-shrink-0 tech-item">
											<div class="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
												<img src={tech.icon} alt={tech.name} class="w-5 h-5 tech-icon" />
											</div>
											<span class="text-text-body text-sm font-mono">{tech.name}</span>
										</div>
									{/each}
								</div>
							</div>
							<!-- Row 2: Scrolls Right -->
							<div class="tech-marquee-container overflow-hidden">
								<div class="tech-marquee-right flex gap-6">
									<!-- First set -->
									{#each [
										{ name: 'Supabase', icon: '/images/tech/supabase.svg' },
										{ name: 'PostgreSQL', icon: '/images/tech/postgresql.svg' },
										{ name: 'Firebase', icon: '/images/tech/firebase.svg' },
										{ name: 'Tailwind', icon: '/images/tech/tailwindcss.svg' },
										{ name: 'AWS', icon: '/images/tech/aws.svg' }
									] as tech}
										<div class="flex items-center gap-2 flex-shrink-0 tech-item">
											<div class="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
												<img src={tech.icon} alt={tech.name} class="w-5 h-5 tech-icon" />
											</div>
											<span class="text-text-body text-sm font-mono">{tech.name}</span>
										</div>
									{/each}
									<!-- Duplicate for seamless loop -->
									{#each [
										{ name: 'Supabase', icon: '/images/tech/supabase.svg' },
										{ name: 'PostgreSQL', icon: '/images/tech/postgresql.svg' },
										{ name: 'Firebase', icon: '/images/tech/firebase.svg' },
										{ name: 'Tailwind', icon: '/images/tech/tailwindcss.svg' },
										{ name: 'AWS', icon: '/images/tech/aws.svg' }
									] as tech}
										<div class="flex items-center gap-2 flex-shrink-0 tech-item">
											<div class="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
												<img src={tech.icon} alt={tech.name} class="w-5 h-5 tech-icon" />
											</div>
											<span class="text-text-body text-sm font-mono">{tech.name}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{:else}
						<!-- Thinker Mode: Philosophy -->
						<h3 class="text-lg font-bold text-text-heading mb-3">Philosophy</h3>
						<p class="text-text-body text-sm leading-relaxed">
							Code is more than just a tool — it's a bridge that connects people, ideas, and solutions. Whether I'm simplifying crypto payments or guiding someone through their daily challenges, I build software that solves real human problems. At the heart of it all, it's never about money or fame; it's about using technology to make life better for others and help humanity move forward.
						</p>
					{/if}
				{/key}
			</div>

			<!-- Slot 5: Beyond Code (Small Square - col-span-1 row-span-1) -->
			<div class="col-span-1 row-span-1 bg-neutral-900/50 border border-white/10 rounded-xl p-4 overflow-hidden">
				<h3 class="text-lg font-bold text-text-heading mb-2">Beyond Code</h3>
				<div class="space-y-1.5">
					<div class="flex items-center gap-1.5">
						<span class="text-sm">🏀</span>
						<span class="text-text-body text-xs">Basketball</span>
					</div>
					<div class="flex items-center gap-1.5">
						<span class="text-sm">🏋️</span>
						<span class="text-text-body text-xs">Gym</span>
					</div>
					<div class="flex items-center gap-1.5">
						<span class="text-sm">♟️</span>
						<span class="text-text-body text-xs">Chess</span>
					</div>
				</div>
			</div>
			
			<!-- Slot 7: Product Impact (Small Square - col-span-1 row-span-1, next to Beyond Code) -->
			<div class="col-span-1 row-span-1 bg-neutral-900/50 border border-white/10 rounded-xl p-4 overflow-hidden relative group">
				<!-- Trend Line Background -->
				<div class="absolute inset-0 opacity-10">
					<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
						<defs>
							<linearGradient id="impact-trend-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" style="stop-color:rgb(16,185,129);stop-opacity:0.3" />
								<stop offset="100%" style="stop-color:rgb(6,182,212);stop-opacity:0.3" />
							</linearGradient>
						</defs>
						<path d="M 0,80 Q 20,70 30,60 T 50,40 T 70,25 T 100,10" 
							stroke="url(#impact-trend-gradient)" 
							stroke-width="1.5" 
							fill="none" 
							stroke-linecap="round"/>
						<circle cx="100" cy="10" r="2" fill="url(#impact-trend-gradient)"/>
					</svg>
				</div>
				<div class="relative z-10 h-full flex flex-col justify-between">
					<div class="flex items-start justify-between">
						<span class="text-text-heading font-semibold text-sm">Active Users</span>
						<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
						</svg>
					</div>
					<div>
						<div class="text-3xl font-bold mb-1 count-up-number">
							<span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
								{Math.floor(activeUsersCount)}+
							</span>
						</div>
						<p class="text-text-muted text-[10px] font-mono">Across Airdrop Tracker</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Experience Timeline -->
<section id="experience" class="pt-20 pb-24 relative -mt-8">
	<div class="container mx-auto px-6 md:px-8 max-w-4xl">
		<h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-text-heading tracking-tight reveal">
			Experience
		</h2>

			<div class="relative">
			<!-- Circuit Timeline Line - Gradient Beam -->
			<div class="absolute left-0 md:left-[15%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-60"></div>

			<div class="space-y-12 pl-8 md:pl-[20%]">
					{#each experiences as experience, index (experience.id)}
					{@const isLeadership = experience.position === 'Technical Project Lead'}
					<div class="relative reveal experience-item group">
						<!-- Timeline Dot - Hollow by default, fills on hover -->
						<div class="absolute left-0 md:left-[-15%] top-6 w-4 h-4 rounded-full bg-obsidian-base border-2 border-blue-500 transform -translate-x-1/2 z-10 transition-all duration-300 group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] {isLeadership ? 'border-amber-500 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.6)]' : ''}"></div>

						<!-- Content Card -->
						<div class="glass-card spotlight-border rounded-xl p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-white/20 {isLeadership ? 'leadership-circuit-card' : ''}">
							<!-- Date - Outside/Above Card with JetBrains Mono -->
							<div class="mb-3">
								<span class="text-xs font-mono text-zinc-400 tracking-wider">
												{experience.startDate} - {experience.endDate || 'Present'}
											</span>
							</div>

							<!-- Role - Larger, Bold -->
							<h3 class="text-xl font-bold text-text-heading mb-2">
												{experience.position}
											</h3>

							<!-- Company - Blue Accent -->
							<p class="text-blue-400 font-medium mb-1">
												{experience.company}
											</p>

							<!-- Location -->
							<p class="text-text-muted text-sm mb-4">{experience.location}</p>

							<!-- Description Bullets -->
							<ul class="space-y-2 mt-4">
											{#each experience.description as item}
									<li class="text-text-body text-sm flex items-start">
										<span class="text-azure mr-2 flex-shrink-0">•</span>
										<span class="flex-1">{item}</span>
												</li>
											{/each}
										</ul>

							<!-- Tech Stack Badges -->
							<div class="flex flex-wrap gap-2 mt-4">
											{#each experience.technologies as tech}
									<span class="pill-badge text-xs {tech === 'Leadership' ? 'leadership-badge-circuit' : ''}">
													{tech}
												</span>
											{/each}
								</div>
							</div>
						</div>
					{/each}
			</div>
		</div>
	</div>
</section>

<!-- Contact Section - Terminal/Command Center -->
<section id="contact" class="py-20 relative overflow-hidden">
	<!-- Background Gradient Anchor -->
	<div class="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>

	<div class="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
		<!-- Split Layout: Left Pitch + Right Form -->
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
			<!-- Left Side: The Pitch -->
			<div class="reveal">
				<h2 class="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">
					Ready to Ship?
				</h2>
				<p class="text-text-body text-lg mb-8 leading-relaxed">
					I'm currently open for new projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
				</p>

				<!-- Email with Copy Functionality -->
				<div class="mb-8">
					<div class="block text-sm font-mono text-text-muted mb-2 uppercase tracking-wider">Direct Line</div>
					<button
						on:click={copyEmail}
						class="group relative w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:border-azure/50 transition-all flex items-center justify-between cursor-pointer"
					>
						<span class="text-text-heading font-mono text-lg">danielmawuena75@gmail.com</span>
						<svg class="w-5 h-5 text-text-muted group-hover:text-azure transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					</button>
					{#if emailCopied}
						<div class="mt-2 text-green-400 text-sm font-mono animate-fade-in">✓ Copied to clipboard!</div>
					{/if}
				</div>

				<!-- Social Links -->
				<div class="space-y-4">
					<div class="block text-sm font-mono text-text-muted mb-3 uppercase tracking-wider">Connect</div>
					<a
						href="https://www.linkedin.com/in/daniel-bubu-mawuena-833b3331b/"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4 w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
					>
						<svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
						<span class="text-text-heading font-semibold">LinkedIn</span>
						<svg class="w-4 h-4 text-text-muted ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="https://github.com/danbubu"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4 w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:border-zinc-400/50 hover:bg-zinc-500/10 transition-all"
					>
						<svg class="w-6 h-6 text-text-heading" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
						</svg>
						<span class="text-text-heading font-semibold">GitHub</span>
						<svg class="w-4 h-4 text-text-muted ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
					<a
						href="https://www.instagram.com/its_bubuu_/"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4 w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg hover:border-pink-500/50 hover:bg-pink-500/10 transition-all"
					>
						<svg class="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
						</svg>
						<span class="text-text-heading font-semibold">Instagram</span>
						<svg class="w-4 h-4 text-text-muted ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>

			<!-- Right Side: Terminal Form -->
			<div class="reveal">
				<div class="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8">
			<form on:submit={handleSubmit} class="space-y-6">
				<div>
							<label for="name" class="block text-sm font-mono text-text-muted mb-2 uppercase tracking-wider">Name</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						required
								class="w-full px-4 py-3 bg-black/40 border-b border-white/20 focus:border-blue-500 focus:outline-none text-text-heading transition-all terminal-input"
								placeholder="Enter your name"
					/>
				</div>

				<div>
							<label for="email" class="block text-sm font-mono text-text-muted mb-2 uppercase tracking-wider">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
								class="w-full px-4 py-3 bg-black/40 border-b border-white/20 focus:border-blue-500 focus:outline-none text-text-heading transition-all terminal-input"
						placeholder="your.email@example.com"
					/>
				</div>

				<div>
							<label for="message" class="block text-sm font-mono text-text-muted mb-2 uppercase tracking-wider">Message</label>
					<textarea
						id="message"
						bind:value={message}
						required
						rows="6"
								class="w-full px-4 py-3 bg-black/40 border-b border-white/20 focus:border-blue-500 focus:outline-none text-text-heading resize-none transition-all terminal-input"
								placeholder="Type your message here..."
					></textarea>
				</div>

				{#if submitStatus === 'success'}
							<div class="p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400 font-mono text-sm">
								✓ Transmission successful! I'll get back to you soon.
					</div>
				{:else if submitStatus === 'error'}
							<div class="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 font-mono text-sm">
								✗ Transmission failed. Please try again.
					</div>
				{/if}

				<button
					type="submit"
					disabled={isSubmitting}
							class="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{#if isSubmitting}
						<span class="inline-flex items-center gap-2">
									<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
									Initializing...
						</span>
					{:else}
								Send Transmission
					{/if}
				</button>
			</form>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Return to Top Button -->
{#if showBackToTop}
	<button
		on:click={scrollToTop}
		class="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg hover:shadow-spotlight hover:scale-110 transition-all duration-300 z-[9999] flex items-center justify-center group glass-button"
		style="position: fixed !important; z-index: 9999 !important;"
		aria-label="Return to top"
	>
		<svg class="w-6 h-6 text-white transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19V5M5 12l7-7 7 7" />
		</svg>
	</button>
{/if}

<style>
	.container {
		max-width: 1280px;
	}

	/* Hero Gradient Text - Cinematic Effect */
	.hero-gradient-text {
		background: linear-gradient(to right, #22d3ee 0%, #2563eb 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		filter: drop-shadow(0 4px 6px rgba(37, 99, 235, 0.5));
		animation: hero-text-glow 4s ease-in-out infinite;
	}

	/* Dark Mode Only - Hero Gradient Text */

	/* Hero Text Glow Animation */
	@keyframes hero-text-glow {
		0%, 100% {
			filter: drop-shadow(0 4px 6px rgba(37, 99, 235, 0.5));
		}
		50% {
			filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.7));
		}
	}

	/* Radial Gradient for Rim Light */
	.bg-gradient-radial-blue {
		background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
	}

	/* Hero Badge Glassmorphism */
	.hero-badge-glass {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
		transition: all 0.3s ease;
		will-change: transform;
		transform: translateZ(0);
	}

	.hero-badge-glass:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
		box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
	}

	/* Slow Pulse Animations */
	@keyframes pulse-slow {
		0%, 100% {
			opacity: 0.2;
			transform: scale(1);
		}
		50% {
			opacity: 0.3;
			transform: scale(1.05);
		}
	}

	@keyframes pulse-slower {
		0%, 100% {
			opacity: 0.1;
			transform: scale(1);
		}
		50% {
			opacity: 0.15;
			transform: scale(1.08);
		}
	}

	.animate-pulse-slow {
		animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.animate-pulse-slower {
		animation: pulse-slower 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	/* Tech Card */
	.tech-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.tech-card:hover {
		transform: translateY(-4px);
	}

	/* Circuit Timeline - Leadership Card (Radioactive Amber Glow) */
	.leadership-circuit-card {
		border-color: rgba(245, 158, 11, 0.5) !important;
		box-shadow: 0 0 30px -5px rgba(245, 158, 11, 0.3), 0 0 60px -10px rgba(245, 158, 11, 0.2);
	}

	.leadership-circuit-card:hover {
		border-color: rgba(245, 158, 11, 0.7) !important;
		box-shadow: 0 0 40px -5px rgba(245, 158, 11, 0.4), 0 0 80px -10px rgba(245, 158, 11, 0.3);
	}

	/* Leadership Badge for Circuit Layout */
	.leadership-badge-circuit {
		background: rgba(245, 158, 11, 0.1) !important;
		border-color: rgba(245, 158, 11, 0.2) !important;
		color: #fbbf24 !important;
		font-weight: 700;
	}

	/* Experience Item Hover Effects */
	.experience-item:hover .glass-card {
		border-color: rgba(255, 255, 255, 0.2);
	}

	/* Terminal Input Style */
	.terminal-input {
		border-radius: 0;
		border-top: none;
		border-left: none;
		border-right: none;
	}

	.terminal-input:focus {
		border-bottom-width: 2px;
		box-shadow: 0 1px 0 0 rgba(59, 130, 246, 0.5);
	}

	/* Fade In Animation for Toast */
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}

	/* Mouse Spotlight - Smooth following */
	.mouse-spotlight {
		will-change: transform;
		transition: transform 0.1s ease-out;
	}

	/* Glassy Scroll-to-Top Button */
	.glass-button {
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
	}

	.glass-button:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(59, 130, 246, 0.4);
		box-shadow: 0 8px 32px 0 rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.1);
	}
</style>

