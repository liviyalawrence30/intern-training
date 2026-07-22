import { useTheme } from '../contexts/theme-context'

interface InternRowProps {
  id: number
  name: string
  score: number
  onRemove: (id: number) => void
}

function InternRow({ id, name, score, onRemove }: InternRowProps) {
  const { theme } = useTheme()

  return (
    <div
      data-testid={`intern-${name}`}
      style={{
        background: theme === 'light' ? '#fff' : '#2a2a2a',
        color: theme === 'light' ? '#000' : '#eee',
        padding: '8px',
        margin: '4px 0',
      }}
    >
      <span>{name} — {score}</span>

      <button onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  )
}

export default InternRow