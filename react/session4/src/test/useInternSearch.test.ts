import { describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useInternSearch from '../hooks/useInternSearch'

describe('useInternSearch', () => {
  test('uses injected filter function', () => {
    const interns = [
      {
        id: 1,
        name: 'Rahul',
        score: 92,
        role: 'Frontend',
        isPresent: true,
      },
    ]

    const customFilter = vi.fn().mockReturnValue([])

    const { result } = renderHook(() =>
      useInternSearch(interns, customFilter)
    )

    act(() => {
      result.current.setSearch('Rahul')
    })

    expect(result.current.filtered).toEqual([])

    expect(customFilter).toHaveBeenCalledWith(
      interns,
      'Rahul'
    )
  })
})

