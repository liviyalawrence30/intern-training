import { render, screen, within } from './test-utils'
import { vi, test, expect } from 'vitest'
import { act } from '@testing-library/react'
import ScoreStats from '../components/ScoreStats'
import InternListWithCallback from '../components/InternListWithCallback'
import AddInternForm from '../components/AddInternForm'
import userEvent from '@testing-library/user-event'


/*vi.useFakeTimers() replaces real timers with fake ones for testing .
This lets tests manually run setTimeout() and setInterval() instantly using methods like vi.runAllTimers().*/
test('uses fake timers to skip the loading delay', () => {
  vi.useFakeTimers()

  render(<ScoreStats />)

  expect(screen.getByText('Loading interns...')).toBeInTheDocument()

  act(() => {
    vi.runAllTimers()
  })

  expect(screen.queryByText('Loading interns...')).not.toBeInTheDocument()
  expect(screen.getByText('Rahul')).toBeInTheDocument()
  expect(screen.getByText('Priya')).toBeInTheDocument()

  vi.useRealTimers()
})

vi.mock('../contexts/intern-context', async () => {
  const actual = await vi.importActual<
    typeof import('../contexts/intern-context')
  >('../contexts/intern-context')

  return {
    ...actual,
    useInterns: () => ({
      interns: [
        { id: 1, name: 'Rahul', score: 92 },
        { id: 2, name: 'Priya', score: 85 },
        { id: 3, name: 'Rahul', score: 65 },
      ],
      isLoading: false,
      addIntern: vi.fn(),
      removeIntern: vi.fn(),
    }),
  }
})

//within() scopes the queries to a specific element when the same text appears in multiple rows.
test('uses within to check the score inside a specific intern row', () => {
  render(<InternListWithCallback />)
  const rahulRows = screen.getAllByText(/Rahul/)
  const firstRow = rahulRows[0].closest('li') ?? rahulRows[0].parentElement!

  expect(within(firstRow).getByText(/92/)).toBeInTheDocument()
})



test('moves focus through the form using the Tab key', async () => {
  const user = userEvent.setup()

  render(<AddInternForm />)

  await user.tab()
  expect(screen.getByPlaceholderText('Name')).toHaveFocus()

  await user.tab()
  expect(screen.getByPlaceholderText('Score')).toHaveFocus()

  await user.tab()
  expect(screen.getByRole('checkbox')).toHaveFocus()

  await user.tab()
  expect(screen.getByRole('combobox')).toHaveFocus()

  await user.tab()
  expect(
    screen.getByRole('button', { name: 'Add Intern' })
  ).toHaveFocus()

  await user.tab()
  expect(
    screen.getByRole('button', { name: 'Reset' })
  ).toHaveFocus()
})

//Coverage report

// My useInternForm.ts file has 100% line coverage .

//Line coverage measures how many lines were executed.
//Branch coverage checks whether every decision path was tested.