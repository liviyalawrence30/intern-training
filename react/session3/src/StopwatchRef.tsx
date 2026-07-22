import { useState, useRef } from 'react'

function StopwatchRef() {
  const [seconds,   setSeconds]   = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function handleStart(): void {
    if (isRunning) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  function handleStop(): void {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
  }

  function handleReset(): void {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop}  disabled={!isRunning}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default StopwatchRef

{/* useRef is used to store the interval ID because it doesn't cause a re-render when updated . 
useState changes the UI and causes unnecessary re-renders */}