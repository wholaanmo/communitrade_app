export default function Icon({ 
    name, 
    size = 'base',
    className = '',
    ...props 
  }) {
    const sizes = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    }
  
    const sizeClass = sizes[size] || sizes.base
  
    return (
      <span 
        className={`material-icons ${sizeClass} ${className}`}
        {...props}
      >
        {name}
      </span>
    )
  }