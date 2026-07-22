import { render, screen } from '../test/test-utils'
import InternRow from './InternRow'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'


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


/* vi.fn() creates a mock function for testing.
It does not execute real logic.
Instead it records calls so we can check if it was called,how many times and what arguments were passed.*/

test('calls onRemove with the correct id when Remove is clicked', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  await user.click(screen.getByRole('button', { name: 'Remove' }))

  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(onRemove).toHaveBeenCalledWith(1)
})

test('does not call onRemove when row is only rendered', () => {
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  
  expect(onRemove).not.toHaveBeenCalled()
})
