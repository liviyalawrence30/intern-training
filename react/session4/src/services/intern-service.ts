import type { Intern, InternFormState } from '../types/intern'
import { assert } from '../utils/assert'

export function createIntern(
  form: InternFormState,
  generateId: () => number = Date.now
): Intern {
  return {
    id: generateId(),
    name: form.name.trim(),
    score: Math.round(form.score),
    isPresent: form.isPresent,
    role: form.role,
  }
}

export function validateInternForm(
  name: string,
  score: number
): string | null {
  assert(
    typeof name === 'string',
    `validateInternForm: name must be a string, got: ${typeof name}`
  )

  assert(
    typeof score === 'number',
    `validateInternForm: score must be a number, got: ${typeof score}`
  )

  if (!name.trim()) {
    return 'Name is required'
  }

  if (score < 0 || score > 100) {
    return 'Score must be 0–100'
  }

  return null
}

export function calculateAverageScore(interns: Intern[]): number {
  if (interns.length === 0) {
    return 0
  }

  return Math.round(
    interns.reduce((sum, intern) => sum + intern.score, 0) / interns.length
  )
}

export function getScoreLabel(score: number): 'Pass' | 'Fail' {
  return score >= 50 ? 'Pass' : 'Fail'
}

export function filterInterns(
  interns: Intern[],
  query: string
): Intern[] {
  const term = query.toLowerCase()

  const result = interns.filter(
    intern =>
      intern.name.toLowerCase().includes(term) ||
      intern.role.toLowerCase().includes(term)
  )

  assert(
    Array.isArray(result),
    'filterInterns: expected filter to return an array'
  )

  return result
}

/*
The service layer should not have any react imports. 
It contains only business logic and should be independent of the UI framework.
If it imported react, the tests would need react specific setup .
*/