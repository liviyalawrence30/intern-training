import './App.css'
import Navbar     from './components/Navbar'
import ThemedCard from './components/ThemedCard'
import { useInterns } from './contexts/intern-context'
/*explore section:
import { useTheme } from './contexts/theme-context'
function testTheme() {
  const theme = useTheme()
  console.log(theme)
}
testTheme()
error: Invalid hook call .Hooks should not be called outside the function component.
Using them in a normal function violates the rules of hooks.
*/ 
function App() {
  const {interns} = useInterns()
  return (
    <div>
      <Navbar />
      <div style={{ padding: '16px' }}>
        
        {interns.map((intern) => (
          <ThemedCard
            key={intern.name}
            name={intern.name}
            score={intern.score}
          />
        ))}
      </div>
    </div>
  )
}
export default App
