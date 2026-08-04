import { describe, test, expect } from 'vitest'
import { generateInternId } from '../utils/generate-id'

describe('generateInternId', () => {
  test('using injected values returns expected id', () => {
    const id = generateInternId(
      () => 1234567890,
      () => 0.123
    )

    expect(id).toBe('intern-1234567890-0.123')
  })

  test('returns the same id with the same injected values', () => {
    const id1 = generateInternId(
      () => 1234567890,
      () => 0.123
    )

    const id2 = generateInternId(
      () => 1234567890,
      () => 0.123
    )

    expect(id1).toBe(id2)
  })
})
