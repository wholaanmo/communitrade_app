export default function Modal({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    size = 'medium',
    className = '' 
  }) {
    if (!isOpen) return null
  
    const sizeClasses = {
      small: 'max-w-md',
      medium: 'max-w-lg',
      large: 'max-w-2xl',
      xlarge: 'max-w-4xl'
    }
  
    return (
      <div 
        className="fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1001] p-4"
        onClick={onClose}
      >
        <div 
          className={`bg-white rounded-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] ${sizeClasses[size]} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <h2 className="text-[#121731] text-xl sm:text-2xl text-center mb-6">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    )
  }