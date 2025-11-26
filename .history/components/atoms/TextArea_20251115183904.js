export default function TextArea({
  placeholder = '',
  value,
  onChange,
  disabled = false,
  required = false,
  rows = 3,
  className = '',
  ...props
}) {
  const baseClasses = 'w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none resize-vertical bg-white'
  
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      rows={rows}
      className={`${baseClasses} ${disabledClasses} ${className}`}
      {...props}
    />
  )
}