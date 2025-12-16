import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 60_000,

  expect: {
    timeout: 60_000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'https://next-op-staging.vercel.app/',

    /**
     * ✅ CRITICAL FIX
     * GitHub Actions has no display server
     */
    headless: true,

    /**
     * Chromium launch arguments
     */
    launchOptions: {
      args: [
        '--disable-site-isolation-trials',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--allow-running-insecure-content',
        '--no-sandbox',
      ],
    },

    navigationTimeout: 60_000,
    actionTimeout: 60_000,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
