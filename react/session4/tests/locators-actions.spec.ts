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

test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('fill sets the input value directly', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');

    await expect(page.getByPlaceholder('Name')).toHaveValue('Vikram');
  });

  test('selectOption selects by visible label text', async ({ page }) => {
    const role = page.locator('select');

    await role.selectOption({ label: 'Backend' });

    await expect(role).toHaveValue('Backend');
  });

  test('selectOption selects by value attribute', async ({ page }) => {
    const role = page.locator('select');

    await role.selectOption('Frontend');

    await expect(role).toHaveValue('Frontend');
  });

/* 
  selectOption('Backend') selects an option using its value attribute
  selectOption({label :'Backend'}) selects it using the text displayed to the user.
*/

/*
check() ensures the checkbox is checked.
uncheck() ensures it is unchecked, regardless of its current state.
Using click() simply toggles the checkbox. 
If it is already checked,click() will uncheck it, which can make the test fail or produce unexpected results.
*/
  test('checkbox is checked by default', async ({ page }) => {
  const presentCheckbox = page.locator('input[name="isPresent"]');

  await expect(presentCheckbox).toBeChecked();
});

test('uncheck removes the checked state', async ({ page }) => {
  const presentCheckbox = page.locator('input[name="isPresent"]');

  await presentCheckbox.uncheck();

  await expect(presentCheckbox).not.toBeChecked();
});

test('check re-applies the checked state', async ({ page }) => {
  const presentCheckbox = page.locator('input[name="isPresent"]');

  await presentCheckbox.uncheck();
  await presentCheckbox.check();

  await expect(presentCheckbox).toBeChecked();
});

/* 
locator.press() sends a key to a specific element.
page.keyboard.press() sends a key to whichever element is currently focused on the page.
page.keyboard.press('Tab') is used to move focus between elements.
*/


test('Tab moves focus from name input to score input', async ({ page }) => {
  const nameInput = page.getByPlaceholder('Name');
  const scoreInput = page.getByPlaceholder('Score');

  await nameInput.focus();
  await expect(nameInput).toBeFocused();

  await page.keyboard.press('Tab');

  await expect(scoreInput).toBeFocused();
});

test('Enter inside name input submits the form', async ({ page }) => {
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('85');
  await page.locator('select').selectOption('Backend');

  await page.getByPlaceholder('Name').press('Enter');

  await expect(page.getByText('Vikram — 85')).toBeVisible();
});


/* 
type() is used when the app needs to respond to each key press.
eg: search box for filtering etc.
Fill() sets the entire value at once . It does not triger the same behaviour as those character-by -character actions.  */


test('clear() empties the input', async ({ page }) => {
  const scoreInput = page.getByPlaceholder('Score');

  await scoreInput.fill('92');
  await scoreInput.clear();

  await expect(scoreInput).toHaveValue('0');
});

test('type() fires individual key events', async ({ page }) => {
  await page.getByPlaceholder('Search').type('Rah');

  await expect(
    page.getByText('Rahul — 92')
  ).toBeVisible();
});

});





