export default function Select({
    value,
    onChange,
    disabled = false,
    required = false,
    children,
    className = '',
    ...props
  }) {
    const baseClasses = 'w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none bg-white appearance-none'
    
    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
  
    return (
      <div className="relative">
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <span className="material-icons text-lg">arrow_drop_down</span>
        </div>
      </div>
    )
  }