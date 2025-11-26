export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) {
  const baseClasses = 'flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none'
  
  const variants = {
    primary: 'bg-[#728a9c] text-white hover:bg-[#121731]',
    secondary: 'bg-white text-[#728a9c] border border-[#728a9c] hover:bg-[#728a9c] hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-white hover:bg-white hover:text-[#728a9c]',
    'sidebar-item': 'bg-transparent text-white hover:bg-white hover:text-[#728a9c] rounded-lg'
  }
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    icon: 'w-10 h-10 rounded-full'
  }

  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.medium
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : ''

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}