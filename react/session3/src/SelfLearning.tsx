/* 1.
In the console, "dashboard useEffect" is printed twice because it is in strict mode.
React.StrictMode runs the component twice in development mode to identify the issues with side effects.
But in production mode, it will run only once.

2.
useEffect runs after the UI is rendered. It is used for side effects like data fetching etc.
useLayoutEffect runs before the updated UI is displayed. It is used for DOM manipulations and measuring the layout.

3.
without a dependency array, useEffect runs after every render.
If th UI is updated , useEffect will run again .
This creates an infinite loop of rendering and useEffect calls.

4.
useState is best for simple state like  a text input value or a boolean flag.
useReducer is best for complex state, when there are multiple related state updates. Like when the next state depends on the previous state or when the state is an object or array.
It keeps the update logic in one reducer function, making the code  easier to manage and test.

5.
when i rendered LiveTimer component, the timer started counting from 0 and incremented every second.
when i removed the cleanup, it counted normally as before. 
when i added the cleanup and didnt restart the app, it displayed +2 increment every second because multiple intervals were running in the background.
when i refreshed the browser , it counted normally . This shows the importance of cleanups. 
*/

