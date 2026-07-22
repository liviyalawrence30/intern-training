import { render, screen } from '../test/test-utils'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'
import { ThemeProvider } from '../contexts/theme-context'

test('renders the dashboard title', () => {
  render(<Navbar />)

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})

test('theme toggle button is visible', () => {
  render(<Navbar />)

  expect(
    screen.getByRole('button', { name: /switch to dark mode/i })
  ).toBeInTheDocument()
})

test('theme toggle button label changes after click', async () => {
  const user = userEvent.setup()

  render(<Navbar />)

  await user.click(
    screen.getByRole('button', { name: /switch to dark mode/i })
  )

  expect(
    screen.getByRole('button', { name: /switch to light mode/i })
  ).toBeInTheDocument()
})

/*
If render is imported directly from '@testing-library/react',Navbar will not be wrapped in ThemeProvider.
Since Navbar uses useTheme(), React throws an error saying useTheme() must be used inside ThemeProvider.
If it is imported from from `../test/test-utils`, it  automatically wraps components with ThemeProvider, so the tests run correctly.
*/

test('renders correctly when wrapped manually in ThemeProvider', () => {
  rtlRender(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})

/*
This test is equivalent to the first 3  tests because both provide ThemeProvider before rendering Navbar.
The difference is that custom render wraps the component automatically, keeping tests shorter, cleaner, and easier to maintain.
*/
