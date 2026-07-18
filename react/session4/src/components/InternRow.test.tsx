import { render, screen } from '../test/test-utils'
import InternRow from './InternRow'


test('finds the Remove button by role', () => {
  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={() => {}}
    />
  )

  screen.debug()

  const removeButton = screen.getByRole('button', {
    name: 'Remove',
  })

  expect(removeButton).toBeInTheDocument()
})

/*
screen.debug() prints the rendered HTML of the component in the terminal.
It helps us inspect the rendered output and choose the correct query, such as getByRole(), getByText(), or getByLabelText().
*/