import { useState } from 'react'

function InternForm() {
  const [name,  setName]  = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value)
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setScore(Number(e.target.value))
    {/* e.target.value is always returned as a string.
        score is a number. So Number() function is used to convert the string to a number.
    */}
  }

  function handleReset(): void {
    setName('')
    setScore(0)
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />
      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />
      <p>Name: {name} | Score: {score}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default InternForm

/*A controlled input is an input element whose value is controlled by the react state.
If the user changes the value of this input, setter function is called to update the state.
It keeps the UI and state in sync.*/
