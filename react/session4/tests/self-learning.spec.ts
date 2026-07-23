import { test, expect } from '@playwright/test';

test.describe('fill() vs type()', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('demonstrates the difference between fill() and type()', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name');

    // fill() replaces the existing value
    await nameInput.fill('Rahul');
    await expect(nameInput).toHaveValue('Rahul');

    // type() appends characters to the existing value
    await nameInput.type(' Kumar');
    await expect(nameInput).toHaveValue('Rahul Kumar');
  });

});
test.describe('Keyboard Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('pressing Tab moves focus from name input to score input', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name');
    const scoreInput = page.getByPlaceholder('Score');

    await nameInput.click();
    await nameInput.fill('Vikram');

    // Press Tab to move to the next input
    await page.keyboard.press('Tab');

    // Verify that the score input has focus
    await expect(scoreInput).toBeFocused();
  });

});

test.describe('Screenshot Demo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('takes a screenshot of the dashboard', async ({ page }) => {
    // Take a screenshot of the current page
    await page.screenshot({
      path: 'test-results/dashboard-screenshot.png',
      fullPage: true,
    });

    // Verify the page is still visible
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible();
  });

});

/*
test.only() runs only the marked test or test suite and skips all other tests.
It is useful when debugging a specific test.
test.skip() skips a test or test suite without running it .
It is useful for temporarily disabling tests that are not ready or are failing.
when test.only() is left in a code, it tests only that test and ignores all the other tests.
So,test.only() should be removed before committing.

*/


test.describe('Self Learning', () => {
  test('Soft assertions smoke test', async ({ page }) => {
    await page.goto('/');

    await expect.soft(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible();

    await expect.soft(
      page.getByRole('button', { name: 'Add Intern' })
    ).toBeVisible();

    await expect.soft(
      page.getByPlaceholder('Search Intern')
    ).toBeVisible();

    await expect.soft(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
    });

    /*
    Soft  assertions continue running even if one assertion fails.
    It makes them useful for checking multiple UI elements in one test.
    */

  });

  
  
/*
  test('shows mocked intern data', async ({ page }) => {
  await page.route('/api/interns', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'Mock Intern',
          score: 100,
          role: 'QA',
          isPresent: true,
        },
      ]),
    });
  });

  await page.goto('/');

  await expect(page.getByText('Mock Intern')).toBeVisible();
});
*/



test('intern list visual comparison', async ({ page }) => {
  await page.goto('/');

  // Wait until the initial interns are loaded
  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toHaveCount(4);

  // Capture the baseline screenshot
  await expect(
    page.getByTestId('filtered-interns')
  ).toHaveScreenshot('intern-list-before.png');

  // Add a new intern
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('88');
  await page.getByRole('combobox').selectOption('Backend');
  await page.getByRole('button', { name: 'Add Intern' }).click();

  // Verify the list changed
  await expect(
    page.getByTestId('filtered-interns')
  ).not.toHaveScreenshot('intern-list-before.png');
});


test('reads CSS variable with page.evaluate()', async ({ page }) => {
  await page.goto('/');

  const before = await page.evaluate(() => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--background-color')
      .trim();
  });

  await page.getByRole('button', {
    name: /switch to dark mode/i,
  }).click();

  const after = await page.evaluate(() => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--background-color')
      .trim();
  });

  expect(before).not.toBe(after);
});

/*
page .evaluates() executes java script inside the browser context.
It is useful for reading values such as CSS variables, localStorage, or other browser only APIs that are not directly accessible from Playwright.
*/