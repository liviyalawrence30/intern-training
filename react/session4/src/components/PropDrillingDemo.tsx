interface User {
  name:    string
  isAdmin: boolean
}

// Grandchild — actually uses the user
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  )
}

// Middle component — receives user only to pass it down, never uses it
function InternCard({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px' }}>
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  )
}

// Parent — passes user down to InternCard
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  )
}

// Top level — owns the user
function PropDrillingDemo() {
  const user: User = { name: 'Rahul', isAdmin: true }
  return <InternList user={user} />
}

export default PropDrillingDemo
/*    
The InternCard and  InternList doesn't use the user data.
Instead they pass them to the child components (prop drilling).
If the user Interface is updated, we need to  pass the updated data. 
This makes the code harder to maintain.
*/