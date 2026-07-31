import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['list'], ['html', { open: 'never' }]],
	timeout: 30_000,
	expect: {
		timeout: 8_000
	},
	use: {
		baseURL: 'http://127.0.0.1:4173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure'
	},
	webServer: {
		command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
		url: 'http://127.0.0.1:4173',
		reuseExistingServer: !process.env.CI,
		timeout: 180_000
	},
	projects: [
		{
			name: 'Desktop Chrome',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'Tablet',
			use: {
				...devices['Desktop Chrome'],
				viewport: { width: 768, height: 1024 },
				isMobile: true,
				hasTouch: true
			}
		},
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] }
		}
	]
});
