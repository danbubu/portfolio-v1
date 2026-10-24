/**
 * Turns a Playwright JSON report into the site's test-report files.
 * Counts each spec once. A spec fails if any project run failed.
 * Never invents a passing total: with no results, status stays "not-run".
 *
 * Usage: node scripts/write-test-report.mjs playwright-results.json
 */
import { readFileSync, writeFileSync } from 'node:fs';

const input = process.argv[2];
if (!input) {
	console.error('Pass the Playwright JSON report path.');
	process.exit(1);
}

const raw = JSON.parse(readFileSync(input, 'utf8'));
/** @type {Map<string, { failed: boolean }>} */
const specs = new Map();

/**
 * @param {any} suite
 * @param {string[]} titles
 */
function walk(suite, titles) {
	const nextTitles = suite.title ? [...titles, suite.title] : titles;
	for (const spec of suite.specs ?? []) {
		const name = [...nextTitles, spec.title].join(' > ');
		for (const test of spec.tests ?? []) {
			if (test.status === 'skipped') continue;
			const current = specs.get(name) ?? { failed: false };
			if (test.status === 'unexpected') current.failed = true;
			specs.set(name, current);
		}
	}
	for (const child of suite.suites ?? []) walk(child, nextTitles);
}

for (const suite of raw.suites ?? []) walk(suite, []);

const total = specs.size;
const failed = [...specs.values()].filter((spec) => spec.failed).length;
const passed = total - failed;

const report = {
	status: total === 0 ? 'not-run' : failed === 0 ? 'passed' : 'failed',
	passed: total === 0 ? null : passed,
	failed: total === 0 ? null : failed,
	total: total === 0 ? null : total,
	skipped: null,
	ranAt: total === 0 ? null : new Date().toISOString(),
	source: 'playwright'
};

const json = JSON.stringify(report, null, 2) + '\n';
writeFileSync(new URL('../src/lib/generated/test-report.json', import.meta.url), json);
writeFileSync(new URL('../static/test-report.json', import.meta.url), json);
console.log(report);
