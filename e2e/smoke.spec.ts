import { expect, test, type Page } from '@playwright/test';

const SECTIONS = ['home', 'work', 'experience', 'contact'] as const;

async function gotoHome(page: Page) {
	await page.goto('/');
	await expect(page.locator('#home')).toBeVisible();
}

async function openMobileNavIfNeeded(page: Page) {
	const toggle = page.getByRole('button', { name: 'Toggle mobile menu' });
	if (await toggle.isVisible()) {
		const expanded = await toggle.getAttribute('aria-expanded');
		if (expanded !== 'true') {
			await toggle.click();
		}
	}
}

test.describe('Portfolio smoke', () => {
	test('loads core sections and navigation', async ({ page }) => {
		await gotoHome(page);

		for (const id of SECTIONS) {
			await expect(page.locator(`#${id}`)).toBeAttached();
		}

		const nav = page.getByRole('navigation', { name: 'Main navigation' });
		await expect(nav).toBeVisible();
		await expect(
			nav.getByRole('link', { name: /Daniel Bubu Mawuena — Go to home/i })
		).toBeVisible();

		await openMobileNavIfNeeded(page);

		for (const label of ['Home', 'Work', 'Experience', 'Contact']) {
			await expect(nav.getByRole('menuitem', { name: label }).first()).toBeVisible();
		}
	});

	test('Builder / Thinker toggle swaps work content', async ({ page }) => {
		await gotoHome(page);

		const work = page.locator('#work');
		await work.scrollIntoViewIfNeeded();

		await expect(work.getByRole('heading', { name: 'Work & Credentials' })).toBeVisible();
		await expect(page.getByTestId('project-showcase')).toBeVisible();
		await expect(page.getByTestId('project-live-link')).toBeVisible();
		await expect(work.getByRole('heading', { name: 'Tech Stack' })).toBeVisible();

		await work.getByRole('button', { name: 'Toggle between builder and thinker mode' }).click();

		const showcase = page.getByTestId('project-showcase');
		await expect(showcase).toHaveAttribute('data-showcase-mode', 'thinker');
		await expect(showcase.getByRole('heading', { name: 'Engineering approach' })).toBeVisible();
		await expect(work.getByRole('heading', { name: 'Philosophy' })).toBeVisible();
		await expect(page.getByTestId('project-live-link')).toHaveCount(0);
	});

	test('Experience and Contact surfaces stay intact', async ({ page }) => {
		await gotoHome(page);

		const experience = page.locator('#experience');
		await experience.scrollIntoViewIfNeeded();
		await expect(experience.getByRole('heading', { name: 'Experience' })).toBeVisible();
		const firstRole = experience.locator('.experience-item').first();
		await expect(firstRole).toBeVisible();
		await expect(firstRole.getByText('RPL Technologies')).toBeVisible();
		await expect(firstRole.getByText('QA / Frontend Development')).toBeVisible();
		await expect(firstRole.getByText(/Present/i)).toBeVisible();
		await expect(firstRole.getByText(/Fidelity Bank Ghana/i)).toBeVisible();
		await expect(firstRole.getByText(/Kemy/i)).toBeVisible();
		await expect(experience.getByText(/Adroit|KNUST|Intern|Lead/i).first()).toBeVisible();

		const contact = page.locator('#contact');
		await contact.scrollIntoViewIfNeeded();
		await expect(contact.getByRole('heading', { name: 'Ready to Ship?' })).toBeVisible();
		await expect(contact.locator('#name')).toBeVisible();
		await expect(contact.locator('#email')).toBeVisible();
		await expect(contact.locator('#message')).toBeVisible();
		await expect(contact.getByRole('button', { name: 'Send Transmission' })).toBeVisible();
	});

	test('nav scroll reaches the Work section', async ({ page }) => {
		await gotoHome(page);

		await openMobileNavIfNeeded(page);

		const nav = page.getByRole('navigation', { name: 'Main navigation' });
		await nav.getByRole('menuitem', { name: 'Work' }).first().click();
		await expect(page.locator('#work')).toBeInViewport({ ratio: 0.15 });
	});
});
