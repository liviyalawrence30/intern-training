import { describe, test, expect } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('validateInternForm', () => {
  test('returns "Name is required" when name is empty string', () => {
    expect(validateInternForm('', 50)).toBe('Name is required')
  })

  test('returns "Name is required" when name is only whitespace', () => {
    expect(validateInternForm('   ', 50)).toBe('Name is required')
  })

  test('returns "Score must be 0–100" when score is 101', () => {
    expect(validateInternForm('Rahul', 101)).toBe('Score must be 0–100')
  })

  test('returns "Score must be 0–100" when score is -1', () => {
    expect(validateInternForm('Rahul', -1)).toBe('Score must be 0–100')
  })

  test('returns null when name is "Rahul" and score is 92', () => {
    expect(validateInternForm('Rahul', 92)).toBeNull()
  })

  test('returns null when score is exactly 0', () => {
    expect(validateInternForm('Rahul', 0)).toBeNull()
  })

  test('returns null when score is exactly 100', () => {
    expect(validateInternForm('Rahul', 100)).toBeNull()
  })
})

//Only one line of arrange is required for each test.
//Testing the same logic through the hook with renderHook would require more setup, such as rendering the hook, updating state, and handling React.



//Task 6.2

/*
| Test | Fast? | Independent? | Repeatable? | Self-validating? | Timely? |
|------|-------|--------------|-------------|------------------|---------|
| `validateInternForm` tests | yes| yes| yes| yes| yes|
| `useInternForm` hook tests | yes| yes| yes| yes| yes|
| `SummaryBar` presentational tests | yes| yes| yes| yes| yes|
| `filterInterns` utility tests | yes| yes| yes| yes| yes|
*/

//validateInternForm function benefited most from refactoring.
//scorestats still needs some refactoring.

/* explore
test(
  'returns null when score is exactly 100',
  { timeout: 5000 },
  () => {
    expect(validateInternForm('Rahul', 100)).toBeNull()
  }
)*/