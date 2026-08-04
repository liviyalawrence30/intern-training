//silent failure audit - intern-context.tsx
// Pattern 1: setTimeout() simulates loading but has no error handling if loading fails.
// Pattern 2: generateId() defaults to interns.length + 1, which could create duplicate IDs if interns are removed.
// Pattern 3: The initial interns are hard-coded, so a loading or initialization failure cannot be detected.

//Testability audit — intern-context.tsx
//yes, given the same initial state and the same sequence of actions, it always produces the same result.
//no,It uses useEffect and setTimeout, introducing asynchronous behavior that makes testing more complex.
//no,The initial data and timeout are hard-coded inside the provider and cannot be passed in during tests.
//verdict: Low testability.


import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface Intern {
  id: number; name: string; score: number; role: string; isPresent: boolean
}
type NewIntern = Omit<Intern, 'id'>

interface InternContextType {
  interns: Intern[]
  isLoading: boolean
  addIntern: (intern: NewIntern) => void
  removeIntern: (id: number) => void
}
const InternContext = createContext<InternContextType | null>(null)
interface InternProviderProps {
  children: ReactNode
  generateId?: (interns: Intern[]) => number
}
export function InternProvider({
  children,
  generateId = (interns) => interns.length + 1,
}: InternProviderProps) {
  const [interns,   setInterns]   = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setInterns([
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend',  isPresent: true  },
        { id: 2, name: 'Priya', score: 78, role: 'Backend',   isPresent: true  },
        { id: 3, name: 'Amit',  score: 45, role: 'Frontend',  isPresent: false },
        { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true  },
      ])
      setIsLoading(false)
    }, 800)
  }, [])

  function addIntern(intern: NewIntern): void {
  setInterns(prev => [
    ...prev,
    {
      id: generateId(prev),
      ...intern,
    },
  ])
}

  function removeIntern(id: number): void {
    setInterns(prev => prev.filter(i => i.id !== id))
  }

  return (
    <InternContext.Provider value={{ interns, isLoading, addIntern, removeIntern }}>
      {children}
    </InternContext.Provider>
  )
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext)
  if (!context) throw new Error('useInterns must be used inside InternProvider')
  return context
}

//The most likely silent failure is the generateId() using interns.length+1
//If an intern is removed, the same ID could be generated again 
//duplicate IDs are dificult to diagnose.

