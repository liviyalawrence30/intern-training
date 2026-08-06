import { describe, test, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTheme } from '../contexts/theme-context'

describe('useTheme', () => {
  test('throws when used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme())
    }).toThrow(
      'useTheme: expected to be used inside ThemeProvider, but no provider was found.'
    )
  })
})