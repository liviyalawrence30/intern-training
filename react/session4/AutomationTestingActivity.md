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

