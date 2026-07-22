interface BadgeProps {
  label: string
  color: string
}

function Badge({ label, color }: BadgeProps) {
  return (
    <span style={{
      background: color,
      color: 'white',
      padding: '2px 10px',
      borderRadius: '4px',
      fontSize: '12px',
    }}>
      {label}
    </span>
  )
}

export default Badge
//Single responsibility: This component displays a badge with a label and background color.
/*
Badge can be reused with different labels and colors.
This avoids repeating the same code and makes it easier to maintain.
*/