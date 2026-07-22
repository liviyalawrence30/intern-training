import { useInterns } from '../contexts/intern-context'
import useInternSearch from '../hooks/useInternSearch'

function InternSearch() {
  const { interns } = useInterns()

  const {
    search,
    setSearch,
    filtered,
    stats,
  } = useInternSearch(interns)

  return (
    <div>
      <input
        type="text"
        placeholder="Search Intern"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Statistics</h3>

      <p>Total Interns: {stats.total}</p>
      <p>Present: {stats.present}</p>
      <p>Average Score: {stats.avg}</p>

      <h3>Filtered Interns</h3>

<div data-testid="filtered-interns">
  {filtered.length === 0 ? (
    <p>No interns found</p>
  ) : (
    filtered.map((intern) => (
      <div key={intern.id}>
        <p>{intern.name}</p>
        <p>{intern.role}</p>
        <p>{intern.score}</p>
      </div>
    ))
  )}
</div>
    </div>
  )
}

export default InternSearch