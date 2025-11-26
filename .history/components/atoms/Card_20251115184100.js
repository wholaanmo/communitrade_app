export default function Card({ 
    children, 
    padding = 'medium',
    className = '',
    hover = false,
    ...props 
  }) {
    const paddings = {
      none: 'p-0',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    }
  
    const paddingClass = paddings[padding] || paddings.medium
    const hoverClass = hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : ''
  
    return (
      <div 
        className={`bg-white rounded-xl shadow-lg ${paddingClass} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }