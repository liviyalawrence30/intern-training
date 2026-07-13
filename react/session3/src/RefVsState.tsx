import { useState, useRef } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0)
  const refCount = useRef<number>(0)

  function incrementState(): void {
    setStateCount(prev => prev + 1)
  }

  function incrementRef(): void {
    refCount.current += 1
    console.log('Ref value:', refCount.current)
  }

  return (
    <div>
      <p>State count (shown in UI): {stateCount}</p>
      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref</button>
    </div>
  )
}

export default RefVsState
/*
useState stores the data that affects the UI and re-renders the component when it changes.
useRef stores mutable values or DOM references without causing a re-render.
useState can be used for values that need to be displayed in the UI.
useRef can be used to store values that don't need to be displayed in the UI, like counters or timers.
*/