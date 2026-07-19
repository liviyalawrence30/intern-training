/* 1.
React.memo prevents unnecessary re-renders by rendering a component only when its props change.
It works with useCallback because useCallback keeps function references stable between renders.

2.
useMemo should not be used for simple calculations like  addition or string concatenation . 
useCallback should not be used for functions that are not passed to memoized child components.
It makes the code more complex . 

3.
useReducer is preferred when state updates are complex or it involve multiple related actions.
It keeps all the state update logic in one place . 
It is easier to manage than multiple useState calls.

4.
Zustand and Redux Toolkit are useful for large applications with complex state across many components.
useContext with useState is suitable for small to medium applications with simple global state
such as user data or themes.

Zustand is lightweight and easy to use.
Redux Toolkit is better for large scale applications that need state management,debugging tools,scalable architecture  etc.

Compared to useContext, both Zustand and Redux Toolkit help reduce unnecessary re-renders.
They make applications easier to manage.

*/