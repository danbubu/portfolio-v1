<script lang="ts">
	import { formatReportDate, siteReport } from '$lib/test-report';
</script>

<p class="font-mono text-[11px] leading-relaxed text-text-muted" data-testid="site-test-report">
	{#if siteReport.status === 'not-run' || siteReport.passed === null || siteReport.total === null}
		This site: Playwright checks have not been recorded for this build yet.
	{:else}
		This site: {siteReport.passed}/{siteReport.total} Playwright checks passed{#if siteReport.failed}
			· {siteReport.failed} failed{/if}{#if siteReport.ranAt}
			· {formatReportDate(siteReport.ranAt)}{/if}
	{/if}
</p>
