/// Silent failure audit - useInternForm.ts
// Pattern 1: submit() returns false on validation failure instead of throwing an error.
// Pattern 2: setError(errorMessage ?? '') silently converts a null validation result to an empty string.

/* 
Testability audit - useInternForm.ts
Yes - given the same form state and the same user input, it always produce the same result.
Yes- It does not use APIs,timers,localstorage,random values or other external services.
Partially - validation logic depends on the hook's internal React state instead of accepting data as parameters, so it cannot be tested completely independently.
Verdict : Moderately testable
*/

import { validateInternForm } from '../utils/intern-validation'
import { useState } from 'react'

interface InternFormState {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}
interface Intern {
  id: number
  name: string
  score: number
  isPresent: boolean
  role: string
}
interface UseInternFormReturn {
  form: InternFormState
  error: string
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleReset: () => void
  submit: () => boolean
}
/* The return type interface tells what exactly the custom hook returns.
It improves type safety, makes it easier to understand and maintain. */

const initialForm: InternFormState = {
  name: '', score: 0, isPresent: true, role: 'Frontend',
}

function useInternForm(
  addIntern: (intern: Intern) => void,
  generateId: () => number = () => Date.now()
): UseInternFormReturn {
  const [form,  setForm]  = useState<InternFormState>(initialForm)
  const [error, setError] = useState<string>('')

 

  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
): void {
  const { name, value, type } = e.target

  const updatedValue =
    type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : name === 'score'
        ? Number(value)
        : value

  const nextForm = {
  ...form,
  [name]: updatedValue,
}

const errorMessage = validateInternForm(nextForm.name, nextForm.score)

if (errorMessage) {
  setError(errorMessage)
  return
}

setError('')
setForm(nextForm)
}
function handleReset(): void {
  setForm(initialForm)
  setError('')
}
 function submit(): boolean {
  const errorMessage = validateInternForm(form.name, form.score)

  if (errorMessage) {
    setError(errorMessage)
    return false
  }

  addIntern({
    id: generateId(),
    ...form,
  })

  setError('')
  handleReset()

  return true
}

  return {
  form,
  error,
  handleChange,
  handleReset,
  submit,
}
}

export default useInternForm

//The most likely silent failure is submit() returning false.
//Because the caller may ignore the return value making it difficult to know why the submission failed.

