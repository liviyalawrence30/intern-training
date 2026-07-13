import { useState, useEffect, useRef } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

const internData: Intern[] = [
  { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
  { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
  { id: 3, name: 'Amit', score: 45, role: 'Frontend', isPresent: false },
  { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true },
]

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    //console.log("Dashboard useEffect")
    setTimeout(() => {
      setInterns(internData)
      setIsLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    if (isPanelOpen) {
      inputRef.current?.focus()
    }
  }, [isPanelOpen])

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <p>Loading interns...</p>
  }

  return (
    <div>
      <h2>Intern Dashboard</h2>

      <button onClick={() => setIsPanelOpen(!isPanelOpen)}>
        {isPanelOpen ? 'Close Search' : 'Open Search'}
      </button>

      {isPanelOpen && (
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search intern"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <p>
        Showing {filteredInterns.length} of {interns.length} interns
      </p>

      {filteredInterns.map((intern) => (
        <div
          key={intern.id}
          style={{
            border: '1px solid gray',
            padding: '10px',
            marginTop: '10px',
          }}
        >
          <h3>{intern.name}</h3>

          <p>Role: {intern.role}</p>

          <p>Score: {intern.score}</p>

          <span
            style={{
              color: intern.score >= 50 ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {intern.score >= 50 ? 'Pass' : 'Fail'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Dashboard