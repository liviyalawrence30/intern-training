import { describe, test, expect } from 'vitest'
import { getRoleLabel } from '../utils/role-label'

describe('getRoleLabel', () => {
  test('returns the correct label for Frontend', () => {
    expect(getRoleLabel('Frontend')).toBe('Frontend Developer')
  })

  test("returns 'Unknown' for an unknown role", () => {
    expect(getRoleLabel('Designer')).toBe('Unknown')
  })
})