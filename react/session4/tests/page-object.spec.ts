import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

/*
dashboard.themeToggle is created once in the DashboardPage constructor using a locator that matches the theme toggle button.
After clicking it, the button text changes to "Switch to Light Mode".
So checking for "Light" confirms the theme has changed and the next available action is to switch back.
*/

test.describe('Journeys via Page Object', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('adds a new intern', async () => {
    await dashboard.addIntern('Vikram', '88', 'Backend');

    await expect(dashboard.internCard('Vikram')).toBeVisible();
    await expect(dashboard.internCount).toHaveCount(5);
  });

  test('searches and filters the list', async () => {
    await dashboard.search('Rah');

    const filtered = dashboard.page.getByTestId('filtered-interns');

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Priya')).toHaveCount(0);
  });

  test('clears search and restores all interns', async () => {
    const filtered = dashboard.page.getByTestId('filtered-interns');

    await dashboard.search('Rahul');
    await dashboard.clearSearch();

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Priya')).toBeVisible();
    await expect(filtered.getByText('Amit')).toBeVisible();
    await expect(filtered.getByText('Sneha')).toBeVisible();
  });

  test('removes an intern by name', async () => {
    await dashboard.removeButtonFor('Rahul').click();

    await expect(dashboard.internCard('Rahul')).toBeHidden();
    await expect(dashboard.internCount).toHaveCount(3);
  });

  test('toggles theme and button label updates', async () => {
    await dashboard.toggleTheme();

    await expect(dashboard.themeToggle).toContainText('Light');
  });
  test('shows validation error on empty submit', async () => {
  await dashboard.addButton.click();

  await expect(dashboard.page.getByText('Name is required')).toBeVisible();
});

});

//or() combines 2 locators and matches either one.
//It is useful when the same element can be identified in different ways.

