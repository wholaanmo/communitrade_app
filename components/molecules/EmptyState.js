import Icon from '@/components/atoms/Icon'
import SmallText from '@/components/atoms/SmallText'
import Button from '@/components/atoms/Button'

export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  actionText,
  onAction,
  className = ''
}) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <Icon name={icon} className="text-gray-400 text-6xl mb-4" />
      <h3 className="text-[#121731] text-lg font-semibold mb-2">{title}</h3>
      <SmallText className="mb-6 max-w-md mx-auto">{description}</SmallText>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  )
}