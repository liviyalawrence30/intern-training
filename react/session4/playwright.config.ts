import { defineConfig, devices } from '@playwright/test';

declare const process: { env: { CI?: string } };

export default defineConfig({
  testDir: './tests',

  // Allows multiple test files to run in parallel for faster execution.
  fullyParallel: true,

  // Retries failed tests twice when running in a CI environment.
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,

  use: {
    // Sets the default URL used by Playwright when navigating to pages.
    baseURL: 'http://localhost:5173',

    // Captures a trace only when a test fails on its first attempt and is retried.
    trace: 'on-first-retry',

    screenshot: 'only-on-failure',
  },

/*Playwright uses the Desktop Chrome device preset, which provides
a desktop viewport size, user agent, and device pixel ratio
to simulate the Chrome browser on a desktop.*/
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
],

  // Starts the development server before running the tests.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});

/*Examples of mobile device presets available in Playwright:
devices['iPhone 14']
 devices['Pixel 7']*/