/*
External dependencies:
useInterns() from intern-context
useInternSearch() custom hook

The useInterns() context and useInternSearch() hook are external dependencies.
Using them directly would make the test depend on the real context state,hook logic, and asynchronous behaviour. 
Mocking these dependencies keeps the test fast, repeatable, independent, and focused only on the InternSearch component.

*/
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import InternSearch from './InternSearch'

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [
      { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
      { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
      { id: 3, name: 'Amit', score: 45, role: 'Frontend', isPresent: false },
    ],
    isLoading: false,
    addIntern: vi.fn(),
    removeIntern: vi.fn(),
  }),
}))


vi.mock('../hooks/useInternSearch', () => ({
  default: () => ({
    search: '',
    setSearch: vi.fn(),
    filtered: [
      { id: 1, name: 'Rahul', score: 92, role: 'Frontend' },
      { id: 2, name: 'Priya', score: 78, role: 'Backend' },
      { id: 3, name: 'Amit', score: 45, role: 'Frontend' },
    ],
    stats: {
      total: 3,
      present: 2,
      avg: 71.7,
    },
  }),
}))

test('shows total intern count as 3', () => {
    expect.hasAssertions()
  render(<InternSearch />)

  expect(screen.getByText('Total Interns: 3')).toBeInTheDocument()
})

test('shows present intern count as 2', () => {
    expect.hasAssertions()
  render(<InternSearch />)

  expect(screen.getByText('Present: 2')).toBeInTheDocument()
})

test('shows average score as 71.7', () => {
    expect.hasAssertions()
  render(<InternSearch />)

  expect(screen.getByText('Average Score: 71.7')).toBeInTheDocument()
})


/* 
1. we did not mock useState or useMemo because they are built-in React hooks.
We only mocked the external dependencies to keep the component test isolated ,
allowing React's own behaviour to work normally.

2.Yes, addIntern and removeIntern are mocked using vi.fn()
If InternSearch accidentally called addIntern or removeIntern, the mock would record the call without modifying any real data or causing side effects.
Assertions can be used to verify those calls.

3.
If the Intern interface gains a new required field next week,
TS will report an error in the mock if the mocked objects no longer satisfy the updated interface.
It helps to identify and update the mock to keep it consistent with the application.
*/