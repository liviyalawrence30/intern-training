import './App.css'
import Counter from './Counter'
import EscapeHandler from './EscapeHandler'
import FilteredInterns from './FilteredInterns'
import InternForm from './InternForm'
import InternList from './InternList'
import InternLoader from './InternLoader'
import InternObjectForm from './InternObjectForm'
import StateTypes from './StateTypes'
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

     </>
  )
}

export default App