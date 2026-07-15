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

function useInternSearch(interns: Intern[]): UseInternSearchReturn {
  const [search, setSearch] = useState<string>('')

/*
 const filtered = interns.filter((i) => {
 console.log('filtering...')
  return i.name.toLowerCase().includes(search.toLowerCase())
 })
  
 Observation: In the console,it shows "Filtering" multiple times.
 without useMemo filtering renders multiple times. 
 Using useMemo eliminates unnecessary work.*/
  const filtered = useMemo<Intern[]>(() =>
    interns.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    ),
  [interns, search])

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