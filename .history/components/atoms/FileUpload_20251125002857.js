export default function FileUpload({
  id,
  onChange,
  accept,
  children,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        type="file"
        id={id}
        onChange={onChange}
        accept={accept}
        disabled={disabled}
        className="hidden"
        {...props}
      />
      <label
        htmlFor={id}
        className={`flex items-center px-4 py-2 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200 text-xs sm:text-sm ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <span className="material-icons mr-2 text-[#728a9c] text-base">cloud_upload</span>
        {children}
      </label>
    </div>
  )
}