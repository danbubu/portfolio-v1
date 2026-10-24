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

	test('selected work names the four current builds', async ({ page }) => {
		await gotoHome(page);
		const work = page.locator('#work');
		await work.scrollIntoViewIfNeeded();

		await expect(work.getByRole('heading', { name: 'Selected work' })).toBeVisible();
		for (const title of ['Intervue AI', 'NabbyCare+', 'The Control Room', 'Wondez Barber']) {
			await expect(work.getByRole('heading', { name: title })).toBeVisible();
		}
		await expect(work.getByRole('link', { name: 'Read the Intervue AI case study' })).toBeVisible();
	});

	test('Experience and Contact surfaces stay intact', async ({ page }) => {
		await gotoHome(page);

		const experience = page.locator('#experience');
		await experience.scrollIntoViewIfNeeded();
		await expect(experience.getByRole('heading', { name: 'Experience' })).toBeVisible();
		const firstRole = experience.locator('.experience-item').first();
		await expect(firstRole).toBeVisible();
		await expect(firstRole.getByText('KAVD Corp')).toBeVisible();
		await expect(firstRole.getByText('CTO and co-founder')).toBeVisible();
		await expect(firstRole.getByText(/Present/i)).toBeVisible();

		await expect(experience.getByText('QA and Frontend Engineer')).toBeVisible();
		await expect(experience.getByText('RPL Technologies')).toBeVisible();
		await expect(experience.getByText(/Fidelity Bank Ghana/i)).toBeVisible();
		await expect(experience.getByText(/Kemy/i)).toBeVisible();
		await expect(experience.getByText(/Winifred Anokye/i)).toBeVisible();

		const contact = page.locator('#contact');
		await contact.scrollIntoViewIfNeeded();
		await expect(contact.getByRole('heading', { name: "Let's talk" })).toBeVisible();
		await expect(contact.locator('#name')).toBeVisible();
		await expect(contact.locator('#email')).toBeVisible();
		await expect(contact.locator('#message')).toBeVisible();
		await expect(contact.getByRole('button', { name: 'Send message' })).toBeVisible();
	});

	test('nav scroll reaches the Work section', async ({ page }) => {
		await gotoHome(page);

		await openMobileNavIfNeeded(page);

		const nav = page.getByRole('navigation', { name: 'Main navigation' });
		await nav.getByRole('menuitem', { name: 'Work' }).first().click();
		await expect(page.locator('#work')).toBeInViewport({ ratio: 0.15 });
	});
});
