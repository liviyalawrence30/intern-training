import { useReducer } from 'react'

interface UseCounterOptions {
  initial?: number
  min?:     number
  max?:     number
  step?:    number
}

interface UseCounterReturn {
  count:     number
  increment: () => void
  decrement: () => void
  reset:     () => void
}

interface CounterState {
  count: number
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

function useCounter({
  initial = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseCounterOptions = {}): UseCounterReturn {

  function reducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
      case 'increment':
        return {
          count: Math.min(state.count + step, max),
        }

      case 'decrement':
        return {
          count: Math.max(state.count - step, min),
        }

      case 'reset':
        return {
          count: initial,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    count: initial,
  })

  function increment(): void {
    dispatch({ type: 'increment' })
  }

  function decrement(): void {
    dispatch({ type: 'decrement' })
  }

  function reset(): void {
    dispatch({ type: 'reset' })
  }

  return {
    count: state.count,
    increment,
    decrement,
    reset,
  }
}

export default useCounter

/*
useCounter is a custom hook beacuse it uses React hooks and starts with the word "use".
It must be called inside React components or other custom hooks but not in regular functions,loops or conditions.
*/