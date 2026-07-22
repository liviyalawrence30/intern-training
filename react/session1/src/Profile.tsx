function Profile() {
  const name:     string = 'Rahul'
  const role:     string = 'Intern'
  const score:    number = 92
  const joinDate: string = '2026-06-30'

  const avatarUrl: string = 'https://i.pravatar.cc/100'
  const altText:   string = `Avatar of ${name}`

  return (
    <div>
      <img src={avatarUrl} alt={altText} width={100} />
      {/* width="100" passes the value as a string.
          width={100} passes the value as a number.
          we can use "" for text and {} for numbers,variables or expressions.
      */}

      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score} / 100</p>
      <p>Name uppercase: {name.toUpperCase()}</p>
      <p>Score doubled: {score * 2}</p>
      <p>Joined: {new Date(joinDate).toDateString()}</p>
    </div>
  )
}

export default Profile

/*{} in TSX is used for expressions that return a value.
if and for are not expressions. They are statements.They cannot be used directly inside TSX.
Ternary operator and && can be used .*/



