interface InternCardProps {
  name:      string
  score:     number
  isPresent: boolean
}

function InternCard({ name, score, isPresent }: InternCardProps) {

  //score = score+10
  {/* typescript allows this but we should not modify props directly .It makes the UI inconsistent.
  Props should not be modified because they belong to the parent component.
  Instead, create a new variable to store the modified value.*/}


  const adjustedScore: number = score >= 90 ? score : score + 5
 

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Original Score: {score} / 100</p>
      <p>Adjusted Score: {adjustedScore}</p>
      
      <p>{isPresent ? 'Present' : 'Absent'}</p>
    </div>
  )
}

export default InternCard

/*
The interface is defined separately from the component to improve code readability,reusability and maintainability.
It allows the same props type to be reused multiple times. */