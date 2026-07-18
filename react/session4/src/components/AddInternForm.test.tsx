import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import AddInternForm from './AddInternForm'

import { vi } from 'vitest'


/* userEvent simulates real user actions.
 while Fire event triggers only a single event.
So, userEvent provides more realistic and reliable tests.*/
test('updates name when user types', async () => {
  const user = userEvent.setup()

  render(<AddInternForm />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

  expect(screen.getByDisplayValue('Rahul')).toBeInTheDocument()
})

test('updates score when user types', async () => {
  const user = userEvent.setup()

  render(<AddInternForm />)

  await user.clear(screen.getByPlaceholderText('Score'))
  await user.type(screen.getByPlaceholderText('Score'), '92')

  expect(screen.getByDisplayValue('92')).toBeInTheDocument()
})


const mockAddIntern = vi.fn()

vi.mock('../contexts/intern-context', async () => {
  const actual = await vi.importActual<
    typeof import('../contexts/intern-context')
  >('../contexts/intern-context')

  return {
    ...actual,
    useInterns: () => ({
      interns: [],
      isLoading: false,
      addIntern: mockAddIntern,
      removeIntern: vi.fn(),
    }),
  }
})

test('resets name input when Reset is clicked', async () => {
  const user = userEvent.setup()

  render(<AddInternForm />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
  await user.click(screen.getByRole('button', { name: 'Reset' }))

  expect(screen.getByPlaceholderText('Name')).toHaveValue('')
})
test('calls addIntern with intern data when form is submitted', async () => {
  const user = userEvent.setup()

  mockAddIntern.mockClear()

  render(<AddInternForm />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

  await user.clear(screen.getByPlaceholderText('Score'))
  await user.type(screen.getByPlaceholderText('Score'), '92')

  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(mockAddIntern).toHaveBeenCalledTimes(1)

  expect(mockAddIntern).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Rahul',
      score: 92,
    })
  )
})

/* expect.objectContaining() contains only the specified properties of an object . It ignores the additional properties, making the test more flexible than comparing the entire object exactly.*/