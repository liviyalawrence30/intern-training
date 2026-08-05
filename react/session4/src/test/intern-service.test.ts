import { describe, test, expect } from 'vitest'
import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from '../services/intern-service'
import type { Intern } from '../types/intern'

describe('createIntern', () => {
  test('generates an id', () => {
    const intern = createIntern(
      {
        name: 'Maria',
        score: 90,
        role: 'Frontend',
        isPresent: true,
      },
      () => 123
    )

    expect(intern.id).toBe(123)
  })

  test('trims the name', () => {
    const intern = createIntern(
      {
        name: '  Maria  ',
        score: 90,
        role: 'Frontend',
        isPresent: true,
      },
      () => 1
    )

    expect(intern.name).toBe('Maria')
  })

  test('rounds the score', () => {
    const intern = createIntern(
      {
        name: 'Maria',
        score: 89.6,
        role: 'Frontend',
        isPresent: true,
      },
      () => 1
    )

    expect(intern.score).toBe(90)
  })
})

describe('validateInternForm', () => {
  test('returns error for empty name', () => {
    expect(validateInternForm('', 80)).toBe('Name is required')
  })

  test('returns error for score above 100', () => {
    expect(validateInternForm('Maria', 120)).toBe('Score must be 0–100')
  })

  test('returns null for valid data', () => {
    expect(validateInternForm('Maria', 90)).toBeNull()
  })
})

describe('calculateAverageScore', () => {
  test('returns 0 for an empty list', () => {
    expect(calculateAverageScore([])).toBe(0)
  })

  test('returns the correct average', () => {
    expect(
      calculateAverageScore([
        {
          id: 1,
          name: 'A',
          score: 80,
          role: 'Frontend',
          isPresent: true,
        },
        {
          id: 2,
          name: 'B',
          score: 100,
          role: 'Backend',
          isPresent: true,
        },
      ])
    ).toBe(90)
  })

  test('rounds the average', () => {
    expect(
      calculateAverageScore([
        {
          id: 1,
          name: 'A',
          score: 80,
          role: 'Frontend',
          isPresent: true,
        },
        {
          id: 2,
          name: 'B',
          score: 81,
          role: 'Backend',
          isPresent: true,
        },
      ])
    ).toBe(81)
  })
})

describe('getScoreLabel', () => {
  test('returns Pass for 50', () => {
    expect(getScoreLabel(50)).toBe('Pass')
  })

  test('returns Fail for 49', () => {
    expect(getScoreLabel(49)).toBe('Fail')
  })

  test('returns Pass for 100', () => {
    expect(getScoreLabel(100)).toBe('Pass')
  })
})

describe('filterInterns', () => {
  const interns = [
    {
      id: 1,
      name: 'Maria',
      score: 90,
      role: 'Frontend',
      isPresent: true,
    },
    {
      id: 2,
      name: 'Rahul',
      score: 80,
      role: 'Backend',
      isPresent: true,
    },
  ]

  test('returns all interns for an empty query', () => {
    expect(filterInterns(interns, '')).toHaveLength(2)
  })

  test('matches by name', () => {
    expect(filterInterns(interns, 'Maria')).toHaveLength(1)
  })

  test('matches by role', () => {
    expect(filterInterns(interns, 'Backend')).toHaveLength(1)
  })

  test('is case-insensitive', () => {
    expect(filterInterns(interns, 'frontend')).toHaveLength(1)
  })
})

//explore tests:
export function sortInternsByScore(
  interns: Intern[],
  order: 'asc' | 'desc'
): Intern[] {
  return [...interns].sort((a, b) =>
    order === 'asc' ? a.score - b.score : b.score - a.score
  )
}