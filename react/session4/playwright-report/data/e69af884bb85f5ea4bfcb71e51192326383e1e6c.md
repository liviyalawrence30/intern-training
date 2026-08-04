# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Intern Dashboard >> shows the initial intern names
- Location: tests\intern-dashboard.spec.ts:21:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('button', { name: 'Remove' })
Expected: 4
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByRole('button', { name: 'Remove' })
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - heading "Intern Dashboard" [level=1] [ref=e5]
    - button "Switch to Dark Mode" [ref=e6]
  - generic [ref=e7]:
    - generic [ref=e8]:
      - paragraph [ref=e9]: "Highest: 0 | Lowest: 0 | Avg: 0"
      - paragraph [ref=e10]: "Passing: 0 of 0"
    - list
    - generic [ref=e11]:
      - textbox "Name" [ref=e12]
      - spinbutton "Score" [ref=e13]: "0"
      - checkbox [checked] [ref=e14]
      - text: Present
      - combobox [ref=e15]:
        - option "Frontend" [selected]
        - option "Backend"
        - option "Fullstack"
      - button "Add Intern" [ref=e16]
      - button "Reset" [ref=e17]
    - generic [ref=e18]:
      - textbox "Search Intern" [ref=e19]
      - heading "Statistics" [level=3] [ref=e20]
      - paragraph [ref=e21]: "Total Interns: 0"
      - paragraph [ref=e22]: "Present: 0"
      - paragraph [ref=e23]: "Average Score: 0"
      - heading "Filtered Interns" [level=3] [ref=e24]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Intern Dashboard', () => {
  4   | 
  5   | /*Navigates to the application's home page before each test so every test starts from the same initial state 
  6   | and avoids repeating page.goto('/')in individual test cases.*/
  7   |   test.beforeEach(async ({ page }) => {
  8   |     await page.goto('/');
  9   |   });
  10  | 
  11  |   test('shows the page title', async ({ page }) => {
  12  |     await expect(
  13  |       page.getByRole('heading', { name: 'Intern Dashboard' })
  14  |     ).toBeVisible();
  15  | 
  16  |     /* When I gave the name as "wrong title", the UI clearly provided a screenshot of the intern dashboard name.
  17  |     In the error context file, it clearly said the locator is expected to be visible and it showed the line in the source code pointing the error. */
  18  |     
  19  |   });
  20  | 
  21  |   test('shows the initial intern names', async ({ page }) => {
  22  |   await expect(
  23  |     page.getByRole('button', { name: 'Remove' })
> 24  |   ).toHaveCount(4);
      |     ^ Error: expect(locator).toHaveCount(expected) failed
  25  | 
  26  |   await expect(page.getByText(/Rahul/).first()).toBeVisible();
  27  |   await expect(page.getByText(/Priya/).first()).toBeVisible();
  28  |   await expect(page.getByText(/Amit/).first()).toBeVisible();
  29  |   await expect(page.getByText(/Sneha/).first()).toBeVisible();
  30  | });
  31  | 
  32  |   test('shows the correct number of intern cards', async ({ page }) => {
  33  |     // Each card has a Remove button — count them to count the cards.
  34  |     await expect(
  35  |       page.getByRole('button', { name: 'Remove' })
  36  |     ).toHaveCount(4);
  37  |   });
  38  | 
  39  | /*Playwright's toBeVisible() checks that an element exists and is visible to the user.
  40  | React Testing Library's toBeInTheDocument() only checks that an element exists in the DOM, even if it is hidden.*/
  41  | 
  42  |   test('shows the theme toggle button', async ({ page }) => {
  43  |   await expect(
  44  |     page.getByRole('button', { name: /switch to dark mode/i })
  45  |   ).toBeVisible();
  46  | });
  47  | 
  48  | });
  49  | 
  50  | /*getByRole() is preferred because it finds elements by their role and accessible name.
  51  | Unlike getByTestId(), it encourages accessible applications and produces tests that are more resilient to UI changes.*/
  52  | 
  53  | test.describe('Locator Practice — getByRole', () => {
  54  | 
  55  |   test.beforeEach(async ({ page }) => {
  56  |     await page.goto('/');
  57  |   });
  58  | 
  59  |   test('finds the Add Intern button by role', async ({ page }) => {
  60  |     const addButton = page.getByRole('button', { name: 'Add Intern' });
  61  |     await expect(addButton).toBeVisible();
  62  |   });
  63  | 
  64  |   test('finds the heading by role', async ({ page }) => {
  65  |     const heading = page.getByRole('heading', { name: 'Intern Dashboard' });
  66  |     await expect(heading).toBeVisible();
  67  |   });
  68  | 
  69  | test('finds the name input by placeholder', async ({ page }) => {
  70  |   const nameInput = page.getByPlaceholder('Name');
  71  |   await expect(nameInput).toBeVisible();
  72  |   await expect(nameInput).toBeEmpty();
  73  | });
  74  | 
  75  |  test('finds the score input by placeholder', async ({ page }) => {
  76  |   const scoreInput = page.getByPlaceholder('Score');
  77  |   await expect(scoreInput).toBeVisible();
  78  | });
  79  | 
  80  | 
  81  | //.first() is used because more than one score can match. It selects the first matching element.
  82  | 
  83  | test('finds text with exact matching', async ({ page }) => {
  84  |   await expect(page.getByText('Rahul').first()).toBeVisible();
  85  | });
  86  | 
  87  | test('finds text with regex matching', async ({ page }) => {
  88  |   // Matches any score like "Score: 92" or "Score: 78"
  89  |   await expect(page.getByText(/Score: \d+/).first()).toBeVisible();
  90  | });
  91  | 
  92  | test('asserts that an absent element is not visible', async ({ page }) => {
  93  |   // "Placeholder" is not in the intern list
  94  |   await expect(page.getByText('Placeholder')).not.toBeVisible();
  95  | });
  96  | });
  97  | 
  98  | //toHaveText() checks the full text.
  99  | //toContainText() checks if part of the text is present.
  100 | 
  101 | test.describe('Assertions', () => {
  102 | 
  103 |   test.beforeEach(async ({ page }) => {
  104 |     await page.goto('/');
  105 |   });
  106 | 
  107 |   test('heading has the correct text', async ({ page }) => {
  108 |     await expect(
  109 |       page.getByRole('heading', { name: 'Intern Dashboard' })
  110 |     ).toHaveText('Intern Dashboard');
  111 |   });
  112 | 
  113 |   test('theme toggle button contains the word "Dark"', async ({ page }) => {
  114 |     await expect(
  115 |       page.getByRole('button', { name: /switch to dark mode/i })
  116 |     ).toContainText('Dark');
  117 |   });
  118 | 
  119 |   test('error message is not visible initially', async ({ page }) => {
  120 |     await expect(page.getByText('Name is required')).not.toBeVisible();
  121 |   });
  122 | 
  123 |   test('name input is empty initially', async ({ page }) => {
  124 |   await expect(page.getByPlaceholder('Name')).toHaveValue('');
```