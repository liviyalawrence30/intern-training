import { test } from 'vitest'

test('calculates average score', () => {
  const scores = [92, 78, 45, 95]
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length

  console.log('Average:', avg)
})

/*
Violates the self-validating principle.

The test has no assertion.
So it always passes even if the calculation is incorrect.
This dangerous because it cannot detect failures or verify correct behavior.

*/