#### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

- Component: It is a normal component which will re-render when props and state changes.
- PureComponent: It is more like a normal component with "superpower", so you can use a component lifecycle to control the re-render.
- It might break the app: using shouldComponentUpdate :D, so if you try to change any prop or state with reference directly it might break.

```
state = {
  data: []
}

shouldComponentUpdate(nextProps, nextState) {
  return nextState.data !== this.state.data;
}

handleClick = () => {
  this.setState(state => {
    state.data.push("break me up");
    return { data: state.data };
  });
}
```

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

- In the example above if you receive a state from a context as a prop and make the comparsion, it will no update in a change because shouldComponentUpdate is doing a shallow comparsion (the reference still the same)

#### 3. Describe 3 ways to pass information from a component to its PARENT.

- callback
- context api
- onClick (events)
- refs
- redux :D

#### 4. Give 2 ways to prevent components from re-rendering.

- using shouldComponentUpdate
- React.memo

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

- A react component render just on html element with its children, if you want to render more than one without using a wrap like a div, you need to use a fragment.
  e.g: if you are using this inside a map, you should use <React.Fragment> instead to apply a key.

  ```
  <>
    <p>Hello</p>
    <p>World</p>
  </>
  ```

#### 6. Give 3 examples of the HOC pattern.

- React.memo as described on item 4
- withDate fetching data and inserting on wrapped component
- withTheme to provide the theme.

#### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

- I think that is the syntax, asyn await is more like a sugar sintax. callbacks uses .then(), .catch() for error handling, async await uses try/catch block and the async await syntax

#### 8. How many arguments does setState take and why is it async.

- Class component takes 2 arguments, if you are using useState hook it will take just 1.
- I think it is asyncronous because you can do multiples changes and for perfomance it will re-render after all changes.

#### 9. List the steps needed to migrate a Class to Function Component.

- We need to change the class syntax to function syntax (constructors, class keyword)
- We need to change the methods to function
- We need to remove the this.state to useState.
- We need to change all lifecycle method with useEffect
- We need to remove all this word inside the return

#### 10. List a few ways styles can be used with components.

- inline on the style prop
- css clases
- css-in-js libraries like Stitches, styled-components

#### 11. How to render an HTML string coming from the server.

- In this challenge I use the dangerouslyInnerHtml, but we can also use libraries like ReactMarkdown with plugins like Rehype
