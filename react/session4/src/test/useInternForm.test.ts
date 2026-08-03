import { describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useInternForm from '../hooks/useInternForm'

describe('useInternForm', () => {
 test('submit calls addIntern with the correct data', () => {
  const addIntern = vi.fn()

  const { result } = renderHook(() =>
    useInternForm(addIntern, () => 999)
  )

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Rahul',
        type: 'text',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: 'score',
        value: '92',
        type: 'number',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.submit()
  })

  expect(addIntern).toHaveBeenCalledWith({
    id: 999,
    name: 'Rahul',
    score: 92,
    role: 'Frontend',
    isPresent: true,
  })
})
  test('submit does not call addIntern when validation fails', () => {
    const addIntern = vi.fn()

    const { result } = renderHook(() =>
      useInternForm(addIntern, () => 999)
    )

    act(() => {
      result.current.submit()
    })

    expect(addIntern).not.toHaveBeenCalled()
    expect(result.current.error).toBe('Name is required')
  })

  test('error is cleared after a successful submit', () => {
    const addIntern = vi.fn()

    const { result } = renderHook(() =>
      useInternForm(addIntern, () => 999)
    )

    act(() => {
      result.current.submit()
    })

    expect(result.current.error).toBe('Name is required')

    act(() => {
  result.current.handleChange({
    target: {
      name: 'name',
      value: 'Rahul',
      type: 'text',
    },
  } as React.ChangeEvent<HTMLInputElement>)
})

act(() => {
  result.current.handleChange({
    target: {
      name: 'score',
      value: '90',
      type: 'number',
    },
  } as React.ChangeEvent<HTMLInputElement>)
})

act(() => {
  result.current.submit()
})
    expect(result.current.error).toBe('')
  })
})
//after the refactor, only 1-2 lines of arrange are required.
//because addInternform was injected.

