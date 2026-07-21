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

/*Playwright's toBeVisible() checks that an element exists and is visible to the user.
React Testing Library's toBeInTheDocument() only checks that an element exists in the DOM, even if it is hidden.*/

  test('shows the theme toggle button', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: /switch to dark mode/i })
  ).toBeVisible();
});

});

/*getByRole() is preferred because it finds elements by their role and accessible name.
Unlike getByTestId(), it encourages accessible applications and produces tests that are more resilient to UI changes.*/

test.describe('Locator Practice — getByRole', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('finds the Add Intern button by role', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add Intern' });
    await expect(addButton).toBeVisible();
  });

  test('finds the heading by role', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Intern Dashboard' });
    await expect(heading).toBeVisible();
  });

test('finds the name input by placeholder', async ({ page }) => {
  const nameInput = page.getByPlaceholder('Name');
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeEmpty();
});

 test('finds the score input by placeholder', async ({ page }) => {
  const scoreInput = page.getByPlaceholder('Score');
  await expect(scoreInput).toBeVisible();
});


//.first() is used because more than one score can match. It selects the first matching element.

test('finds text with exact matching', async ({ page }) => {
  await expect(page.getByText('Rahul').first()).toBeVisible();
});

test('finds text with regex matching', async ({ page }) => {
  // Matches any score like "Score: 92" or "Score: 78"
  await expect(page.getByText(/Score: \d+/).first()).toBeVisible();
});

test('asserts that an absent element is not visible', async ({ page }) => {
  // "Placeholder" is not in the intern list
  await expect(page.getByText('Placeholder')).not.toBeVisible();
});
});