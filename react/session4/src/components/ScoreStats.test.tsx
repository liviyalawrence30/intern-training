import { render, screen } from '../test/test-utils'
import ScoreStats from './ScoreStats'
import { waitFor } from '../test/test-utils'

test('shows loading state initially', () => {
  render(<ScoreStats />)

  expect(screen.getByText('Loading interns...')).toBeInTheDocument()
})

test('shows intern data after loading completes', async () => {
  render(<ScoreStats />)

  const rahul = await screen.findByText('Rahul')
  expect(rahul).toBeInTheDocument()

  expect(screen.queryByText('Loading interns...')).not.toBeInTheDocument()
})

test('multiple elements appear after data loads', async () => {
  render(<ScoreStats />)

  await waitFor(() => {
    expect(screen.getByText('Rahul')).toBeInTheDocument()
    expect(screen.getByText('Priya')).toBeInTheDocument()
  })
})
/* waitFor() is used when waiting for multiple assertions or more complex conditions to become true.
findBy() is used when waiting for a single element to appear. */




