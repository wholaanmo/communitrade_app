import Link from 'next/link'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function SeeAllButton({
  href,
  children = 'See All',
  className = '',
  ...props
}) {
  return (
    <Button
      as={Link}
      href={href}
      variant="see-all"
      size="medium"
      className={`no-underline hover:no-underline ${className}`}
      {...props}
    >
      {children}
      <Icon name="chevron_right" className="text-lg ml-1" />
    </Button>
  )
}