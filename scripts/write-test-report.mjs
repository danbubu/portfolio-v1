import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const source = new URL('../playwright-report.json', import.meta.url);
const dest = new URL('../static/test-report.json', import.meta.url);

if (!existsSync(source)) {
	console.log('No playwright-report.json. Leaving static/test-report.json unchanged.');
	process.exit(0);
}

const raw = JSON.parse(readFileSync(source, 'utf8'));
const stats = raw.stats ?? {};
const passed = Number(stats.expected ?? 0);
const failed = Number(stats.unexpected ?? 0);
const skipped = Number(stats.skipped ?? 0);
const report = {
	passed,
	failed,
	skipped,
	total: passed + failed + skipped,
	ranAt: stats.startTime || new Date().toISOString()
};

writeFileSync(dest, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote test report: ${report.passed}/${report.total} passed, ${report.failed} failed`);
