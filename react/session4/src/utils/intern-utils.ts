import { assert } from './assert'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

export function filterInterns(
  interns: Intern[],
  searchTerm: string
): Intern[] {
  const term = searchTerm.toLowerCase()

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
Extracting pure functions alone did not change the coverage.
Coverage increased only after writing direct tests for validateInternForm and filterInterns.
*/