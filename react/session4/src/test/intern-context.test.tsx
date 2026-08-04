import { describe, test, expect } from 'vitest'
import { renderHook ,act} from '@testing-library/react'
import { InternProvider, useInterns } from '../contexts/intern-context'


// //describe('InternProvider', () => {
//   test('adds an intern with injected id', () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//       <InternProvider generateId={() => 999}>
//         {children}
//       </InternProvider>
//     )

//     const { result } = renderHook(() => useInterns(), { wrapper })

//     act(() => {
//       result.current.addIntern({
//         name: 'Maria',
//         score: 95,
//         role: 'Frontend',
//         isPresent: true,
//       })
//     })

//     expect(result.current.interns.at(-1)?.id).toBe(999)
//   })
// })
//Injecting generateId makes the code easier to test because a fixed ID can be used during testing. 


test('explore: adds an intern ', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <InternProvider>
      {children}
    </InternProvider>
  )

  const { result } = renderHook(() => useInterns(), { wrapper })

  act(() => {
    result.current.addIntern({
      name: 'Maria',
      score: 95,
      role: 'Frontend',
      isPresent: true,
    })
  })

  expect(result.current.interns.at(-1)?.name).toBe('Maria')
  expect(result.current.interns.at(-1)?.score).toBe(95)
  expect(result.current.interns.at(-1)?.role).toBe('Frontend')
  expect(result.current.interns.at(-1)?.isPresent).toBe(true)
})


describe('useInterns', () => {
  test('throws a descriptive error when used outside InternProvider', () => {
    expect(() => renderHook(() => useInterns())).toThrow(
      'useInterns: expected to be used inside InternProvider, but no provider was found.'
    )
  })
})

