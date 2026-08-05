import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInternRepository } from '../repositories/intern-repository'
import type { Intern } from '../types/intern'

const makeIntern = (overrides: Partial<Intern> = {}): Intern => ({
  id: 1,
  name: 'Rahul',
  score: 92,
  isPresent: true,
  role: 'Frontend',
  ...overrides,
})

test('starts with an empty list', () => {
  const { result } = renderHook(() => useInternRepository())

  expect(result.current.interns).toEqual([])
})

test('add() adds an intern to the list', () => {
  const { result } = renderHook(() => useInternRepository())
const rahul = makeIntern()
  act(() => {
    result.current.add(rahul)
  })

  expect(result.current.interns).toEqual([rahul])
})

test('add() twice results in two interns', () => {
  const { result } = renderHook(() => useInternRepository())

  const rahul = makeIntern()

  const priya = makeIntern({
    id: 2,
    name: 'Priya',
    score: 78,
    isPresent: false,
    role: 'Backend',
  })

  act(() => {
    result.current.add(rahul)
    result.current.add(priya)
  })

  expect(result.current.interns).toEqual([rahul, priya])
})

test('remove() removes an intern by id', () => {
  const { result } = renderHook(() => useInternRepository())

  const rahul = makeIntern()

  const priya = makeIntern({
    id: 2,
    name: 'Priya',
    score: 78,
    isPresent: false,
    role: 'Backend',
  })

  act(() => {
    result.current.add(rahul)
    result.current.add(priya)
    result.current.remove(1)
  })

  expect(result.current.interns).toEqual([priya])
})

test('remove() on a non-existent id does nothing', () => {
  const { result } = renderHook(() => useInternRepository())

  const rahul = makeIntern()

  act(() => {
    result.current.add(rahul)
    result.current.remove(99)
  })

  expect(result.current.interns).toEqual([rahul])
})

test('update() replaces the intern with the matching id', () => {
  const { result } = renderHook(() => useInternRepository())
const rahul = makeIntern()
  act(() => {
    result.current.add(rahul)
    result.current.update({ ...rahul, score: 95 })
  })

  expect(result.current.interns[0].score).toBe(95)
})

test('update() does not affect other interns', () => {
  const { result } = renderHook(() => useInternRepository())

  const rahul = makeIntern()

  const priya = makeIntern({
    id: 2,
    name: 'Priya',
    score: 78,
    isPresent: false,
    role: 'Backend',
  })

  act(() => {
    result.current.add(rahul)
    result.current.add(priya)
    result.current.update({ ...rahul, score: 95 })
  })

  expect(result.current.interns).toEqual([
    { ...rahul, score: 95 },
    priya,
  ])
})

/*
1. No ,it does not use vi.mock() because the repository does not depend on exernal services.

2. The repository tests the state and rendering. It uses renderHook().
The services tests the business logic . It uses the required inputs and outputs.
*/