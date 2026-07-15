import Navbar from './components/Navbar'
import ScoreStats from './components/ScoreStats'
import AddInternForm from './components/AddInternForm'
import InternSearch from './components/InternSearch'
import InternListWithCallback from './components/InternListWithCallback'


/*Hooks: Access shared state from the context.
It encapsulates reusable logic and provides access to the shared intern context.*/

import { useInterns } from './contexts/intern-context'


function App() {
  
  //Context: Provides the shared application state such as intern data and loading.

  const { isLoading } = useInterns()
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  return (
    <div>

      {/* Components: Build and render the application's UI.
      It uses contexts and hooks. */}

      <Navbar />
      <div style={{ padding: '16px' }}>
        <ScoreStats />
        <AddInternForm />
        <InternSearch />
        <InternListWithCallback />
      </div>
    </div>
  )
}

export default App