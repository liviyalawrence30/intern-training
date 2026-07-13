import './App.css'
import Counter from './Counter'
import Dashboard from './Dashboard'
import EscapeHandler from './EscapeHandler'
import FilteredInterns from './FilteredInterns'
import FocusInput from './FocusInput'
import InternForm from './InternForm'
import InternList from './InternList'
import InternLoader from './InternLoader'
import InternObjectForm from './InternObjectForm'
import RefVsState from './RefVsState'
import StateTypes from './StateTypes'
import StopwatchRef from './StopwatchRef'
import TogglePanel from './TogglePanel'

function App() {
  return (
     <>
     <Counter />
     <StateTypes />
     <InternForm />
     <TogglePanel />
     <InternObjectForm />
     <InternList/>
     <InternLoader/>
     <FilteredInterns/>
     <EscapeHandler/>
     <FocusInput/>
     <RefVsState/>
     <StopwatchRef/>
     <Dashboard/>
     

     </>
  )
}

export default App