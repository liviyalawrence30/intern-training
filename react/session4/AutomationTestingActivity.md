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