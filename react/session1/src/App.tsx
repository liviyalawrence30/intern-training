import Greeting from './Greeting'
import TsxRules from './TsxRules'
import StyledCard from './StyledCard'
import Profile from "./Profile"
import SkillList from './SkillList'
import ScoreCard from './ScoreCard'
import StatusBadge from './StatusBadge'
import InternCard from './InternCard'



// React component is a reusable function. It returns the UI which is displayed on the web page.
function App() {
  return (
    <>
      <h1>Hello React</h1>
      <Greeting />
      <Greeting />
      <Greeting />
      <TsxRules/>
      <StyledCard />
      <Profile/>
      <SkillList/>
      <ScoreCard/>
      <StatusBadge/>
      <InternCard/>
      
    </>
  )
}
//'div' can be used only  when I need a container or I need to apply the styles for them .
//Otherwise, I can use 'fragment' which helps to reuse the code and  avoid extra html tags .
//I prefer fragment over div when I don't need a container.

export default App
