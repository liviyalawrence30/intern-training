import { useEffect, useMemo, useState } from 'react'


function ScoreStats() {
  const [loading, setLoading] = useState(true)

const [interns] = useState([
  { id: 1, name: 'Rahul', score: 92 },
  { id: 2, name: 'Priya', score: 85 },
])
  

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false)
  }, 500)

  return () => clearTimeout(timer)
}, [])


//when useMemo is not used, stats are recalculated on every render.
//with useMemo, stats are recalculated only when the intern array changes.
 const stats = useMemo(() => {
  console.log('Recalculating stats...')

  const scores = interns.map(i => i.score)

  return {
    highest: scores.length > 0 ? Math.max(...scores) : 0,
    lowest: scores.length > 0 ? Math.min(...scores) : 0,
    average:
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0,
    passing: interns.filter(i => i.score >= 50).length,
  }
}, [interns])

if(loading) {
  return <p>Loading interns...</p>
  }

  return (
  <div style={{ padding: '12px', background: '#f9f9f9', marginBottom: '12px' }}>
    <p>
      Highest: {stats.highest} | Lowest: {stats.lowest} | Avg: {stats.average}
    </p>

    <p>
      Passing: {stats.passing} of {interns.length}
    </p>

    {/* Dummy intern data for async testing */}
    {interns.map((intern) => (
      <p key={intern.id}>{intern.name}</p>
    ))}
  </div>
)
}

export default ScoreStats