export default function SmallText({ 
  children, 
  color = 'gray',
  weight = 'normal',
  className = '',
  ...props 
}) {
  const colors = {
    gray: 'text-[#728a9c]',
    dark: 'text-[#121731]',
    white: 'text-white',
    danger: 'text-[#e74c3c]',
    success: 'text-green-600'
  }

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const colorClass = colors[color] || colors.gray
  const weightClass = weights[weight] || weights.normal

  return (
    <span 
      className={`text-xs sm:text-sm ${colorClass} ${weightClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}