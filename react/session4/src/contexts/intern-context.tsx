//Job : This file manages the intern data.
//concerns mixed: state management, data validation,data loading, context provider and ID generation.

//silent failure audit - intern-context.tsx
// Pattern 1: setTimeout() simulates loading but has no error handling if loading fails.
// Pattern 2: generateId() defaults to interns.length + 1, which could create duplicate IDs if interns are removed.
// Pattern 3: The initial interns are hard-coded, so a loading or initialization failure cannot be detected.

//Testability audit — intern-context.tsx
//yes, given the same initial state and the same sequence of actions, it always produces the same result.
//no,It uses useEffect and setTimeout, introducing asynchronous behavior that makes testing more complex.
//no,The initial data and timeout are hard-coded inside the provider and cannot be passed in during tests.
//verdict: Low testability.


import { createContext, useContext, type ReactNode } from 'react'
import { useInternRepository } from '../repositories/intern-repository'
import {
  createIntern,
  calculateAverageScore,
} from '../services/intern-service'
import type { Intern, InternFormState } from '../types/intern'

interface InternContextValue {
  interns: Intern[]
  averageScore: number
  addIntern: (form: InternFormState) => void
  removeIntern: (id: number) => void
}

const InternContext = createContext<InternContextValue | null>(null)

export function InternProvider({ children }: { children: ReactNode }) {
  const repo = useInternRepository()

  const value: InternContextValue = {
    interns: repo.interns,
    averageScore: calculateAverageScore(repo.interns),

    addIntern: (form: InternFormState) => {
      const intern = createIntern(form)
      repo.add(intern)
    },

    removeIntern: (id: number) => repo.remove(id),
  }

  return (
    <InternContext.Provider value={value}>
      {children}
    </InternContext.Provider>
  )
}

export function useInterns(): InternContextValue {
  const context = useContext(InternContext)

  if (!context) {
    throw new Error(
      'useInterns: expected to be used inside InternProvider, but no provider was found.'
    )
  }

  return context
}

//The most likely silent failure is the generateId() using interns.length+1
//If an intern is removed, the same ID could be generated again 
//duplicate IDs are dificult to diagnose.

//The intern provider has 11 lines of code now. Before, it was around 20 lines.
//Yes. I would change the createIntern() function in src/services/intern-service.ts.
