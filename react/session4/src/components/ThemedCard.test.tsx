import { render, screen } from '../test/test-utils'
import ThemedCard from './ThemedCard'
import { vi } from 'vitest'
import * as ThemeContext from '../contexts/theme-context'


/* we import render and screen from ../test/test-utils instead of @testing-library/react because test-utils wraps the component with ThemeProvider. 
So,the component receives the required theme context while running tests.
*/
test('renders the intern name', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Rahul')).toBeInTheDocument()
})

test('renders the score', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Score: 92')).toBeInTheDocument()
})

test('shows Pass when score is 50 or above', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Pass')).toBeInTheDocument()
})

test('shows Fail when score is below 50', () => {
  render(<ThemedCard name="Amit" score={45} />)

  expect(screen.getByText('Fail')).toBeInTheDocument()
})

/* 
getBy is used when we expect an element to be present.
If the element is not found, the test fails,so we use toBeInTheDocument().

queryBy is used when we expect an element to be absent.
It returns null when the element is not found, so we use not.toBeInTheDocument().*/

test('does not show Fail when score is 50 or above', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.queryByText('Fail')).not.toBeInTheDocument()
})

test('does not show Pass when score is below 50', () => {
  render(<ThemedCard name="Amit" score={45} />)

  expect(screen.queryByText('Pass')).not.toBeInTheDocument()
})

/* we test score={0} and score={100} because they are the boundary values.
Testing only a middle value like score={92} may miss bugs that occur at the maximum or minimum score.
Boundary tests ensure that the components work correctly for all the valid inputs.
 */

test('renders score of 0 correctly', () => {
  render(<ThemedCard name="Neha" score={0} />)

  expect(screen.getByText('Score: 0')).toBeInTheDocument()
  expect(screen.getByText('Fail')).toBeInTheDocument()
})

test('renders score of 100 correctly', () => {
  render(<ThemedCard name="Neha" score={100} />)

  expect(screen.getByText('Score: 100')).toBeInTheDocument()
  expect(screen.getByText('Pass')).toBeInTheDocument()
})

test('renders a different name and score without mixing up values', () => {
  render(<ThemedCard name="Priya" score={75} />)

  expect(screen.getByText('Priya')).toBeInTheDocument()
  expect(screen.getByText('Score: 75')).toBeInTheDocument()
})



/*
vi.fn() creates a mock function that records how it is called during a test.
vi.mock() replaces an entire module or dependency with a mocked implementation.
vi.spyOn() observes or temporarily overrides an existing function while allowing it to be restored later.
*/

/*
This test can be improved because if it fails before spy.mockRestore(),
the mocked console.error may affect later tests.
This partially violates the Independent principle of FIRST.
Using try/finally ensures the original function is always restored, making the test more independent.

*/
test('no console errors during ThemedCard render', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

  render(<ThemedCard name="Rahul" score={92} />)

  expect(spy).not.toHaveBeenCalled()

  spy.mockRestore()
})

//testing the untested branch

test('renders correctly in dark theme', () => {
  vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
    theme: 'dark',
    toggleTheme: vi.fn(),
  })

  render(<ThemedCard name="Rahul" score={92} />)

  const card = screen.getByText('Rahul').parentElement!

  expect(card).toHaveStyle({
    background: '#2a2a2a',
    color: '#eee',
    border: '1px solid #444',
  })

  vi.restoreAllMocks()
})





