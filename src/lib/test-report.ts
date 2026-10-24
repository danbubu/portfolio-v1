import raw from '$lib/generated/test-report.json';

export type SiteReport = {
	status: 'not-run' | 'passed' | 'failed';
	passed: number | null;
	failed: number | null;
	total: number | null;
	ranAt: string | null;
	source: string;
};

function statusOf(value: unknown): SiteReport['status'] {
	if (value === 'passed' || value === 'failed' || value === 'not-run') return value;
	return 'not-run';
}

function numberOrNull(value: unknown): number | null {
	return typeof value === 'number' ? value : null;
}

/** Build-time snapshot written by scripts/write-test-report.mjs. Do not type a pass count by hand. */
export const siteReport: SiteReport = {
	status: statusOf(raw.status),
	passed: numberOrNull(raw.passed),
	failed: numberOrNull(raw.failed),
	total: numberOrNull(raw.total),
	ranAt: typeof raw.ranAt === 'string' ? raw.ranAt : null,
	source: typeof raw.source === 'string' ? raw.source : 'playwright'
};

export function formatReportDate(iso: string | null): string {
	if (!iso) return '';
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return '';
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(date);
}
