import { test, expect } from '@playwright/test';

test.describe('Intern Dashboard', () => {

  /*Navigates to the application's home page before each test so every test starts from the same initial state 
and avoids repeating page.goto('/')in individual test cases.*/
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible();
  });

  test('shows the initial intern names', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toHaveCount(4);

  await expect(page.getByText(/Rahul/).first()).toBeVisible();
  await expect(page.getByText(/Priya/).first()).toBeVisible();
  await expect(page.getByText(/Amit/).first()).toBeVisible();
  await expect(page.getByText(/Sneha/).first()).toBeVisible();
});

  test('shows the correct number of intern cards', async ({ page }) => {
    // Each card has a Remove button — count them to count the cards.
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
  });

  /*Playwright's toBeVisible() checks that an element exists and is
  visible to the user. React Testing Library's toBeInTheDocument()
  only checks that an element exists in the DOM, even if it is hidden.*/

  test('shows the theme toggle button', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: /switch to dark mode/i })
  ).toBeVisible();
});

});