import { test, expect } from '@playwright/test';

test.describe('Locator Chaining and Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('finds Rahul\'s Remove button using filter', async ({ page }) => {
    const rahulCard = page.locator('div').filter({ hasText: 'Rahul' });
    const removeButton = rahulCard.getByRole('button', { name: 'Remove' });

    await expect(removeButton.first()).toBeVisible();
  });

  test('finds Priya\'s score using filter and chaining', async ({ page }) => {
    const priyaCard = page.locator('div').filter({ hasText: 'Priya' });

    await expect(priyaCard.first()).toBeVisible();
    await expect(priyaCard.getByText('78').first()).toBeVisible();
  });
/*
filter({hastext:'Priya}) is safer than .nth(1) because it finds the row by its content instead of its position.
If rows are added,removed or reordered , the test will locate Priya's row correctly but .nth(1)
may opint to the wrong row.*/


 test('counts the card containing Rahul', async ({ page }) => {
  const rahulCard = page.locator('div').filter({
    has: page.getByText('Rahul'),
  });

  await expect(rahulCard.first()).toBeVisible();
});

test('counts the card containing Sneha', async ({ page }) => {
  const snehaCard = page.locator('div').filter({
    has: page.getByText('Sneha'),
  });

  await expect(snehaCard.first()).toBeVisible();
});

/*
filter({ hasText: 'Rahul' }) searches for elements whose text contains 'Rahul'.
filter({ has: page.getByText('Rahul') }) keeps only elements that
contain a child matching the given locator, making it more precise
when targeting nested elements.
*/
test('first Remove button belongs to the first intern', async ({ page }) => {
  const firstRemove = page.getByRole('button', { name: 'Remove' }).first();

  await expect(firstRemove).toBeVisible();
});

test('last Remove button belongs to the last intern', async ({ page }) => {
  const lastRemove = page.getByRole('button', { name: 'Remove' }).last();

  await expect(lastRemove).toBeVisible();
});

test('second intern card is accessible by index', async ({ page }) => {
  const secondRemove = page.getByRole('button', { name: 'Remove' }).nth(1);

  await expect(secondRemove).toBeVisible();
});

test('removes the first intern', async ({ page }) => {
  const removeButtons = page.getByRole('button', { name: 'Remove' });
  await expect(removeButtons).toHaveCount(4);
  await removeButtons.first().click();
  await expect(removeButtons).toHaveCount(3);
});

/* 
.nth() selects an element based on its position in the list .
It can become unreliable if items are added,removed or reordered because the same index may point to a different element.
It is safer to locate elements using unique text or other stable attributes whenever possible.
 */

test.describe('Scoped Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("asserts score and Remove button inside Rahul's card only", async ({ page }) => {
    const rahulCard = page
      .getByText('Rahul — 92')
      .locator('..');

    await expect(
      rahulCard.getByText('Rahul — 92')
    ).toBeVisible();

    await expect(
      rahulCard.getByRole('button', { name: 'Remove' })
    ).toBeVisible();
  });

  test('asserts different data in two different cards', async ({ page }) => {
    const rahulCard = page
      .getByText('Rahul — 92')
      .locator('..');

    const amitCard = page
      .getByText('Amit — 45')
      .locator('..');

    await expect(
      rahulCard.getByText('Rahul — 92')
    ).toBeVisible();

    await expect(
      amitCard.getByText('Amit — 45')
    ).toBeVisible();
  });

});
/*
Scoped locators search only inside a specific intern card instead of the entire page.
This avoids matching Remove buttons or scores from other intern cards 
and makes the test more accurate and reliable.
 */

test('fills the form using scoped locators on the form container', async ({ page }) => {
  const form = page.getByRole('form', { name: 'Add Intern' });

  await form.getByPlaceholder('Name').fill('Vikram');
  await form.getByPlaceholder('Score').fill('75');
  await form.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByText('Vikram — 75')).toBeVisible();
});
/*
Scoping locators limits the search to a specific form or section, making tests more reliable .
Scenarios:
1.If multiple forms contain a "Name" input,scoping ensures the correct input field is filled instead of another one.
2.If different sections have an "Add" or "Submit" button, scoping ensures the test clicks the button in the intended form ,preventing a false-positive test pass.

*/

});





