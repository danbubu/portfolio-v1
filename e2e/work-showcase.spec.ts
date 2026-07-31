import { expect, test } from '@playwright/test';

test.describe('Work project showcase', () => {
	test('shows live projects with previews and rotates between them', async ({
		page
	}) => {
		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');

		const work = page.locator('#work');
		await work.scrollIntoViewIfNeeded();

		const showcase = page.getByTestId('project-showcase');
		await expect(showcase).toBeVisible();
		await expect(showcase).toHaveAttribute('data-showcase-mode', 'builder');

		await expect(page.getByTestId('project-preview-link')).toBeVisible();
		await expect(page.getByTestId('project-live-link')).toContainText(
			/View Live Project/i
		);

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

		const previewImg = stage.locator('img.preview-img').first();
		await expect(previewImg).toBeAttached();
		await expect(previewImg).toHaveAttribute('src', /\/images\/projects\//);
		await expect(previewImg).toHaveClass(/object-contain/);
		await expect(stage.locator('img.preview-backdrop').first()).toBeAttached();

		// Full description always visible — no read-more control
		await expect(page.getByTestId('project-description')).toBeVisible();
		await expect(page.getByTestId('project-desc-toggle')).toHaveCount(0);
		await expect(page.getByTestId('project-tech-chips')).toBeVisible();

		// Preview arrows removed — dots only when dual
		await expect(
			page.getByRole('button', { name: 'Previous preview image' })
		).toHaveCount(0);
		await expect(
			page.getByRole('button', { name: 'Next preview image' })
		).toHaveCount(0);

		if (previewCount >= 2) {
			const startIndex = await showcase.getAttribute('data-preview-index');
			await expect
				.poll(async () => showcase.getAttribute('data-preview-index'), {
					timeout: 5000
				})
				.not.toBe(startIndex);
		}

		const firstProject = await showcase.getAttribute('data-project');
		expect(firstProject).toBeTruthy();

		await showcase.getByRole('button', { name: 'Next project' }).click();
		await expect(showcase).not.toHaveAttribute('data-project', firstProject!);

		await showcase.getByRole('tab', { name: 'Show Intervue-AI' }).click();
		await expect(showcase).toHaveAttribute('data-project', 'Intervue-AI');
		await expect(page.getByTestId('project-live-link')).toBeVisible();
	});

	test('Thinker mode shows per-project journal synced to the showcase', async ({
		page
	}) => {
		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');

		const work = page.locator('#work');
		await work.scrollIntoViewIfNeeded();

		await page
			.getByRole('button', { name: 'Toggle between builder and thinker mode' })
			.click();

		const showcase = page.getByTestId('project-showcase');
		await expect(showcase).toHaveAttribute('data-showcase-mode', 'thinker');
		await expect(showcase.getByRole('heading', { name: 'Inspiration' })).toBeVisible();
		await expect(
			showcase.getByRole('heading', { name: 'Engineering approach' })
		).toBeVisible();

		await expect(page.getByTestId('philosophy-copy')).toBeVisible();
		await expect(page.getByTestId('philosophy-copy')).toHaveClass(/font-serif/);

		await showcase.getByRole('tab', { name: 'Show NabbyCare+' }).click();
		await expect(showcase).toHaveAttribute('data-project', 'NabbyCare+');
		await expect(showcase.getByText(/CareMap/i)).toBeVisible();
	});
});
