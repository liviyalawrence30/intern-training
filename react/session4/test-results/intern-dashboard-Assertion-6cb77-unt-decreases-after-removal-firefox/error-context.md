# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Assertions >> Remove Intern Journey >> intern count decreases after removal
- Location: tests\intern-dashboard.spec.ts:228:3

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
- generic [ref=f1e3]:
  - navigation [ref=f1e4]:
    - heading "Intern Dashboard" [level=1] [ref=f1e5]
    - button "Switch to Dark Mode" [ref=f1e6]
  - generic [ref=f1e7]:
    - generic [ref=f1e8]:
      - paragraph [ref=f1e9]: "Highest: 0 | Lowest: 0 | Avg: 0"
      - paragraph [ref=f1e10]: "Passing: 0 of 0"
    - list
    - generic [ref=f1e11]:
      - textbox "Name" [ref=f1e12]
      - spinbutton "Score" [ref=f1e13]: "0"
      - checkbox [checked] [ref=f1e14]
      - text: Present
      - combobox [ref=f1e15]:
        - option "Frontend" [selected]
        - option "Backend"
        - option "Fullstack"
      - button "Add Intern" [ref=f1e16]
      - button "Reset" [ref=f1e17]
    - generic [ref=f1e18]:
      - textbox "Search Intern" [ref=f1e19]
      - heading "Statistics" [level=3] [ref=f1e20]
      - paragraph [ref=f1e21]: "Total Interns: 0"
      - paragraph [ref=f1e22]: "Present: 0"
      - paragraph [ref=f1e23]: "Average Score: 0"
      - heading "Filtered Interns" [level=3] [ref=f1e24]
```

# Test source

```ts
  131 | test('correct number of Remove buttons matches the intern count', async ({ page }) => {
  132 |   await expect(
  133 |     page.getByRole('button', { name: 'Remove' })
  134 |   ).toHaveCount(4);/* when the toHaveCount(5) is set ,it takes few seconds to fail.  error:Expected: 5 Received: 4  */
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
> 231 |     ).toHaveCount(4);
      |       ^ Error: expect(locator).toHaveCount(expected) failed
  232 | 
  233 |     await page.getByRole('button', { name: 'Remove' }).first().click();
  234 | 
  235 |     await expect(
  236 |       page.getByRole('button', { name: 'Remove' })
  237 |     ).toHaveCount(3);
  238 |   });
  239 | //filter() searches for the card that contains "Rahul".
  240 | //This avoids using parent traversal and helps target the correct Remove button more clearly.
  241 | 
  242 | });
  243 | 
  244 | 
  245 | 
  246 | /*Playwright tests the complete user interaction in the browser.
  247 | Unlike the Navbar Vitest unit test, it verifies that clicking the button changes the UI 
  248 | and updates the button label correctly.*/
  249 | 
  250 | test.describe('Theme Toggle Journey', () => {
  251 | 
  252 |   test.beforeEach(async ({ page }) => {
  253 |     await page.goto('/');
  254 |   });
  255 | 
  256 |   test('toggle button label changes from Dark to Light after click', async ({ page }) => {
  257 |     await expect(
  258 |       page.getByRole('button', { name: /switch to dark mode/i })
  259 |     ).toBeVisible();
  260 | 
  261 |     await page.getByRole('button', { name: /switch to dark mode/i }).click();
  262 | 
  263 |     await expect(
  264 |       page.getByRole('button', { name: /switch to light mode/i })
  265 |     ).toBeVisible();
  266 |   });
  267 | 
  268 |   test('toggle switches back on second click', async ({ page }) => {
  269 |     await page.getByRole('button', { name: /switch to dark mode/i }).click();
  270 |     await page.getByRole('button', { name: /switch to light mode/i }).click();
  271 | 
  272 |     await expect(
  273 |       page.getByRole('button', { name: /switch to dark mode/i })
  274 |     ).toBeVisible();
  275 |   });
  276 | 
  277 | });
  278 | 
  279 | 
  280 | });
  281 | 
  282 | 
  283 | /*UI mode shows each steps highlighted to the matched element.
  284 | This is easier to understand than the terminal*/
  285 | 
  286 | 
  287 | /*Headless mode runs tests without opening a browser, making it faster for regular development and CI. 
  288 | Headed mode opens the browser window, making it useful for debugging and watching the test execute step by step.*/
  289 | 
  290 | 
  291 | /*
  292 | Shows each step in order and helps to identify where the failure occured.
  293 | Screenshots shows the page at each step to verify the UI during failure.
  294 | Network displays HTTP requests and responses to help diagnose API .
  295 | DOM snapshots shows the page structure at each step to inspect missing or incorrect elements.
  296 |  */
```