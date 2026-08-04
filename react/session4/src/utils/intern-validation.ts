//Silent failure audit - intern-validation.ts
// No silent failure patterns found.
import { assert } from './assert'

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

  if (name == null) {
    return 'Name is required'
  }

  if (!name.trim()) {
    return 'Name is required'
  }

  if (score < 0 || score > 100) {
    return 'Score must be 0–100'
  }

  return null
}
//This file already follows fail-fast principles.



