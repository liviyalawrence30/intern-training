import Greeting from './Greeting'
import TsxRules from './TsxRules'
import StyledCard from './StyledCard'
import Profile from "./Profile"
import SkillList from './SkillList'
import ScoreCard from './ScoreCard'
import StatusBadge from './StatusBadge'
import InternCard from './InternCard'
import Dashboard from './Dashboard'



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
      <Dashboard/>
      
    </>
  )
}
//'div' can be used only  when I need a container or I need to apply the styles for them .
//Otherwise, I can use 'fragment' to avoid extra html tags .
//I prefer fragment over div when I don't need a container.

export default App
