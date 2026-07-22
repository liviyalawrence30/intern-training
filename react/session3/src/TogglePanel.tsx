import { useState } from 'react'

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {/* Both works but setIsOpen(prev=>!prev) is safe because it uses the latest state value.
        This prevents bugs when multiple state updates happen asynchronously */}
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>

      {isOpen && (
        <div>
          <p>Name: Rahul</p>
          <p>Score: 92</p>
          <p>Role: Frontend</p>
        </div>
      )}
    </div>
  )
}

export default TogglePanel