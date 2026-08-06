import { assert } from './assert'

export function getSortedNumbers(): number[] {
  const result = [1, 4, 2, 3]

  const sorted = result.every(
    (value, index, array) =>
      index === 0 || array[index - 1] <= value
  )

  assert(
    sorted,
    'getSortedNumbers: expected a sorted array'
  )

  return result
}