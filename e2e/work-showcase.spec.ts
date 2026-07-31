import { expect, test } from '@playwright/test';

test.describe('Work project showcase', () => {
	test('shows live projects with previews and rotates between them', async ({
		page
	}) => {
		await page.goto('/');

		const work = page.locator('#work');
		await work.scrollIntoViewIfNeeded();

		const showcase = page.getByTestId('project-showcase');
		await expect(showcase).toBeVisible();
		await expect(showcase).toHaveAttribute('data-showcase-mode', 'builder');

		await expect(page.getByTestId('project-preview-link')).toBeVisible();
		await expect(page.getByTestId('project-live-link')).toBeVisible();
		await expect(page.getByTestId('project-live-link')).toContainText(
			/View Live Project/i
		);

		// Premium previews from /images/projects — dual on desktop, at least one everywhere
		const previewCount = Number(await showcase.getAttribute('data-preview-count'));
		expect(previewCount).toBeGreaterThanOrEqual(1);
		const viewport = page.viewportSize();
		const isDesktopPreview = (viewport?.width ?? 0) >= 768;
		const stage = page.locator(
			isDesktopPreview
				? '[data-testid="project-preview-link"] .preview-stage-desktop'
				: '[data-testid="project-preview-link"] .preview-stage-mobile'
		);
		await expect(stage).toBeVisible();
		const previewImg = stage.locator('img').first();
		await expect(previewImg).toBeAttached();
		await expect(previewImg).toHaveAttribute('src', /\/images\/projects\//);

		// Description overflow: Read more reveals full copy without breaking the card
		const toggle = page.getByTestId('project-desc-toggle');
		await expect(toggle).toBeVisible();
		await toggle.click();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');
		await toggle.click();
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');

		const firstProject = await showcase.getAttribute('data-project');
		expect(firstProject).toBeTruthy();

		await showcase.getByRole('button', { name: 'Next project' }).click();
		await expect(showcase).not.toHaveAttribute('data-project', firstProject!);

		// All four projects reachable via dots
		for (const name of [
			'Airdrop Tracker',
			'Intervue-AI',
			'NabbyCare+',
			'The Control Room'
		]) {
			await showcase.getByRole('tab', { name: `Show ${name}` }).click();
			await expect(showcase).toHaveAttribute('data-project', name);
			await expect(page.getByTestId('project-live-link')).toBeVisible();
		}
	});

	test('Thinker mode shows per-project journal synced to the showcase', async ({
		page
	}) => {
		await page.goto('/');
		const work = page.locator('#work');
		await work.scrollIntoViewIfNeeded();

		await work
			.getByRole('button', { name: 'Toggle between builder and thinker mode' })
			.click();

		const showcase = page.getByTestId('project-showcase');
		await expect(showcase).toHaveAttribute('data-showcase-mode', 'thinker');
		await expect(showcase.getByRole('heading', { name: 'Inspiration' })).toBeVisible();
		await expect(
			showcase.getByRole('heading', { name: 'Engineering approach' })
		).toBeVisible();

		await showcase.getByRole('tab', { name: 'Show NabbyCare+' }).click();
		await expect(showcase).toHaveAttribute('data-project', 'NabbyCare+');
		await expect(showcase.getByText(/CareMap/i)).toBeVisible();
	});
});
