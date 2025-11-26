export default function SmallText({ 
    children, 
    color = 'gray',
    className = '',
    ...props 
  }) {
    const colors = {
      gray: 'text-[#728a9c]',
      dark: 'text-[#121731]',
      white: 'text-white',
      danger: 'text-[#e74c3c]'
    }
  
    const colorClass = colors[color] || colors.gray
  
    return (
      <span 
        className={`text-xs sm:text-sm ${colorClass} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }