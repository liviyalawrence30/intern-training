import { test, expect } from './fixtures';


/*
dashboard.themeToggle is created once in the DashboardPage constructor using a locator that matches the theme toggle button.
After clicking it, the button text changes to "Switch to Light Mode".
So checking for "Light" confirms the theme has changed and the next available action is to switch back.
*/

test.describe('Journeys via Page Object', () => {
  
  test('adds a new intern', async ({dashboard}) => {
    await dashboard.addIntern('Vikram', '88', 'Backend');

    await expect(dashboard.internCard('Vikram')).toBeVisible();
    await expect(dashboard.internCount).toHaveCount(5);
  });

  test('searches and filters the list', async ({dashboard}) => {
    await dashboard.search('Rah');

    const filtered = dashboard.page.getByTestId('filtered-interns');

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Priya')).toHaveCount(0);
  });

  test('clears search and restores all interns', async ({dashboard}) => {
    const filtered = dashboard.page.getByTestId('filtered-interns');

    await dashboard.search('Rahul');
    await dashboard.clearSearch();

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Priya')).toBeVisible();
    await expect(filtered.getByText('Amit')).toBeVisible();
    await expect(filtered.getByText('Sneha')).toBeVisible();
  });

  test('removes an intern by name', async ({dashboard}) => {
    await dashboard.removeButtonFor('Rahul').click();

    await expect(dashboard.internCard('Rahul')).toBeHidden();
    await expect(dashboard.internCount).toHaveCount(3);
  });

  test('toggles theme and button label updates', async ({dashboard}) => {
    await dashboard.toggleTheme();

    await expect(dashboard.themeToggle).toContainText('Light');
  });
  test('shows validation error on empty submit', async ({dashboard}) => {
  await dashboard.addButton.click();

  await expect(dashboard.page.getByText('Name is required')).toBeVisible();
});

});

//or() combines 2 locators and matches either one.
//It is useful when the same element can be identified in different ways.


test('chromium-only feature check', async ({ page, browserName }) => {
  // Skip this test on Firefox and WebKit
  test.skip(
    browserName !== 'chromium',
    'This test targets Chromium-specific behaviour only'
  );

  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Intern Dashboard' })
  ).toBeVisible();
});


/* test.skip(browserName !== 'chromium', ...) can be used when,
testing experimental CSS features such as CSS view templates 
because support is not consistent across chromium, firefox and webkit.
*/