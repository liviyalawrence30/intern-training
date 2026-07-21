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

//toHaveText() checks the full text.
//toContainText() checks if part of the text is present.

test.describe('Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('heading has the correct text', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toHaveText('Intern Dashboard');
  });

  test('theme toggle button contains the word "Dark"', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toContainText('Dark');
  });

  test('error message is not visible initially', async ({ page }) => {
    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

  test('name input is empty initially', async ({ page }) => {
  await expect(page.getByPlaceholder('Name')).toHaveValue('');
});

test('score input is 0 initially', async ({ page }) => {
  await expect(page.getByPlaceholder('Score')).toHaveValue('0');
});

test('correct number of Remove buttons matches the intern count', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toHaveCount(4);/* when the toHaveCount(5) is set ,it takes few seconds to fail.  error:Expected: 5 Received: 4  */
});

test.describe('Add Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


// This test checks the complete user flow.
// It makes sure a new intern is added and shown in the list.
  test('adds a new intern and shows them in the list', async ({ page }) => {
    // Fill in the form
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');

    // Submit the form
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // Check that the new intern appears
   await expect(page.getByText('Vikram').first()).toBeVisible();
await expect(page.getByText('Vikram — 88')).toBeVisible();
  });

  test('intern count increases after adding', async ({ page }) => {
    // Check the initial number of interns
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // Check that one more intern is added
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(5);
  });

  test('form clears after successful submission', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').fill('88');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // Check that the form is cleared
    await expect(page.getByPlaceholder('Name')).toHaveValue('');
  });

//not.toBeVisible() checks that the error is no longer shown. It waits automatically until the error disappears.
//Unlike the Vitest queryByText pattern, we don't need to manually check whether the element exists.
test('shows validation error when name is empty', async ({ page }) => {
  // Click submit without entering a name
  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
});

test('does not add intern when form is invalid', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Intern' }).click();

  // The intern count should stay the same
  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toHaveCount(4);
});

test('validation error disappears after name is entered', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Intern' }).click();
  await expect(page.getByText('Name is required')).toBeVisible();

  await page.getByPlaceholder('Name').fill('Vikram');

  await expect(page.getByText('Name is required')).not.toBeVisible();
});
  });



  test.describe('Remove Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('removes an intern when Remove is clicked', async ({ page }) => {
  await expect(page.getByText('Rahul').first()).toBeVisible();

  await page.getByRole('button', { name: 'Remove' }).first().click();

  await expect(page.getByText('Rahul')).not.toBeVisible();
});

  test('intern count decreases after removal', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

    await page.getByRole('button', { name: 'Remove' }).first().click();

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(3);
  });
//filter() searches for the card that contains "Rahul".
//This avoids using parent traversal and helps target the correct Remove button more clearly.

});



/*Playwright tests the complete user interaction in the browser.
Unlike the Navbar Vitest unit test, it verifies that clicking the button changes the UI 
and updates the button label correctly.*/

test.describe('Theme Toggle Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button label changes from Dark to Light after click', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();

    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to light mode/i })
    ).toBeVisible();
  });

  test('toggle switches back on second click', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});


});


