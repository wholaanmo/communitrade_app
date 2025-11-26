export default function FileUpload({
    id,
    accept,
    onChange,
    disabled = false,
    className = '',
    children,
    ...props
  }) {
    return (
      <div className="flex items-center gap-3">
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
          className={`flex items-center p-3 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200 text-sm ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        >
          {children}
        </label>
      </div>
    )
  }