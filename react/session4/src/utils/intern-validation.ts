//Silent failure audit - intern-validation.ts
// No silent failure patterns found.

export function validateInternForm(
  name: string,
  score: number
): string | null {

  if (name == null) {
    return 'Name is required'
  }

  if (typeof name !== 'string' || typeof score !== 'number') {
    return 'Invalid input'
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
