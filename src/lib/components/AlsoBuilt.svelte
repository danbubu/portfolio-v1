<script lang="ts">
	import { alsoBuilt } from '$lib/content/also-built';
</script>

<div class="mt-12">
	<h3 class="mb-4 text-2xl font-bold text-text-heading">Also built</h3>
	<ul class="divide-y divide-white/10 rounded-xl border border-white/10">
		{#each alsoBuilt as item}
			<li class="px-4 py-4">
				<div class="flex flex-wrap items-baseline justify-between gap-2">
					<h3 class="text-base font-semibold text-text-heading">{item.title}</h3>
					<span class="font-mono text-[11px] text-text-muted">{item.status}</span>
				</div>
				<p class="mt-1 text-sm leading-relaxed text-text-body">{item.detail}</p>
				{#if item.href}
					<a
						href={item.href}
						class="mt-2 inline-flex min-h-11 items-center text-sm text-azure hover:underline"
						target={item.href.startsWith('http') ? '_blank' : undefined}
						rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
					>
						{item.href.replace(/^https?:\/\//, '')}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>
