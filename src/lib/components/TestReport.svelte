<script lang="ts">
	export let label = '';
	export let ticks: string[] = [];
	export let notes: string[] = [];
</script>

<p class="test-report font-mono text-[11px] leading-relaxed text-text-body" data-testid="test-report">
	{#if label}<span class="text-text-heading">{label}</span>{#if ticks.length || notes.length}&nbsp;·&nbsp;{/if}{/if}
	{#each ticks as tick, i}
		<span class="text-emerald-300" aria-hidden="true">✓</span>
		{tick}{#if i < ticks.length - 1 || notes.length}&nbsp;·&nbsp;{/if}
	{/each}
	{notes.join(' · ')}
</p>
