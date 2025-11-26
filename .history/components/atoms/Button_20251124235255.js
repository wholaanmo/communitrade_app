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
  const baseClasses = 'flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none rounded-lg font-medium'

  const variants = {
    primary: 'bg-[#728a9c] text-white hover:bg-[#121731]',
    secondary: 'bg-white text-[#728a9c] border border-[#728a9c] hover:bg-[#728a9c] hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-white hover:bg-white hover:text-[#728a9c]',
    'sidebar-item': 'bg-transparent text-white hover:bg-white hover:text-[#728a9c] rounded-lg',
    
    // Dashboard specific variants
    'report': 'text-red-600 border border-red-600 hover:bg-red-600 hover:text-white',
    'contact': 'text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white',
    'profile': 'text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white',
    'see-all': 'text-[#121731] hover:text-[#728a9c] hover:bg-gray-50 no-underline',
    'cancel': 'bg-white text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white',
    'submit': 'bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700'
  }

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base sm:px-4 sm:py-2 sm:text-base px-3 py-1.5 text-sm', 
    large: 'px-6 py-3 text-lg',
    icon: 'w-10 h-10 rounded-full',
    'dashboard-action': 'py-1.5 px-4 flex-1 justify-center min-w-[110px]'
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