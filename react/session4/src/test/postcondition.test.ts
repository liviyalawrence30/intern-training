import { describe, test, expect } from 'vitest'
import { getSortedNumbers } from '../utils/postcondition'

describe('postcondition ', () => {
  test('throws when array is not sorted', () => {
    expect(() => getSortedNumbers()).toThrow(
      'getSortedNumbers: expected a sorted array'
    )
  })
})