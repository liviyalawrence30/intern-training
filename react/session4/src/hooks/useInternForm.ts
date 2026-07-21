import { useState } from 'react'

interface InternFormState {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}

interface UseInternFormReturn {
  form:         InternFormState
  error:        string
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleReset:  () => void
  isValid:      () => boolean
}
/* The return type interface tells what exactly the custom hook returns.
It improves type safety, makes it easier to understand and maintain. */

const initialForm: InternFormState = {
  name: '', score: 0, isPresent: true, role: 'Frontend',
}

function useInternForm(): UseInternFormReturn {
  const [form,  setForm]  = useState<InternFormState>(initialForm)
  const [error, setError] = useState<string>('')

  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
): void {
  const { name, value, type } = e.target;

  setForm(prev => ({
    ...prev,
    [name]:
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : name === 'score'
        ? Number(value)
        : value,
  }));

  // Clear the validation error once the user starts typing a name
  if (name === 'name' && value.trim()) {
    setError('');
  }
}

  function handleReset(): void {
    setForm(initialForm)
    setError('')
  }

  function isValid(): boolean {
    if (!form.name.trim()) { setError('Name is required'); return false }
    if (form.score < 0 || form.score > 100) { setError('Score must be 0–100'); return false }
    setError('')
    return true
  }

  return { form, error, handleChange, handleReset, isValid }
}

export default useInternForm
