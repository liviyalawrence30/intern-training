function StatusBadge() {
  const isAdmin:    boolean  = true
  const hasWarning: boolean  = false
  const isVerified: boolean  = true
  const messages:   string[] = ['Assignment submitted', 'PR created']
  /* const messages: string[]=[]
  "No messages yet" is displayed in the UI
  because,messages.length renders 0 since the array is empty.
   */

  return (
    <div>
      {/* Show only if admin */}
      {isAdmin && <span>Admin</span>}

      {/* Show only if warning */}
      {hasWarning && <p style={{ color: 'orange' }}>Warning: incomplete tasks</p>}

      {/* Show only if verified */}
      {isVerified && <span>Verified</span>}

      {/* Show empty state only when no messages */}
      {messages.length === 0 && <p>No messages yet</p>}

      {/* Show list only when messages exist */}
      {messages.length > 0 && (
        <ul>
          {messages.map((msg: string, i: number) => <li key={i}>{msg}</li>)}
        </ul>
      )}
    </div>
  )
}

export default StatusBadge
