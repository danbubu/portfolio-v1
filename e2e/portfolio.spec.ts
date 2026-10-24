import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const BANNED = [
	/\bArchitect\b/,
	/Digital Artisan/i,
	/Expert in/i,
	/140\+ Active Users/,
	/KNUST-ready/i,
	/distinction-grade/i,
	/\bTransmission\b/,
	/Ready to Ship/i,
	/\bpassionate\b/i,
	/\bseamless\b/i,
	/\bleverage\b/i
];

test('title and meta are correct', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Daniel Mawuena · Full-Stack Developer & QA Engineer');
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		'https://danielmawuena.me/og.png'
	);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://danielmawuena.me/'
	);
});

test('prerendered HTML has content', async ({ request }) => {
	const response = await request.get('/');
	expect(response.status()).toBe(200);
	const body = await response.text();
	expect(body).toContain('<h1');
	expect(body).toContain('Full-Stack Developer');
});

test('JSON-LD Person is valid', async ({ page }) => {
	await page.goto('/');
	const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
	const data = JSON.parse(raw ?? '{}');
	expect(data['@type']).toBe('Person');
	expect(data.jobTitle).toBe('Full-Stack Developer & QA Engineer');
	expect(data.sameAs).toContain('https://www.linkedin.com/in/daniel-mawuena-833b3331b/');
});

test('no banned or outdated strings', async ({ page }) => {
	await page.goto('/');
	const text = await page.locator('body').innerText();
	for (const pattern of BANNED) {
		expect(text, pattern.toString()).not.toMatch(pattern);
	}
});

test('Airdrop Tracker is archived', async ({ page }) => {
	await page.goto('/');
	const card = page.locator('[data-testid="also-built"]').filter({ hasText: 'Airdrop Tracker' });
	await expect(card).toContainText('Archived');
	await expect(card).toContainText('Once had 140+ active users');
});

test('Intervue AI credits Winifred for research', async ({ page }) => {
	await page.goto('/');
	const text = await page.locator('body').innerText();
	expect(text).toContain('Winifred Anokye');
	expect(text).toMatch(/researched/);
	expect(text).not.toMatch(/\balone\b/i);
	expect(text).not.toMatch(/\bsolo\b/i);

	await page.goto('/work/intervue-ai/');
	const study = await page.locator('body').innerText();
	expect(study).toContain('Winifred Anokye');
	expect(study).toMatch(/researched/);
	expect(study).not.toMatch(/\balone\b/i);
	expect(study).not.toMatch(/\bsolo\b/i);
});

test('RPL title', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('#experience')).toContainText('QA and Frontend Engineer');
});

test('CV link works', async ({ page, request }) => {
	await page.goto('/');
	const hrefs = await page.locator('a[href$="resume.pdf"]').evaluateAll((els) =>
		els.map((el) => el.getAttribute('href')).filter((href): href is string => !!href)
	);
	expect(hrefs.length).toBeGreaterThan(0);
	for (const href of new Set(hrefs)) {
		const response = await request.get(href);
		expect(response.status(), href).toBe(200);
		const type = response.headers()['content-type'] ?? '';
		const bytes = await response.body();
		const isPdf = type.includes('pdf') || bytes.subarray(0, 4).toString() === '%PDF';
		expect(isPdf, `${href} (${type})`).toBe(true);
	}
});

test('external links resolve', async ({ page, request }, testInfo) => {
	test.skip(testInfo.project.name !== 'Desktop Chrome', 'Checked once from desktop');
	test.setTimeout(180_000);
	await page.goto('/');
	const hrefs = await page.locator('a[href^="http"]').evaluateAll((els) =>
		[...new Set(els.map((el) => el.getAttribute('href')).filter((href): href is string => !!href))]
	);
	const failures: string[] = [];
	for (const href of hrefs) {
		if (href.includes('linkedin.com')) continue;
		try {
			const response = await request.get(href, {
				timeout: 20_000,
				maxRedirects: 5,
				headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-link-check/1.0)' }
			});
			if (response.status() >= 400) failures.push(`${response.status()} ${href}`);
		} catch (error) {
			failures.push(`${href} (${error instanceof Error ? error.message : 'failed'})`);
		}
	}
	expect(failures, failures.join('\n')).toEqual([]);
});

test('404 returns 404', async ({ request }) => {
	const response = await request.get('/does-not-exist');
	expect(response.status()).toBe(404);
});

test('contact form validation', async ({ page }) => {
	await page.goto('/');
	await page.locator('#contact').scrollIntoViewIfNeeded();
	await page.route('**/api.emailjs.com/**', (route) =>
		route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK' })
	);

	await page.getByRole('button', { name: 'Send message' }).click();
	await expect(page.locator('#contact')).toContainText('at least 2 characters');

	await page.locator('#name').fill('Ama Mensah');
	await page.locator('#email').fill('ama@example.com');
	await page.locator('#message').fill('too short');
	await page.getByRole('button', { name: 'Send message' }).click();
	await expect(page.locator('#contact')).toContainText('at least 10 characters');

	await page.locator('#message').fill('Hello Daniel, I have a part-time React role to discuss with you.');
	await page.getByRole('button', { name: 'Send message' }).click();
	await expect(page.locator('#contact')).toContainText('Thanks, your message is on its way');
});

test('keyboard navigation', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
	const outline = await page.evaluate(() => getComputedStyle(document.activeElement as Element).outlineStyle);
	expect(outline).not.toBe('none');

	const seen = new Set<string>();
	for (let i = 0; i < 60; i += 1) {
		await page.keyboard.press('Tab');
		const name = await page.evaluate(
			() => document.activeElement?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80) ?? ''
		);
		seen.add(name);
		const onName = await page.locator('#name').evaluate((el) => el === document.activeElement);
		if (onName) break;
	}
	await expect(page.locator('#name')).toBeFocused();
	expect(seen.size).toBeGreaterThan(3);
});

test('reduced motion', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	for (const id of ['home', 'work', 'experience', 'about', 'contact']) {
		const section = page.locator(`#${id}`);
		await expect(section).toBeVisible();
		const opacity = await section.evaluate((el) => getComputedStyle(el).opacity);
		expect(opacity).toBe('1');
	}
});

test('a11y scan', async ({ page }) => {
	for (const path of ['/', '/work/intervue-ai/']) {
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		const serious = results.violations.filter(
			(violation) => violation.impact === 'serious' || violation.impact === 'critical'
		);
		expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
	}
});

test('mobile layout', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	expect(overflow).toBeLessThanOrEqual(1);
});

test('hero image is light', async ({ page, request }) => {
	await page.goto('/');
	const src = await page.locator('#home img[alt="Daniel Mawuena"]').getAttribute('src');
	expect(src).toBeTruthy();
	const response = await request.get(src!);
	expect(response.ok()).toBeTruthy();
	const size = (await response.body()).byteLength;
	expect(size).toBeLessThan(200 * 1024);
});
