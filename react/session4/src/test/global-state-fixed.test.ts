import { test, expect } from 'vitest'

function addItem(cart: string[], item: string): string[] {
  return [...cart, item]
}

function removeItem(cart: string[], item: string): string[] {
  return cart.filter(i => i !== item)
}

test('cart starts empty', () => {
  const cart: string[] = []
  expect(cart).toHaveLength(0)
})

test('can add an item', () => {
  const cart: string[] = []
  const result = addItem(cart, 'Rahul')
  expect(result).toHaveLength(1)
})

test('can add two items', () => {
  let cart: string[] = []

  cart = addItem(cart, 'Rahul')
  cart = addItem(cart, 'Priya')

  expect(cart).toHaveLength(2)
})

test('cart is empty again', () => {
  const cart: string[] = []
  expect(cart).toHaveLength(0)
})
test('can remove an item', () => {
  let cart: string[] = []

  cart = addItem(cart, 'Rahul')
  cart = addItem(cart, 'Priya')

  cart = removeItem(cart, 'Rahul')

  expect(cart).toEqual(['Priya'])
})

/*
FIRST principle
No shared mutable state between tests. Each test should have its own isolated state.
Pure functions.
Test are independent and predictable.

*/