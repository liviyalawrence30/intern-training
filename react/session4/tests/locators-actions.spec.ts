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

});


