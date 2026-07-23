import { test, expect } from '@playwright/test';

test.describe('Assertions — State', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


  //toBeEnabled() checks that the button is clickable.
  //toBeVisible() only checks that it is shown on the page.
  test('Add Intern button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add Intern' })).toBeEnabled();
  });

  test('name input is editable', async ({ page }) => {
    await expect(page.getByPlaceholder('Name')).toBeEditable();
  });

  test('Present checkbox is checked by default', async ({ page }) => {
    await expect(page.getByRole('checkbox', { name: 'Present' })).toBeChecked();
  });

  test('name input receives focus when clicked', async ({ page }) => {
    await page.getByPlaceholder('Name').click();
    await expect(page.getByPlaceholder('Name')).toBeFocused();
  });

});

test.describe('Assertions — Attributes and Classes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Present checkbox has type attribute of checkbox', async ({ page }) => {
  await expect(
    page.locator('input[name="isPresent"]')
  ).toHaveAttribute('type', 'checkbox');
});

  test('theme toggle changes button text', async ({ page }) => {
  const button = page.getByRole('button', {
    name: /switch to dark mode/i,
  });

  await button.click();

  await expect(
    page.getByRole('button', {
      name: /switch to light mode/i,
    })
  ).toBeVisible();
});

  test('dark class is removed after toggling back to light', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(page.locator('body')).not.toHaveClass(/dark/);
  });
/*
A regex checks that the "dark" class exists even if the element has other CSS classes.
An exact string match would only pass if the class attribute was exactly "dark". 
*/
});

test.describe('Assertions — Page Level', () => {

  test('page has the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Intern Dashboard/);
  });

  test('page URL is the root path', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('dashboard matches the baseline screenshot', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Intern Dashboard' })
  ).toBeVisible();

  await expect(page).toHaveScreenshot('intern-dashboard.png');
});

/* 
In the 1st run, playwright captures the current page and saves it as the baseline screenshot.
In the 2nd run, it compares the current page with the baseline .
If they are identical, the test passes.
*/
});



