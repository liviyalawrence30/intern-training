import { describe, test, expect } from 'vitest'
import { prepareInternRequest } from '../utils/intern-request'

describe('prepareInternRequest', () => {
  test('prepares request payload', () => {
    const data = {
      name: 'Rahul',
      score: 92,
      isPresent: true,
      role: 'Frontend',
    }

    expect(prepareInternRequest(data)).toEqual({
      method: 'POST',
      body: JSON.stringify(data),
    })
  })
})