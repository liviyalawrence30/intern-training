import './App.css'
import InternCard from './InternCard'
import ProfileCard from './ProfileCard'
import InternProfile,{type  Intern } from './InternProfile'
import Card from './Card'

function App() {
  const rahul: Intern = {
  id: 1, name: 'Rahul', score: 92, isPresent: true,
  skills: ['HTML', 'CSS', 'TypeScript', 'React'],
}
const priya: Intern = {
  id: 2, name: 'Priya', score: 78, isPresent: true,
  skills: ['Node.js', 'TypeScript'],
}

  return (
    <div>
      <InternCard name="Rahul" score={92} isPresent={true}  />
      <InternCard name="Priya" score={78} isPresent={true}  />
      <InternCard name="Amit"  score={45} isPresent={false} />

      {/*<InternCard name="Rahul" score="92" isPresent={true}  />
      error: Type 'string' is not assignable to type 'number'.
      TypeScript catches the wrong data type during development, preventing bugs before the application runs.
      */}
      <InternCard name="Rahul" score={40} isPresent={true}  />

      {/*<InternCard name="Priya" score={78} isPresent="true"  />
      error: Type 'string' is not assignable to type 'boolean'.
      TypeScript ensures boolean props receive only true or false values, avoiding unexpected runtime behavior.
      */}
      <InternCard name="Priya" score={78} isPresent={true}  />

      {/*<InternCard name="Amit"  score={45} />
      error: Property 'isPresent' is missing in type '{ name: string; score: number; }' but required in type 'InternCardProps'.
      TypeScript prevents passing unsupported props, helping  keep components consistent and avoiding coding mistakes. */}
      <InternCard name="Amit"  score={45} isPresent={false} />


      {/*<InternCard name="Rahul" score={92} isPresent={true} age={25}  />
      error: Property 'age' does not exist on type 'IntrinsicAttributes & InternCardProps'.
      TypeScript prevents passing unsupported props, helping keep components consistent and avoiding coding mistakes.*/}
      <InternCard name="Rahul" score={92} isPresent={true}  />

      <ProfileCard
  name="Rahul"
  role="Frontend"
  score={92}
  skills={['HTML', 'CSS', 'TypeScript', 'React']}/>  {/* updated with skills prop */}
 
<ProfileCard name="Priya" />
<ProfileCard />

<InternProfile intern={rahul} />
<InternProfile intern={priya} />
<InternProfile intern={{ ...priya }} />
{/*
{...priya} creates a copy of the priya object.
It is useful when creating a new object or changing some values.
If no changes are needed, using the original object is clearer.
*/}
<Card title="Rahul">
  <p>Score: 92</p>
  <p>Status: Present</p>
  <button>View Profile</button>
</Card>

<Card title="Announcements">
  <ul>
    <li>Session 3 tomorrow at 10am</li>
    <li>Submit PRs by EOD</li>
  </ul>
</Card>

<Card title="Empty Card" />






  </div>
  )
}

export default App
