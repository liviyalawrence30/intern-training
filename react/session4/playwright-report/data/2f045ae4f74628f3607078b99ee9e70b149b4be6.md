# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Assertions >> correct number of Remove buttons matches the intern count
- Location: tests\intern-dashboard.spec.ts:131:1

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
  125 | });
  126 | 
  127 | test('score input is 0 initially', async ({ page }) => {
  128 |   await expect(page.getByPlaceholder('Score')).toHaveValue('0');
  129 | });
  130 | 
  131 | test('correct number of Remove buttons matches the intern count', async ({ page }) => {
  132 |   await expect(
  133 |     page.getByRole('button', { name: 'Remove' })
> 134 |   ).toHaveCount(4);/* when the toHaveCount(5) is set ,it takes few seconds to fail.  error:Expected: 5 Received: 4  */
      |     ^ Error: expect(locator).toHaveCount(expected) failed
  135 | });
  136 | 
  137 | test.describe('Add Intern Journey', () => {
  138 | 
  139 |   test.beforeEach(async ({ page }) => {
  140 |     await page.goto('/');
  141 |   });
  142 | 
  143 | 
  144 | // This test checks the complete user flow.
  145 | // It makes sure a new intern is added and shown in the list.
  146 |   test('adds a new intern and shows them in the list', async ({ page }) => {
  147 |     // Fill in the form
  148 |     await page.getByPlaceholder('Name').fill('Vikram');
  149 |     await page.getByPlaceholder('Score').clear();
  150 |     await page.getByPlaceholder('Score').fill('88');
  151 | 
  152 |     // Submit the form
  153 |     await page.getByRole('button', { name: 'Add Intern' }).click();
  154 | 
  155 |     // Check that the new intern appears
  156 |    await expect(page.getByText('Vikram').first()).toBeVisible();
  157 | await expect(page.getByText('Vikram — 88')).toBeVisible();
  158 |   });
  159 | 
  160 |   test('intern count increases after adding', async ({ page }) => {
  161 |     // Check the initial number of interns
  162 |     await expect(
  163 |       page.getByRole('button', { name: 'Remove' })
  164 |     ).toHaveCount(4);
  165 | 
  166 |     await page.getByPlaceholder('Name').fill('Vikram');
  167 |     await page.getByRole('button', { name: 'Add Intern' }).click();
  168 | 
  169 |     // Check that one more intern is added
  170 |     await expect(
  171 |       page.getByRole('button', { name: 'Remove' })
  172 |     ).toHaveCount(5);
  173 |   });
  174 | 
  175 |   test('form clears after successful submission', async ({ page }) => {
  176 |     await page.getByPlaceholder('Name').fill('Vikram');
  177 |     await page.getByPlaceholder('Score').fill('88');
  178 |     await page.getByRole('button', { name: 'Add Intern' }).click();
  179 | 
  180 |     // Check that the form is cleared
  181 |     await expect(page.getByPlaceholder('Name')).toHaveValue('');
  182 |   });
  183 | 
  184 | //not.toBeVisible() checks that the error is no longer shown. It waits automatically until the error disappears.
  185 | //Unlike the Vitest queryByText pattern, we don't need to manually check whether the element exists.
  186 | test('shows validation error when name is empty', async ({ page }) => {
  187 |   // Click submit without entering a name
  188 |   await page.getByRole('button', { name: 'Add Intern' }).click();
  189 | 
  190 |   await expect(page.getByText('Name is required')).toBeVisible();
  191 | });
  192 | 
  193 | test('does not add intern when form is invalid', async ({ page }) => {
  194 |   await page.getByRole('button', { name: 'Add Intern' }).click();
  195 | 
  196 |   // The intern count should stay the same
  197 |   await expect(
  198 |     page.getByRole('button', { name: 'Remove' })
  199 |   ).toHaveCount(4);
  200 | });
  201 | 
  202 | test('validation error disappears after name is entered', async ({ page }) => {
  203 |   await page.getByRole('button', { name: 'Add Intern' }).click();
  204 |   await expect(page.getByText('Name is required')).toBeVisible();
  205 | 
  206 |   await page.getByPlaceholder('Name').fill('Vikram');
  207 | 
  208 |   await expect(page.getByText('Name is required')).not.toBeVisible();
  209 | });
  210 |   });
  211 | 
  212 | 
  213 | 
  214 |   test.describe('Remove Intern Journey', () => {
  215 | 
  216 |   test.beforeEach(async ({ page }) => {
  217 |     await page.goto('/');
  218 |   });
  219 | 
  220 |   test('removes an intern when Remove is clicked', async ({ page }) => {
  221 |   await expect(page.getByText('Rahul').first()).toBeVisible();
  222 | 
  223 |   await page.getByRole('button', { name: 'Remove' }).first().click();
  224 | 
  225 |   await expect(page.getByText('Rahul')).not.toBeVisible();
  226 | });
  227 | 
  228 |   test('intern count decreases after removal', async ({ page }) => {
  229 |     await expect(
  230 |       page.getByRole('button', { name: 'Remove' })
  231 |     ).toHaveCount(4);
  232 | 
  233 |     await page.getByRole('button', { name: 'Remove' }).first().click();
  234 | 
```