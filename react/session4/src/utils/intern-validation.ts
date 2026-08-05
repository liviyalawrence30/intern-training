//code smell audit - intern-validation.ts
//1. Magic numbers - the score validation uses values 0 and 100 directly instead of defining them as constants.
//2. // Smell 2: Duplicate error message — both name validation checks return the same "Name is required" message.
//3. Multiple responsibilities — validateInternForm checks type validation, name validation, and score validation in a single function.

//Silent failure audit - intern-validation.ts
// No silent failure patterns found.
import { assert } from './assert'
const MIN_SCORE = 0
const MAX_SCORE = 100
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

  if (score < MIN_SCORE || score > MAX_SCORE) {
    return 'Score must be 0–100'
  }

  return null
}
//This file already follows fail-fast principles.

//I would fix the duplicate logic first because it would make the code more easier to read and maintain.


//Task 2.2
//The score validation check had 0 and 100.
//I defined them as constants MIN_SCORE and MAX_SCORE to avoid magic numbers and improve code readability.
