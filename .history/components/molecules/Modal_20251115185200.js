import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Card from '@/components/atoms/Card'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium', // 'small', 'medium', 'large'
  showCloseButton = true,
  className = ''
}) {
  if (!isOpen) return null

  const sizes = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl'
  }

  const sizeClass = sizes[size] || sizes.medium

  return (
    <div 
      className="fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1000] p-4"
      onClick={onClose}
    >
      <Card 
        className={`w-full ${sizeClass} max-h-[90vh] overflow-y-auto relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            {title && <h2 className="text-[#121731] text-xl font-semibold">{title}</h2>}
            {showCloseButton && (
              <Button variant="outline-gray" size="small" onClick={onClose}>
                <Icon name="close" />
              </Button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="modal-content">
          {children}
        </div>
      </Card>
    </div>
  )
}