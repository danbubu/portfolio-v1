import { expect, test } from '@playwright/test';

test.describe('Hero tech orbit', () => {
	test('renders orbiting badges with visible labels', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'no-preference' });
		await page.goto('/');

		await expect(page.locator('#home')).toBeVisible();
		await expect(page.getByTestId('tech-orbit')).toBeVisible();

		for (const name of ['React', 'AWS', 'Tailwind', 'Firebase']) {
			const badge = page.locator(`[data-testid="orbit-badge"][data-tech="${name}"]`);
			await expect(badge).toBeVisible();
			// Labels stay readable on touch + desktop (no hover-only hide).
			await expect(badge.locator('.orbit-badge-label')).toBeVisible();
			await expect(badge.locator('.orbit-badge-label')).toHaveText(name);
		}

		const react = page.locator('[data-testid="orbit-badge"][data-tech="React"]');
		const hoverCapable = await page.evaluate(
			() => window.matchMedia('(hover: hover) and (pointer: fine)').matches
		);

		if (hoverCapable) {
			await react.dispatchEvent('mouseenter');
			await expect(react).toHaveClass(/is-paused/);
			await react.dispatchEvent('mouseleave');
			await expect(react).not.toHaveClass(/is-paused/);
		} else {
			// Touch: tap toggles pause (no hover).
			await react.dispatchEvent('click');
			await expect(react).toHaveClass(/is-paused/);
			await react.dispatchEvent('click');
			await expect(react).not.toHaveClass(/is-paused/);
		}
	});

	test('falls back to static badges when reduced motion is preferred', async ({
		page
	}) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const staticBadges = page.locator(
			'[data-testid="orbit-badge"][data-orbit-mode="static"]'
		);
		await expect(staticBadges).toHaveCount(4, { timeout: 5_000 });
		await expect(page.getByTestId('tech-orbit')).toHaveCount(0);
	});
});
