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