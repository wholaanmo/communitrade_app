import Avatar from '@/components/atoms/Avatar'
import SmallText from '@/components/atoms/SmallText'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function UserTableRow({
  user,
  onView,
  onEdit,
  onDelete,
  onSuspend,
  className = ''
}) {
  const { name, email, role, status, joinDate, avatar } = user

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    suspended: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <tr className={`border-b border-gray-200 ${className}`}>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <Avatar src={avatar} alt={name} size="small" className="mr-3" />
          <div>
            <div className="font-medium text-[#121731]">{name}</div>
            <SmallText>{email}</SmallText>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <SmallText weight="medium">{role}</SmallText>
      </td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
      <td className="py-4 px-4">
        <SmallText>{joinDate}</SmallText>
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <Button variant="outline" size="small" onClick={() => onView?.(user)}>
            <Icon name="visibility" size="sm" />
          </Button>
          <Button variant="outline" size="small" onClick={() => onEdit?.(user)}>
            <Icon name="edit" size="sm" />
          </Button>
          <Button variant="outline-danger" size="small" onClick={() => onDelete?.(user)}>
            <Icon name="delete" size="sm" />
          </Button>
          {status === 'active' && (
            <Button variant="outline-danger" size="small" onClick={() => onSuspend?.(user)}>
              <Icon name="pause" size="sm" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  )
}