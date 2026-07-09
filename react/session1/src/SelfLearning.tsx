function SelfLearning() {
  return (
    <div>
      <h2>Self Learning</h2>
    </div>
  )
}

export default SelfLearning
/*
1.React.StrictMode
It is used in main.tsx during development.
It finds  problems by showing warnings and it checks for unsafe code.
It does not affect the production build.

2.Controlled vs Uncontrolled components
A controlled component stores its value in React state.It is easier to validate and manage.
An uncontrolled component stores its value in the DOM.

3.key prop
It helps React identify  list items.
using the array index as key is not recommended because the order of items might change.
Instead,a unique value like 'id' can be used as the key.

4.Fragments
Fragments group multiple elements without adding an extra Html element.
The short syntax (<>...</>)cannot accept a key.
<React.Fragment key={...}>can be used when a key is required ,while rendering a list of fragments.
*/

