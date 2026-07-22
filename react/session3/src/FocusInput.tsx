import { useRef } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus(): void {
    inputRef.current?.focus()
  }

  {/* optional chaining ensures handleFocus() is called only if inputRef.current is not null .
    current is null before the input is rendered and after it is removed.*/}

  function handleClear(): void {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear and Focus</button>
    </div>
  )
}

export default FocusInput