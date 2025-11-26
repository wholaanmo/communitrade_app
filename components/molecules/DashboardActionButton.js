import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function DashboardActionButton({
  type = 'report',
  onClick,
  children,
  className = '',
  ...props
}) {
  const buttonConfig = {
    report: {
      variant: 'report',
      icon: 'flag'
    },
    contact: {
      variant: 'contact',
      icon: 'message'
    },
    profile: {
      variant: 'profile',
      icon: 'account_circle'
    },
    delete: {
      variant: 'danger',
      icon: 'delete'
    },
    keep: {
      variant: 'primary',
      icon: 'check_circle'
    },
    remove: {
      variant: 'danger',
      icon: 'delete_forever'
    }
  }

  const config = buttonConfig[type] || buttonConfig.report

  return (
    <Button
      variant={config.variant}
      size="dashboard-action"
      onClick={onClick}
      className={className}
      {...props}
    >
      <Icon name={config.icon} className="mr-1 text-sm" />
      {children}
    </Button>
  )
}