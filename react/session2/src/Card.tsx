import { type ReactNode } from 'react'
/*
ReactNode represents anything that React can render.
It is used for children because it accepts text, elements, and components.
*/

interface CardProps {
  title:    string
  children?: ReactNode
}
function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {children && <div className="card-body">{children}</div>}
    </div>
  )
}
export default Card

/*
Required children must always be provided.
Optional children can be omitted when no content is needed.
*/

