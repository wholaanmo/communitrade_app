export default function Label({ 
  children, 
  htmlFor, 
  required = false,
  className = '',
  ...props 
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-semibold text-[#121731] mb-2 text-sm sm:text-base block ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}