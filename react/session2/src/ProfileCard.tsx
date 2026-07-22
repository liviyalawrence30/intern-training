interface ProfileCardProps {
  name?: string
  role?: string
  score?: number
  skills?: string[]
}

function ProfileCard({
  name = 'Unknown',
  role = 'Intern',
  score = 0,
  //skills, - error: skills is possibly undefined.  
//without a default value, skills may be undefined.
//Using skills = [] provides a safe empty array.
    skills = [],

}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>

      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileCard

/*
The ? makes a prop optional.
If it is not provided, the default value is used.
*/