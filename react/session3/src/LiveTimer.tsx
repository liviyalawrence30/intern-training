import { useState, useEffect } from 'react'

function LiveTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h2>Live Timer</h2>
      <p>Time: {seconds} seconds</p>
    </div>
  )
}

export default LiveTimer