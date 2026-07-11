/*
interface MyProps {
  name: string
}

const MyComponent: React.FC<MyProps> = ({ name }) => {
  return <h2>{name}</h2>
}

export default MyComponent

React.FC types the entire component, including props and return type while typing the props directly, only types the props. 
Typing the props directly is simpler and more flexible, allowing for better type inference and avoiding unnecessary constraints.*/

/*
2. PropsWithChildren automatically adds an additional children prop.
Using ReactNode requires adding children manually to the interface.*/  

/*
3. the key prop is used by React to identify which items have changed, are added, or are removed.
It is not passed to the component as a prop. So props.key cannot be accessed inside the component. */  

import {type  ReactNode, type ReactElement } from 'react'

interface PageLayoutProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

function PageLayout({ header, children, footer }: PageLayoutProps) {
  return (
    <div>
      <header style={{ background: '#f0f0f0', padding: '12px' }}>
        {header}
      </header>

      <main style={{ padding: '16px' }}>
        {children}
      </main>

      <footer style={{ background: '#f0f0f0', padding: '12px' }}>
        {footer}
      </footer>
    </div>
  )
}
interface WrapperProps {
  content: ReactNode
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>
}

interface IconButtonProps {
  icon: ReactElement
  label: string
}

function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  )
}

interface TooltipProps {
  trigger: ReactElement
  tip: string
}

function Tooltip({ trigger, tip }: TooltipProps) {
  return <span title={tip}>{trigger}</span>
}

function SelfLearning() {
  return (
    <>
      <PageLayout
        header={<h1>Intern Dashboard</h1>}
        footer={<p>© 2026 Aarvihsolutions</p>}
      >
        <p>Main content goes here as children.</p>
        <p>Any JSX works — text, elements, or other components.</p>
      </PageLayout>

      <Wrapper content="Hello ReactNode" />
      {/*<IconButton icon="★" label="Favorite" />
      Error: Type 'string' is not assignable to type 'ReactElement'. */}
      <IconButton
        icon={<span>★</span>}
        label="Favorite"
      />
      {/* <Tooltip trigger={null} tip="Tooltip Example" />
    Error: Type 'null' is not assignable to type 'ReactElement'. */}
      <Tooltip
        trigger={<button>Hover Me</button>}
        tip="Tooltip Example"
      />
    </>
  )
}

export default SelfLearning

/* 4.
Children are used for the main content between opening and closing tags of a component.
Named props are used for specific data or configuration passed to a component.
Named slots are useful when different parts of the layout need separate content.
children can be used for general content.  
*/
/* 5.
ReactNode accepts anything it can render.
ReactElement is used when a JSX element is expected.
JSX.element is similar to ReactElement but is more specific to JSX syntax. It also rejects null and undefined.
*/