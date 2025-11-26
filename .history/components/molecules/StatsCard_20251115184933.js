import Card from '@/components/atoms/Card'
import SmallText from '@/components/atoms/SmallText'
import Icon from '@/components/atoms/Icon'

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'positive', // 'positive', 'negative', 'neutral'
  icon,
  className = ''
}) {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <div>
          <SmallText color="gray">{title}</SmallText>
          <h3 className="text-2xl font-bold text-[#121731] mt-1">{value}</h3>
          {change && (
            <SmallText className={`${changeColors[changeType]} mt-1`}>
              {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→'} {change}
            </SmallText>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-[#121731] rounded-lg">
            <Icon name={icon} className="text-white text-xl" />
          </div>
        )}
      </div>
    </Card>
  )
}