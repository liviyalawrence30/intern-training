import { describe, it, expect } from 'vitest'
import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from '../services/intern-service'

describe('createIntern', () => {
  it('generates an id', () => {
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

  it('trims the name', () => {
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

  it('rounds the score', () => {
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
  it('returns error for empty name', () => {
    expect(validateInternForm('', 80)).toBe('Name is required')
  })

  it('returns error for score above 100', () => {
    expect(validateInternForm('Maria', 120)).toBe('Score must be 0–100')
  })

  it('returns null for valid data', () => {
    expect(validateInternForm('Maria', 90)).toBeNull()
  })
})

describe('calculateAverageScore', () => {
  it('returns 0 for an empty list', () => {
    expect(calculateAverageScore([])).toBe(0)
  })

  it('returns the correct average', () => {
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

  it('rounds the average', () => {
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
  it('returns Pass for 50', () => {
    expect(getScoreLabel(50)).toBe('Pass')
  })

  it('returns Fail for 49', () => {
    expect(getScoreLabel(49)).toBe('Fail')
  })

  it('returns Pass for 100', () => {
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

  it('returns all interns for an empty query', () => {
    expect(filterInterns(interns, '')).toHaveLength(2)
  })

  it('matches by name', () => {
    expect(filterInterns(interns, 'Maria')).toHaveLength(1)
  })

  it('matches by role', () => {
    expect(filterInterns(interns, 'Backend')).toHaveLength(1)
  })

  it('is case-insensitive', () => {
    expect(filterInterns(interns, 'frontend')).toHaveLength(1)
  })
})