/*
Silent failure audit - useInternSearch.ts
Pattern 1: The average score defaults to 0 when the interns list is empty, which may hide the fact that no data is available.
*/

//Testability audit 
//yes, if we give the same interns array and search item, it always returns the same filtered list and statistics.
//yes, It does not use APIs,timers,browser storage, or other external services.It only uses react state and memoization.
//yes,The interns data is passed as a parameter, and the search value can be controlled through the hook's setter.
//Verdict: Highly testable.
import { filterInterns } from '../utils/intern-utils'
import { useState, useMemo } from 'react'

interface Intern {
  id: number; name: string; score: number; role: string; isPresent: boolean
}

interface UseInternSearchReturn {
  search:    string
  setSearch: (value: string) => void
  filtered:  Intern[]
  stats: {
    total:   number
    present: number
    avg:     number
  }
}

function useInternSearch(
  interns: Intern[],
  filter: typeof filterInterns = filterInterns
): UseInternSearchReturn {
  const [search, setSearch] = useState<string>('')

/*
 const filtered = interns.filter((i) => {
 console.log('filtering...')
  return i.name.toLowerCase().includes(search.toLowerCase())
 })
  
 Observation: In the console,it shows "Filtering" multiple times.
 without useMemo filtering renders multiple times. 
 Using useMemo eliminates unnecessary work.*/
  const filtered = useMemo(
  () => filter(interns, search),
  [interns, search, filter]
)
  const stats = useMemo(() => ({
    total:   interns.length,
    present: interns.filter(i => i.isPresent).length,
    avg:     interns.length > 0
      ? Math.round(interns.reduce((s, i) => s + i.score, 0) / interns.length)
      : 0,
  }), [interns])

  return { search, setSearch, filtered, stats }
}

export default useInternSearch

/*
Injecting the filter works, but it's unnecessary here since filterInterns is already a pure function. 
It's more useful for external dependencies like APIs or timers.
*/

/*
Adding filter to the dependency array did not cause any re-render issues because the filter function reference stayed the same. 
The filtered list updates only when interns, search  or filter changes.
*/

// The average score defaulting to 0 is the most likely silent failure 
// because it can make an empty list look like a valid average score instead of indicating that no data exists.