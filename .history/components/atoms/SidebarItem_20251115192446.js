import Link from 'next/link'
import Icon from './Icon'

export default function SidebarItem({
  href,
  icon,
  label,
  isExpanded = false,
  isActive = false,
  onClick,
  className = ''
}) {
  const baseClasses = 'group flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 hover:bg-white'
  const expandedClasses = isExpanded ? 'justify-start' : 'justify-center w-full'

  const content = (
    <>
      <Icon name={icon} className="text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center group-hover:text-[#728a9c]" />
      <span className={`
        text-white transition-all duration-200 ease-out group-hover:text-[#728a9c]
        ${isExpanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
      `}>
        {label}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${expandedClasses} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${expandedClasses} bg-none border-none cursor-pointer ${className}`}>
      {content}
    </button>
  )
}