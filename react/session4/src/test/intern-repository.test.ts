import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInternRepository } from '../repositories/intern-repository'
import type { Intern } from '../types/intern'

const RAHUL: Intern = {
  id: 1,
  name: 'Rahul',
  score: 92,
  isPresent: true,
  role: 'Frontend',
}

const PRIYA: Intern = {
  id: 2,
  name: 'Priya',
  score: 78,
  isPresent: false,
  role: 'Backend',
}

test('starts with an empty list', () => {
  const { result } = renderHook(() => useInternRepository())

  expect(result.current.interns).toEqual([])
})

test('add() adds an intern to the list', () => {
  const { result } = renderHook(() => useInternRepository())

  act(() => {
    result.current.add(RAHUL)
  })

  expect(result.current.interns).toEqual([RAHUL])
})

test('add() twice results in two interns', () => {
  const { result } = renderHook(() => useInternRepository())

  act(() => {
    result.current.add(RAHUL)
    result.current.add(PRIYA)
  })

  expect(result.current.interns).toEqual([RAHUL, PRIYA])
})

test('remove() removes an intern by id', () => {
  const { result } = renderHook(() => useInternRepository())

  act(() => {
    result.current.add(RAHUL)
    result.current.add(PRIYA)
    result.current.remove(1)
  })

  expect(result.current.interns).toEqual([PRIYA])
})

test('remove() on a non-existent id does nothing', () => {
  const { result } = renderHook(() => useInternRepository())

  act(() => {
    result.current.add(RAHUL)
    result.current.remove(99)
  })

  expect(result.current.interns).toEqual([RAHUL])
})

test('update() replaces the intern with the matching id', () => {
  const { result } = renderHook(() => useInternRepository())

  act(() => {
    result.current.add(RAHUL)
    result.current.update({ ...RAHUL, score: 95 })
  })

  expect(result.current.interns[0].score).toBe(95)
})

test('update() does not affect other interns', () => {
  const { result } = renderHook(() => useInternRepository())

  act(() => {
    result.current.add(RAHUL)
    result.current.add(PRIYA)
    result.current.update({ ...RAHUL, score: 95 })
  })

  expect(result.current.interns).toEqual([
    { ...RAHUL, score: 95 },
    PRIYA,
  ])
})

/*
1. No ,it does not use vi.mock() because the repository does not depend on exernal services.

2. The repository tests the state and rendering. It uses renderHook().
The services tests the business logic . It uses the required inputs and outputs.
*/