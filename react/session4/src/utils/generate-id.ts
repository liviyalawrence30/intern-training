export function generateInternId(
  now: () => number = Date.now,
  random: () => number = Math.random
): string {
  return `intern-${now()}-${random()}`
}

//Injecting the clock made the function easier to test because a fixed time could be passed. 
// No mocking of Date.now was needed.