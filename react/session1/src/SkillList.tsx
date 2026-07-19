function SkillList() {
  const skills: string[] = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'React']

  return (
    <div>
      <h3>Skills Covered</h3>
      <ul>
        {skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <p>Total: {skills.length} skills</p>
    </div>
  )
}

export default SkillList

/*
If the 'key' prop is removed, the warning says "index is declared but its value is never read".
Keys help react identify and update list items correctly.
*/