# section 1 - task 1.1

layer|  tool   | tests | duration
unit/hook | vitest | 27 | 2.64s
component (RTL)| vitest+RTL | 4| 2.64s
end-to-end|playwright| 90 | 33.0s
total||121||

## comment
This is not close to a pyramid shape because I have many end to end tests than unit tests.

# section 1 -Task 1.2

src/test


generate-id.test.ts - unit test
global-state-bug.test.ts- unit test
global-state-fixed.test.ts - unit test
intern-context.test.tsx - component test
intern-request.test.ts - unit test
intern-utils.test.ts - unit test
intern-validation.test.ts - unit test
scorestats.test.tsx - component test
spot - untestable-code .ts - unit test
useInternForm.test.ts - unit test
useInternSearch.test.ts - unit test

src/tests
intern-dashboard.spec.ts - E2E test
self-learning.spec.ts - E2E test

## comment

Yes. 
some E2E tests can be replaced with unit or compoenent tests. This makes testing faster and easier to debug.
But the complete workflow should be testes and reducing E2E can reduce the confidence in the workflow.

## section 2 - Task 2.1

overall statement coverage: 75%
overall branch coverage: 67.74%
The file with the lowest branch coverage: Scorestats.tsx
One covered branch: where scores.length>0 is false.

test:

test('shows default statistics when there are no interns')

## section 2 - Task 2.3

statements and lines passes the threshold 
But branches and functions does not pass the threshold.

The above test can be added and other tests like test('returns 0 for highest, lowest, and average when there are no interns') can be added.

## section 3 - Task 3.1

Tests failed:
useInternForm.test.ts failed.
inter-validation.test.ts failed.

Expected: "Name is required"
Received: "Wrong message"

about 4 seconds

## comment 
If I need to manually check this it would take me around minimum of 15 minutes.

# section 3 - Task 3.2
Failed test is in intern-dashboard-spec.ts
The button text changed to sumbit intern from add intern - locator failed.

## comment
Unit tests failures show the expected and actual values, making it easy to identify the expected and actual values.
E2E test failures provide more context by showing the failed browser action , the locator state, screenshot and application state . 
It makes it easier to understand where and why the failure occurred.

# section 3 - Task 3.3

None of the existing tests needed to be changed because adding the pass/fail badge didn't affect the existing functionality.
I added a new unit test for getScoreLable() to make sure it returns the correct label based on the intern's score.

## comment
The definition of done is that the feature renders correctly and all tests pass successfully.
Just displaying the feature isn't enough.

# section 4 - Task 4.1

| Stage | What runs | What it checks | Blocks merge if? |
|-------|-----------|---------------|-----------------|
| On every push | unit tests,component tests, coverage|application's logic,components and code coverage|Yes., is the tests or the coverage fail. |
| On every pull request |unit tests, coverage tests, E2E tests, coverage | check if the application follows the user work flow before merging |yes,if any tests fails.|
| Before merge to main | Full CI pipeline| checks the all quality checks| Yes, if any quality checks fail.|

## comment
Unit tests run on every push because they take less time and are easier.
E2E tests longer time since they check the workflow on the real browser, so they usually run on PRs.

The tradeoff is between speed and confidence.

# section 4 - Task 4.2

1. The pipeline runs on very push to any branch and on very pull request
trageting the 'main' branch.
2. 'needs: unti-tests' ensure that the E2E tests run only after the unit tests have passed.
If the unit tests fail, the E2E tests will not run.
3. npm ci - installs all project dependencies.
npm run test:run - it runs the unit and component tests to verify the application's logic and functionality.
npm run test: coverage generates the coverage report and checks whether the required code coverage threshold is met.
4. No. e2e runs successfully when the unit tests run successfully.
5. I would add a coverage threshold of 80% in the vitest configuration and configure the pull request to require the CI pipeline to pass before merging.

## section 4 - Task 4.3

| Risk | Yes/No | File or test name |
|------|--------|-----------------|
| Any test that uses `test.skip`? | No| |
| Any test that uses `console.log` (not asserted)? | No| |
| Any test that calls `fetch` without mocking? | No| |
| Any test that calls `new Date()` inline? | No| |
| Any test over 500ms? (`npx vitest run --reporter verbose`) |No | |
| Any flaky test (run the suite 3 times — does anything fail once)? |No | |

I didn't find any test with the risks mentioned above.


# section 5 - Task 5.1

| Feature | Unit test? | Component test? | E2E test? | What's missing? |
|---------|-----------|----------------|----------|----------------|
| Score validation (0–100) | yes|no |yes | component test|
| Attendance toggle (isPresent) | no|no |yes |unit and component test |
| Search filtering by name |yes |no |yes |component test |
| Add intern form submission |yes |no | yes| component test|

## comment
I would add a component test for the search feature.
It gives good confidence that the UI updates correctly when the user searches and it requires less setup than E2E tests.
