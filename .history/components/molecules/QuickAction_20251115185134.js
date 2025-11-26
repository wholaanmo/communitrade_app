import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import SmallText from '@/components/atoms/SmallText'

export default function QuickAction({
  title,
  description,
  icon,
  buttonText,
  onClick,
  variant = 'primary',
  className = ''
}) {
  return (
    <Card className={`text-center ${className}`}>
      <div className="p-3 bg-[#121731] rounded-lg inline-flex mb-4">
        <Icon name={icon} className="text-white text-2xl" />
      </div>
      <h4 className="text-[#121731] font-semibold mb-2">{title}</h4>
      <SmallText className="mb-4">{description}</SmallText>
      <Button variant={variant} size="small" onClick={onClick} className="w-full">
        {buttonText}
      </Button>
    </Card>
  )
}