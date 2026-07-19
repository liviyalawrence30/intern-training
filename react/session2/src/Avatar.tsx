interface AvatarProps {
  name: string
}

function Avatar({ name }: AvatarProps) {
  return (
    <img
      src={`https://i.pravatar.cc/50?u=${name}`}
      alt={name}
      style={{ borderRadius: '50%', width: 50, height: 50 }}
    />
  )
}

export default Avatar

//Single responsibility: This component displays an avatar image of the user.
