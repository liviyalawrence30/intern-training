import { renderHook, act } from '@testing-library/react'
import useInternForm from './useInternForm'

test('initialises with empty form state', () => {
  const { result } = renderHook(() => useInternForm())

  expect(result.current.form.name).toBe('')
  expect(result.current.form.score).toBe(0)
  expect(result.current.form.role).toBe('Frontend')
  expect(result.current.error).toBe('')
})

test('isValid returns false and sets error when name is empty', () => {
  //Arrange
  const { result } = renderHook(() => useInternForm())
  //    Act
  let valid: boolean
  act(() => { valid = result.current.isValid() })
  //Assert
  expect(valid!).toBe(false)
  expect(result.current.error).toBe('Name is required')
})
/*
The Arrange phase creates the hook instance.
The Act phase calls isValid() to validate the form.
The Assert phase verifies that validation failed and the expected error
message was set.
Each phase is clearly separated, and the Arrange phase provides everything needed before the Act.
*/



test('isValid returns true when name and score are valid', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: { name: 'score', value: '92', type: 'number' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  let valid: boolean
  act(() => { valid = result.current.isValid() })

  expect(valid!).toBe(true)
  expect(result.current.error).toBe('')
})

test('handleReset clears form values and error', () => {
  const { result } = renderHook(() => useInternForm())

  // Set a value, trigger a validation error, then reset
  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => result.current.isValid())
  act(() => result.current.handleReset())

  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')
})

/* Hook tests verify the hook's state and logic directly without rendering a component.
They confirm the hook behaves correctly in isolation, while component tests verify that the UI integrates and uses the hook correctly.
*/


test('isValid returns true when name is Sneha and score is 88', () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Sneha' },
    } as React.ChangeEvent<HTMLInputElement>)

    result.current.handleChange({
      target: { name: 'score', value: '88' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  // Act
  let valid: boolean
  act(() => {
    valid = result.current.isValid()
  })

  // Assert
  expect(valid!).toBe(true)
})


test('handleChange updates the name field when called with a name change event', () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  // Act
  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Sneha',
        type: 'text',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  // Assert
  expect(result.current.form.name).toBe('Sneha')
})