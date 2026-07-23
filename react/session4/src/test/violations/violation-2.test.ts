import { test, expect } from 'vitest'
test.skip("score report has today's date", () => {
  const report = { date: new Date().toISOString().slice(0, 10) }

  expect(report.date).toBe('2024-11-15')
})



/*
Violates the Repeatable principle.

The test depends on the current date. 
Since the expected value is hardcoded, it will fail after 2024-11-15.
Tests should produce the same result whenever they are executed.
*/