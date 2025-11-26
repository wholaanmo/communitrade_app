import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function DashboardActionButton({
  type = 'report', // 'report', 'contact', 'profile'
  onClick,
  children,
  className = '',
  ...props
}) {
  const iconMap = {
    report: 'flag',
    contact: 'message',
    profile: 'account_circle'
  }

  const variants = {
    report: { variant: 'report', size: 'dashboard-action' },
    contact: { variant: 'contact', size: 'dashboard-action' },
    profile: { variant: 'profile', size: 'dashboard-action' }
  }

  const config = variants[type] || variants.report

  return (
    <Button
      variant={config.variant}
      size={config.size}
      onClick={onClick}
      className={className}
      {...props}
    >
      <Icon name={iconMap[type]} className="text-lg mr-2" />
      {children}
    </Button>
  )
}