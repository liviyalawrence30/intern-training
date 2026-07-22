import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default Counter

/* 'count' is a state variable . count=count+1 directly cannot be used because it does not notify react of the chnage and can't be re-rendered . 
The setter function should be called to tell the react to re-render and update the UI . */