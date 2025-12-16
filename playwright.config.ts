import dotenv from 'dotenv';
dotenv.config();

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // ⏱ Global Test Timeout (each test can run up to 60 sec)
  timeout: 60000,

  // ⏱ Global Expect Timeout (assertions wait up to 60 sec)
  expect: {
    timeout: 60000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

 use: {
  baseURL: 'https://next-op-staging.vercel.app/',
  
 
  launchOptions: {
    args: [
      '--disable-site-isolation-trials',
      '--unlimited-storage',
      '--disable-web-security',
      '--allow-running-insecure-content'
    ]
  },


    // ⏱ Action and Navigation timeouts (optional, but good practice)
    navigationTimeout: 60000,
    actionTimeout: 60000,

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
