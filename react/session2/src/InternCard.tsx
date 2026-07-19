import Avatar   from './Avatar'
import Badge    from './Badge'
import ScoreBar from './ScoreBar'

interface InternCardProps {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}

function InternCard({ name, score, isPresent, role }: InternCardProps) {

  //score = score+10
  /* typescript allows this but we should not modify props directly .It makes the UI inconsistent.
  Props should not be modified because they belong to the parent component.
  Instead, create a new variable to store the modified value.*/


  /*const adjustedScore: number = score >= 90 ? score : score + 5
 

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Original Score: {score} / 100</p>
      <p>Adjusted Score: {adjustedScore}</p>
      
      <p>{isPresent ? 'Present' : 'Absent'}</p>
    </div>
  )
}*/
return (
    <div className="card">
      <Avatar name={name} />
      <h2>{name}</h2>
      <ScoreBar score={score} />
      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
        <Badge label={role} color="#4f46e5" />
        <Badge
          label={isPresent ? 'Present' : 'Absent'}
          color={isPresent ? 'green' : '#e53e3e'}
        />
        {score >= 90 && <Badge label="Top Performer" color="#d97706" />}
      </div>
    </div>
  )
}

export default InternCard

/*
The interface is defined separately from the component to improve code readability,reusability and maintainability.
It allows the same props type to be reused multiple times. */