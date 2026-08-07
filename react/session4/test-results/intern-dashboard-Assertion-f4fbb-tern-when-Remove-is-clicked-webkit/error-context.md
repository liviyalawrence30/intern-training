# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Assertions >> Remove Intern Journey >> removes an intern when Remove is clicked
- Location: tests\intern-dashboard.spec.ts:220:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Rahul').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Rahul').first()

```

```yaml
- navigation:
  - heading "Intern Dashboard" [level=1]
  - button "Switch to Dark Mode"
- paragraph: "Highest: 0 | Lowest: 0 | Avg: 0"
- paragraph: "Passing: 0 of 0"
- list
- textbox "Name"
- spinbutton "Score": "0"
- checkbox [checked]
- text: Present
- combobox:
  - option "Frontend" [selected]
  - option "Backend"
  - option "Fullstack"
- button "Add Intern"
- button "Reset"
- textbox "Search Intern"
- heading "Statistics" [level=3]
- paragraph: "Total Interns: 0"
- paragraph: "Present: 0"
- paragraph: "Average Score: 0"
- heading "Filtered Interns" [level=3]
```

# Test source

```ts
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
> 221 |   await expect(page.getByText('Rahul').first()).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
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