<script lang="ts">
	import { playlist } from '$lib/content/site';

	const beyond = [
		{ icon: '♟️', label: 'Chess' },
		{ icon: '🏀', label: 'Basketball' },
		{ icon: '🏋️', label: 'Gym' },
		{ icon: '🚶', label: 'Long walks' }
	];
</script>

<section id="about" class="relative py-20">
	<div class="container mx-auto max-w-7xl px-6 md:px-8">
		<h2 class="mb-8 text-4xl font-bold tracking-tight text-text-heading md:text-5xl">About</h2>
		<div class="grid items-start gap-8 lg:grid-cols-[1.4fr_0.8fr]">
			<div class="space-y-4 text-lg leading-relaxed text-text-body">
				<p>
					I'm Daniel, but everyone calls me Bubu. I'm based in Tema and just finished a Computer
					Science degree at KNUST. I build software around the smallest details of the real people
					it's for, because I think most software feels generic when builders skip the slow part.
				</p>
				<p>
					Right now I do QA and frontend work at RPL Technologies, where I test an expense
					automation system for a bank through a core-banking upgrade. I'm also CTO at KAVD Corp, a
					bootstrapped startup with three friends, building a booking site for a neighbourhood
					barber (my first paid project), and turning my final-year interview simulator into a
					product called Nkonim.
				</p>
				<p>
					Off the clock: chess, basketball, the gym, long walks with a head full of questions, and
					playlists heavy on Obongjayar, Tems and M.anifest.
				</p>
			</div>

			<div class="grid gap-4">
				<div class="relative overflow-hidden rounded-xl border border-white/10">
					<img
						src="/images/tema-map.webp"
						alt="Map of Tema, Ghana"
						width="671"
						height="646"
						class="map-tactical-filter h-36 w-full object-cover"
						loading="lazy"
					/>
					<p
						class="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-xs text-text-heading"
					>
						Tema, Ghana
					</p>
				</div>

				<div class="rounded-xl border border-white/10 bg-neutral-900/50 p-4">
					<h3 class="mb-2 text-sm font-semibold text-text-heading">Focus playlist</h3>
					<div class="playlist-marquee-container relative h-28 overflow-hidden">
						<ul class="playlist-marquee space-y-1.5" aria-hidden="true">
							{#each [0, 1] as copy}
								{#each playlist as song}
									<li class="text-[11px] leading-tight text-text-body">
										{song.title}
										<span class="text-text-muted">· {song.artist}</span>
									</li>
								{/each}
							{/each}
						</ul>
					</div>
					<ul class="sr-only">
						{#each playlist as song}
							<li>{song.title} by {song.artist}</li>
						{/each}
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-neutral-900/50 p-4">
					<h3 class="mb-2 text-sm font-semibold text-text-heading">Beyond code</h3>
					<ul class="grid grid-cols-2 gap-2 text-sm text-text-body">
						{#each beyond as item}
							<li>{item.icon} {item.label}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
