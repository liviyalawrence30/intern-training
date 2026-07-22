import { render, screen } from '../test/test-utils'
import ThemedCard from './ThemedCard'

// getBy throws an error if the element is not found.
test('getByText throws when element is missing', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  // This passes because the element exists.
  expect(screen.getByText('Rahul')).toBeInTheDocument()

  // Uncommenting the line below will throw an error.
  // screen.getByText('Priya')
})

// queryBy returns null if the element is not found.
test('queryBy returns null when element is missing', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  // Use queryBy when checking that an element is not present.
  expect(screen.queryByText('Fail')).not.toBeInTheDocument()
})

//getAllBy — finds multiple  elements
test('getAllBy finds multiple elements', () => {
  render(
    <div>
      <ThemedCard name="Rahul" score={92} />
      <ThemedCard name="Priya" score={78} />
    </div>
  )

  // Both cards show "Pass".
  const passLabels = screen.getAllByText('Pass')
  expect(passLabels).toHaveLength(2)
})

/* 
getByRole is used when we expect only 1 element with a given role.
getAllByRole is used when we expect multiple elements with the same role and want to access all of them. */