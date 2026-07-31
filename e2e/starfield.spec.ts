import { expect, test } from '@playwright/test';

test.describe('Ambient starfield', () => {
	test('renders behind the page as a live field', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'no-preference' });
		await page.goto('/');

		const field = page.getByTestId('ambient-starfield');
		await expect(field).toBeVisible();
		await expect(field).toHaveAttribute('data-starfield-motion', 'live');
		await expect(field.locator('canvas')).toBeVisible();

		// Content must stay above the field
		await expect(page.locator('#main-content')).toBeVisible();
		const mainZ = await page.locator('#main-content').evaluate((el) => {
			return window.getComputedStyle(el).zIndex;
		});
		expect(Number(mainZ)).toBeGreaterThan(0);
	});

	test('falls back to a static field when reduced motion is preferred', async ({
		page
	}) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const field = page.getByTestId('ambient-starfield');
		await expect(field).toBeVisible();
		await expect(field).toHaveAttribute('data-starfield-motion', 'static', {
			timeout: 5_000
		});
	});
});
