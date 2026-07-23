import { test, expect } from 'vitest'
test.skip('loads interns from API', async () => {
  const response = await fetch('http://localhost:5173/api/interns')
  const data = await response.json()

  expect(data).toHaveLength(4)
})


/* Violates the fast and repeatable principles.

It may fail in CI if the server is not running or the network is unavailable.
It is slower than a unit test because it performs a real HTTP request.

*/