//Job: This file renders the addinternform and connects the user interface to handle logic.
//Concerns mixed:UI rendering and logic handling.

import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

function AddInternForm() {
  const { addIntern } = useInterns()
  const { form, error, handleChange, handleReset, submit } = useInternForm(addIntern)
  

  function handleSubmit(): void {
  submit()
}

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input name="name"  type="text"     value={form.name}       onChange={handleChange} placeholder="Name"  />
      <input name="score" type="number"   value={form.score}       onChange={handleChange} placeholder="Score" />
      <input name="isPresent" type="checkbox" checked={form.isPresent} onChange={handleChange} />
      <label>Present</label>

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <button onClick={handleSubmit}>Add Intern</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default AddInternForm