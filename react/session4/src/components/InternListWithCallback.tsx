import {  useCallback } from 'react'
import { useInterns } from '../contexts/intern-context'

import InternRow from './InternRow'
//InternRow was moved to its own component file (InternRow.tsx) 



// const InternRow = memo(function InternRow({
//   id,
//   name,
//   score,
//   onRemove,
// }: InternRowProps) {
//   const { theme } = useTheme()

//   console.log(`InternRow rendered: ${name}`)



function InternListWithCallback() {
  const { interns, removeIntern } = useInterns()

  const handleRemove = useCallback((id: number): void => {
    removeIntern(id)
  }, [removeIntern])
// const handleRemove = (id: number): void => {
//   removeIntern(id)
// }


  return (
    <div>
      {interns.map(i => (
        <InternRow
          key={i.id}
          id={i.id}
          name={i.name}
          score={i.score}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}

export default InternListWithCallback

/*
useCallback keeps the same function reference between the renders.
It helps to prevent  unnecessary re-renders of child components.
 */