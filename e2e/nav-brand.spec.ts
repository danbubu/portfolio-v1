import { expect, test } from '@playwright/test';

test.describe('Nav brand scramble', () => {
	test('waits, then decodes without a pre-painted name flash', async ({ page }) => {
		await page.goto('/', { waitUntil: 'domcontentloaded' });

		const brand = page.getByTestId('nav-brand');
		await expect(brand).toBeVisible();
		await expect(brand).toHaveAttribute(
			'aria-label',
			'Daniel Bubu Mawuena — Go to home'
		);

		// Early load should still be in intro/decode — never skip straight past both.
		const earlyState = await brand.getAttribute('data-brand-state');
		expect(['waiting', 'decoding']).toContain(earlyState);

		if (earlyState === 'waiting') {
			await expect(brand.locator('.nav-brand-char')).toHaveCount(0);
		}

		// 1.5s intro delay + ~5s decode.
		await expect(brand).toHaveAttribute('data-brand-state', 'done', { timeout: 12_000 });
		await expect
			.poll(async () => (await brand.innerText()).replace(/\s+/g, ' ').trim())
			.toMatch(/^Daniel (Bubu )?Mawuena$/);

		await brand.click();
		await expect(page.locator('#home')).toBeInViewport({ ratio: 0.15 });
	});

	test('hovering a letter cycles it, leaving snaps it back', async ({ page }, testInfo) => {
		// Pointer hover scramble is desktop-only (fine pointer + hover).
		test.skip(testInfo.project.name !== 'Desktop Chrome', 'Hover scramble is pointer-desktop only');

		await page.goto('/');
		const brand = page.getByTestId('nav-brand');
		await expect(brand).toHaveAttribute('data-brand-state', 'done', { timeout: 12_000 });

		const firstLetter = brand.locator('.nav-brand-char.is-interactive').first();
		await expect(firstLetter).toHaveText('D');

		await firstLetter.hover();
		await expect
			.poll(async () => firstLetter.innerText(), { timeout: 1_500 })
			.not.toBe('D');

		// Move off the brand entirely so the glyph snaps home.
		await page.mouse.move(0, 0);
		await expect(firstLetter).toHaveText('D', { timeout: 1_500 });
		await expect
			.poll(async () => (await brand.innerText()).replace(/\s+/g, ' ').trim())
			.toMatch(/^Daniel Bubu Mawuena$/);
	});
});
