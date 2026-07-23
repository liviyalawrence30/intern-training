import { test as base, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

type DashboardFixture = {
  dashboard: DashboardPage;
};

export const test = base.extend<DashboardFixture>({
  dashboard: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);

    await page.goto('/');

    await use(dashboard);
  },
});

export { expect };