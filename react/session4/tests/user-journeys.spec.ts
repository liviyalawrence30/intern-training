import { test, expect } from '@playwright/test';

test.describe('User Journey — Add Intern', () => {
/*
This journey verifies the full workflow from user input to the updated UI.
It ensures the form, shared state, and intern list all work together correctly.

The AddInternForm unit test cannot confirm that the entire application updates correctly after submission.
It tests the form component in isolation.
*/
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user fills the form and the new intern appears in the list', async ({ page }) => {
    // Confirm initial state
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    // Fill the form
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');
    await page.locator('select[name="role"]').selectOption('Frontend');

    // Submit
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // New intern's card heading appears
   await expect(page.getByText('Vikram — 88')).toBeVisible();
await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(5);
  });

  test('new intern with score 88 appears in the list', async ({ page }) => {
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('88');
  await page.locator('select[name="role"]').selectOption('Frontend');

  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByText('Vikram — 88')).toBeVisible();
});

  test('new intern with score 45 appears in the list', async ({ page }) => {
  await page.getByPlaceholder('Name').fill('Ravi');
  await page.getByPlaceholder('Score').fill('45');
  await page.locator('select[name="role"]').selectOption('Frontend');

  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByText('Ravi — 45')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(5);
});

  test('form resets to empty after successful submission', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByPlaceholder('Name')).toHaveValue('');
  });

});

test.describe('User Journey — Add Intern Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows error when submitting with empty name', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
  });

  test('does not add intern when name is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
  });

  test('error clears after entering a valid name and resubmitting', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();

    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

  test('shows error when score is above 100', async ({ page }) => {
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('150');
  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(
    page.getByText(/Score must be 0.*100/)
  ).toBeVisible();
});

});

test.describe('User Journey — Search and Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('typing in search filters the filtered list', async ({ page }) => {
    await page.getByPlaceholder('Search Intern').type('Rah');

    const filtered = page.getByTestId('filtered-interns');

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Frontend')).toBeVisible();
    await expect(filtered.getByText('92')).toBeVisible();
    await expect(filtered.getByText('Priya')).toHaveCount(0);
  });

  test('clearing search restores all interns', async ({ page }) => {
    const filtered = page.getByTestId('filtered-interns');

    await page.getByPlaceholder('Search Intern').fill('Rahul');

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Priya')).toHaveCount(0);

    await page.getByPlaceholder('Search Intern').clear();

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Priya')).toBeVisible();
    await expect(filtered.getByText('Amit')).toBeVisible();
    await expect(filtered.getByText('Sneha')).toBeVisible();
  });

  test('search is case-insensitive', async ({ page }) => {
    const filtered = page.getByTestId('filtered-interns');

    await page.getByPlaceholder('Search Intern').fill('rahul');

    await expect(filtered.getByText('Rahul')).toBeVisible();
    await expect(filtered.getByText('Frontend')).toBeVisible();
    await expect(filtered.getByText('92')).toBeVisible();
    await expect(filtered.getByText('Priya')).toHaveCount(0);
  });

  test('no match shows empty state message', async ({ page }) => {
    await page.getByPlaceholder('Search Intern').fill('zzz');

    await expect(page.getByText('No interns found')).toBeVisible();
  });

 



});

/* 

getByRole('heading', { name: 'Rahul' }).locator('..') removes the exact intern .
first() is unreliable because it simply clicks the 1st remove button on the page.
If the list order changes, .first() may remove the wrong intern.
*/

test.describe('User Journey — Remove Intern', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("clicking Remove on Rahul's card removes Rahul from the list", async ({ page }) => {
    await expect(page.getByText('Rahul — 92')).toBeVisible();

    const rahulCard = page.getByTestId('intern-Rahul');

    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByText('Rahul — 92')).toHaveCount(0);
  });

  test('intern count decreases after removal', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    const rahulCard = page.getByTestId('intern-Rahul');

    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(3);
  });

  test('other interns remain after one is removed', async ({ page }) => {
    const rahulCard = page.getByTestId('intern-Rahul');

    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByText('Priya — 78')).toBeVisible();
    await expect(page.getByText('Amit — 45')).toBeVisible();
    await expect(page.getByText('Sneha — 95')).toBeVisible();
  });

  test('removed intern does not reappear after page interaction', async ({ page }) => {
    const rahulCard = page.getByTestId('intern-Rahul');

    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await page.getByRole('button', {
      name: /switch to dark mode/i,
    }).click();

    await expect(page.getByText('Rahul — 92')).toHaveCount(0);
  });
});

// Theme change is verified by the button label.
// With CSS classes, the class is verified instead.
test.describe('User Journey — Theme Toggle', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button shows current mode to switch to', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

  test('clicking toggle switches to dark mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // The button text changes, indicating the theme has switched.
    await expect(
      page.getByRole('button', { name: /switch to light mode/i })
    ).toBeVisible();
  });

  test('clicking toggle again switches back to light mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});

