import InternCard from './InternCard'
import ProfileCard from './ProfileCard'

function App() {
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




      



      

      
    </div>
  )
}

export default App
