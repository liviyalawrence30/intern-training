import { test, expect, vi } from 'vitest'

test('loads interns from API', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    json: async () => [
      { id: 1, name: 'Rahul' },
      { id: 2, name: 'Priya' },
      { id: 3, name: 'Amit' },
      { id: 4, name: 'Sneha' },
    ],
  })

  const response = await fetchMock()

  const data = await response.json()

  expect(data).toHaveLength(4)
})