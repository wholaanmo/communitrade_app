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
  const baseClasses = 'flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none'
  
  const variants = {
    primary: 'bg-[#121731] text-white border border-[#121731] hover:bg-[#728a9c] hover:border-[#728a9c]',
    secondary: 'bg-white text-[#728a9c] border border-[#728a9c] hover:bg-[#728a9c] hover:text-white',
    danger: 'bg-[#e74c3c] text-white border border-[#e74c3c] hover:bg-[#c82333] hover:border-[#c82333]',
    outline: 'bg-white text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white',
    'outline-danger': 'bg-white text-[#e74c3c] border border-[#e74c3c] hover:bg-[#e74c3c] hover:text-white',
    'outline-gray': 'bg-white text-[#728a9c] border border-[#728a9c] hover:bg-[#728a9c] hover:text-white',
    success: 'bg-green-600 text-white border border-green-600 hover:bg-green-700 hover:border-green-700'
  }
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
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