import { describe, test, expect } from 'vitest'
import { filterInterns } from '../utils/intern-utils'

const interns = [
  { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
  { id: 2, name: 'Priya', score: 85, role: 'Backend', isPresent: true },
  { id: 3, name: 'Amit', score: 78, role: 'Frontend', isPresent: false },
  { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true },
]

describe('filterInterns', () => {
  test('returns all interns when searchTerm is empty', () => {
    expect(filterInterns(interns, '')).toEqual(interns)
  })

  test('returns only interns whose name matches (case-insensitive)', () => {
    expect(filterInterns(interns, 'rahul')).toEqual([interns[0]])
  })

  test('returns only interns whose role matches (case-insensitive)', () => {
    expect(filterInterns(interns, 'frontend')).toEqual([
      interns[0],
      interns[2],
    ])
  })

  test('returns an empty array when no interns match', () => {
    expect(filterInterns(interns, 'designer')).toEqual([])
  })

  test('returns interns that match on either name OR role', () => {
    expect(filterInterns(interns, 'backend')).toEqual([interns[1]])
    expect(filterInterns(interns, 'priya')).toEqual([interns[1]])
  })
})