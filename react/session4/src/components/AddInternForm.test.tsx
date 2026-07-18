import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import AddInternForm from './AddInternForm'
import { vi, describe, beforeEach, test } from 'vitest'
import { waitFor } from '../test/test-utils'

/*
Keep describe blocks to two levels at most.
Deeper nesting makes test files harder to read and maintain, and produces long
failure paths that make it more difficult to locate the actual failing test.
*/
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

describe('AddInternForm', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    mockAddIntern.mockClear()
  })


describe('initial state', () => {
  test('name input is empty', () => {
  render(<AddInternForm />)

  expect(screen.getByPlaceholderText('Name')).toHaveValue('')
})

test('score input starts at 0', () => {
  render(<AddInternForm />)

  expect(screen.getByPlaceholderText('Score')).toHaveValue(0)
})

test('role defaults to Frontend', () => {
  render(<AddInternForm />)

  expect(screen.getByRole('combobox')).toHaveValue('Frontend')
})

})

describe('user interactions', () => {

/* userEvent simulates real user actions.
 while Fire event triggers only a single event.
So, userEvent provides more realistic and reliable tests.*/
test('updates name when user types', async () => {
  

  render(<AddInternForm />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

  expect(screen.getByDisplayValue('Rahul')).toBeInTheDocument()
})

test('updates score when user types', async () => {
  

  render(<AddInternForm />)

  await user.clear(screen.getByPlaceholderText('Score'))
  await user.type(screen.getByPlaceholderText('Score'), '92')

  expect(screen.getByDisplayValue('92')).toBeInTheDocument()
})
test('resets name input when Reset is clicked', async () => {
 

  render(<AddInternForm />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
  await user.click(screen.getByRole('button', { name: 'Reset' }))

  expect(screen.getByPlaceholderText('Name')).toHaveValue('')
})

test('calls addIntern with intern data when form is submitted', async () => {
  
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
/* expect.objectContaining() contains only the specified properties of an object . 
It ignores the additional properties, making the test more flexible than comparing the entire object exactly.*/

})

describe('validation', () => {

test('shows error when name is empty on submit', async () => {
 

  render(<AddInternForm />)

  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(screen.getByText('Name is required')).toBeInTheDocument()
})

test('shows error when score is above 100', async () => {
  
  render(<AddInternForm />)

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

  await user.clear(screen.getByPlaceholderText('Score'))
  await user.type(screen.getByPlaceholderText('Score'), '150')

  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(
  screen.getByText('Score must be 0–100')
).toBeInTheDocument()
})

test('does not call addIntern when form is invalid', async () => {
  



  render(<AddInternForm />)

  // Submit without filling in anything
  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  expect(mockAddIntern).not.toHaveBeenCalled()
})

/* not.toHaveBeenCalled() clearly checks that a mock function was never called.
toHaveBeenCalledTimes(0) gives the same result but not.toHaveBeenCalled() is easier to read . 
It better expresses the intentions of the test.
 */


test('error clears when valid name is entered after failed submit', async () => {
  

  render(<AddInternForm />)

  await user.click(screen.getByRole('button', { name: 'Add Intern' }))
  expect(screen.getByText('Name is required')).toBeInTheDocument()

  await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

  await user.click(screen.getByRole('button', { name: 'Add Intern' }))

  await waitFor(() => {
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
  })
})
})

})


