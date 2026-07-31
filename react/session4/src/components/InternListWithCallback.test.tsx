import { render, screen } from '../test/test-utils'
import { vi } from 'vitest'
import InternListWithCallback from './InternListWithCallback'

vi.mock('../contexts/intern-context', async () => {
  const actual = await vi.importActual<
    typeof import('../contexts/intern-context')
  >('../contexts/intern-context')

  return {
    ...actual,
    useInterns: () => ({
      interns: [
        {
          id: 1,
          name: 'Rahul',
          score: 92,
          role: 'Frontend',
          isPresent: true,
        },
        {
          id: 2,
          name: 'Priya',
          score: 78,
          role: 'Backend',
          isPresent: true,
        },
        {
          id: 3,
          name: 'Amit',
          score: 45,
          role: 'Fullstack',
          isPresent: false,
        },
      ],
      isLoading: false,
      addIntern: vi.fn(),
      removeIntern: vi.fn(),
    }),
  }
})
test('renders all interns from context', () => {
  render(<InternListWithCallback />)

  expect(screen.getByText(/Rahul/)).toBeInTheDocument()
expect(screen.getByText(/Priya/)).toBeInTheDocument()
expect(screen.getByText(/Amit/)).toBeInTheDocument()
})

test('renders correct number of intern rows', () => {
  render(<InternListWithCallback />)

  
  const removeButtons = screen.getAllByRole('button', {
    name: 'Remove',
  })

  expect(removeButtons).toHaveLength(3)
})

/*
Mock as little as possible. 
Mock dependencies such as context, APIs, or external services to isolate the component under test. 
The component's own logic can be run normally to verify its real behavior.
*/