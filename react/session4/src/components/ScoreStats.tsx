// Job: This file calculates and displays the score statistics of interns, including highest, lowest, average scores and the number of passing interns.
// Concerns mixed: Statistics calculation, data display, context integration.


//Testability audit - ScoreStats.tsx
//yes, given the same interns array, it always produces the same statistics.
//Partially,The component depends on the React Context (useInterns) to get its data, but it does not use APIs, timers, or browser APIs.
//no,The interns data comes directly from the context instead of being passed as props, making it harder to test in isolation.
//verdict: Moderately testable.



/*
import { useMemo } from 'react'
import { useInterns } from '../contexts/intern-context'

function ScoreStats() {
  const { interns } = useInterns()

*/
 
/*
const stats = {
  highest: scores.length > 0 ? Math.max(...scores) : 0,
  lowest: scores.length > 0 ? Math.min(...scores) : 0,
  average:
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0,
  passing: interns.filter(i => i.score >= 50).length,
}
*/


//when useMemo is not used, stats are recalculated on every render.
//with useMemo, stats are recalculated only when the intern array changes.
/* const stats = useMemo(() => {
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

  return (
    <div style={{ padding: '12px', background: '#f9f9f9', marginBottom: '12px' }}>
      <p>Highest: {stats.highest} | Lowest: {stats.lowest} | Avg: {stats.average}</p>
      <p>Passing: {stats.passing} of {interns.length}</p>
    </div>
  )
}

export default ScoreStats */
import { useMemo } from 'react'
import { useInterns } from '../contexts/intern-context'

interface ScoreStatsProps {
  highest: number
  lowest: number
  average: number
  passing: number
  total: number
}

export function ScoreStats({
  highest,
  lowest,
  average,
  passing,
  total,
}: ScoreStatsProps) {
  return (
    <div style={{ padding: '12px', background: '#f9f9f9', marginBottom: '12px' }}>
      <p>Highest: {highest} | Lowest: {lowest} | Avg: {average}</p>
      <p>Passing: {passing} of {total}</p>
    </div>
  )
}

export function ScoreStatsContainer() {
  const { interns } = useInterns()

  const stats = useMemo(() => {
    const scores = interns.map(i => i.score)

    return {
      highest: scores.length > 0 ? Math.max(...scores) : 0,
      lowest: scores.length > 0 ? Math.min(...scores) : 0,
      average:
        scores.length > 0
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0,
      passing: interns.filter(i => i.score >= 50).length,
      total: interns.length,
    }
  }, [interns])

  return <ScoreStats {...stats} />
}

export default ScoreStatsContainer