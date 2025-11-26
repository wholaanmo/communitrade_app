export default function Select({
    value,
    onChange,
    disabled = false,
    required = false,
    children,
    className = '',
    ...props
  }) {
    const baseClasses = 'w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none bg-white'
    
    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
  
    return (
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${baseClasses} ${disabledClasses} ${className}`}
        {...props}
      >
        {children}
      </select>
    )
  }
  