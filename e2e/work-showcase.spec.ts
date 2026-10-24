import { expect, test } from '@playwright/test';

test.describe('Selected work', () => {
	test('shows case-study cards with real proof lines', async ({ page }) => {
		await page.goto('/');
		const work = page.locator('#work');
		await work.scrollIntoViewIfNeeded();

		const intervue = page.locator('[data-testid="work-card"][data-project="Intervue AI"]');
		await expect(intervue).toBeVisible();
		await expect(intervue).toContainText('84 unit tests');
		await expect(intervue).toContainText('Winifred Anokye');
		await expect(intervue).toContainText('researched');
		await expect(intervue.getByRole('link', { name: 'Visit Intervue AI' })).toBeVisible();
		await expect(intervue.locator('img')).toHaveAttribute('src', /\/images\/projects\//);

		const airdrop = page.locator('[data-testid="also-built"]').filter({ hasText: 'Airdrop Tracker' });
		await expect(airdrop).toContainText('Archived');
		await expect(airdrop).toContainText('Once had 140+ active users');
		const airdropText = await airdrop.innerText();
		expect(airdropText).not.toMatch(/140\+ Active Users/);
	});

	test('case study pages keep the failure-first shape', async ({ page }) => {
		await page.goto('/work/intervue-ai/');
		await expect(page.getByRole('heading', { level: 1, name: 'Intervue AI' })).toBeVisible();
		await expect(page.getByRole('heading', { name: /What broke/ })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Honest limits/ })).toBeVisible();
		await expect(page.getByText('Winifred Anokye').first()).toBeVisible();
		await expect(page.getByText(/researched/i).first()).toBeVisible();

		await page.goto('/work/the-control-room/');
		await expect(page.getByText('Nii Omanye Harding').first()).toBeVisible();
		await expect(page.getByText('Next.js 14').first()).toBeVisible();

		await page.goto('/work/nabbycare/');
		await expect(page.getByText(/not a diagnosis/i).first()).toBeVisible();

		await page.goto('/work/wondez-barber/');
		await expect(page.getByText('GHS 50').first()).toBeVisible();
		await expect(page.getByText('The barber can still say sit down.').first()).toBeVisible();
	});
});
