import Greeting from './Greeting'
// React component is a reusable function. It returns the UI which is displayed on the web page.
function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  )
}
//div can be used only  when I need a container or I need to apply the styles for them .
//Otherwise, I can use fragment which helps to reuse the code and  avoid extra html tags .
//I prefer fragment over div when i don't need a container.

export default App
