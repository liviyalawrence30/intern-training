import { test, expect } from 'vitest'

const interns: { id: number; name: string }[] = []

test('can add first intern', () => {
  interns.push({ id: 1, name: 'Rahul' })
  expect(interns).toHaveLength(1)
})

test('can add second intern', () => {
  interns.push({ id: 2, name: 'Priya' })
  expect(interns).toHaveLength(2)   // fails if run alone
})

/*
violates the independent principle.
The second test depends on the first test because both share the same 'interns' array. 
If the second test is run in isolation, the array is empty, so the expected length of 2 is not reached and the test fails.
Each test should be independent and not rely on the state created by another test.
*/

