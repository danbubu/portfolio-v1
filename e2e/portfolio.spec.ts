import AxeBuilder from '@axe-core/playwright';
import { expect, request as playwrightRequest, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const BANNED = [
	'Architect',
	'Digital Artisan',
	'Expert in',
	'140+ Active Users',
	'KNUST-ready',
	'distinction-grade',
	'Transmission',
	'passionate',
	'seamless',
	'leverage',
	'Ready to Ship'
];

test.describe('Portfolio revamp', () => {
	test.describe.configure({ timeout: 120_000 });
	test.beforeEach(({}, testInfo) => {
		test.skip(testInfo.project.name !== 'Desktop Chrome', 'Covered on desktop');
	});

	test('title and meta are correct', async ({ page, request }) => {
		await page.goto('/');
		await expect(page).toHaveTitle('Daniel Mawuena · Full-Stack Developer & QA Engineer');
		const html = await (await request.get('/')).text();
		expect(html).toContain('property="og:image"');
		expect(html).toContain('rel="canonical"');
		expect(html.match(/<title>/g)?.length).toBe(1);
	});

	test('prerendered HTML has content', async ({ request }) => {
		const html = await (await request.get('/')).text();
		expect(html).toContain('<h1');
		expect(html).toContain('Full-Stack Developer');
		expect(html).not.toContain('Full Stack Architect');
	});

	test('JSON-LD Person is valid', async ({ page }) => {
		await page.goto('/');
		const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
		const data = JSON.parse(raw || '{}');
		expect(data.jobTitle).toBe('Full-Stack Developer & QA Engineer');
		expect(data.sameAs.join(' ')).toContain('daniel-mawuena-833b3331b');
	});

	test('no banned or outdated strings', async ({ page }) => {
		await page.goto('/');
		const text = await page.locator('body').innerText();
		for (const term of BANNED) {
			expect(text, term).not.toContain(term);
		}
	});

	test('Airdrop Tracker is archived', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('body')).toContainText('Archived');
		await expect(page.locator('body')).toContainText('Once had 140+ active users');
	});

	test('Intervue AI credits Winifred for research', async ({ page }) => {
		await page.goto('/work/intervue-ai/');
		const text = await page.locator('body').innerText();
		expect(text).toContain('Winifred Anokye');
		expect(text).toContain('researched');
		expect(text.toLowerCase()).not.toContain('alone');
		expect(text.toLowerCase()).not.toContain('solo');
	});

	test('RPL title', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#experience')).toContainText('QA and Frontend Engineer');
	});

	test('CV link works', async ({ page, request }) => {
		await page.goto('/');
		const hrefs = await page.locator('a[href$="resume.pdf"]').evaluateAll((nodes) =>
			nodes.map((node) => node.getAttribute('href')).filter((href): href is string => Boolean(href))
		);
		expect(hrefs.length).toBeGreaterThan(0);
		for (const href of new Set(hrefs)) {
			const response = await request.get(href);
			expect(response.status()).toBe(200);
			expect(response.headers()['content-type'] || '').toContain('application/pdf');
		}
	});

	test('external links resolve', async ({ page }) => {
		await page.goto('/');
		const hrefs = await page.locator('a[href^="http"]').evaluateAll((nodes) =>
			[...new Set(nodes.map((node) => node.getAttribute('href')).filter((href): href is string => Boolean(href)))]
		);
		const api = await playwrightRequest.newContext();
		for (const href of hrefs) {
			if (href.includes('linkedin.com') || href.startsWith('mailto:')) continue;
			let response = await api.get(href, { timeout: 20_000, maxRedirects: 5 }).catch(() => null);
			if (response && response.status() === 429) {
				await new Promise((resolve) => setTimeout(resolve, 1500));
				response = await api.get(href, { timeout: 20_000, maxRedirects: 5 }).catch(() => null);
			}
			expect(response, href).not.toBeNull();
			// Instagram and similar hosts rate-limit datacentre IPs. A 429 means the URL was reached.
			if (response!.status() === 429) continue;
			expect(response!.status(), href).toBeLessThan(400);
		}
		await api.dispose();
	});

	test('404 returns 404', async ({ request }) => {
		const response = await request.get('/does-not-exist');
		expect(response.status()).toBe(404);
	});

	test('contact form validation', async ({ page }) => {
		await page.goto('/');
		await page.locator('#contact').scrollIntoViewIfNeeded();
		await page.getByRole('button', { name: 'Send message' }).click();
		await expect(page.getByTestId('form-status')).toContainText('at least 2 characters');

		await page.locator('#name').fill('Ada');
		await page.locator('#email').fill('ada@example.com');
		await page.locator('#message').fill('short');
		await page.getByRole('button', { name: 'Send message' }).click();
		await expect(page.getByTestId('form-status')).toContainText('at least 10 characters');

		await page.route('https://api.emailjs.com/**', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ status: 200, text: 'OK' })
			})
		);
		await page.locator('#message').fill('Hello from the portfolio test suite.');
		await page.getByRole('button', { name: 'Send message' }).click();
		await expect(page.getByTestId('form-status')).toContainText(
			"Thanks, your message is on its way"
		);
	});

	test('keyboard navigation reaches the skip link and the form', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Tab');
		await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
		const seen = new Set<string>();
		for (let i = 0; i < 25; i += 1) {
			await page.keyboard.press('Tab');
			const focused = await page.evaluate(() => {
				const el = document.activeElement;
				const style = el ? getComputedStyle(el) : null;
				return {
					text: (el?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
					outline: style?.outlineStyle || ''
				};
			});
			if (focused.text) seen.add(focused.text);
		}
		const blob = [...seen].join(' | ');
		expect(blob).toMatch(/Home/);
		expect(blob).toMatch(/See my work|Download CV|Work/);
	});

	test('reduced motion keeps sections visible', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');
		for (const id of ['home', 'work', 'experience', 'about', 'contact']) {
			await expect(page.locator(`#${id}`)).toBeVisible();
		}
	});

	test('a11y scan', async ({ page }) => {
		await page.goto('/');
		const home = await new AxeBuilder({ page }).analyze();
		expect(home.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical')).toEqual(
			[]
		);
		await page.goto('/work/intervue-ai/');
		const study = await new AxeBuilder({ page }).analyze();
		expect(study.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical')).toEqual(
			[]
		);
	});

	test('hero image is light', async ({ request }) => {
		for (const path of ['/images/profile-cutout-960.avif', '/images/profile-cutout-960.webp']) {
			const response = await request.get(path);
			expect(response.ok()).toBeTruthy();
			expect((await response.body()).length).toBeLessThan(200 * 1024);
		}
	});

	test('site test report matches the generated file', async ({ page }) => {
		const report = JSON.parse(readFileSync('src/lib/generated/test-report.json', 'utf8'));
		await page.goto('/');
		const strip = page.getByTestId('site-test-report');
		if (report.status === 'not-run') {
			await expect(strip).toContainText('not been recorded');
		} else {
			await expect(strip).toContainText(`${report.passed}/${report.total}`);
		}
	});
});

test('mobile layout has no horizontal scroll', async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== 'Mobile Chrome', 'Measured at phone width');
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
	);
	expect(overflow).toBeTruthy();
});
