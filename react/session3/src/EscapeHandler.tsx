import { useState, useEffect } from 'react'

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) return
    {/*
      console.log("keydown fired")
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
 }, [isOpen])*/}

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)


    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])
  
  

  

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Panel</button>

      {isOpen && (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '8px' }}>
          <p>Panel is open. Press Escape to close.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  )
}
export default EscapeHandler

/* clean up is essential because it removes the event listener when the component is no longer using it.
Without cleanup , multiple listeners are added , causing the same event to run multiple times. */